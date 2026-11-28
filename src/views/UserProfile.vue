<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../authStore/index.js";
import { showAppMessage } from "../utils/appMessage.js";

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  try {
    await authStore.logout();
    showAppMessage("Вы вышли из аккаунта.", "success");
    await router.replace({ name: "home" });
  } catch (error) {
    showAppMessage(error.message, "error");
  }
}
</script>

<template>
  <main class="min-h-[calc(100svh_-_136px)] bg-page py-10 sm:py-14">
    <section class="container">
      <div class="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <p class="text-sm font-semibold text-brand">Личный кабинет</p>
        <h1 class="mt-2 font-serif text-3xl font-bold text-ink">
          Профиль
        </h1>

        <dl class="mt-8 grid gap-5">
          <div>
            <dt class="text-sm text-muted">Имя</dt>
            <dd class="mt-1 font-medium text-ink">
              {{ authStore.user?.displayName || "Не указано" }}
            </dd>
          </div>
          <div>
            <dt class="text-sm text-muted">Электронная почта</dt>
            <dd class="mt-1 font-medium text-ink">
              {{ authStore.user?.email }}
            </dd>
          </div>
          <div>
            <dt class="text-sm text-muted">Статус аккаунта</dt>
            <dd class="mt-1 font-medium text-emerald-700">
              Электронная почта подтверждена
            </dd>
          </div>
        </dl>

        <button
          type="button"
          class="btn-primary mt-8"
          :disabled="authStore.loading"
          @click="logout"
        >
          {{ authStore.loading ? "Выходим..." : "Выйти из аккаунта" }}
        </button>
      </div>
    </section>
  </main>
</template>
