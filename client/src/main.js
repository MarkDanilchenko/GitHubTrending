import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "#/assets/scss/index.scss";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "#/assets/js/index.js";

const app = createApp(App);

app.use(router).use(store).mount("#app");
