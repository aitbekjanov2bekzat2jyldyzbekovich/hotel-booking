<script setup>
const sectionContent = {
  id: "location-map",
  eyebrow: "Удобное расположение",
  title: "Откройте для себя город Нарын",
  description:
    "Расположение города Нарын в Кыргызстане. Изучите окрестности и постройте маршрут на интерактивной карте.",
  areaLabel: "Нарын, Кыргызстан",
  mapTitle: "Карта города Нарын, Кыргызстан",
  mapUrl:
    "https://maps.google.com/maps?q=Naryn%2C%20Kyrgyzstan&z=13&output=embed",
  openMapUrl:
    "https://www.google.com/maps/dir/?api=1&origin=Bishkek%2C%20Kyrgyzstan&destination=Naryn%2C%20Kyrgyzstan&travelmode=driving",
  arrival: {
    title: "Как добраться",
    description:
      "Можно заказать индивидуальный трансфер до Нарына. Поездка проходит по живописному маршруту через горные перевалы Кыргызстана.",
    routes: [
      { label: "Из Бишкека:", value: "~ 5 ч (315 км)" },
      { label: "Из аэропорта Манас:", value: "~ 5.5 ч (350 км)" },
    ],
    actionLabel: "Построить маршрут в Google Maps",
  },
};
</script>

<template>
  <section
    class="section bg-page"
    :aria-labelledby="`${sectionContent.id}-title`"
  >
    <div class="container">
      <div
        class="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p class="rooms-eyebrow">{{ sectionContent.eyebrow }}</p>
          <h2
            :id="`${sectionContent.id}-title`"
            class="max-w-3xl font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl"
          >
            {{ sectionContent.title }}
          </h2>
          <p class="section-description">
            {{ sectionContent.description }}
          </p>
        </div>

        <span class="badge w-fit shrink-0">
          <svg
            class="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              d="M13 6.7c0 3.4-5 7.3-5 7.3S3 10.1 3 6.7a5 5 0 1 1 10 0Z"
            />
            <circle cx="8" cy="6.5" r="1.6" />
          </svg>
          {{ sectionContent.areaLabel }}
        </span>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <iframe
          class="block h-64 w-full border-0 sm:h-80 lg:h-[420px]"
          :src="sectionContent.mapUrl"
          :title="sectionContent.mapTitle"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
        <div class="bg-blue-50/80 p-5 sm:p-8">
          <h3 class="text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {{ sectionContent.arrival.title }}
          </h3>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            {{ sectionContent.arrival.description }}
          </p>

          <ul class="mt-5 space-y-2 border-t border-blue-100 pt-3">
            <li
              v-for="route in sectionContent.arrival.routes"
              :key="route.label"
              class="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-base"
            >
              <span class="font-semibold text-muted">{{ route.label }}</span>
              <span class="font-semibold text-ink">{{ route.value }}</span>
            </li>
          </ul>

          <a
            class="btn-primary mt-5 min-h-12 w-full px-4 py-3 text-sm sm:text-base"
            :href="sectionContent.openMapUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              class="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 17h14l1-5-2-5H6l-2 5 1 5Z" />
              <path d="M7 17v2m10-2v2M4 12h16M7 15h.01M17 15h.01" />
            </svg>
            {{ sectionContent.arrival.actionLabel }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
