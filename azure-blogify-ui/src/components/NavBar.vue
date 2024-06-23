<script setup lang="ts">
import LogoSmall from './icons/LogoSmall.vue';
import SearchIcon from './icons/SearchIcon.vue';
import SideNav from './SideNav.vue';
</script>

<template>
    <!-- Tablet/Laptop NavBar -->
    <div class="bg-babyblue truncate hidden md:flex justify-between items-center py-1 lg:sticky top-0">
        <div class="px-3">
            <SideNav class="icon" />
        </div>
        <div class="lg:pl-5">
            <router-link to="/" class="">
                <div class="flex items-center">
                    <LogoSmall class="max-h-[52px] h-full w-full object-cover" />
                    <h1 class="lg:text-xl text-xl font-semibold">AzureBlogify</h1>
                </div>
            </router-link>
        </div>
        <div class="hidden lg:flex space-x-6 ml-auto mr-20">
            <router-link to="/" key="home">Home</router-link>
            <router-link to="/about" key="about">About</router-link>    
        </div>
        <div class=" flex bg-gray-200 rounded-[13px] p-2 mr-3">
            <input class="bg-gray-200 rounded-[13px] min-w-52" type="text" placeholder="Search..">
            <SearchIcon class="h-6 pr-2" />
        </div>
    </div>

    <!-- Mobile NavBar -->
    <div class="flex justify-between items-center bg-white overflow-hidden md:hidden min-w-80 px-5 py-7 max-h-[52px] border-0 border-black border-b">
        <div class="flex items-center relative">
            <router-link to="/" key="home"><p class="text-3xl font-semibold font-serif">AzureBlogify</p></router-link>
        </div>
        <div class="px-3">
            <SideNav />
        </div>
        <!-- <div class="px-3">
            <SearchIcon class="h-8 pr-2" />
        </div> -->
    </div>
</template>

<style lang="postcss" scoped>
</style>