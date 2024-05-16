<script setup lang="ts">
import GitHubIcon from './icons/GitHubIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
</script>

<template>
    <div class="flex flex-col h-[120px] bg-babyblue items-center py-5 space-y-3">
        <p class="text-xs font-light">Copyright © 2024 Brad Malgas</p>
        <div class="flex space-x-5">
            <a href="https://twitter.com/_brvd_" target="_blank"><TwitterIcon class="w-7"/></a>
            <a href="https://github.com/bradmalgas" target="_blank"><GitHubIcon class="w-7"/></a>
            <a href="https://www.linkedin.com/in/brad-malgas/" target="_blank"><LinkedInLogo class="w-7"/></a>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
</style>
