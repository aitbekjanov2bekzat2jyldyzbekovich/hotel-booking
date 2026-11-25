<script setup>
const sectionContent = {
  id: "reviews",
  eyebrow: "Репутация в доверии",
  title: "Почему гости возвращаются к нам из года в год",
  description:
    "Безупречная чистота, аутентичное гостеприимство и поддержка на трех языках. Наша цель — сделать ваше путешествие к Кыргызстану незабываемым.",
  rating: {
    score: "4.9",
    stars: "★★★★★",
    starsLabel: "5 из 5 звезд",
    caption: "Превосходный рейтинг",
    reviewCountText: "Более 840 проверенных отзывов",
    reviewSources: "на платформах Google Maps, TripAdvisor и Booking.",
    breakdown: [
      { label: "Чистота и комфорт", value: "5.0", width: "100%" },
      { label: "Локация и вид", value: "4.9", width: "98%" },
      { label: "Сервис и персонал", value: "4.9", width: "98%" },
    ],
  },
  reviews: [
    {
      id: "lucas",
      date: "Май 2024",
      quote:
        "The staff speaks great English and arranged a comfortable transfer from Manas Airport right to our suite. The thermal pools are magnificent after hiking in Grigorievskoe Gorge. Ultra-fast Wi-Fi — allowed me to work remotely effortlessly.",
      initials: "LW",
      name: "Lucas Weber",
      details: "Мюнхен, Германия · Семейный люкс",
    },
    {
      id: "andrey",
      date: "Июль 2024",
      quote:
        "Бронировали напрямую через сайт без предоплаты. Все подтвердили заранее минут за 5. В Ат-Баши до гостиницы около 28 км. Номер просторный, персонал очень внимательный, тишина, чистейший воздух и великолепный сон.",
      initials: "АС",
      name: "Айсулуу Касымова",
      details: "Бишкек, Кыргызстан · Стандарт",
    },
    {
      id: "family",
      date: "Август 2024",
      quote:
        "Отличная сауна и зона отдыха. На ресепшене помогли с экскурсиями к Сказкам и конной прогулкой. Сервис на уровне хороших пятизвездочных отелей. Огромная. Очень рекомендую семьям с детьми!",
      initials: "ДМ",
      name: "Дмитрий Мельников",
      details: "Алматы, Казахстан · Семейный номер",
    },
    {
      id: "anna",
      date: "Июнь 2024",
      quote:
        "Один из лучших отелей, в которых мы останавливались в Центральной Азии. Вид из делюкса прямо на горы и чистейшее озеро. Завтраки с домашним каймаком и горячими лепешками — выше всяких похвал. Обязательно вернемся осенью!",
      initials: "АН",
      name: "Андрей и Наталья Смирновы",
      details: "Москва, Россия · Делюкс",
    },
  ],
};
</script>

<template>
  <section
    class="section bg-white"
    :aria-labelledby="`${sectionContent.id}-title`"
  >
    <div class="container">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:gap-10">
        <div class="flex flex-col">
          <p class="rooms-eyebrow">{{ sectionContent.eyebrow }}</p>
          <h2
            :id="`${sectionContent.id}-title`"
            class="max-w-md font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl"
          >
            {{ sectionContent.title }}
          </h2>
          <p class="mt-3 max-w-md text-sm leading-6 text-muted">
            {{ sectionContent.description }}
          </p>

          <div class="mt-5 rounded-2xl bg-blue-50/80 p-4 sm:p-5">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span class="text-4xl font-bold leading-none text-brand sm:text-5xl">
                {{ sectionContent.rating.score }}
              </span>
              <div>
                <div
                  class="text-lg tracking-[0.12em] text-amber-500"
                  :aria-label="sectionContent.rating.starsLabel"
                >
                  {{ sectionContent.rating.stars }}
                </div>
                <p class="text-[11px] font-semibold text-ink">
                  {{ sectionContent.rating.caption }}
                </p>
              </div>
            </div>
            <p class="mt-3 text-xs leading-5 text-muted">
              <strong class="font-semibold text-ink">
                {{ sectionContent.rating.reviewCountText }}
              </strong>
              {{ sectionContent.rating.reviewSources }}
            </p>

            <ul class="mt-3 space-y-2.5">
              <li
                v-for="rating in sectionContent.rating.breakdown"
                :key="rating.label"
              >
                <div class="mb-1 flex justify-between gap-3 text-[10px] text-muted">
                  <span>{{ rating.label }}</span>
                  <span class="font-semibold text-ink">{{ rating.value }}</span>
                </div>
                <div class="h-1 rounded-full bg-white">
                  <div
                    class="h-1 rounded-full bg-brand"
                    :style="{ width: rating.width }"
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <article
            v-for="review in sectionContent.reviews"
            :key="review.id"
            class="flex min-w-0 flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div class="flex items-center justify-between gap-3">
              <span
                class="text-sm tracking-[0.12em] text-amber-500"
                :aria-label="sectionContent.rating.starsLabel"
              >
                {{ sectionContent.rating.stars }}
              </span>
              <time class="shrink-0 text-[10px] text-muted">{{ review.date }}</time>
            </div>
            <p class="mt-3 flex-1 text-xs leading-5 text-ink">
              «{{ review.quote }}»
            </p>
            <div class="mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-3">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-brand"
                aria-hidden="true"
              >
                {{ review.initials }}
              </span>
              <div class="min-w-0">
                <p class="truncate text-[11px] font-semibold text-ink">
                  {{ review.name }}
                </p>
                <p class="truncate text-[9px] text-muted">{{ review.details }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
