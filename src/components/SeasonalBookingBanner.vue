<script setup>
const bannerData = {
  id: "seasonal-booking",
  eyebrow: "Сезонное бронирование открыто",
  title: "Готовы насладиться красотой Тянь-Шаня?",
  description:
    "Забронируйте номер заранее, чтобы гарантировать лучшие категории с видом на озеро по специальному тарифу раннего бронирования.",
  actions: [
    {
      id: "whatsapp",
      label: "Написать в WhatsApp",
      href: "https://wa.me/?text=Здравствуйте%2C%20хочу%20узнать%20о%20раннем%20бронировании%20в%20Нарыне",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "dates",
      label: "Выбрать даты",
      href: "#booking",
    },
  ],
};
</script>

<template>
  <section class="section" :aria-labelledby="`${bannerData.id}-title`">
    <div class="container">
      <div
        class="relative isolate overflow-hidden rounded-xl bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-5 py-6 sm:px-7 sm:py-8 lg:px-10"
      >
        <div
          class="pointer-events-none absolute inset-y-3 left-[23%] hidden border-l border-dotted border-blue-300/30 sm:block"
          aria-hidden="true"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-3 right-[22%] hidden border-l border-dotted border-blue-300/30 lg:block"
          aria-hidden="true"
        ></div>

        <div
          class="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
        >
          <div class="max-w-2xl">
            <p
              class="mb-2 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-blue-100 sm:text-[10px]"
            >
              {{ bannerData.eyebrow }}
            </p>
            <h2
              :id="`${bannerData.id}-title`"
              class="font-serif text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl"
            >
              {{ bannerData.title }}
            </h2>
            <p class="mt-2 max-w-xl text-xs leading-5 text-blue-100 sm:text-sm sm:leading-6">
              {{ bannerData.description }}
            </p>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <a
              v-for="action in bannerData.actions"
              :key="action.id"
              class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
              :class="
                action.id === 'whatsapp'
                  ? 'bg-white text-blue-950 hover:bg-blue-50 focus-visible:outline-white'
                  : 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-200'
              "
              :href="action.href"
              :target="action.target"
              :rel="action.rel"
            >
              <svg
                v-if="action.id === 'whatsapp'"
                class="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.2-3.5A8.3 8.3 0 1 1 20 11.5Z" />
                <path d="M9 8.5c.3 2 2.5 4.2 4.5 4.5l1-1 2 1c-.2 1.6-1.4 2.5-2.8 2.3-3.2-.5-6-3.3-6.5-6.5C7 7.4 8 6.2 9.5 6l1 2-1.5.5Z" />
              </svg>
              <svg
                v-else
                class="h-4 w-4 shrink-0"
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
              {{ action.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
