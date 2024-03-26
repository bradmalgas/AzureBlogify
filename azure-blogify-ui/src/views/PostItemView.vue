<script setup lang="ts">
import type { title } from 'process';
import { ref } from 'vue';

const post = ref(
    {
        id: 7,
        title: "If you're reading this, survery says - It's too late!",
        author: "Brad Malgas",
        date: "14 May 2024"
    }
)
</script>


<template>
    <div class="flex flex-col items-center pt-5 mx-10">
        <h1 class="md:text-3xl text-2xl font-bold mb-2">{{ post.title }}</h1>
        <div class="flex justify-between w-full">
            <p class="md:text-base text-sm">{{ post.author }}</p>
            <p class="ml-auto md:text-sm text-xs">{{post.date}}</p>
        </div>
        <img class="max-w-full h-auto" src="../assets/images/placeholder-image.png" alt="">
    </div>
</template>

<style lang="postcss" scoped></style>