import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo192.png', 'logo512.png'],
      manifest: {
        name: 'Optik Wallet',
        short_name: 'OptikWallet',
        description: 'Solana-powered meme coin wallet built by OptikDexGPT',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  define: {
    'process.env': {},
    'global': 'globalThis',
    'Buffer': 'Buffer'
  },
  resolve: {
    alias: {
      'buffer': 'buffer'
    }
  },
  optimizeDeps: {
    include: ['buffer']
  }
});