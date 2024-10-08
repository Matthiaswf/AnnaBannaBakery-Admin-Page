import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Global CSS
import './assets/main.css';

createApp(App).user(createPinia()).use(router).mount('#app');
