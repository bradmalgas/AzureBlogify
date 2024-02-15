<script setup lang="ts">
import LogoSmall from './icons/LogoSmall.vue';
import LogoMedium from './icons/LogoMedium.vue';
import LogoLarge from './icons/LogoLarge.vue';
</script>

<template>
    <div class="bg-blue-950 py-3 truncate">
        <router-link to="/" class="float-left p-3">
            <div class="flex items-center">
            <LogoSmall/>
            <h1 class="text-xl text-white">Azure Blogify</h1></div>
        </router-link>
        <div class="float-right">
            <router-link to="/" class="nav-bar-item">Home</router-link>
            <router-link to="/about" class="nav-bar-item">About</router-link>            
            <input type="text" placeholder="Search.." class="searchbar">
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.nav-bar-item{
    @apply float-left text-center p-3 text-lg rounded text-white hover:text-blue-300
}

.searchbar{
    @apply float-right p-1 mt-2 mr-4 text-lg
}
</style>