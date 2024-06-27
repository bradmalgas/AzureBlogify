<script setup lang="ts">
import LogoSmall from './icons/LogoSmall.vue';
import SearchIcon from './icons/SearchIcon.vue';
import SideNav from './SideNav.vue';
import BradLogo from './icons/BradLogo.vue';
</script>

<template>
    <!-- Tablet/Laptop NavBar -->
    <div
        class="bg-white border-0 border-black border-b truncate hidden md:flex justify-between items-center max-h-[80px] sticky top-0 z-10 px-3">
        <div>
            <SideNav />
        </div>
        <div>
            <router-link to="/">
                <BradLogo />
            </router-link>
        </div>
        <div class="hidden lg:flex items-center">
            <div class="space-x-6 mr-6 font-semibold">
                <router-link to="/" key="home">Home</router-link>
                <router-link to="/about" key="about">About</router-link>
            </div>
            <div class="flex bg-gray-200 rounded-[13px] p-2 mr-3">
                <input class="bg-gray-200 rounded-[13px] min-w-52" type="text" placeholder="Search..">
                <SearchIcon class="h-6 pr-2" />
            </div>
        </div>
        <div class="lg:hidden">
            <SearchIcon class="h-8 mr-6" />
        </div>
    </div>

    <!-- Mobile NavBar -->
    <div
        class="flex justify-between items-center bg-white overflow-hidden md:hidden min-w-80 max-h-[52px] border-0 border-black border-b sticky top-0 z-10 px-3">
        <div>
            <SideNav />
        </div>
        <div class="flex items-center relative">
            <router-link to="/" key="home">
                <BradLogo />
            </router-link>
        </div>
        <div>
            <SearchIcon class="h-8 pr-2" />
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>