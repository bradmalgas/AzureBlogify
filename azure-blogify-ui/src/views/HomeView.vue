<script setup>
import FeaturedPost from '@/components/FeaturedPost.vue';
import PostListItem from '@/components/PostListItem.vue';
import { onMounted, ref } from 'vue';
import { azureFunctionApKey } from '../apiKeys.ts'

const responseData = ref(null);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetch("https://azure-blogify-api.azurewebsites.net/api/GetAllPosts?code="+azureFunctionApKey);
    if (!response.ok)
    {
      throw new Error('Failed to fetch data.');
    }
    const data = await response.json()
    responseData.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchData()
});
</script>

<template>
  <div class="flex flex-col items-center pt-11 mx-10">
    <div class="space-y-3">
      <FeaturedPost title="Breaking news: Being a genius coder who drinks a lot has been linked with 100% chance of being a gazillionaire!" date="20 April 1998"/>
      <router-link v-for="post in responseData"
        :key="post.id"
        :to="'/post/'+post.id">
        <PostListItem
          class="my-5"
          :key="post.id"
          :title="post.title"
          :date="post.date"/>
      </router-link>
    </div>
  </div>
</template>
