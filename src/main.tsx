import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletProviderWrapper } from './components/WalletProviderWrapper';

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/wallet-sw-register.js')
      .then(registration => {
        console.log('OPTIK Wallet PWA registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('OPTIK Wallet PWA registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProviderWrapper>
      <App />
    </WalletProviderWrapper>
  </StrictMode>
);