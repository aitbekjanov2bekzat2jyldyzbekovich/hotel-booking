<script setup>
const footerContent = {
  brand: "Intourist",
  brandSubtitle: "KYRGYZSTAN NARYN",
  description:
    "Ваш уютный отдых и яркие впечатления в сердце горного Кыргызстана.",
  navigationTitle: "Навигация",
  navigationAriaLabel: "Навигация в подвале",
  navigation: [
    { label: "Главная", href: "/" },
    { label: "Бронирование", href: "#booking" },
    { label: "Номера", href: "#rooms-title" },
    { label: "Отзывы", href: "#reviews-title" },
    { label: "Расположение", href: "#location-map-title" },
  ],
  contactTitle: "Контакты",
  phoneLabel: "+996 (312) 90-00-00",
  phoneHref: "tel:+996312900000",
  address: "Нарын, Кыргызстан",
  bookingTitle: "Планируйте отдых",
  bookingDescription:
    "Выберите даты поездки и найдите номер для вашего отдыха.",
  bookingLabel: "Выбрать даты",
  copyright: `© ${new Date().getFullYear()} Intourist. Все права защищены.`,
};
</script>

<template>
  <footer class="bg-slate-950 text-white">
    <div class="container py-10 sm:py-12 lg:py-14">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <a href="/" class="inline-flex items-center gap-3" :aria-label="footerContent.brand">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200"
              aria-hidden="true"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m3 19 6-9 4 5 3-7 5 11H3Z" />
                <path d="m8 19 4-5 4 5" />
              </svg>
            </span>
            <span class="flex flex-col leading-none">
              <span class="text-lg font-bold tracking-tight">{{ footerContent.brand }}</span>
              <span class="mt-1.5 text-[9px] font-semibold tracking-[0.18em] text-blue-200">
                {{ footerContent.brandSubtitle }}
              </span>
            </span>
          </a>
          <p class="mt-4 max-w-xs text-sm leading-6 text-slate-300">
            {{ footerContent.description }}
          </p>
        </div>

        <nav :aria-label="footerContent.navigationAriaLabel">
          <h2 class="text-sm font-semibold text-white">
            {{ footerContent.navigationTitle }}
          </h2>
          <ul class="mt-4 space-y-3">
            <li v-for="item in footerContent.navigation" :key="item.href">
              <a
                :href="item.href"
                class="text-sm text-slate-300 transition-colors hover:text-white"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="text-sm font-semibold text-white">
            {{ footerContent.contactTitle }}
          </h2>
          <a
            :href="footerContent.phoneHref"
            class="mt-4 inline-flex min-h-10 items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <svg
              class="h-4 w-4 shrink-0 text-blue-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M7 3h3l2 5-2 1.5a14 14 0 0 0 4.5 4.5L16 12l5 2v3c0 2-1.5 3.5-3.5 3.5C10 20.5 3.5 14 3.5 6.5 3.5 4.5 5 3 7 3Z" />
            </svg>
            {{ footerContent.phoneLabel }}
          </a>
          <p class="mt-2 flex items-center gap-2 text-sm text-slate-300">
            <svg
              class="h-4 w-4 shrink-0 text-blue-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {{ footerContent.address }}
          </p>
        </div>

        <div class="sm:col-span-2 lg:col-span-1">
          <h2 class="text-sm font-semibold text-white">
            {{ footerContent.bookingTitle }}
          </h2>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            {{ footerContent.bookingDescription }}
          </p>
          <a
            href="#booking"
            class="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {{ footerContent.bookingLabel }}
          </a>
        </div>
      </div>

      <div
        class="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-400 sm:mt-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>{{ footerContent.copyright }}</p>
        <p>{{ footerContent.address }}</p>
      </div>
    </div>
  </footer>
</template>
