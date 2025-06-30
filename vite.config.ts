import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    Buffer: 'Buffer',
    'process.env': {},
    'process.browser': true,
    'process.version': '"v18.0.0"',
    'process.versions': '{}',
    'process.nextTick': 'setTimeout',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})