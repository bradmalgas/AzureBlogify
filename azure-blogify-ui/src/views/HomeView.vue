<script setup>
import FeaturedPost from '@/components/FeaturedPost.vue';
import PostListItem from '@/components/PostListItem.vue';
import SpinLoader from '@/components/SpinLoader.vue';
import { useCounterStore } from '@/stores/counter';
import { usePostStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const store = usePostStore();
const { latestPosts, latestPostsContinuationToken, latestPostsError, latestPostsLoading } = storeToRefs(store);

onMounted(async () => {
  await store.getPosts();
});
</script>

<template>
  <div v-if="latestPostsLoading || latestPostsError" class="flex min-h-svh items-center justify-center">
    <SpinLoader class="h-32" colour="#000000" />
  </div>
  <div v-if="latestPosts.length && !latestPostsLoading" class="flex flex-col items-center mx-5 lg:mx-20">
    <div class="my-5 lg:max-w-[60%] xl:max-w-[50%]">
      <h1 class="2xl:text-5xl md:text-4xl text-3xl font-semibold mb-2 font-serif">Featured Post</h1>
      <router-link class="hover:cursor-pointer" v-if="latestPosts.length > 0"
        :to="'/post/' + latestPosts[0].category + '/' + latestPosts[0].id">
        <FeaturedPost class="my-5" :key="latestPosts[0].id" :title="latestPosts[0].title"
          :category="latestPosts[0].category" :date="latestPosts[0].date" :coverImageUrl="latestPosts[0].coverImageUrl"
          :author="latestPosts[0].author" :summary="latestPosts[0].summary" :tags="latestPosts[0].tags" />
      </router-link>
      <div v-if="latestPosts.length > 1">
        <h1 class="md:text-3xl text-2xl font-semibold mb-2 font-serif">Latest Posts</h1>
        <router-link class="hover:cursor-pointer" v-for="post in latestPosts.slice(1)" :key="post.id"
          :to="'/post/' + post.category + '/' + post.id">
          <div>
            <PostListItem class="my-5" :key="post.id" :title="post.title" :category="post.category" :date="post.date"
              :coverImageUrl="post.coverImageUrl" :summary="post.summary" />
          </div>
        </router-link>
      </div>
      <button v-if="latestPostsContinuationToken && !latestPostsLoading"
        class="bg-black rounded-xl w-full h-14 md:text-base text-sm uppercase text-white font-serif hover:cursor-pointer"
        @click="store.fetchPosts">
        <!-- Update the store with more posts if we have a continuation token -->
        More Posts
      </button>
    </div>
  </div>
</template>
