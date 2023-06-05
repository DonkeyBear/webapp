import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/totk-zonai-gacha-tool/dist',
  plugins: [vue()]
});
