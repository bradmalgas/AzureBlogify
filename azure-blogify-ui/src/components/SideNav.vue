<script setup lang="ts">
import BradLogo from './icons/BradLogo.vue';
import CloseIcon from './icons/CloseIcon.vue';
import MenuIcon from './icons/MenuIcon.vue';
import { ref } from 'vue';

const isOpen = ref(false);

const toggleSideNav = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div>
      <div>
        <MenuIcon class="h-full hover:cursor-pointer" @click="toggleSideNav()" />
      </div>
      <div class="fixed inset-0 z-20" :class="{'slide-out': !isOpen, 'slide-in': isOpen}">
        <div id="slide-nav-component" class="bg-black text-white max-sm:max-w-[60%] w-full md:max-w-md h-screen p-5 pt-8 relative">
          <div class="absolute top-3 right-8">
            <CloseIcon colour="#ffffff" class="h-full hover:cursor-pointer" @click="toggleSideNav()" />
          </div>
          <div class="grid gap-4 font-bold text-xl md:text-2xl lg:text-2xl rounded ml-5">
            <BradLogo class="border-0 border-b border-white" colour="#ffffff"/>
            <router-link class="hover:cursor-pointer max-w-fit" to="/" key="home" @click="toggleSideNav()">Home</router-link>
            <router-link class="hover:cursor-pointer max-w-fit" to="/about" key="about" @click="toggleSideNav()">About</router-link>
          </div>
        </div>
      </div>
      <div class="bg-black opacity-30 inset-0 fixed z-10" :class="{'fade-out': !isOpen, 'fade-in': isOpen}" @click="toggleSideNav()"></div>
    </div>
  </template>
  


<style scoped>
.slide-out {
  transform: translateX(-100%);
  transition: transform 0.4s ease-in;
}

.slide-in {
  transform: translateX(0);
  transition: transform 0.4s ease-out;
}

.fade-in {
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

.fade-out {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
</style>
