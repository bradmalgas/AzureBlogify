<script setup lang="ts">
import BradLogo from './icons/BradLogo.vue';
import CloseIcon from './icons/CloseIcon.vue';
import MenuIcon from './icons/MenuIcon.vue';
import { ref } from 'vue';

const isOpen = ref(true);

const toggleSideNav = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div>
      <div class="relative z-20">
        <MenuIcon class="h-full" @click="toggleSideNav()" />
      </div>
      <div v-if="isOpen" class="fixed inset-0 z-30 flex">
        <div class="bg-black text-white max-sm:min-w-[80%] w-full md:max-w-md h-full p-5 pt-8 relative">
          <div class="absolute top-3 right-8">
            <CloseIcon colour="#ffffff" class="h-full" @click="toggleSideNav()" />
          </div>
          <div class="grid gap-4 text-xl md:text-2xl lg:text-2xl rounded ml-5">
            <BradLogo class="border-0 border-b border-white" colour="#ffffff"/>
            <router-link class="hover:cursor-pointer max-w-fit" to="/" key="home" @click="toggleSideNav()">Home</router-link>
            <router-link class="hover:cursor-pointer max-w-fit" to="/about" key="about" @click="toggleSideNav()">About</router-link>
          </div>
        </div>
        <div class="bg-black opacity-30 w-full" @click="toggleSideNav()"></div>
      </div>
    </div>
  </template>
  


<style lang="postcss" scoped></style>
