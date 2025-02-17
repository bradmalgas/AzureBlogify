<script setup lang="ts">
import LogoSmall from './icons/LogoSmall.vue';
import SearchIcon from './icons/SearchIcon.vue';
import SideNav from './SideNav.vue';
import BradLogo from './icons/BradLogo.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CloseIcon from './icons/CloseIcon.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const searchString = ref("");
const router = useRouter();
const showSearchBar = ref(false);

const store = useUserStore();
const { isAdmin, isLoggedIn } = storeToRefs(store);

const search = () => {
    var searchquery = searchString.value.trim();
    if (searchquery !== "") router.push(`/search/${searchquery}`);
};

const toggleSearchBar = () => {
    showSearchBar.value = !showSearchBar.value;
};
</script>

<template>
    <!-- Laptop NavBar -->
    <div
        class="bg-white border-0 border-black border-b truncate hidden lg:flex justify-between items-center max-h-[80px] sticky top-0 z-10 px-3">
        <div>
            <SideNav />
        </div>
        <div>
            <router-link to="/">
                <BradLogo />
            </router-link>
        </div>
        <div class="flex items-center">
            <div class="space-x-6 mr-6 font-semibold">
                <router-link to="/" key="home">Home</router-link>
                <a href="https://bradmalgas.com" target="_blank">About</a>
                <router-link v-if="isAdmin" to="/editor" key="editor">Editor</router-link>
                <a v-if="!isLoggedIn" href="/login">Login</a>
                <a v-if="isLoggedIn" href="/logout">Logout</a>
            </div>
            <div class="flex bg-gray-200 rounded-[13px] p-2 mr-3">
                <input v-model="searchString" class="bg-gray-200 rounded-[13px] min-w-52 focus:outline-none pl-2"
                    type="text" placeholder="Search.." @keyup.enter="search">
                <SearchIcon @click="search" class="h-6 pr-2 hover:cursor-pointer" />
            </div>
        </div>
    </div>

    <!-- Mobile/Tablet NavBar -->
    <div
        class="flex justify-between items-center bg-white overflow-hidden lg:hidden min-w-80 max-h-[60px] border-0 border-black border-b sticky top-0 z-10 px-3">
        <div>
            <SideNav />
        </div>
        <div class="flex items-center relative">
            <router-link to="/" key="home">
                <BradLogo />
            </router-link>
        </div>
        <div class="flex">
            <input v-if="showSearchBar" v-model="searchString"
                class="bg-gray-200 rounded-[13px] min-w-52 focus:outline-none pl-2" type="text" placeholder="Search.."
                @keyup.enter="search">
            <SearchIcon v-if="!showSearchBar" @click="toggleSearchBar()" class="h-8 pr-2" />
            <CloseIcon v-if="showSearchBar" @click="toggleSearchBar()" class="h-6 px-2" />
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>