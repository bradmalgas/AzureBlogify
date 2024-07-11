<script setup lang="ts">
import markdownIt from 'markdown-it';
import { debounce } from 'lodash';
import { ref, watch } from 'vue';
import type { PostModel } from '@/models/post-model';
import SpinLoader from '@/components/SpinLoader.vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import csharp from 'highlight.js/lib/languages/csharp';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
import { usePostStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';

const store = usePostStore();
const { upsertPostItem: postItem,
    upsertPostContent: postContent,
    upsertPostRenderedContent: renderedContent,
    isEdit: editMode,
    deletePostItemError,
    deletePostItemSuccess,
    deletePostItemLoading,
    upsertPostItemLoading,
    upsertPostItemSuccess,
    upsertPostItemError,
} = storeToRefs(store);
const showSubmitForm = ref(false)
const showModal = ref(false)

const modalTitle = ref("")
const modalText = ref("")

const toggleFormVisibility = () => {
    showSubmitForm.value = !showSubmitForm.value
}

const toggleModalVisibility = () => {
    showModal.value = !showModal.value
}

const deletePost = async () => {
    await store.deletePost()
    if (deletePostItemSuccess.value !== null) { modalText.value = "Blog item successfully deleted."; modalTitle.value = "Success" }
    else { modalText.value = `Could not delete blog item. Reason: ${deletePostItemError.value}`; modalTitle.value = "Error" }
    showModal.value = true
}

const submitPost = async () => {
    showSubmitForm.value = false
    await store.submitPost()
    if (upsertPostItemSuccess.value !== null) { modalText.value = "Blog item successfully posted."; modalTitle.value = "Success" }
    else { modalText.value = `Could not post blog item. Reason: ${upsertPostItemError.value}`; modalTitle.value = "Error" }
    showModal.value = true
}

watch(postContent, debounce(() => {
    renderedContent.value = md.render(postContent.value)
}, 400))

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
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('json', json);
</script>

<template>
    <!-- Markdown Editor -->
    <div class="mx-16 my-5">
        <div class="flex items-center mb-6">
            <h1 class="md:text-4xl text-3xl font-semibold font-serif">{{ editMode ? 'Edit Post' : 'Create Post' }}</h1>
            <div class="ml-auto space-x-3">
                <button @click="toggleFormVisibility"
                    class="max-w-fit px-6 py-2 bg-black text-white rounded-3xl hover:bg-gray-500 focus:outline-none transition-colors duration-200">
                    {{ editMode ? 'Publish Changes' : 'Publish Post' }}
                </button>

                <button v-if="editMode" @click="deletePost"
                    class="max-w-fit px-6 py-2 bg-black text-white rounded-3xl hover:bg-gray-500 focus:outline-none transition-colors duration-200">
                    Delete Article
                </button>
            </div>
        </div>
        <div class="flex h-svh space-x-3">
            <div class="flex flex-col h-full w-1/2 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <textarea v-model="postContent" class="h-full w-full p-4"
                    placeholder="Start typing to see the magic"></textarea>
            </div>
            <div class="overflow-y-scroll h-full w-1/2 border border-gray-300 rounded-lg py-5 px-3 shadow-sm">
                <article class="prose prose-base lg:prose-lg" v-html="renderedContent"></article>
            </div>
        </div>
    </div>

    <!-- Submit Blog Post Form -->
    <div @click="toggleFormVisibility" class="bg-black opacity-50 fixed inset-0 z-[10]"
        :class="{ 'block': showSubmitForm, 'hidden': !showSubmitForm }">
    </div>
    <div class="absolute py-5 px-40 max-h-fit max-w-fit z-[11] self-center bg-black rounded-3xl overflow-y-scroll"
        :class="{ 'block': showSubmitForm, 'hidden': !showSubmitForm }">
        <form @submit.prevent="submitPost" id="blog-details-form" class="flex flex-col items-center space-y-2">

            <h1 class="text-3xl text-white font-serif">Enter blog post details</h1>

            <div class="flex flex-col">
                <label class="text-white" for="title">Title:</label>
                <input v-model="postItem.title"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text" id="title"
                    name="title" placeholder='e.g. "How I Used the OpenAI API to build an automated budgeting app"'
                    required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="category">Category:</label>
                <input v-model="postItem.category"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text"
                    id="category" name="category" placeholder='e.g. "Tutorial"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="author">Author:</label>
                <input v-model="postItem.author"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text" id="author"
                    name="author" placeholder='e.g. "Tech TruthTalker"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="tags">Tags:</label>
                <input v-model="postItem.tags"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text" id="tags"
                    name="tags" placeholder='e.g. "Truth, Science, nature"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="coverImageUrl">Cover Image URL:</label>
                <input v-model="postItem.coverImageUrl"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text"
                    id="coverImageUrl" name="coverImageUrl"
                    placeholder='e.g. "https://storageazureblogify.blob.core.windows.net/blogimages/placeholder-image.png"'
                    required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="date">Date:</label>
                <input v-model="postItem.date"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text" id="date"
                    name="date" placeholder='e.g. "20th April 2024' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="summary">Summary:</label>
                <textarea v-model="postItem.summary"
                    class="min-h-32 min-w-[500px] resize-none rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="summary" name="summary"
                    placeholder='e.g. "This is a test description about this article. Nothing too detailed, just a bite sized summary."'
                    required></textarea>
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="disclaimer">Disclaimer:</label>
                <textarea v-model="postItem.disclaimer"
                    class="min-h-32 min-w-[500px] resize-none rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="disclaimer" name="disclaimer"
                    placeholder='e.g. "Disclaimer: This article was written in part by AI. This was purely for grammatical and syntactic checks. All the views, opinions and ideas expressed in this article are my own and you can find all the source code on GitHub."'
                    required></textarea>
            </div>

            <div class="w-full flex justify-evenly py-6">
                <input type="submit" form="blog-details-form"
                    class="max-w-fit px-6 py-2 bg-white  rounded-3xl hover:cursor-pointer hover:bg-gray-500 hover:text-white focus:outline-none transition-colors duration-200"
                    value="Submit" />

                <button @click="toggleFormVisibility" type="button"
                    class="max-w-fit px-6 py-2 bg-white  rounded-3xl hover:bg-gray-500 hover:text-white focus:outline-none transition-colors duration-200">
                    Back
                </button>
            </div>
        </form>
    </div>

    <!-- Result modal -->
    <div class="bg-black opacity-50 fixed inset-0 z-[10]" :class="{ 'block': showModal, 'hidden': !showModal }">
    </div>

    <div class="absolute p-5 space-y-5 rounded-3xl mt-64 self-center bg-white w-96 h-fit z-[11] flex justify-center"
        :class="{ 'block': showModal, 'hidden': !showModal }">


        <SpinLoader v-if="upsertPostItemLoading || deletePostItemLoading" class="h-32 w-32" colour="#000000" />

        <div v-else class="flex flex-col items-center justify-around space-y-5">
            <h1 class="font-bold text-lg">{{ modalTitle }}</h1>
            <p class="text-sm text-gray-600">{{ modalText }}</p>
            <button @click="toggleModalVisibility"
                class="max-w-fit px-6 py-2 bg-black text-white  rounded-3xl hover:bg-gray-500 focus:outline-none transition-colors duration-200">
                Okay
            </button>
        </div>
    </div>
</template>
