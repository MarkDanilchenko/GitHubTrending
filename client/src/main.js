import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "#/assets/scss/index.scss";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "#/assets/js/index.js";
import directives from "./directives/index.js";

const app = createApp(App);

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(router).use(store).mount("#app");
