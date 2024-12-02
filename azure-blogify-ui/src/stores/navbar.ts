import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useNavBarStore = defineStore('navbar', () => {
    const router = useRouter();
    const showSearchBar = ref(false);
    const searchString = ref("");

    function toggleSearchBar() {
        showSearchBar.value = !showSearchBar.value
    }

    async function search() {
        var searchquery = searchString.value.trim();
        if (searchquery !== "") router.push(`/search/${searchquery}`);
    }

    return { showSearchBar, toggleSearchBar, search, searchString }
})