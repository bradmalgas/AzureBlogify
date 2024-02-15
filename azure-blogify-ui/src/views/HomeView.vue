<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore()
const increment = () => { store.increment() }
</script>

<template>
  <main>  
  <div class="text-3xl">Page Vists = {{store.count}} </div>  
  <button @click="increment" class="border-solid border-2 border-sky-500">Add count</button>  
  <p>This is the Home page that will contain all the latest blog posts.</p>
  </main>
</template>
