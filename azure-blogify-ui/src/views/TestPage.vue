<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNavBarStore } from '@/stores/navbar';
import { ref } from 'vue';

const navbar = useNavBarStore();
const { showSearchBar } = storeToRefs(navbar);

const showSearchBarLocal = ref(false);
</script>

<template>
  <div>
    <div>Test to see what the fuck is going on</div>

    <div>
      <button @click="$event => showSearchBarLocal = !showSearchBarLocal">Local toggle</button>
      <div v-show="showSearchBarLocal">Local variable</div>
    </div>

    <div>
      <button @touchstart="$event => navbar.toggleSearchBar">Global toggle (with touch)</button>
      <div v-show="showSearchBar">Global variable</div>
    </div>

    <div>
      <button @click="$event => navbar.toggleSearchBar()">Global toggle (with value of)</button>
      <div v-show="showSearchBar.valueOf()">Global variable</div>
    </div>

    <div>
      <button @click="$event => navbar.toggleSearchBar()">Global toggle (without value)</button>
      <div v-show="showSearchBar">Global variable</div>
    </div>
  </div>
</template>

<style lang="postcss">
button {
  border-radius: 8px;
  margin: 1rem;
  border: 1px solid black;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}
</style>