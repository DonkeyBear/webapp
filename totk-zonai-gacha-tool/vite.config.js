import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/webapp/totk-zonai-gacha-tool/dist',
  plugins: [vue()]
});
