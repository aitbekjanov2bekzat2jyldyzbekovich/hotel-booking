<script setup>
import SurroundingsSection from "../components/SurroundingsSection.vue";
import BookingSearch from "../components/BookingSearch.vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import LocationMap from "../components/LocationMap.vue";
import Navbar from "../components/Navbar.vue";
import ReviewsSection from "../components/ReviewsSection.vue";
import RoomsSection from "../components/RoomsSection.vue";
import SeasonalBookingBanner from "../components/SeasonalBookingBanner.vue";
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <BookingSearch />
    <SurroundingsSection />
    <RoomsSection />
    <ReviewsSection />
    <LocationMap />
    <SeasonalBookingBanner />
  </main>
  <Footer />
</template>
