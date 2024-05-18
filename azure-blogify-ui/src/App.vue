<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import FooterInfo from './components/FooterInfo.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <RouterView class="flex-grow"/>
    <FooterInfo />
  </div>
</template>

<style scoped></style>
