import { createRouter, createWebHashHistory } from "vue-router";
import shop from "@/views/shop.vue";
import msg from "@/views/msg.vue";
import tools from "@/views/tools.vue";

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
  {
    path: "/tools",
    name: "tools",
    component: tools,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
