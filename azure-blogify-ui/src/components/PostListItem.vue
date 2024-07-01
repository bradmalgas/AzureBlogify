<script setup lang="ts">
import { format } from 'date-fns';
import { computed } from 'vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import TagButton from './TagButton.vue';
const props = defineProps({
  title: String,
  category:  { type: String, required: true},
  date: { type: String, required: true},
  summary: String,
  coverImageUrl: String
});

const formattedDate = computed(() => {
    const date = new Date(props.date);
    return format(date, 'dd MMMM yyyy');
})
</script>

<template>
    <div class="flex space-x-3 md:h-[200px] h-[150px] max-w-full rounded-md p-3 bg-white drop-shadow-md">
        <img :src="coverImageUrl" class="rounded-md object-cover lg:max-w-44 h-full w-44 self-center">
        <div class="flex flex-col h-full justify-between">
            <h2 class="lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:line-clamp-2 line-clamp-4 text-xs md:text-base leading-tight font-bold">{{ title }}</h2>
            <p class="hidden md:flex text-sm text-gray-600 md:line-clamp-1">{{ summary }}</p>
            <TagButton class="md:text-[10px]" :text="category" />
            <div class="flex items-center space-x-2">
                <CalendarIcon class="w-3 h-3" colour="#4e4e4e" />
                <p class="md:text-sm text-xs text-gray-600">{{ formattedDate }}</p>
            </div>
        </div>
    </div>
</template>




<style lang="postcss" scoped></style>