import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletProviderWrapper } from './components/WalletProviderWrapper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProviderWrapper>
      <App />
    </WalletProviderWrapper>
  </StrictMode>
);
