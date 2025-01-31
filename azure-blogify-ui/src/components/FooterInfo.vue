<script setup lang="ts">
import GitHubIcon from './icons/GitHubIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
</script>

<template>
    <div class="flex flex-col h-[250px] bg-black text-white items-center py-6 font-serif">
        <!-- <div class="flex flex-col items-center">
            <p class="text-xs">Subscribe to our newsletter</p>
            <div class="flex mt-7 rounded-full outline outline-2 outline-white">
                <input type="email" placeholder="Enter your email"
                    class="focus:outline-none caret-white w-52 rounded-full h-full bg-black text-xs pl-5 flex placeholder:text-white"
                    name="emailTextField" id="newsletter-email-address-text-field"></input>
                <button class="text-xs bg-white text-black font-bold rounded-full py-2 px-6 h-full">Subscribe</button>
            </div>
        </div> -->
        <div class="flex flex-col mt-auto w-full items-center">
            <p class="text-xs font-thin">© 2025 Brad Malgas</p>
            <div class="flex space-x-3">
                <a href="https://twitter.com/_brvd_" target="_blank">
                    <TwitterIcon colour="#ffffff" class="w-8" />
                </a>
                <a href="https://github.com/bradmalgas" target="_blank">
                    <GitHubIcon colour="#ffffff" class="w-8" />
                </a>
                <a href="https://www.linkedin.com/in/brad-malgas/" target="_blank">
                    <LinkedInLogo colour="#ffffff" class="w-8" />
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>
