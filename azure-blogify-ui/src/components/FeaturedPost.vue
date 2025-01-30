<script setup lang="ts">
import { format } from 'date-fns';
import { computed } from 'vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import TagButton from '../components/TagButton.vue';

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
    <div class="md:mb-6 min-w-[360px]">
        <div class="rounded-md p-4 shadow-lg space-y-3 flex-col">
            <div class="2xl:min-w-fit 2xl:min-h-[600px] h-96 max-h-[300px] w-full">
                <img class="h-full mx-auto" :src="coverImageUrl" alt="">
            </div>
            <div class="flex items-center space-x-2">
                <CalendarIcon class="w-3 h-3" colour="#4e4e4e" />
                <p class="md:text-sm text-xs text-slate-600">{{ formattedDate }}</p>
            </div>
            <h2 class="lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-xl my-1 font-bold leading-tight">
                {{ title }}</h2>
            <p class="md:text-sm text-xs text-slate-600">{{ summary }}</p>
            <div class="flex items-center md:space-x-2 space-x-5">
                <div class="flex items-center flex-grow">
                    <img class="object-cover object-top rounded-full h-[40px] w-[40px] p-2"
                        src="https://storageazureblogify.blob.core.windows.net/blogimages/brad-author-picture.jpeg"
                        alt="">
                    <p class="md:text-sm text-[10px]">{{ author }}</p>
                </div>
                <div class="space-x-2 text-right">
                    <TagButton class="md:text-[10px]" v-for="value in tags" :text="value" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>