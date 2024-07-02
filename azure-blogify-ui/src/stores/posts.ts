import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Post } from '@/models/post-model'
import { formatDate } from 'date-fns'
import markdownit from 'markdown-it'

export const usePostStore = defineStore('posts', () => {
  const latestPosts = ref([] as Post[])
  const latestPostsContinuationToken = ref(null as any)
  const latestPostsPageSize = ref(1)
  const latestPostsError = ref(null)
  const latestPostsLoading = ref(false)

  const searchResults = ref([] as Post[])
  const searchContinuationToken = ref(null as any)
  const searchPageSize = ref(1)
  const searchError = ref(null)
  const searchLoading = ref(false)
  const searchQueryString = ref('')

  const postItem = ref({} as Post)
  const postItemContent = ref(null as any)
  const postItemError = ref(null)
  const postItemLoading = ref(false)

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

  async function clearSearchResults() {
    searchResults.value = []
    searchContinuationToken.value = null
    searchError.value = null
    searchQueryString.value = ''
  }

  async function clearPostItem() {
    postItem.value = {} as Post
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

  async function fetchPostItem(id: string, category: string) {
    postItemLoading.value = true
    const md = new markdownit()
    try {
      const response = await fetch('/api/GetPostById?' + 'id=' + id + '&category=' + category)
      const data = await response.json()
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
    fetchSearchResults
  }
})
