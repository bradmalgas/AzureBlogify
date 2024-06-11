<template>
    <button class="md:hidden" @click="shareContentMobile">
        <div class="flex items-center bg-gray-300 text-black font-bold py-2 px-1 rounded-full max-w-20 md:max-w-full">
            <ShareIcon colorClass="text-gray-800 h-6" />
        </div>
    </button>
    <div class="hidden md:flex flex-col">
        <h2 class="text-lg font-bold">Share this post:</h2>
        <div class="flex flex-row justify-between">
            <FacebookIcon @click="shareOnFacebook" class="w-8"></FacebookIcon>
            <TwitterIcon @click="shareOnTwitter" class="w-8"></TwitterIcon>
            <LinkedInLogo @click="shareOnLinkedIn" class="w-8"></LinkedInLogo>
        </div>
    </div>
</template>

<script setup lang="ts">
import ShareIcon from './icons/ShareIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
const props = defineProps({
    title: String
}
);
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
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share-dialog', 'width=800,height=600');
};

const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, 'twitter-share-dialog', 'width=800,height=600');
};

const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, 'linkedin-share-dialog', 'width=800,height=600');
};

const shareViaEmail = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.location.href = `mailto:?subject=${title}&body=${url}`;
};
// const shareContent = () => {
//     if (navigator.share) {
//         navigator.share({
//             title: 'Title of shared content',
//             text: 'Description of shared content',
//             url: 'https://example.com/shared-url'
//         })
//             .then(() => console.log('Successfully shared'))
//             .catch(error => console.error('Error sharing:', error));
//     } else {
//         copyToClipboard('https://example.com/shared-url');
//     }
// };

// const copyToClipboard = (text) => {
//     const textarea = document.createElement('textarea');
//     textarea.value = text;
//     textarea.setAttribute('readonly', '');
//     textarea.style.position = 'absolute';
//     textarea.style.left = '-9999px';
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand('copy');
//     document.body.removeChild(textarea);
//     console.log('Link copied to clipboard:', text);
// };
</script>