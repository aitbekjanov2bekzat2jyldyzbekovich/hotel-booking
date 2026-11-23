<script setup>
import heroImage from "../assets/issyk-kul-hero.jpg";
</script>

<template>
  <section
    class="relative isolate flex min-h-[480px] items-center overflow-hidden sm:min-h-[520px] lg:min-h-[560px]"
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

    <div class="container relative z-10 py-16 sm:py-20 lg:py-24">
      <div class="max-w-4xl">
        <p
          class="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm sm:mb-6 sm:text-sm"
        >
          Горный курорт премиум-класса <span class="mx-2 text-white/70">•</span> Иссык-Куль
        </p>

        <h1
          id="hero-title"
          class="max-w-[840px] font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[44px]"
        >
          Найдите идеальный номер для вашего отдыха в Кыргызстане
        </h1>

        <p class="mt-5 max-w-xl text-sm leading-6 text-white/85 sm:mt-6 sm:text-base sm:leading-7">
          Насладитесь спокойным отдыхом у озера Иссык-Куль среди величественных гор и природных
          пейзажей Кыргызстана.
        </p>
      </div>
    </div>

    <p
      class="absolute bottom-2 right-4 z-10 text-[10px] text-white/75 sm:bottom-3 sm:right-6"
    >
      Фото:
      <a
        href="https://commons.wikimedia.org/wiki/File:Issyk-Kul,_Kyrgyzstan_(42812885110).jpg"
        target="_blank"
        rel="noreferrer"
        class="underline underline-offset-2 hover:text-white"
      >
        Ninara
      </a>
      ·
      <a
        href="https://creativecommons.org/licenses/by/2.0/"
        target="_blank"
        rel="noreferrer"
        class="underline underline-offset-2 hover:text-white"
      >
        CC BY 2.0
      </a>
      (кадрировано)
    </p>
  </section>
</template>
