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
    <div class="relative z-20">
        <div v-if="isClosed">
            <MenuIcon class="h-6" @click="toggleSideNav()" />
        </div>
        <div v-else class="inset-0 z-30 bg-babyblue w-screen p-5 pt-8 relative">
            <div class="absolute top-3 right-8">
                <CloseIcon class="h-6" @click="toggleSideNav()" />
            </div>
            <div class="grid gap-4 text-xl rounded">
                <router-link to="/" key="home" @click="toggleSideNav()">Home</router-link>
                <router-link to="/about" key="about" @click="toggleSideNav()">About</router-link>
                <router-link to="/posts" key="posts" @click="toggleSideNav()">Post</router-link>
                <router-link to="/about" key="contact" @click="toggleSideNav()">Contact</router-link>
            </div>
        </div>
    </div>
</template>


<style lang="postcss" scoped></style>
