<script setup>
import { ref, onMounted } from 'vue';
import { azureFunctionApKey } from '../apiKeys.ts'

const props = defineProps({
    id: String
});

const postItem = ref({});
const error = ref({});
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetch("https://azure-blogify-api.azurewebsites.net/api/GetPostById?code="+azureFunctionApKey+"&id="+props.id);
    if (!response.ok)
    {
      throw new Error('Failed to fetch data.');
    }
    const data = await response.json()
    postItem.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
})
</script>


<template>
    <div v-if="loading">
                <p class="md:text-xl">Content loading ...</p></div>
    <div v-else class="flex justify-center mx-10">
        <div class="flex flex-col items-center pt-5 mx-10 max-w-[1024px]">
            <div>
                <img class="max-w-full h-auto" src="../assets/images/placeholder-image.png" alt="">
                <h1
                    class="flex lg:max-w-[600px] max-w-[510px] sm:max-sm:max-w-[200px] md:text-3xl text-xl my-1 font-bold leading-tight">
                    {{ postItem.title }}
                </h1>
                <div class="flex my-3 space-x-4">
                    <div
                        class="flex justify-center md:w-24 md:h-24 w-16 h-16 rounded-full border-2 border-neutral-900 p-1">
                        <img class="" src="../assets/images/user-placeholder-image.png" alt="">
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="md:text-lg text-sm font-semibold">{{ postItem.author }}</p>
                        <p class="md:text-sm text-xs">{{ postItem.date }}</p>
                    </div>
                </div>
            </div>
            <div>
                <p class="md:text-xl">
                    {{ postItem.content }}
                </p>
            </div>
        </div>
    </div>
</template>
