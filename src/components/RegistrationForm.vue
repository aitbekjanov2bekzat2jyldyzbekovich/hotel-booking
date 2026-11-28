<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../authStore/index.js";
import { showAppMessage } from "../utils/appMessage.js";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isLogin = ref(Boolean(route.query.redirect));
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const passwordConfirmationInput = ref(null);

const form = reactive({
  fullName: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  acceptTerms: false,
  receiveOffers: false,
});

const passwordChecks = computed(() => ({
  length: form.password.length >= 8,
  uppercase: /[A-ZА-ЯЁ]/.test(form.password),
  number: /\d/.test(form.password),
}));

const passwordStrength = computed(() => {
  const score = Object.values(passwordChecks.value).filter(Boolean).length;
  return {
    score,
    label: ["", "Слабый", "Средний", "Надежный"][score],
  };
});

function validatePasswordConfirmation() {
  if (!passwordConfirmationInput.value) return;

  const mismatch =
    form.passwordConfirmation && form.password !== form.passwordConfirmation;
  passwordConfirmationInput.value.setCustomValidity(
    mismatch ? "Пароли не совпадают." : "",
  );
}

watch(
  [() => form.password, () => form.passwordConfirmation],
  validatePasswordConfirmation,
  { flush: "sync" },
);

async function setMode(login) {
  isLogin.value = login;
  await nextTick();

  if (login) {
    AOS.refreshHard();
  } else {
    validatePasswordConfirmation();
  }
}

async function submitForm() {
  try {
    if (isLogin.value) {
      await authStore.signin({
        email: form.email,
        password: form.password,
      });
      showAppMessage("Аккаунт подтвержден. Вы вошли.", "success");
      await navigateToProfile();
      return;
    }

    await authStore.signup({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    });
    showAppMessage(
      "Мы отправили письмо для подтверждения аккаунта. Подтвердите адрес, затем нажмите «Я подтвердил аккаунт».",
      "success",
    );
  } catch (error) {
    showAppMessage(error.message, "error");
  }
}

async function signInWithGoogle() {
  try {
    await authStore.signinWithGoogle();
    showAppMessage("Вы вошли через Google.", "success");
    await navigateToProfile();
  } catch (error) {
    showAppMessage(error.message, "error");
  }
}

async function confirmAccount() {
  try {
    const confirmed = await authStore.confirmAccount();
    showAppMessage(
      confirmed
        ? "Я подтвердил аккаунт — адрес электронной почты подтвержден."
        : "Аккаунт еще не подтвержден. Сначала перейдите по ссылке из письма.",
      confirmed ? "success" : "warning",
    );
    if (confirmed) {
      await navigateToProfile();
    }
  } catch (error) {
    showAppMessage(error.message, "error");
  }
}

async function navigateToProfile() {
  const redirect = route.query.redirect;
  await router.replace(
    typeof redirect === "string" && redirect.startsWith("/")
      ? redirect
      : { name: "profile" },
  );
}

async function resendVerificationEmail() {
  try {
    await authStore.resendVerificationEmail();
    showAppMessage("Письмо для подтверждения отправлено повторно.", "success");
  } catch (error) {
    showAppMessage(error.message, "error");
  }
}
</script>

