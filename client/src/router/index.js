import * as VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("#/pages/Home.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("#/pages/NotFound.vue"),
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
