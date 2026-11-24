<script setup>
const sectionContent = {
  id: "surroundings",
  eyebrow: "Окружение и сервис",
  title: "Отдых в ритме первозданной природы",
  description:
    "Сочетание высокого европейского комфорта и уникальной атмосферы Тянь-Шаньских гор. Все условия созданы для восстановления сил.",
  cards: [
    {
      id: "mountain-view",
      icon: "mountain",
      title: "Панорамный вид на горы",
      description:
        "Все корпуса спроектированы так, чтобы из каждого номера открывался вдохновляющий вид на заснеженные вершины Кунгей Ала-Тоо и бирюзовую гладь озера.",
      link: "Смотреть галерею видовых террас",
      href: "#gallery",
    },
    {
      id: "breakfast",
      icon: "breakfast",
      title: 'Завтрак "шведский стол"',
      description:
        "Включен в стоимость каждого номера. Натуральные горные сыры, свежеиспеченный хлеб, натуральный мед с пасек ущелья Чон-Кемин и горячие авторские блюда.",
      link: "Ознакомиться с ресторанным меню",
      href: "#restaurant",
    },
    {
      id: "spa",
      icon: "spa",
      title: "Spa & Горячие источники",
      description:
        "Собственный термальный комплекс с природной минеральной водой, кедровая финская сауна, хаммам и восстанавливающие массажные программы.",
      link: "Подробнее об оздоровительных зонах",
      href: "#spa",
    },
  ],
};
</script>

<template>
  <section class="section bg-page" :aria-labelledby="`${sectionContent.id}-title`">
    <div class="container">
      <div class="mb-7 grid gap-4 sm:mb-8 md:grid-cols-2 md:items-end md:gap-8">
        <div>
          <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
            {{ sectionContent.eyebrow }}
          </p>
          <h2
            :id="`${sectionContent.id}-title`"
            class="max-w-lg font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl"
          >
            {{ sectionContent.title }}
          </h2>
        </div>

        <p class="mt-3 max-w-lg text-xs leading-5 text-muted sm:text-sm sm:leading-6 md:mt-0 md:justify-self-end">
          {{ sectionContent.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="card in sectionContent.cards"
          :key="card.id"
          class="card flex min-h-[260px] flex-col rounded-xl p-5 transition-shadow hover:shadow-md sm:p-6"
        >
          <span class="icon-box mb-4 h-10 w-10 rounded-lg">
            <svg
              v-if="card.icon === 'mountain'"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m3 18 6-8 4 5 3-4 5 7H3Z" />
              <path d="m14 8 1-2 2 3" />
            </svg>

            <svg
              v-else-if="card.icon === 'breakfast'"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 3v6m3-6v6m-6 0h9M6.5 9v12M16 3v18m0-18c2 2 3 5 3 8h-3" />
            </svg>

            <svg
              v-else
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14v8H5zM3 20h18M8 9c-1-1 1-2 0-3m4 3c-1-1 1-2 0-3m4 3c-1-1 1-2 0-3" />
            </svg>
          </span>

          <h3 class="text-base font-semibold leading-6 text-ink">
            {{ card.title }}
          </h3>
          <p class="mt-2 text-xs leading-[1.65] text-muted sm:text-[13px]">
            {{ card.description }}
          </p>

          <a
            :href="card.href"
            class="mt-auto inline-flex items-center gap-1 pt-5 text-[11px] font-medium text-brand transition-colors hover:text-brand/75"
          >
            {{ card.link }}
            <svg
              class="h-3.5 w-3.5 shrink-0"
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
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
