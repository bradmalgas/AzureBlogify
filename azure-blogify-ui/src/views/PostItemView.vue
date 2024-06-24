<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import markdownit from 'markdown-it'
import UnexpectedErrorView from './UnexpectedErrorView.vue';
import { formatDate } from 'date-fns';
import ShareLinks from '../components/ShareLinks.vue';
import SpinLoader from '../components/SpinLoader.vue';


const route = useRoute();

const postItem = ref({});
const postContent = ref({});
const error = ref({});
const loading = ref(true);

watch(() => route.params, fetchData, { immediate: true });

async function fetchData(params) {
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

    // Set Open Graph meta tags (for link-sharing)
    const metaTags = [
      { property: 'og:title', content: postItem.value.title },
      { property: 'og:image', content: postItem.value.coverImageUrl },
      { property: 'og:url', content: window.location.href }
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
        element.setAttribute('content', tag.content);
    });
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
};

async function stringToDate(date) {
  return formatDate(date, "dd MMM, yyyy");
}
</script>


<template>    
  <div v-if="loading" class="flex min-h-svh items-center justify-center">
    <SpinLoader colour="#000000" class="h-32"/>
  </div>
  <div v-else class="flex flex-col items-center mx-10">
    <div v-if="error">
      <UnexpectedErrorView />
    </div>
    <div v-if="postItem" class="flex justify-center my-3">
      <div class="flex flex-col items-center pt-5 max-w-[1024px]">
        <div class="w-full">
          <h1 class="flex lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-5xl text-2xl my-1 font-bold">
            {{ postItem.title }}
          </h1>
          <div class="flex my-5 items-center">
            <div>
              <img class="object-cover object-top rounded-full h-[55px] w-[55px] border border-neutral-900"
                src="../assets/images/user-placeholder-image.png" alt="">
            </div>
            <div class="flex flex-col justify-center ml-5">
              <p class="md:text-lg text-base">{{ postItem.author }}</p>
              <p class="md:text- text-sm font-light">{{ postItem.date }}</p>
            </div>
            <div class="ml-auto"><ShareLinks v-if="postItem" :title="postItem.title"/></div>
          </div>
        </div>
        <img class="my-3 md:max-h-72 max-h-36" :src="postItem.coverImageUrl" alt="">
        <div class="mt-5">
          <article class="prose prose-base lg:prose-lg my-3" v-html="postContent">
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
