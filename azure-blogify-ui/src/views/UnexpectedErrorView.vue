<script setup>
import ShrugIcon from '@/components/icons/ShrugIcon.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-svh">
    <ShrugIcon colour="#000000" class="h-44 w-44"/>
    <div class="bg-white p-8 rounded-lg text-center">
      <h1 class="text-4xl font-bold mb-4">Oops!</h1>
      <p class="text-gray-700 text-lg">Something went wrong. Please try again later.</p>
      <a href="/"><button class="mt-6 px-6 py-2 bg-black text-white rounded-3xl hover:bg-gray-600 focus:outline-none">
          Go Back
        </button></a>
    </div>
  </div>
</template>