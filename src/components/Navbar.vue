<script setup>
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const menuOpen = ref(false);
const activeLanguage = ref("РУ");
const activeCurrency = ref("KGS");

const languages = ["РУ", "КЫР", "ENG"];
const currencies = ["KGS", "USD"];
const navigation = [
  { label: "Главная", hash: "" },
  { label: "Номера", hash: "#rooms" },
  { label: "О гостинице", hash: "#about" },
  { label: "Локация", hash: "#location" },
  { label: "Контакты", hash: "#contacts" },
];

function isActive(item) {
  return route.path === "/" && route.hash === item.hash;
}

function closeMenu() {
  menuOpen.value = false;
}

watch(
  () => route.fullPath,
  closeMenu,
);
</script>

<template>
  <header
    class="relative z-30 border-b border-slate-100 bg-white"
    @keydown.esc="closeMenu"
  >
    <div class="container flex min-h-[68px] items-center justify-between gap-4 py-3 xl:min-h-[76px]">
      <RouterLink
        to="/"
        class="flex shrink-0 flex-col leading-none"
        aria-label="HotelBooking — главная"
        @click="closeMenu"
      >
        <span class="text-[18px] font-bold tracking-tight text-brand sm:text-xl">
         Intourist
        </span>
        <span class="mt-1 text-[9px] font-semibold tracking-[0.2em] text-muted">
          KYRGYZSTAN NARYN
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-4 xl:flex 2xl:gap-6" aria-label="Основная навигация">
        <RouterLink
          v-for="item in navigation"
          :key="item.label"
          :to="{ path: '/', hash: item.hash }"
          class="whitespace-nowrap py-2 text-[13px] font-medium transition-colors"
          :class="isActive(item) ? 'text-brand' : 'text-slate-600 hover:text-brand'"
          :aria-current="isActive(item) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 xl:flex">
        <div class="flex items-center gap-0.5" role="group" aria-label="Язык">
          <button
            v-for="language in languages"
            :key="language"
            type="button"
            class="rounded-md px-1.5 py-1 text-[10px] font-semibold transition-colors"
            :class="activeLanguage === language ? 'bg-page text-brand' : 'text-muted hover:text-ink'"
            :aria-pressed="activeLanguage === language"
            @click="activeLanguage = language"
          >
            {{ language }}
          </button>
        </div>

        <span class="h-5 w-px bg-slate-200" aria-hidden="true"></span>

        <div class="flex items-center gap-0.5" role="group" aria-label="Валюта">
          <button
            v-for="currency in currencies"
            :key="currency"
            type="button"
            class="rounded-md px-1.5 py-1 text-[10px] font-semibold transition-colors"
            :class="activeCurrency === currency ? 'bg-page text-brand' : 'text-muted hover:text-ink'"
            :aria-pressed="activeCurrency === currency"
            @click="activeCurrency = currency"
          >
            {{ currency }}
          </button>
        </div>

        <a
          href="tel:+996312900000"
          class="flex items-center gap-2 whitespace-nowrap text-[12px] font-semibold text-ink transition-colors hover:text-brand"
          aria-label="Позвонить в гостиницу: +996 (312) 90-00-00"
        >
          <svg
            class="h-4 w-4 text-brand"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5.5A2.5 2.5 0 0 1 5.5 3h2.1a1 1 0 0 1 .97.76l1.02 4.1a1 1 0 0 1-.5 1.1l-1.55.88a11 11 0 0 0 4.62 4.62l.88-1.55a1 1 0 0 1 1.1-.5l4.1 1.02a1 1 0 0 1 .76.97v2.1a2.5 2.5 0 0 1-2.5 2.5h-.5C9.1 19 5 14.9 5 8v-.5Z"
            />
          </svg>
          +996 (312) 90-00-00
        </a>

        <RouterLink
          :to="{ path: '/', hash: '#login' }"
          class="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:border-brand/30 hover:text-brand"
        >
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-page text-brand">
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.25" />
              <path stroke-linecap="round" d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
          </span>
          Войти
        </RouterLink>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-ink transition-colors hover:bg-page xl:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
        @click="menuOpen = !menuOpen"
      >
        <svg
          v-if="!menuOpen"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          <path stroke-linecap="round" d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </div>

    <div
      v-if="menuOpen"
      id="mobile-navigation"
      class="absolute inset-x-0 top-full border-t border-slate-100 bg-white shadow-sm xl:hidden"
    >
      <div class="container space-y-4 py-4">
        <nav class="grid gap-1" aria-label="Мобильная навигация">
          <RouterLink
            v-for="item in navigation"
            :key="item.label"
            :to="{ path: '/', hash: item.hash }"
            class="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            :class="isActive(item) ? 'bg-page text-brand' : 'text-slate-600 hover:bg-page hover:text-brand'"
            :aria-current="isActive(item) ? 'page' : undefined"
            @click="closeMenu"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div class="flex items-center gap-1" role="group" aria-label="Язык">
            <button
              v-for="language in languages"
              :key="language"
              type="button"
              class="rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors"
              :class="activeLanguage === language ? 'bg-page text-brand' : 'text-muted hover:text-ink'"
              :aria-pressed="activeLanguage === language"
              @click="activeLanguage = language"
            >
              {{ language }}
            </button>
          </div>

          <div class="flex items-center gap-1" role="group" aria-label="Валюта">
            <button
              v-for="currency in currencies"
              :key="currency"
              type="button"
              class="rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors"
              :class="activeCurrency === currency ? 'bg-page text-brand' : 'text-muted hover:text-ink'"
              :aria-pressed="activeCurrency === currency"
              @click="activeCurrency = currency"
            >
              {{ currency }}
            </button>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <a
            href="tel:+996312900000"
            class="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
          >
            <svg
              class="h-4 w-4 text-brand"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5.5A2.5 2.5 0 0 1 5.5 3h2.1a1 1 0 0 1 .97.76l1.02 4.1a1 1 0 0 1-.5 1.1l-1.55.88a11 11 0 0 0 4.62 4.62l.88-1.55a1 1 0 0 1 1.1-.5l4.1 1.02a1 1 0 0 1 .76.97v2.1a2.5 2.5 0 0 1-2.5 2.5h-.5C9.1 19 5 14.9 5 8v-.5Z"
              />
            </svg>
            +996 (312) 90-00-00
          </a>

          <RouterLink
            :to="{ path: '/', hash: '#login' }"
            class="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            @click="closeMenu"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.25" />
              <path stroke-linecap="round" d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
            Войти
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
