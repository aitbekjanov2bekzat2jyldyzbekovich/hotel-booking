<script setup>
import { computed, reactive } from "vue";

const emit = defineEmits(["search"]);

const content = {
  sectionLabel: "Поиск номера",
  checkIn: "Дата заезда",
  checkOut: "Дата выезда",
  guests: "Гости и комнаты",
  category: "Категория номера",
  search: "Найти номера",
};

const guestOptions = [
  { value: "2-0-1", label: "2 взрослых", description: "Без детей, 1 номер" },
  { value: "1-0-1", label: "1 взрослый", description: "Без детей, 1 номер" },
  { value: "2-1-1", label: "2 взрослых, 1 ребенок", description: "1 номер" },
  { value: "2-2-1", label: "2 взрослых, 2 ребенка", description: "1 номер" },
];

const categoryOptions = [
  {
    value: "all",
    label: "Все категории",
    description: "Стандарт, люкс, вилла",
  },
  { value: "standard", label: "Стандарт", description: "Комфортный отдых" },
  { value: "luxury", label: "Люкс", description: "Просторные номера" },
  { value: "villa", label: "Вилла", description: "Отдельное размещение" },
];

const benefits = [
  {
    icon: "shield",
    title: "Гарантия цены",
    description: "Без наценок и комиссий",
  },
  {
    icon: "refund",
    title: "Отмена за 24 ч",
    description: "Полный возврат средств",
  },
  {
    icon: "payment",
    title: "Без предоплаты",
    description: "Оплата при заселении",
  },
  {
    icon: "support",
    title: "WhatsApp 24/7",
    description: "Мы поможем ответить на вопросы",
  },
];

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return toDateInputValue(date);
}

const today = toDateInputValue(new Date());
const booking = reactive({
  checkIn: today,
  checkOut: addDays(today, 1),
  guests: guestOptions[0].value,
  category: categoryOptions[0].value,
});

const checkOutMin = computed(() => addDays(booking.checkIn, 1));
const selectedGuests = computed(() =>
  guestOptions.find((option) => option.value === booking.guests),
);
const selectedCategory = computed(() =>
  categoryOptions.find((option) => option.value === booking.category),
);

function ensureCheckoutAfterCheckIn() {
  if (booking.checkOut <= booking.checkIn) {
    booking.checkOut = checkOutMin.value;
  }
}

function submitSearch() {
  emit("search", { ...booking });
}
</script>

<template>
  <div class="bg-[#ffff]">
    <section
      class="container relative z-20 -mt-12 pb-8 sm:-mt-16 sm:pb-10 lg:-mt-24"
      :aria-label="content.sectionLabel"
    >
      <div class="card overflow-hidden p-3 !shadow-[0_14px_18px_-8px_rgba(15,23,42,0.25)] sm:p-4 md:p-5">
        <form
          class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end lg:gap-3"
          @submit.prevent="submitSearch"
        >
          <label class="min-w-0">
            <span
              class="form-label !mb-1 !text-[10px] uppercase tracking-wide text-muted"
            >
              {{ content.checkIn }}
            </span>
            <input
              v-model="booking.checkIn"
              class="input-field mt-1 min-h-11 rounded-lg"
              type="date"
              :min="today"
              @change="ensureCheckoutAfterCheckIn"
              required
            />
          </label>

          <label class="min-w-0">
            <span
              class="form-label !mb-1 !text-[10px] uppercase tracking-wide text-muted"
            >
              {{ content.checkOut }}
            </span>
            <input
              v-model="booking.checkOut"
              class="input-field mt-1 min-h-11 rounded-lg"
              type="date"
              :min="checkOutMin"
              required
            />
          </label>

          <label class="min-w-0">
            <span
              class="form-label !mb-1 !text-[10px] uppercase tracking-wide text-muted"
            >
              {{ content.guests }}
            </span>
            <select
              v-model="booking.guests"
              class="input-field mt-1 min-h-11 rounded-lg"
            >
              <option
                v-for="option in guestOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <span class="mt-1 block text-[10px] leading-4 text-muted">
              {{ selectedGuests.description }}
            </span>
          </label>

          <label class="min-w-0">
            <span
              class="form-label !mb-1 !text-[10px] uppercase tracking-wide text-muted"
            >
              {{ content.category }}
            </span>
            <select
              v-model="booking.category"
              class="input-field mt-1 min-h-11 rounded-lg"
            >
              <option
                v-for="option in categoryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <span class="mt-1 block text-[10px] leading-4 text-muted">
              {{ selectedCategory.description }}
            </span>
          </label>

          <button
            type="submit"
            class="btn-primary min-h-11 w-full rounded-lg px-4 sm:col-span-2 lg:col-span-1"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path stroke-linecap="round" d="m16 16 4 4" />
            </svg>
            {{ content.search }}
          </button>
        </form>

        <ul
          class="mt-4 grid grid-cols-1 gap-2 rounded-lg bg-page p-3 sm:grid-cols-2 sm:gap-3 md:p-4 lg:grid-cols-4"
        >
          <li
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex min-w-0 items-center gap-2.5"
          >
            <span class="icon-box h-9 w-9 rounded-full">
              <svg
                v-if="benefit.icon === 'shield'"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9 12 2 2 4-4"
                />
              </svg>
              <svg
                v-else-if="benefit.icon === 'refund'"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20 11a8 8 0 0 0-14-5L4 8"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v4h4m-4 5a8 8 0 0 0 14 5l2-2"
                />
                <path stroke-linecap="round" d="M20 20v-4h-4" />
              </svg>
              <svg
                v-else-if="benefit.icon === 'payment'"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path stroke-linecap="round" d="M3 10h18m-14 5h4" />
              </svg>
              <svg
                v-else
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 13v-2a8 8 0 0 1 16 0v2"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 13h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4Zm-3 6a5 5 0 0 1-5 3"
                />
              </svg>
            </span>
            <span class="min-w-0">
              <span class="block truncate text-[11px] font-semibold text-ink">
                {{ benefit.title }}
              </span>
              <span class="block text-[10px] leading-4 text-muted">
                {{ benefit.description }}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
