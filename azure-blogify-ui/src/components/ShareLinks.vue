<template>
    <div class="flex flex-col">
        <div class="flex flex-row md:space-x-5 justify-between items-center">
            <LinkIcon @click="shareOnTwitter" class="md:flex hidden md:w-8 md:h-8 w-5 h-5" color="#4E4E4E"></LinkIcon>
            <ShareIcon @click="shareContentMobile" class="md:hidden md:w-8 md:h-8 w-5 h-5" colorClass="text-gray-700"></ShareIcon>
            <TwitterIcon @click="shareOnTwitter" class="md:w-8 md:h-8 w-5 h-5" colour="#4E4E4E"></TwitterIcon>
            <LinkedInLogo @click="shareOnLinkedIn" class="md:w-8 md:h-8 w-5 h-5" colour="#4E4E4E"></LinkedInLogo>
        </div>
    </div>
</template>

<script setup lang="ts">
import ShareIcon from './icons/ShareIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import LinkIcon from './icons/LinkIcon.vue';
const props = defineProps({
    title: String
}
);

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
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};
</script>