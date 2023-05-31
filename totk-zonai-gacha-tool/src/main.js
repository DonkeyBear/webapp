import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@picocss/pico';
import '@picocss/pico/docs/js/modal.js';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';

import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
