// Register the service worker for OPTIK Wallet
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('OPTIK Wallet Service Worker registered with scope:', registration.scope);
        
        // Check for updates
        registration.onupdatefound = function() {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = function() {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New version available
                  console.log('New version of OPTIK Wallet available! Refresh to update.');
                  
                  // Show update notification to user
                  if (window.OptikWallet && window.OptikWallet.showUpdateNotification) {
                    window.OptikWallet.showUpdateNotification();
                  }
                } else {
                  // First install
                  console.log('OPTIK Wallet is now available offline!');
                }
              }
            };
          }
        };
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
      
    // Register wallet web worker
    if (window.Worker) {
      const walletWorker = new Worker('/wallet-worker.js');
      
      // Initialize the worker
      walletWorker.postMessage({ action: 'init' });
      
      // Listen for messages from the worker
      walletWorker.onmessage = function(e) {
        const { action } = e.data;
        
        if (action === 'initialized') {
          console.log('OPTIK Wallet Worker initialized:', e.data);
          
          // Store worker reference for later use
          window.OptikWallet = window.OptikWallet || {};
          window.OptikWallet.worker = walletWorker;
        }
      };
      
      // Handle worker errors
      walletWorker.onerror = function(error) {
        console.error('OPTIK Wallet Worker error:', error);
      };
    }
  });
  
  // Setup for background sync
  navigator.serviceWorker.ready.then(registration => {
    // Register for background sync if supported
    if ('sync' in registration) {
      document.addEventListener('DOMContentLoaded', () => {
        // Store sync registration for later use
        window.OptikWallet = window.OptikWallet || {};
        window.OptikWallet.syncRegistration = registration;
      });
    }
    
    // Register for push notifications if supported
    if ('pushManager' in registration) {
      document.addEventListener('DOMContentLoaded', () => {
        // Store push registration for later use
        window.OptikWallet = window.OptikWallet || {};
        window.OptikWallet.pushRegistration = registration;
      });
    }
  });
}

// Helper functions for the OPTIK Wallet
window.OptikWallet = window.OptikWallet || {};

// Show update notification
window.OptikWallet.showUpdateNotification = function() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 left-4 bg-blue-600/90 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3';
  notification.innerHTML = `
    <div>
      <p class="font-medium">OPTIK Wallet Update Available</p>
      <p class="text-sm text-blue-100">Refresh to install the latest version</p>
    </div>
    <button class="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">Update</button>
    <button class="text-blue-200 hover:text-white ml-2">&times;</button>
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Setup event listeners
  const updateButton = notification.querySelector('button:first-of-type');
  const closeButton = notification.querySelector('button:last-of-type');
  
  updateButton.addEventListener('click', () => {
    window.location.reload();
  });
  
  closeButton.addEventListener('click', () => {
    notification.remove();
  });
};

// Request push notification permission
window.OptikWallet.requestNotificationPermission = function() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return Promise.resolve(false);
  }
  
  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      return true;
    }
    return false;
  });
};

// Subscribe to push notifications
window.OptikWallet.subscribeToPushNotifications = function() {
  if (!window.OptikWallet.pushRegistration) {
    return Promise.reject('Push registration not available');
  }
  
  return window.OptikWallet.pushRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
    )
  });
};

// Helper function to convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}