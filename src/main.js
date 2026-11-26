import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router.js";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 500,
  easing: "ease-out-cubic",
  once: false,
});

createApp(App).use(router).mount("#app");
