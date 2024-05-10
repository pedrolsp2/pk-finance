import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestforPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'PK',
    short_name: 'PK',
    description: 'PK Finance, app de financas.',
    // icons: [
    //   {
    //     src: '/icon192.png',
    //     sizes: '192x192',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/icon1256.png',
    //     sizes: '256x256',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/icon384.png',
    //     sizes: '384x384',
    //     type: 'image/png',
    //   },
    //   {
    //     src: '/icon512.png',
    //     sizes: '512x512',
    //     type: 'image/png',
    //   },
    // ],
    theme_color: '#9163cb',
    background_color: '#egebf2',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
  selfDestroying: true,
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestforPlugin)],
  //   esbuild: {
  // drop: ['console', 'debugger'],
  //   },
  build: {
    minify: 'terser', // <-- add
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
