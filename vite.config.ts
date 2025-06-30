import { defineConfig } from 'vite';

export default defineConfig({
  // ... your other config ...
  define: {
    'process.env': {},
    global: {},
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
});
