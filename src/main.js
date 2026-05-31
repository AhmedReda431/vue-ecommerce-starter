import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/animations.css";
import "./plugins/sweetalert";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
