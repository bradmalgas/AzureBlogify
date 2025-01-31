<template>
    <div class="relative flex flex-col">
        <div class="flex flex-col">
            <div class="flex flex-row lg:space-x-5 justify-between items-center">
                <LinkIcon @click="copyToClipboard" class="lg:flex hidden lg:w-8 lg:h-8 hover:cursor-pointer"
                    color="#4E4E4E"></LinkIcon>
                <ShareIcon @click="shareContentMobile"
                    class="lg:hidden lg:w-8 lg:h-8 hover:cursor-pointer md:w-7 md:h-7 w-5 h-5"
                    colorClass="text-gray-700">
                </ShareIcon>
                <TwitterIcon @click="shareOnTwitter" class="lg:w-8 lg:h-8  hover:cursor-pointer md:w-7 md:h-7 w-5 h-5"
                    colour="#4E4E4E"></TwitterIcon>
                <LinkedInLogo @click="shareOnLinkedIn" class="lg:w-8 lg:h-8 hover:cursor-pointer md:w-7 md:h-7 w-5 h-5"
                    colour="#4E4E4E"></LinkedInLogo>
                <div class="lg:flex hidden absolute text-center mb-40 bg-black text-white text-sm py-2 px-8 rounded-3xl transition-opacity duration-500 ease-in-out -z-10"
                    :class="{ 'opacity-100': copied, 'opacity-0': !copied }">
                    Copied to clipboard!
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import ShareIcon from './icons/ShareIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import LinkIcon from './icons/LinkIcon.vue';
import { ref } from 'vue';
const props = defineProps({
    title: String
}
);

const copied = ref(false);

const url = encodeURIComponent(window.location.href);
// Function to share content
const shareContentMobile = () => {
    if (navigator.share) {
        navigator.share({
            title: props.title,
            url: window.location.href,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing:', error));
    } else {
        console.log('Web Share API not supported in this browser.');
    }
};

const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share-dialog', 'width=800,height=600');
};

const shareOnTwitter = () => {
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, 'twitter-share-dialog', 'width=800,height=600');
};

const shareOnLinkedIn = () => {
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, 'linkedin-share-dialog', 'width=800,height=600');
};

const copyToClipboard = () => {
    copied.value = true;

    const textarea = document.createElement('textarea');
    textarea.value = window.location.href;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setTimeout(() => {
        copied.value = false;
    }, 2000);
};
</script>

<style scoped>
.copied-message {
    background-color: #4CAF50;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    opacity: 1;
    transition: opacity 0.3s ease;
}
</style>