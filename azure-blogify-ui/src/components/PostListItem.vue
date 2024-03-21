<script setup lang="ts">
defineProps(['title', 'date'])
</script>

<template>
    <div class="flex space-x-3 lg:max-h-[200px] max-h-[80px] max-w-full">
        <div><img src="../assets/images/placeholder-image.png" alt="" class="lg:max-w-44 max-w-36 h-auto"></div>
        <div class="flex flex-col">
            <h2 class="lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:line-clamp-2 line-clamp-3 text-sm md:text-base leading-tight">{{ title }}</h2>
            <p class="mt-auto md:text-sm text-xs">{{date}}</p>
        </div>
    </div>
</template>




<style lang="postcss" scoped></style>