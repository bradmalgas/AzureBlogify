<script setup lang="ts">
import { format } from 'date-fns';
import { computed } from 'vue';
const props = defineProps({
  title: String,
  category: String,
  date: { type: String, required: true},
  coverImageUrl: String
});

const formattedDate = computed(() => {
    const date = new Date(props.date);
    return format(date, 'dd MMMM yyyy');
})
</script>

<template>
    <div class="flex space-x-3 lg:max-h-[200px] max-h-[80px] max-w-full">
        <div><img :src="coverImageUrl" class="object-cover lg:max-w-44 min-w-36 h-[80px]"></div>
        <div class="flex flex-col">
            <h2 class="lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:line-clamp-2 line-clamp-3 text-sm md:text-base leading-tight">{{ title }}</h2>
            <!-- <p class="text-sm">{{ category }}</p> -->
            <p class="mt-auto md:text-sm text-xs">{{formattedDate}}</p>
        </div>
    </div>
</template>




<style lang="postcss" scoped></style>