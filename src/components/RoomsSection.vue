<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import standardRoomImage from "../assets/room-standard.webp";
import deluxeRoomImage from "../assets/room-deluxe.webp";
import familyRoomImage from "../assets/room-family.webp";

const sectionContent = {
  id: "rooms",
  eyebrow: "Каталог номеров",
  title: "Популярные номера для бронирования",
  description:
    "Оборудованы ортопедическими матрасами, климат-контролем и панорамным остеклением.",
  allRooms: "Все 24 номера",
  rooms: [
    {
      id: "standard",
      image: standardRoomImage,
      imageAlt: "Номер с панорамным видом на горы",
      building: "Корпус A · 2 этаж",
      title: "Стандарт с видом на горы",
      guests: "2 гостя",
      area: "28 м²",
      bed: "1 Double",
      amenities: ["Wi-Fi", "Кондиционер", "Тропический душ"],
      price: "4 200",
    },
    {
      id: "deluxe",
      image: deluxeRoomImage,
      imageAlt: "Номер Делюкс с балконом и видом на озеро",
      building: "Корпус B · 4 этаж",
      title: "Делюкс с балконом и видом на озеро",
      guests: "2–3 гостя",
      area: "38 м²",
      bed: "King-size",
      amenities: ["Терраса-балкон", "Ванна с панорамой", "Кофемашина"],
      price: "6 500",
    },
    {
      id: "family",
      image: familyRoomImage,
      imageAlt: "Семейный полулюкс с отдельной гостиной",
      building: "Вилла-шале · Отдельный вход",
      title: "Семейный полулюкс",
      guests: "4 гостя",
      area: "52 м²",
      bed: "2 спальни",
      amenities: ["Мини-кухня", "Просторная терраса", "Smart TV"],
      price: "8 900",
    },
  ],
};

const swiperBreakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};
</script>

<template>
  <section
    class="rooms-section section bg-page"
    :aria-labelledby="`${sectionContent.id}-title`"
  >
    <div class="container">
      <div class="rooms-heading">
        <div>
          <p class="rooms-eyebrow">{{ sectionContent.eyebrow }}</p>
          <h2 :id="`${sectionContent.id}-title`" class="rooms-title">
            {{ sectionContent.title }}
          </h2>
          <p class="rooms-description">{{ sectionContent.description }}</p>
        </div>
        <a class="rooms-all-link" href="#booking">
          {{ sectionContent.allRooms }}
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <Swiper
        class="rooms-swiper"
        :modules="[Pagination]"
        :slides-per-view="1.08"
        :space-between="14"
        :breakpoints="swiperBreakpoints"
        :pagination="{ clickable: true }"
        :a11y="{ enabled: true }"
      >
        <SwiperSlide v-for="room in sectionContent.rooms" :key="room.id">
          <article class="room-card">
            <div class="room-image-wrap">
              <img class="room-image" :src="room.image" :alt="room.imageAlt" />
              <span class="room-status">
                <span aria-hidden="true"></span>
                Свободен
              </span>
              <span class="room-building">{{ room.building }}</span>
            </div>

            <div class="room-content">
              <h3 class="room-title">{{ room.title }}</h3>

              <ul class="room-specs" aria-label="Характеристики номера">
                <li>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <circle cx="6" cy="5" r="2" />
                    <path d="M2.5 13v-1a3.5 3.5 0 0 1 7 0v1M11 5.5a2 2 0 0 1 0 3.8M12 10a3 3 0 0 1 1.5 2.6v.4" />
                  </svg>
                  {{ room.guests }}
                </li>
                <li>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2 13.5 13.5 2M3 10.5l2 2M5.5 8l2 2M8 5.5l2 2" />
                  </svg>
                  {{ room.area }}
                </li>
                <li>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2 12.5V6m12 6.5V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m0 1.5h12m-9-3V6h3v2" />
                  </svg>
                  {{ room.bed }}
                </li>
              </ul>

              <ul class="room-amenities" aria-label="Удобства">
                <li v-for="amenity in room.amenities" :key="amenity">
                  {{ amenity }}
                </li>
              </ul>

              <div class="room-footer">
                <div>
                  <span class="room-price-caption">Стоимость за 1 ночь</span>
                  <p class="room-price">
                    {{ room.price }} <span>KGS</span>
                  </p>
                </div>
                <a class="room-book-link" href="#booking">
                  Выбрать
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
