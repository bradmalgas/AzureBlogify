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
      <div class="left-8 relative hover:cursor-pointer" :class="{'slide-out z-30': !isOpen, 'slide-in z-0': isOpen}">
        <MenuIcon class="h-full" @click="toggleSideNav()" />
      </div>
      <div class="fixed inset-0 flex z-10">
        <div id="slide-nav-component" class="bg-black text-white max-sm:min-w-[80%] w-full md:max-w-md h-screen p-5 pt-8 relative z-40" :class="{'slide-out': !isOpen, 'slide-in': isOpen}">
          <div class="absolute top-3 right-8">
            <CloseIcon colour="#ffffff" class="h-full" @click="toggleSideNav()" />
          </div>
          <div class="grid gap-4 text-xl md:text-2xl lg:text-2xl rounded ml-5">
            <BradLogo class="border-0 border-b border-white" colour="#ffffff"/>
            <router-link class="hover:cursor-pointer max-w-fit" to="/" key="home" @click="toggleSideNav()">Home</router-link>
            <router-link class="hover:cursor-pointer max-w-fit" to="/about" key="about" @click="toggleSideNav()">About</router-link>
          </div>
        </div>
      </div>
        <div class="bg-black opacity-30 inset-0 fixed flex" :class="{'slide-out hidden': !isOpen, 'slide-in flex': isOpen}" @click="toggleSideNav()"></div>
    </div>
  </template>
  


<style scoped>
.slide-out {
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.slide-in {
  transform: translateX(0);
  transition: transform 0.4s ease;
}
</style>
