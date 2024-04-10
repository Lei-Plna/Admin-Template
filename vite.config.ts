import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import VueDevtools from 'vite-plugin-vue-devtools';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevtools()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