<template>
  <section class="w-full py-6 sm:py-8">
    <div class="container">
      <div
        :data-aos="'zoom-in'"
        class="mx-auto max-w-[610px] rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:p-7"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div
            class="grid grid-cols-2 rounded-xl bg-blue-50 p-1 sm:w-[min(100%,356px)]"
            role="group"
            aria-label="Режим авторизации"
          >
            <button
              type="button"
              class="min-h-10 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              :class="
                !isLogin
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-slate-600 hover:text-brand'
              "
              :aria-pressed="!isLogin"
              @click="setMode(false)"
            >
              Регистрация
            </button>
            <button
              type="button"
              class="min-h-10 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              :class="
                isLogin
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-slate-600 hover:text-brand'
              "
              :aria-pressed="isLogin"
              @click="setMode(true)"
            >
              Вход в аккаунт
            </button>
          </div>

          <p
            class="inline-flex items-center gap-2 self-end text-xs text-muted sm:self-auto"
          >
            <svg
              class="h-4 w-4 text-brand"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
            </svg>
            256-bit SSL
          </p>
        </div>

        <div class="mt-8 sm:mt-10">
          <h1
            class="font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[26px]"
          >
            {{ isLogin ? "Вход в аккаунт" : "Создать учетную запись" }}
          </h1>
          <p class="mt-2 text-sm leading-6 text-muted">
            {{
              isLogin
                ? "Войдите, чтобы продолжить планирование поездки."
                : "Заполните данные или воспользуйтесь быстрой авторизацией через партнерские сервисы."
            }}
          </p>
        </div>

        <div
          v-if="authStore.user && !authStore.emailVerified"
          class="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
          role="status"
        >
          <p>Подтвердите адрес электронной почты, чтобы войти в аккаунт.</p>
          <div class="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              class="font-semibold underline underline-offset-2"
              :disabled="authStore.loading"
              @click="confirmAccount"
            >
              Я подтвердил аккаунт
            </button>
            <button
              type="button"
              class="font-semibold underline underline-offset-2"
              :disabled="authStore.loading"
              @click="resendVerificationEmail"
            >
              Отправить письмо повторно
            </button>
          </div>
        </div>

        <button
          type="button"
          class="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-60"
          :disabled="authStore.loading"
          @click="signInWithGoogle"
        >
          <svg class="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
            />
            <path
              fill="#34A853"
              d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
            />
            <path
              fill="#FBBC05"
              d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
            />
            <path
              fill="#EA4335"
              d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
            />
          </svg>
          {{ authStore.loading ? "Вход через Google..." : "Продолжить с Google" }}
        </button>

        <div class="my-6 flex items-center gap-3">
          <span class="h-px flex-1 bg-slate-200" aria-hidden="true"></span>
          <span
            class="text-[10px] font-medium uppercase tracking-wide text-muted"
          >
            или через email / телефон
          </span>
          <span class="h-px flex-1 bg-slate-200" aria-hidden="true"></span>
        </div>

        <form
          :key="isLogin ? 'login' : 'register'"
          class="grid gap-x-4 gap-y-4 sm:grid-cols-2"
          @submit.prevent="submitForm"
        >
          <div v-if="!isLogin" class="sm:col-span-2">
            <label for="registration-name" class="auth-label">
              Имя и фамилия <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="3" />
                <path d="M5 20a7 7 0 0 1 14 0" />
              </svg>
              <input
                id="registration-name"
                v-model.trim="form.fullName"
                class="auth-input auth-input-icon"
                type="text"
                name="fullName"
                autocomplete="name"
                placeholder="Ваше имя и фамилия"
                required
              />
            </div>
          </div>

          <div v-if="!isLogin">
            <label for="registration-phone" class="auth-label">
              Номер телефона <span class="text-red-600">*</span>
            </label>
            <div
              class="flex min-h-11 items-center rounded-lg border border-transparent bg-blue-50 focus-within:border-brand focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/20"
            >
              <span
                class="shrink-0 border-r border-blue-100 px-3 text-xs font-semibold text-ink"
              >
                KG&nbsp; +996
              </span>
              <input
                id="registration-phone"
                v-model.trim="form.phone"
                class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-muted"
                type="tel"
                name="phone"
                autocomplete="tel-national"
                inputmode="tel"
                placeholder="(555) 00-00-00"
                required
              />
            </div>
          </div>

          <div :class="isLogin ? 'sm:col-span-2' : undefined">
            <label for="registration-email" class="auth-label">
              Электронная почта <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <input
                id="registration-email"
                v-model.trim="form.email"
                class="auth-input auth-input-icon"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="guest@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label for="registration-password" class="auth-label">
              Пароль <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <input
                id="registration-password"
                v-model="form.password"
                class="auth-input auth-input-icon-action"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :autocomplete="isLogin ? 'current-password' : 'new-password'"
                placeholder="Введите пароль"
                :minlength="isLogin ? undefined : 8"
                :pattern="
                  isLogin ? undefined : '(?=.*[A-ZА-ЯЁ])(?=.*[0-9]).{8,}'
                "
                title="Пароль должен содержать не менее 8 символов, заглавную букву и цифру."
                required
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
                <svg
                  v-else
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="m3 3 18 18M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 6 10 6c1 0 1.9-.1 2.7-.4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div v-if="!isLogin">
            <label for="registration-password-confirmation" class="auth-label">
              Повторите пароль <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 1 0 2.6-6.3L3 8" />
                <path d="M3 3v5h5m4-1v5l3 2" />
              </svg>
              <input
                id="registration-password-confirmation"
                ref="passwordConfirmationInput"
                v-model="form.passwordConfirmation"
                class="auth-input auth-input-icon-action"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                name="passwordConfirmation"
                autocomplete="new-password"
                placeholder="Повторите пароль"
                required
                @input="validatePasswordConfirmation"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                :aria-label="
                  showPasswordConfirmation
                    ? 'Скрыть повтор пароля'
                    : 'Показать повтор пароля'
                "
                @click="showPasswordConfirmation = !showPasswordConfirmation"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-if="!isLogin"
            class="rounded-lg bg-blue-50 px-3 py-2.5 sm:col-span-2"
          >
            <div class="flex items-center justify-between gap-3 text-xs">
              <p class="inline-flex items-center gap-2 text-ink">
                <svg
                  class="h-4 w-4 shrink-0 text-brand"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m12 3 8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Минимум 8 символов, заглавная буква и цифра
              </p>
              <span class="shrink-0 text-muted">
                {{ passwordStrength.label || "Надежность" }}
              </span>
            </div>
            <div
              class="mt-2 grid grid-cols-3 gap-1"
              role="meter"
              aria-label="Надежность пароля"
              :aria-valuenow="passwordStrength.score"
              aria-valuemin="0"
              aria-valuemax="3"
            >
              <span
                v-for="level in 3"
                :key="level"
                class="h-1 rounded-full transition-colors"
                :class="
                  level <= passwordStrength.score ? 'bg-brand' : 'bg-blue-100'
                "
              ></span>
            </div>
          </div>

          <div v-if="!isLogin" class="space-y-3 sm:col-span-2">
            <label
              class="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-ink"
            >
              <input
                v-model="form.acceptTerms"
                class="mt-1 h-4 w-4 shrink-0 accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                type="checkbox"
                name="acceptTerms"
                required
              />
              <span>
                Согласен с
                <strong
                  >правилами бронирования и политикой конфиденциальности</strong
                >
                Hotel Booking Kyrgyzstan
              </span>
            </label>
            <label
              class="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-ink"
            >
              <input
                v-model="form.receiveOffers"
                class="mt-1 h-4 w-4 shrink-0 accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                type="checkbox"
                name="receiveOffers"
              />
              <span>
                Получать закрытые спецпредложения, промокоды и сезонные скидки
                на почту
              </span>
            </label>
          </div>

          <button
            type="submit"
            class="auth-submit sm:col-span-2"
            :disabled="authStore.loading"
          >
            {{
              authStore.loading
                ? "Подождите..."
                : isLogin
                  ? "Войти"
                  : "Зарегистрироваться и продолжить"
            }}
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>

          <p
            v-if="isLogin"
            class="text-center text-sm text-muted sm:col-span-2"
          >
            Еще нет аккаунта?
            <button
              type="button"
              class="ml-1 font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              @click="setMode(false)"
            >
              Зарегистрироваться
            </button>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
