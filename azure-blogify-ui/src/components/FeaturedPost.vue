<script setup lang="ts">
import { format } from 'date-fns';
import { computed } from 'vue';

const props = defineProps({
    title: String,
author: String,
    category: String,
summary: String,
    tags: { type: Array<string> },
    date: { type: String, required: true },
    coverImageUrl: String
});

const formattedDate = computed(() => {
    const date = new Date(props.date);
    return format(date, 'dd MMMM yyyy');
})
</script>

<template>
    <div class="md:mb-6">
        <h1 class="md:text-3xl text-2xl font-bold mb-2">Featured Post</h1>
        <div class="max-h-[300px] max-w-[800px] overflow-clip"><img class="max-w-full h-auto" :src="coverImageUrl"
                alt=""></div>
        <h2 class="lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-xl my-1 font-bold leading-tight">
            {{ title }}</h2>
        <p class="md:text-sm text-xs">{{ formattedDate }}</p>
    </div>
</template>

<style lang="postcss" scoped></style>