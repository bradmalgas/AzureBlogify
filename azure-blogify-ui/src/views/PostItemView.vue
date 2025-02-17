<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import markdownit from 'markdown-it'
import UnexpectedErrorView from './UnexpectedErrorView.vue';
import { formatDate } from 'date-fns';
import ShareLinks from '../components/ShareLinks.vue';
import SpinLoader from '../components/SpinLoader.vue';
import TagButton from '../components/TagButton.vue';
import Disclaimer from '../components/Disclaimer.vue';
import { usePostStore } from '@/stores/posts';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';


const route = useRoute();
const router = useRouter();

const store = usePostStore();
const userStore = useUserStore();
const { isAdmin } = storeToRefs(userStore);
const { postItem, postItemContent, postItemError, postItemLoading, editPostItemLoading } = storeToRefs(store);

watch(() => route.params, fetchData, { immediate: true });

async function fetchData(params) {
  await store.getPostItem(params.id, params.category);
  document.title = `${postItem.value.title} - Brad Malgas Blog`;
};

async function editPost() {
  const params = route.params
  await store.fetchEditPostItem(params.id, params.category);
  router.push('/editor');
}
</script>

<template>
  <div v-if="postItemLoading || editPostItemLoading" class="flex min-h-svh items-center justify-center">
    <SpinLoader colour="#000000" class="h-32" />
  </div>
  <div v-else class="flex flex-col items-center">
    <div v-if="postItemError">
      <UnexpectedErrorView />
    </div>
    <div v-else-if="postItem" class="flex my-3 w-full">
      <div class="flex flex-col max-w-[90%] md:max-w-[55%] lg:max-w-[50%] xl:max-w-[45%] 2xl:max-w-[40%] mx-auto space-y-3
        md:space-y-7">
        <div>
          <h1 class="flex md:text-5xl text-2xl mt-3 font-semibold font-serif leading-tight tracking-wide">
            {{ postItem.title }}
          </h1>
        </div>
        <div class="flex items-center">
          <p class="md:text-base text-xs text-gray-600">{{ postItem.readingMinutes }} min read · {{ postItem.date }}</p>
          <div class="flex ml-auto items-center">
            <button v-if="isAdmin" @click="editPost"
              class="ml-auto max-w-fit px-6 py-2 bg-black text-white rounded-3xl hover:bg-gray-500 focus:outline-none transition-colors duration-200">
              Edit Article
            </button>
          </div>
        </div>
        <div class="flex flex-wrap">
          <TagButton class="mr-2 md:mr-3 md:text-[10px] mb-3" v-for="value in postItem.tags" :text="value" />
        </div>
        <img class="rounded-md md:max-h-72 max-h-52 w-full object-cover" :src="postItem.coverImageUrl" alt="">
        <div>
          <article class="w-full prose prose-base lg:prose-lg !max-w-none" v-html="postItemContent">
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
