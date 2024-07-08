import { createApp } from 'vue';
import App from './App.vue';
import '../assets/sass/base.scss';
import router from '../router';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

const app = createApp(App);

// Connects the Vue app with a Vue router instance.

app.use(router);
app.use(FloatingVue);

app.mount('#app');
