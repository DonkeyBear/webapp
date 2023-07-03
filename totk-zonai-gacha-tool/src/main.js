import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@picocss/pico';
import '@picocss/pico/docs/js/modal.js';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';
import VueGtagPlugin from 'vue-gtag';

// Vue 頁面元件
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';

const distDir = import.meta.env.VITE_DIST_DIR;

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: `${distDir}/`, component: HomePage },
    { path: `${distDir}/about`, component: AboutPage }
  ]
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueGtagPlugin, {
  config: { id: 'G-BJVSCP8FRC' }
});
app.mount('#app');
