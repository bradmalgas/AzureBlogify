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


const route = useRoute();

const postItem = ref({});
const postContent = ref({});
const error = ref({});
const loading = ref(true);

watch(() => route.params, fetchData, { immediate: true });

async function fetchData(params) {
  window.scrollTo(0, 0);
  error.value = postItem.value = null;
  loading.value = true;
  const md = markdownit();
  try {
    const response = await fetch("/api/GetPostById?" + "id=" + params.id + "&category=" + params.category);
    const data = await response.json();
    postContent.value = md.render(data.content);
    postItem.value = data;
    postItem.value.date = await stringToDate(data.date);
    document.title = `${postItem.value.title} - AzureBlogify`;
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
};

async function stringToDate(date) {
  return formatDate(date, "dd MMM yyyy");
}
</script>


<template>
  <div v-if="loading" class="flex min-h-svh items-center justify-center">
    <SpinLoader colour="#000000" class="h-32" />
  </div>
  <div v-else class="flex flex-col items-center">
    <div v-if="error">
      <UnexpectedErrorView />
    </div>
    <div v-if="postItem" class="flex my-3">
      <div class="flex flex-col md:mx-96 mx-6 space-y-3 md:space-y-7">
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
        <div>
          <article class="prose prose-base lg:prose-lg" v-html="postContent">
          </article>
        </div>
        <Disclaimer :text="postItem.disclaimer" />
        <div class="flex py-3 items-start pb-6">
          <div>
            <p class="text-[10px] font-bold mb-2">Written by:</p>
            <div class="flex items-center space-x-2">
              <img class="object-cover object-top rounded-full h-[30px] w-[30px]"
                src="../assets/images/user-placeholder-image.png" alt="">
              <div>
                <p class="md:text-base text-[10px] font-bold">{{ postItem.author }}</p>
                <p class="text-[7px] text-gray-700">Azure Cloud Engineer</p>
              </div>
            </div>
          </div>
          <div class="ml-auto">
            <p class="text-[10px] font-semibold mb-2">Share this post:</p>
            <div>
              <ShareLinks v-if="postItem" :title="postItem.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
