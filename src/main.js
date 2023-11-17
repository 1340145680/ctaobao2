import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import './style.css'
import './style.scss'
import '@/utils/rem';

import Vant from "vant";
import "vant/lib/index.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import pinia from "@/store";

import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";

import "@icon-park/vue-next/styles/index.css";
import { install } from "@icon-park/vue-next/es/all";

import Vue3TouchEvents from "vue3-touch-events";

// import "@/util/rem.js";
// import Vue3Lottie from "vue3-lottie";
// import "vue3-lottie/dist/style.css";
// import "animate.css";
// import anime from "animejs";
// import "@vant/touch-emulator";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import "element-plus/theme-chalk/display.css";
const app = createApp(App);
install(app, "i");
// APP.config.globalProperties.$anime = anime;
// app.use(Vue3Lottie)
app.use(Vue3TouchEvents);
app.use(router);
app.use(Vant);
app.use(ElementPlus);
app.use(NutUI);
app.use(pinia);
app.mount("#app");
