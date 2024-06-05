<script setup lang="ts">
defineProps(['title', 'date'])
</script>

<template>
    <div class="md:mb-6">
        <h1 class="md:text-3xl text-2xl font-bold mb-2">Featured Post</h1>
        <div class="max-h-[300px] max-w-full overflow-clip"><img class="max-w-full h-auto" src="https://storageazureblogify.blob.core.windows.net/blogimages/placeholder-image.png" alt=""></div>
        <h2 class="lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-xl my-1 font-bold leading-tight">{{title}}</h2>
        <p class="md:text-sm text-xs">{{date}}</p>
    </div>
</template>

<style lang="postcss" scoped></style>