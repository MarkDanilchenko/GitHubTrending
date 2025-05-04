import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/js/bootstrap.bundle.js";
window.$ = window.jQuery = require("jquery");

const app = createApp(App);

app.use(router).use(store).mount("#app");
