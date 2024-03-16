<script setup lang="ts">
import LogoSmall from './icons/LogoSmall.vue';
import LogoMedium from './icons/LogoMedium.vue';
import LogoLarge from './icons/LogoLarge.vue';
import SearchIcon from './icons/SearchIcon.vue';
import SideNav from './SideNav.vue';
</script>

<template>
    <div class="bg-babyblue truncate hidden md:flex justify-between items-center">
        <div class="px-3 lg:hidden">
            <SideNav class="icon" />
        </div>
        <div>
            <router-link to="/" class="">
                <div class="flex items-center">
                    <LogoSmall class="logo h-full w-full object-cover" />
                    <h1 class="text-xl font-semibold">AzureBlogify</h1>
                </div>
            </router-link>
        </div>
        <div class="hidden lg:flex space-x-6 ml-auto mr-20">
            <router-link to="/" key="home">Home</router-link>
            <router-link to="/about" key="about">About</router-link>
            <router-link to="/posts" key="posts">Post</router-link>
            <router-link to="/about" key="contact">Contact</router-link>
        </div>
        <div class=" flex bg-gray-200 rounded-[13px] p-1 mr-3">
            <input class="bg-gray-200 rounded-[13px] min-w-52" type="text" placeholder="Search..">
            <SearchIcon class="h-8 pr-2" />
        </div>
    </div>
    <div class="flex justify-between items-center bg-babyblue overflow-hidden md:hidden min-w-80">
        <div class="px-3">
            <SideNav />
        </div>
        <div class="flex items-center relative h-full">
            <LogoSmall class="logo h-full w-full object-cover" />
            <p class="text-lg font-semibold">AzureBlogify</p>
        </div>
        <div class="px-3">
            <SearchIcon class="h-8 pr-2" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.nav-bar-item {
    @apply float-left text-center p-3 text-lg rounded text-white hover:text-blue-300
}

.logo {
    max-height: 56px;
}
</style>