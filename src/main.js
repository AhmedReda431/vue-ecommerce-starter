import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/animations.css";
import "@/styles/global.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";
import "./plugins/sweetalert";
import i18n from "./i18n";

const app = createApp(App);
app.use(i18n);
app.use(createPinia());

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
authStore.initAuth();

app.use(router);
app.use(vuetify);

app.mount("#app");