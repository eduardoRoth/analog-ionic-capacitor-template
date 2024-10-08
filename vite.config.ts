/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  ssr: {
    noExternal: ['@ionic/**', '@stencil/**', 'ionicons'],
  },
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      vite: {
        inlineStylesExtension: 'scss',
      },
      ssr: false
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
    server: {
      deps: {
        inline: ['@ionic/angular'],
      },
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
