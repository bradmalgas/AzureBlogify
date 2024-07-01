<script setup lang="ts">
import GitHubIcon from './icons/GitHubIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import TwitterIcon from './icons/TwitterIcon.vue';

</script>

<template>
    <div
        class="md:mb-6 flex flex-col items-center text-center space-y-3 lg:max-w-[800px] max-w-[510px] sm:max-sm:max-w-[200px] min-w-[150px]">
        <img class="object-cover object-top rounded-full h-[100px] w-[100px] border mt-3"
            src="https://storageazureblogify.blob.core.windows.net/blogimages/brad-author-picture.jpeg" alt="">
        <h1 class="md:text-3xl text-3xl font-semibold my-2 font-serif uppercase">Brad Malgas</h1>
        <p class="text-[15px] leading-snug text-gray-600">Intermediate .NET Developer & Azure Cloud Engineer | 4 x Microsoft Certified | Experienced in Cloud-Native
            Solutions</p>

        <div class="flex space-x-3">
            <a href="https://twitter.com/_brvd_" target="_blank"><TwitterIcon colour="#4e4e4e" class="w-6 h-6"/></a>
            <a href="https://github.com/bradmalgas" target="_blank"><GitHubIcon colour="#4e4e4e"  class="w-6 h-6"/></a>
            <a href="https://www.linkedin.com/in/brad-malgas/" target="_blank"><LinkedInLogo colour="#4e4e4e"  class="w-6 h-6"/></a>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
div a {
    display: block;
}
</style>