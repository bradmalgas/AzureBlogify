<script setup lang="ts">
import GitHubIcon from './icons/GitHubIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import TwitterIcon from './icons/TwitterIcon.vue';

</script>

<template>
    <div
        class="md:mb-6 flex flex-col items-center text-center space-y-1 lg:max-w-[800px] max-w-[510px] sm:max-sm:max-w-[200px] min-w-[150px]">
        <img class="object-cover object-top rounded-full h-[150px] w-[150px] mb-3 border-4 border-neutral-900"
            src="../assets/images/user-placeholder-image.png" alt="">
        <h1 class="md:text-3xl text-2xl font-bold my-2">Brad Malgas</h1>
        <p>Intermediate .NET Developer & Azure Cloud Enthusiast | 4 x Microsoft Certified | Experienced in Cloud-Native
            Solutions | Football Lover</p>

        <div class="flex space-x-3">
            <a href="https://twitter.com/_brvd_" target="_blank"><TwitterIcon class="w-8"/></a>
            <a href="https://github.com/bradmalgas" target="_blank"><GitHubIcon class="w-8"/></a>
            <a href="https://www.linkedin.com/in/brad-malgas/" target="_blank"><LinkedInLogo class="w-8"/></a>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
div a {
    display: block;
}
</style>