import { createApp } from "vue";
import { createPinia } from "pinia";
import VueConfetti from 'vue-confetti'

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);


app.use(createPinia());
app.use(router);
app.use(VueConfetti)

app.mount("#app");
