<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SpinLoader from '@/components/SpinLoader.vue';
import PostListItem from '@/components/PostListItem.vue';
import ShrugIcon from '@/components/icons/ShrugIcon.vue';
import UnexpectedErrorView from './UnexpectedErrorView.vue';
import { usePostStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = usePostStore();

const {searchResults,searchContinuationToken,searchError,searchLoading,searchQueryString} = storeToRefs(store);

watch(() => route.params, fetchData, { immediate: true });

async function fetchData(params) {
  await store.getSearchResults(params.query);
    document.title = `Search for "${params.query}" - Brad Malgas Blog`;
};
</script>

<template>
  <div v-if="searchLoading" class="flex min-h-svh items-center justify-center">
    <SpinLoader colour="#000000" class="h-32" />
  </div>
  <div v-if="searchError">
      <UnexpectedErrorView />
    </div>
  <div v-else-if="searchResults && !searchLoading" class="flex flex-col items-center mx-5 lg:mx-96 min-h-svh">
    <div class="my-5">
    <h1 class="md:text-4xl text-3xl font-semibold font-serif">Search results for "{{ searchQueryString }}":</h1>
    <div v-if="searchResults.length == 0" class="flex flex-col items-center">
      <ShrugIcon colour="#000000" class="h-44 w-44" />
      <h1 class="text-3xl mb-4">No results found</h1>
    </div>
    <div v-else>
      <router-link class="hover:cursor-pointer" v-for="post in searchResults" :key="post.id"
        :to="'/post/' + post.category + '/' + post.id">
        <div>
          <PostListItem class="my-5" :key="post.id" :title="post.title" :category="post.category" :date="post.date"
            :coverImageUrl="post.coverImageUrl" :summary="post.summary" />
        </div>
      </router-link>
    </div>
    <button v-if="searchContinuationToken && !searchLoading"
      class="bg-black rounded-xl w-full h-14 md:text-base text-sm uppercase text-white font-serif hover:cursor-pointer"
      @click="store.fetchSearchResults(route.params.query)">
      More Posts
    </button>
    </div>
  </div>
</template>