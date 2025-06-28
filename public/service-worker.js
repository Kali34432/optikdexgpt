// OPTIK Wallet Service Worker
const CACHE_NAME = 'optik-wallet-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico'
];

// Install event - precache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For API requests, always go to network
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('/supabase/') ||
      event.request.url.includes('/auth/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response and update cache in background
          const fetchPromise = fetch(event.request)
            .then(response => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // Network failed, just return cached response
              return cachedResponse;
            });

          // Return cached response immediately
          return cachedResponse;
        }

        // No cached response, fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Background sync for offline transactions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// Push notification handler
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then(clientList => {
        // If a window is already open, focus it
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});

// Helper function to sync transactions
async function syncTransactions() {
  // Get all pending transactions from IndexedDB
  const db = await openDatabase();
  const pendingTxs = await getPendingTransactions(db);
  
  // Try to send each transaction
  const successfulTxs = [];
  for (const tx of pendingTxs) {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tx)
      });
      
      if (response.ok) {
        successfulTxs.push(tx.id);
      }
    } catch (error) {
      console.error('Failed to sync transaction:', error);
    }
  }
  
  // Remove successful transactions from pending
  if (successfulTxs.length > 0) {
    await removeSuccessfulTransactions(db, successfulTxs);
  }
}

// IndexedDB helper functions
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('OptikWalletDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = event => {
      const db = request.result;
      if (!db.objectStoreNames.contains('pendingTransactions')) {
        db.createObjectStore('pendingTransactions', { keyPath: 'id' });
      }
    };
  });
}

function getPendingTransactions(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pendingTransactions'], 'readonly');
    const store = transaction.objectStore('pendingTransactions');
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function removeSuccessfulTransactions(db, ids) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pendingTransactions'], 'readwrite');
    const store = transaction.objectStore('pendingTransactions');
    
    let completed = 0;
    let errors = 0;
    
    ids.forEach(id => {
      const request = store.delete(id);
      request.onsuccess = () => {
        completed++;
        if (completed + errors === ids.length) {
          resolve();
        }
      };
      request.onerror = () => {
        errors++;
        if (completed + errors === ids.length) {
          resolve();
        }
      };
    });
  });
}