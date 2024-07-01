<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SpinLoader from '@/components/SpinLoader.vue';
import PostListItem from '@/components/PostListItem.vue';
import ShrugIcon from '@/components/icons/ShrugIcon.vue';
import UnexpectedErrorView from './UnexpectedErrorView.vue';

const route = useRoute();
const responseData = ref([]);
const continuationToken = ref(null);
const pageSize = ref(4);
const error = ref(null);
const loading = ref(false);
const queryString = ref("");

watch(() => route.params, fetchData, { immediate: true });

async function fetchData(params) {
  queryString.value = params.query;
  loading.value = true;
  try {
    let url = `/api/GetPosts?pageSize=${pageSize.value}&query=${params.query}`;
    if (continuationToken.value) url += `&contToken=${continuationToken.value}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const data = await response.json();
    const existingIds = new Set(responseData.value.map(post => post.id));
    const newPosts = data.posts.filter(post => !existingIds.has(post.id));
    responseData.value.push(...newPosts);
    continuationToken.value = data.continuationToken ? encodeURIComponent(JSON.stringify(data.continuationToken)) : null;
    document.title = `Search for "${params.query}" - Brad Malgas Blog`;
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="loading" class="flex min-h-svh items-center justify-center">
    <SpinLoader colour="#000000" class="h-32" />
  </div>
  <div v-if="error">
      <UnexpectedErrorView />
    </div>
  <div v-else-if="responseData && !loading" class="flex flex-col items-center mx-5 lg:mx-96 min-h-svh">
    <div class="my-5">
    <div v-if="responseData.length == 0" class="flex flex-col items-center justify-center">
      <ShrugIcon colour="#000000" class="h-44 w-44" />
      <h1 class="text-3xl mb-4">No results found</h1>
    </div>
    <div v-else>
      <h1 class="md:text-4xl text-3xl font-semibold font-serif">Search results found for "{{ queryString }}"</h1>
      <router-link class="hover:cursor-pointer" v-for="post in responseData" :key="post.id"
        :to="'/post/' + post.category + '/' + post.id">
        <div>
          <PostListItem class="my-5" :key="post.id" :title="post.title" :category="post.category" :date="post.date"
            :coverImageUrl="post.coverImageUrl" :summary="post.summary" />
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