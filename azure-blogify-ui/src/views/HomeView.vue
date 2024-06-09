<script setup>
import FeaturedPost from '@/components/FeaturedPost.vue';
import PostListItem from '@/components/PostListItem.vue';
import { onMounted, ref } from 'vue';

const responseData = ref([]);
const continuationToken = ref(null);
const pageSize = ref(10);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    let url = `/api/GetPosts?pageSize=${pageSize.value}`;
    if (continuationToken.value) url += `&contToken=${continuationToken.value}`;
    const response = await fetch(url);
    if (!response.ok)
    {
      throw new Error('Failed to fetch data.');
    }
    const data = await response.json();
    responseData.value.push(...data.posts);
    continuationToken.value = data.continuationToken ? encodeURIComponent(JSON.stringify(data.continuationToken)) : null;
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
    <div class="space-y-3 mb-8">
      <FeaturedPost
        title="Breaking news: Being a genius coder who drinks a lot has been linked with 100% chance of being a gazillionaire!"
        date="20 April 1998" />
      <router-link v-for="post in responseData" :key="post.id" :to="'/post/' + post.category + '/' + post.id">
        <PostListItem class="my-5" :key="post.id" :title="post.title" :category="post.category" :date="post.date"
          :coverImageUrl="post.coverImageUrl" />
      </router-link>
      <button v-if="continuationToken && !loading" class="border-solid border-2 border-black rounded-lg w-full h-12 md:text-lg text-base" @click="fetchData">More Posts</button>
    </div>
  </div>
</template>
