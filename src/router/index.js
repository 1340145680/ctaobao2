import { createRouter, createWebHashHistory } from "vue-router";
import shop from "@/views/shop.vue";
import msg from "@/views/msg.vue";

const routes = [
  {
    path: "/",
    name: "shop",
    component: shop,
  },
  {
    path: "/chat",
    name: "chat",
    component: msg,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
