<script setup lang="ts">
const props = defineProps({
    text: { type: String, required: true },
});
</script>

<template>
    <button
        class="bg-gray-100 py-1 px-4 max-w-fit rounded-full uppercase text-[8px] outline outline-1 outline-gray-800">{{
            props.text }}</button>
</template>