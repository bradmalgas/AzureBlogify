import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PostModel } from '@/models/post-model'
import { formatDate } from 'date-fns'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import csharp from 'highlight.js/lib/languages/csharp';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
import markdownIt from 'markdown-it'

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('json', json);

export const usePostStore = defineStore('posts', () => {
  const latestPosts = ref([] as PostModel[])
  const latestPostsContinuationToken = ref(null as any)
  const latestPostsPageSize = ref(4)
  const latestPostsError = ref(null)
  const latestPostsLoading = ref(false)

  const searchResults = ref([] as PostModel[])
  const searchContinuationToken = ref(null as any)
  const searchPageSize = ref(4)
  const searchError = ref(null)
  const searchLoading = ref(false)
  const searchQueryString = ref('')

  const postItem = ref({} as PostModel)
  const postItemContent = ref(null as any)
  const postItemError = ref(null)
  const postItemLoading = ref(false)

  const editPostItem = ref({} as PostModel)
  const editPostContent = ref("" as any)
  const editPostRenderedContent = ref("")
  const editPostItemError = ref(null)
  const editPostItemLoading = ref(false)

  async function fetchPosts() {
    latestPostsLoading.value = true
    try {
      let url = `/api/GetPosts?pageSize=${latestPostsPageSize.value}`
      if (latestPostsContinuationToken.value)
        url += `&contToken=${latestPostsContinuationToken.value}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch new posts.')
      }
      const data = await response.json()
      latestPosts.value.push(...data.posts)
      latestPostsContinuationToken.value = data.continuationToken
        ? encodeURIComponent(JSON.stringify(data.continuationToken))
        : null
    } catch (err: any) {
      latestPostsError.value = err.message
    } finally {
      latestPostsLoading.value = false
      return
    }
  }

  async function fetchSearchResults(query: string) {
    searchLoading.value = true
    try {
      let url = `/api/GetPosts?pageSize=${searchPageSize.value}&query=${query}`
      if (searchContinuationToken.value && query == searchQueryString.value)
        url = `/api/GetPosts?pageSize=${searchPageSize.value}&contToken=${searchContinuationToken.value}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch data.')
      }
      const data = await response.json()

      if (searchContinuationToken.value && query == searchQueryString.value)
        searchResults.value.push(...data.posts)
      else searchResults.value = data.posts

      searchContinuationToken.value = data.continuationToken
        ? encodeURIComponent(JSON.stringify(data.continuationToken))
        : null
      searchQueryString.value = query
    } catch (err: any) {
      await clearSearchResults()
      searchError.value = err.toString()
    } finally {
      searchLoading.value = false
      return
    }
  }

  async function fetchEditPostItem(id: string, category: string){
    editPostItemLoading.value = true
    const md = new markdownIt({
      highlight(str, lang, attrs) {
          if (lang) {
              try {
                  return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
              } catch (__) {
              }
          }
          return `<pre class="hljs"><code>${str}</code></pre>`;
      },
  });
    const itemIndex = latestPosts.value.findIndex((post) => post.id == id);
    var data
    try {
      if (itemIndex == -1)
        {
          console.log(`Item with id: ${id} and catergory: ${category} not found in latest posts. Calling API`)
          const response = await fetch('/api/GetPostById?' + 'id=' + id + '&category=' + category)
          data = await response.json()
      }
      else { 
        data = latestPosts.value[itemIndex]
      }
      editPostRenderedContent.value = md.render(data.content)
      editPostContent.value = data.content
      editPostItem.value = data
      editPostItemError.value = null
    } catch (err: any) {
      editPostItemError.value = err.toString()
    } finally {
      editPostItemLoading.value = false
      return
    }
  }

  async function fetchPostItem(id: string, category: string) {
    postItemLoading.value = true
    const md = new markdownIt({
      highlight(str, lang, attrs) {
          if (lang) {
              try {
                  return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
              } catch (__) {
              }
          }
          return `<pre class="hljs"><code>${str}</code></pre>`;
      },
  });
    const itemIndex = latestPosts.value.findIndex((post) => post.id == id);
    var data
    try {
      if (itemIndex == -1)
        {
          const response = await fetch('/api/GetPostById?' + 'id=' + id + '&category=' + category)
          data = await response.json()
      }
      else { 
        data = latestPosts.value[itemIndex]
      }
      postItemContent.value = md.render(data.content)
      postItem.value = data
      postItem.value.date = await stringToDate(data.date)
      postItemError.value = null
    } catch (err: any) {
      await clearPostItem()
      postItemError.value = err.toString()
    } finally {
      postItemLoading.value = false
      return
    }
  }

  async function clearSearchResults() {
    searchResults.value = []
    searchContinuationToken.value = null
    searchError.value = null
    searchQueryString.value = ''
  }

  async function clearPostItem() {
    postItem.value = {} as PostModel
    postItemContent.value = null
    postItemError.value = null
    postItemLoading.value = false
  }

  async function getPosts() {
    // Get initial list of posts
    if (latestPosts.value.length == 0) await fetchPosts()
    return
  }

  async function getSearchResults(query: string) {
    if (searchQueryString.value !== query) await fetchSearchResults(query)
    return
  }

  async function getPostItem(id: string, category: string) {
    if (id !== postItem.value.id) await fetchPostItem(id, category)
    return
  }

  async function stringToDate(date: string) {
    return formatDate(date, 'dd MMM yyyy')
  }

  return {
    latestPosts,
    latestPostsContinuationToken,
    latestPostsPageSize,
    latestPostsError,
    latestPostsLoading,
    searchResults,
    searchContinuationToken,
    searchPageSize,
    searchError,
    searchLoading,
    searchQueryString,
    postItem,
    postItemContent,
    postItemError,
    postItemLoading,
    getPosts,
    fetchPosts,
    getPostItem,
    getSearchResults,
    fetchSearchResults,
    editPostItem,
    editPostContent,
    editPostRenderedContent,
    editPostItemError,
    editPostItemLoading,
    fetchEditPostItem
  }
})
