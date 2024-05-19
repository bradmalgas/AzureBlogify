<script setup>
import { ref, onMounted } from 'vue';
import markdownit from 'markdown-it'

const props = defineProps({
  id: String,
  category: String
});

const postItem = ref({});
const postContent = ref({});
const error = ref({});
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  const md = markdownit();
  try {
    const response = await fetch("/api/GetPostById?" + "id=" + props.id + "&category=" + props.category);
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const data = await response.json();
    postItem.value = data;
    postContent.value = md.render(data.content);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
})
</script>


<template>
  <div v-if="loading">
    <p class="md:text-xl">Content loading ...</p>
  </div>
  <div v-else class="flex justify-center my-5">
    <div class="flex flex-col items-center pt-5 mx-10 max-w-[1024px]">
      <div>
        <img class="max-w-full h-auto" src="../assets/images/placeholder-image.png" alt="">
        <h1
          class="flex lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-3xl text-xl my-1 font-bold leading-tight">
          {{ postItem.title }}
        </h1>
        <div class="flex my-3 space-x-4">
          <div class="">
            <img class="object-cover object-top rounded-full h-[100px] w-[100px] mb-3 border border-neutral-900" src="../assets/images/user-placeholder-image.png" alt="">
          </div>
          <div class="flex flex-col justify-center">
            <p class="md:text-lg text-sm font-semibold">{{ postItem.author }}</p>
            <p class="md:text-sm text-xs">{{ postItem.date }}</p>
          </div>
        </div>
      </div>
      <div>
        <article class="prose prose-sm my-3" v-html="postContent">
        </article>
      </div>
    </div>
  </div>
</template>
