<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>
<template>
  <Navbar />
  <AppMessage />
  <router-view />
  <Footer />
</template>
