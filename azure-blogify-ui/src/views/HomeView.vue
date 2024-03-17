<script setup lang="ts">
import FeaturedPost from '@/components/FeaturedPost.vue';
import PostItem from '@/components/PostItem.vue';

</script>

<template>
  <div class="flex flex-col items-center pt-11 mx-10">
    <div class="space-y-3">
      <FeaturedPost/>
      <PostItem/>
      <PostItem/>
      <PostItem/>
      <PostItem/>
      <PostItem/>
    </div>
  </div>
</template>
