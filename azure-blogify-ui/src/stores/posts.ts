import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { PostModel } from '@/models/post-model'
import { formatDate } from 'date-fns'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import csharp from 'highlight.js/lib/languages/csharp'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/atom-one-dark.css'
import markdownIt from 'markdown-it'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('json', json)

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

  const upsertPostItem = ref({} as PostModel)
  const upsertPostContent = ref('' as any)
  const upsertPostRenderedContent = ref('')
  const upsertPostItemError = ref(null)
  const upsertPostItemSuccess = ref(null)
  const upsertPostItemLoading = ref(false)

  const isEdit = computed(() => {
    return upsertPostItem.value.id !== undefined
  })
  const showSubmitForm = ref(false)
  const showModal = ref(false)
  const modalTitle = ref("")
  const modalText = ref("")

  const deletePostItemError = ref(null)
  const deletePostItemSuccess = ref(null as any)
  const deletePostItemLoading = ref(false)

  async function fetchPosts() {
    latestPostsLoading.value = true
    try {
      let url = `/api/GetPosts?pageSize=${latestPostsPageSize.value}`
      if (latestPostsContinuationToken.value)
        url += `&contToken=${latestPostsContinuationToken.value}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}. Failed to fetch new posts.`)
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

  async function submitPost() {
    upsertPostItemLoading.value = true
    showSubmitForm.value = false
    showModal.value = true
    const tagsArray = upsertPostItem.value.tags.toString().split(",")
    const PostItem = {
        title: upsertPostItem.value.title,
        category: upsertPostItem.value.category,
        author: upsertPostItem.value.author,
        tags: tagsArray,
        coverImageUrl: upsertPostItem.value.coverImageUrl,
        date: upsertPostItem.value.date,
        summary: upsertPostItem.value.summary,
        disclaimer: upsertPostItem.value.disclaimer,
        content: upsertPostContent.value
    } as PostModel

    if (isEdit.value) PostItem.id = postItem.value.id

    try {
        const response = await fetch('/api/UpsertPost', {
            method: 'POST',
            body: JSON.stringify(PostItem),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const data = await response.json()
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}. Failed to create new post.`)
        }
        upsertPostItemSuccess.value = data
        modalText.value = "Blog item successfully posted.";
        modalTitle.value = "Success"
        upsertPostItemError.value = null
        await clearUpsertItem()
        await clearLatestPosts()
        await fetchPosts()
    } catch (error: any) {
      upsertPostItemError.value = error
      upsertPostItemSuccess.value = null
      modalText.value = `Could not post blog item. Reason: ${upsertPostItemError.value}`;
      modalTitle.value = "Error"
    } finally {
      upsertPostItemLoading.value = false
    }
}



  async function deletePost() {
    const id = upsertPostItem.value.id
    const category = upsertPostItem.value.category

    deletePostItemLoading.value = true
    showModal.value = true
    try {
      let url = `/api/DeletePost?id=${id}&category=${encodeURIComponent(category)}`
      const response = await fetch(url, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}. Failed to delete post.`)
      }
      deletePostItemSuccess.value = "Item successfully deleted"
      deletePostItemError.value = null
      modalText.value = deletePostItemSuccess.value;
      modalTitle.value = "Success"
      await clearUpsertItem()
      latestPosts.value = latestPosts.value.filter((post) => post.id !== id)
    } catch (error: any) {
      deletePostItemSuccess.value = null
      deletePostItemError.value = error.message
      modalText.value = `Could not delete blog item. Reason: ${deletePostItemError.value}`;
      modalTitle.value = "Error"
    } finally {
      deletePostItemLoading.value = false
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
        throw new Error(`${response.status}: ${response.statusText}. Failed to fetch search results.`)
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

  async function fetchEditPostItem(id: string, category: string) {
    upsertPostItemLoading.value = true
    const md = new markdownIt({
      highlight(str, lang, attrs) {
        if (lang) {
          try {
            return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
          } catch (__) {}
        }
        return `<pre class="hljs"><code>${str}</code></pre>`
      }
    })
    const itemIndex = latestPosts.value.findIndex((post) => post.id == id)
    var data
    try {
      if (itemIndex == -1) {
        const response = await fetch('/api/GetPostById?' + 'id=' + id + '&category=' + category)
        data = await response.json()
      } else {
        data = latestPosts.value[itemIndex]
      }
      upsertPostRenderedContent.value = md.render(data.content)
      upsertPostContent.value = data.content
      upsertPostItem.value = data
      upsertPostItemError.value = null
    } catch (err: any) {
      upsertPostItemError.value = err.toString()
    } finally {
      upsertPostItemLoading.value = false
      return
    }
  }

  async function fetchPostItem(id: string, category: string) {
    postItemLoading.value = true
    const md = new markdownIt({
      highlight(str, lang, attrs) {
        if (lang) {
          try {
            return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
          } catch (__) {}
        }
        return `<pre class="hljs"><code>${str}</code></pre>`
      }
    })
    const itemIndex = latestPosts.value.findIndex((post) => post.id == id)
    var data
    try {
      if (itemIndex == -1) {
        const response = await fetch('/api/GetPostById?' + 'id=' + id + '&category=' + category)
        data = await response.json()
      } else {
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

  async function clearUpsertItem() {
    upsertPostItem.value = {} as PostModel
    upsertPostContent.value = '' as any
    upsertPostRenderedContent.value = ''
    upsertPostItemError.value = null
    upsertPostItemLoading.value = false
  }

  async function clearLatestPosts() {
    latestPosts.value = [] as PostModel[]
    latestPostsContinuationToken.value = null as any
    latestPostsError.value = null
    latestPostsLoading.value = false
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
    upsertPostItem,
    upsertPostContent,
    upsertPostRenderedContent,
    upsertPostItemError,
    upsertPostItemSuccess,
    upsertPostItemLoading,
    isEdit,
    fetchEditPostItem,
    deletePost,
    submitPost,
    deletePostItemError,
    deletePostItemSuccess,
    deletePostItemLoading,
    showSubmitForm,
    showModal,
    modalTitle,
    modalText
  }
})
