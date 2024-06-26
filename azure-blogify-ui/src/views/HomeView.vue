<script setup>
import FeaturedPost from '@/components/FeaturedPost.vue';
import PostListItem from '@/components/PostListItem.vue';
import SpinLoader from '@/components/SpinLoader.vue';
import { onMounted, ref } from 'vue';

const responseData = ref([]);
const continuationToken = ref(null);
const pageSize = ref(4);
const error = ref(null);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    let url = `/api/GetPosts?pageSize=${pageSize.value}`;
    if (continuationToken.value) url += `&contToken=${continuationToken.value}`;
    const response = await fetch(url);
    if (!response.ok) {
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
  <div v-if="loading || error" class="flex min-h-svh items-center justify-center">
    <SpinLoader class="h-32" colour="#000000"/>
  </div>
  <div v-if="responseData.length && !loading" class="flex flex-col items-center mx-5">
    <div class="my-5">
        <h1 class="md:text-4xl text-3xl font-semibold mb-2 font-serif">Featured Post</h1>
      <router-link class="hover:cursor-pointer" v-if="responseData.length > 0" :to="'/post/' + responseData[0].category + '/' + responseData[0].id">
        <FeaturedPost class="my-5" :key="responseData[0].id" :title="responseData[0].title"
          :category="responseData[0].category" :date="responseData[0].date"
          :coverImageUrl="responseData[0].coverImageUrl" :author="responseData[0].author"
          :summary="responseData[0].summary" :tags="responseData[0].tags" />
      </router-link>
      <div class="relative -z-10" v-if="responseData.length > 1">
        <h1 class="md:text-3xl text-2xl font-semibold mb-2 font-serif">Latest Posts</h1>
        <router-link class="hover:cursor-pointer" v-for="post in responseData.slice(1)" :key="post.id"
          :to="'/post/' + post.category + '/' + post.id">
          <div>
          <PostListItem class="my-5" :key="post.id" :title="post.title" :category="post.category" :date="post.date"
            :coverImageUrl="post.coverImageUrl" />
          </div>
        </router-link>
      </div>
      <button v-if="continuationToken && !loading"
        class="bg-black rounded-xl w-full h-14 md:text-base text-sm uppercase text-white font-serif hover:cursor-pointer"
        @click="fetchData">
          More Posts
      </button>
    </div>
  </div>
</template>
