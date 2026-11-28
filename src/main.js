import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import AppMessage from "./components/AppMessage.vue";
import router from "./router.js";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 500,
  easing: "ease-out-cubic",
  once: false,
});

createApp(App)
  .component("AppMessage", AppMessage)
  .use(createPinia())
  .use(router)
  .mount("#app");
