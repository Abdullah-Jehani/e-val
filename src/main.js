// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import './index.css';
import router from './routes';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 5,
  newestOnTop: true,
});
app.mount('#app');
