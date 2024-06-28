<template>
    <p class="text-[10px] font-light text-gray-800 italic leading-none">{{ text }}</p>
</template>

<script setup>
const props = defineProps({
    text: {type:  String, required: true}
})
</script>