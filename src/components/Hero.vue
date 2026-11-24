<script setup>
import heroImage from "../assets/hero.webp";

const title = "Найдите идеальный номер для вашего отдыха в Кыргызстане";
const subtitle =
  "Насладитесь спокойным отдыхом у озера Сон-куль среди величественных гор и природных пейзажей Кыргызстана.";
const topTitle = "Горный курорт премиум-класса";
const location = "Нарын, Кыргызстан";
</script>

<template>
  <section
    class="relative isolate flex min-h-screen min-h-[100svh] items-center overflow-hidden"
    aria-labelledby="hero-title"
  >
    <img
      :src="heroImage"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
      class="absolute inset-0 h-full w-full object-cover object-[center_40%]"
    />

    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/15"
      aria-hidden="true"
    ></div>
    <div
      class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent"
      aria-hidden="true"
    ></div>
    <div
      class="absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-white via-white/70 to-transparent sm:h-56"
      aria-hidden="true"
    ></div>

    <div class="container relative z-10 py-20 sm:py-24">
      <div class="max-w-4xl">
        <p
          class="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm sm:mb-5 sm:px-3.5 sm:py-2 sm:text-sm"
        >
          <span class="text-blue-300" aria-hidden="true">✦</span>
          <span class="ml-1.5">{{ topTitle }}</span>
          <span class="mx-1.5 text-white/70 sm:mx-2">•</span>
          {{ location }}
        </p>

        <h1
          id="hero-title"
          class="max-w-[840px] font-serif text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[40px] lg:text-[44px]"
        >
          {{ title }}
        </h1>

        <p
          class="mt-3 max-w-xl text-xs leading-5 text-white/90 sm:mt-4 sm:text-sm sm:leading-6 md:text-base md:leading-7"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
