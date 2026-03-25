import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: '.',

  server: {
    port: 8080,
  },

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        orders:      resolve(__dirname, 'EveOrders.html'),
        multisell:   resolve(__dirname, 'eve-multisell.html'),
        marketProbe: resolve(__dirname, 'market-probe.html'),
        tradeRun:    resolve(__dirname, 'trade-run.html'),
        margin:      resolve(__dirname, 'margin.html'),
        callback:    resolve(__dirname, 'oauth/callback.html'),
      },
    },
  },

  resolve: {
    alias: {
      '@api':    resolve(__dirname, 'src/api'),
      '@auth':   resolve(__dirname, 'src/auth'),
      '@shared': resolve(__dirname, 'src/shared'),
    },
  },
});
