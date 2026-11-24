<script setup>
import SurroundingsSection from "../components/SurroundingsSection.vue";
import BookingSearch from "../components/BookingSearch.vue";
import Hero from "../components/Hero.vue";
import Navbar from "../components/Navbar.vue";
import RoomsSection from "../components/RoomsSection.vue";
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <BookingSearch />

    <SurroundingsSection />
    <RoomsSection />
  </main>
</template>
