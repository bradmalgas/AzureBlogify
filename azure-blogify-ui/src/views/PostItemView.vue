<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import markdownit from 'markdown-it'
import UnexpectedErrorView from './UnexpectedErrorView.vue';
import { formatDate } from 'date-fns';
import ShareLinks from '../components/ShareLinks.vue';
import SpinLoader from '../components/SpinLoader.vue';
import TagButton from '../components/TagButton.vue';
import Disclaimer from '../components/Disclaimer.vue';
import { usePostStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';


const route = useRoute();

const store = usePostStore();
const { postItem,postItemContent,postItemError,postItemLoading } = storeToRefs(store);

watch(() => route.params, fetchData, { immediate: true });

async function fetchData(params) {
  await store.getPostItem(params.id, params.category);
  document.title = `${postItem.value.title} - Brad Malgas Blog`;
};
</script>

<template>
  <div v-if="postItemLoading" class="flex min-h-svh items-center justify-center">
    <SpinLoader colour="#000000" class="h-32" />
  </div>
  <div v-else class="flex flex-col items-center">
    <div v-if="postItemError">
      <UnexpectedErrorView />
    </div>
    <div v-else-if="postItem" class="flex my-3">
      <div class="flex flex-col lg:mx-96 md:mx-28 mx-6 space-y-3 md:space-y-7">
        <div>
          <h1 class="flex md:text-5xl text-2xl mt-3 font-semibold font-serif leading-tight tracking-wide">
            {{ postItem.title }}
          </h1>
        </div>
        <div class="flex">
          <p class="md:text-base text-xs text-gray-600">{{ postItem.readingMinutes }} min read · {{ postItem.date }}</p>
        </div>
        <div class="flex space-x-2 text-right">
          <TagButton class="md:text-[10px] mb-3" v-for="value in postItem.tags" :text="value" />
        </div>
        <img class="rounded-md md:max-h-72 max-h-52 object-cover" :src="postItem.coverImageUrl" alt="">
        <iframe v-if="postItem.id == '0ce10907-9836-4ffe-a4d9-395bc624bc1c'" class="self-center" width="560" height="315" src="https://www.youtube-nocookie.com/embed/H58vbez_m4E?si=io7bj8DN25dfhEaU&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div>
          <article class="prose prose-base lg:prose-lg" v-html="postItemContent">
          </article>
        </div>
        <Disclaimer :text="postItem.disclaimer" />
        <div class="flex py-3 items-start pb-6">
          <div>
            <p class="md:text-base text-[10px] font-bold mb-2">Written by:</p>
            <div class="flex items-center space-x-2">
              <img class="object-cover object-top rounded-full h-[30px] w-[30px]"
                src="https://storageazureblogify.blob.core.windows.net/blogimages/brad-author-picture.jpeg" alt="">
              <div>
                <p class="md:text-base text-[10px] font-bold">{{ postItem.author }}</p>
                <p class="md:text-[10px] text-[7px] text-gray-700">Azure Cloud Engineer</p>
              </div>
            </div>
          </div>
          <div class="ml-auto">
            <p class="md:text-base text-[10px] font-semibold mb-2">Share this post:</p>
            <div>
              <ShareLinks v-if="postItem" :title="postItem.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
