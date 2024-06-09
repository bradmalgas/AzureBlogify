<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import markdownit from 'markdown-it'
import NotFoundView from './NotFoundView.vue';
import { formatDate } from 'date-fns';

const route = useRoute();

const postItem = ref({});
const postContent = ref({});
const error = ref({});
const loading = ref(false);

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
  <div class="flex flex-col items-center mx-10">
    <div v-if="loading">
      <p class="md:text-xl">Loading ...</p>
    </div>
    <div v-if="error">
      <NotFoundView />
    </div>
    <div v-if="postItem" class="flex justify-center my-2">
      <div class="flex flex-col items-center pt-5 max-w-[1024px]">
        <div>
                    <h1
            class="flex lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-5xl text-3xl my-1 font-bold">
            {{ postItem.title }}
          </h1>
          <div class="flex space-x-4 my-5">
            <div>
              <img class="object-cover object-top rounded-full h-[55px] w-[55px] border border-neutral-900"
                src="../assets/images/user-placeholder-image.png" alt="">
            </div>
            <div class="flex flex-col justify-center">
              <p class="md:text-lg text-base">{{ postItem.author }}</p>
              <p class="md:text- text-sm font-light">{{ postItem.date }}</p>
            </div>
          </div>
        </div>
<img class="max-w-full h-auto" src="../assets/images/placeholder-image.png" alt="">
        <div>
          <article class="prose prose-sm lg:prose-lg my-3" v-html="postContent">
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
