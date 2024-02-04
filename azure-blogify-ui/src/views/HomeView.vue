<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore()
const increment = () => { store.increment() }
</script>

<template>
  <main>
  <button @click="increment">Add count</button>    
  <div class="text-3xl">Azure Blogify | Page Vists = {{store.count}}</div>
  <p>This is the Home page that will contain all the latest blog posts.</p>
  <div>
    <div><router-link to="/about">Go to About</router-link></div>
    <div><router-link to="/">Go to Home</router-link></div>
  </div>
  </main>
</template>
