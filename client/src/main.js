import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js';
import store from '@/store/index.js';
// Bootstrap 5 is imported in client/src/assets/scss/index.scss
import '@/assets/scss/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/assets/js/index.js';
// import * from '@/directives/index.js';
window.$ = window.jQuery = require('jquery');

const app = createApp(App);

app.use(router).use(store).mount('#app');
