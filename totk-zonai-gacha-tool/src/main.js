import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@picocss/pico';
import '@picocss/pico/docs/js/modal.js';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/webapp/totk-zonai-gacha-tool/dist/', component: HomePage },
    { path: '/webapp/totk-zonai-gacha-tool/dist/about', component: AboutPage }
  ]
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
