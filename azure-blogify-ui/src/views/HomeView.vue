<script setup>
import FeaturedPost from '@/components/FeaturedPost.vue';
import PostItem from '@/components/PostItem.vue';
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'Quisque aliquam lorem nec arcu convallis scelerisque. Ut laoreet pharetra imperdiet. Vivamus dignissim fringilla augue sed accumsan. In sollicitudin urna.',
    date: "20 May 2024"
  },
  {
    id: 2,
    title: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus laoreet arcu sit amet erat dapibus.',
    date: "19 May 2024"
  },
  {
    id: 3,
    title: 'Vestibulum faucibus purus augue, aliquam pretium urna finibus id. Praesent tincidunt luctus leo, vitae rhoncus ex eleifend eu. Aenean aliquam.',
    date: "18 May 2024"
  },
  {
    id: 4,
    title: 'Fusce posuere, orci ut tempor suscipit, ipsum est tempor odio, ac placerat tortor neque non erat. Proin vulputate ornare felis.',
    date: "17 May 2024"
  },
  {
    id: 5,
    title: 'Mauris iaculis lacus vel nisl feugiat, in volutpat ex pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
    date: "16 May 2024"
  },
  {
    id: 6,
    title: 'Nullam dolor sapien, porta at neque a, condimentum malesuada est. Integer facilisis sodales cursus. Proin in elit turpis. Phasellus a.',
    date: "15 May 2024"
  },
  {
    id: 7,
    title: 'Phasellus mattis maximus eros, eu rhoncus turpis feugiat faucibus. Proin interdum consequat pulvinar. Quisque malesuada magna ut ligula gravida, quis.',
    date: "14 May 2024"
  }
]);
</script>

<template>
  <div class="flex flex-col items-center pt-11 mx-10">
    <div class="space-y-3">
      <FeaturedPost title="Breaking news: Being a genius coder who drinks a lot has been linked with 100% chance of being a gazillionaire!" date="20 April 1998"/>
      <PostItem v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :date="post.date"/>
    </div>
  </div>
</template>
