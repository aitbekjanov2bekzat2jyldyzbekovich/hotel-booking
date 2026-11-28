import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Login from "./views/Login.vue";
import UserProfile from "./views/UserProfile.vue";
import { useAuthStore } from "./authStore/index.js";
import { showAppMessage } from "./utils/appMessage.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
      meta: {
        requiresAuth: true,
        requiresEmailVerification: true,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth && !to.meta.guestOnly) return true;

  const authStore = useAuthStore();
  const redirect = { name: "login", query: { redirect: to.fullPath } };

  try {
    await authStore.initializeAuth();
  } catch (error) {
    showAppMessage(error.message, "error");
    return redirect;
  }

  if (to.meta.guestOnly && authStore.user) {
    try {
      if (await authStore.confirmAccount()) {
        return { name: "profile" };
      }
    } catch (error) {
      showAppMessage(error.message, "error");
    }
  }

  if (!to.meta.requiresAuth) return true;

  if (!authStore.user) {
    return redirect;
  }

  if (to.meta.requiresEmailVerification) {
    try {
      const emailVerified = await authStore.confirmAccount();
      if (!emailVerified) return redirect;
    } catch (error) {
      showAppMessage(error.message, "error");
      return redirect;
    }
  }

  return true;
});

export default router;
