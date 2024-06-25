<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue';
import MenuIcon from './icons/MenuIcon.vue';
import { ref } from 'vue';

const isClosed = ref(true);

const toggleSideNav = () => {
    isClosed.value = !isClosed.value;
};
</script>

<template>
    <div>
      <div v-if="isClosed" class="relative z-20">
        <MenuIcon class="h-full" @click="toggleSideNav()" />
      </div>
      <div v-else class="fixed inset-0 z-30 flex justify-end">
        <div class="bg-black opacity-30 w-full" @click="toggleSideNav()"></div>
        <div class="bg-black text-white w-3/5 max-w-sm h-full p-5 pt-8 relative">
          <div class="absolute top-3 right-8">
            <CloseIcon colour="#ffffff" class="h-full" @click="toggleSideNav()" />
          </div>
          <div class="grid gap-4 text-xl rounded">
            <router-link to="/" key="home" @click="toggleSideNav()">Home</router-link>
            <router-link to="/about" key="about" @click="toggleSideNav()">About</router-link>
            <router-link to="/posts" key="posts" @click="toggleSideNav()">Post</router-link>
            <router-link to="/contact" key="contact" @click="toggleSideNav()">Contact</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  


<style lang="postcss" scoped></style>
