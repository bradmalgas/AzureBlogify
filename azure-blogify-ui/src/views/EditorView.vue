<script setup lang="ts">
import markdownIt from 'markdown-it';
import { debounce } from 'lodash';
import { ref, watch } from 'vue';
import type { PostModel } from '@/models/post-model';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import csharp from 'highlight.js/lib/languages/csharp';
import 'highlight.js/styles/atom-one-dark.css';
import { useRouter } from 'vue-router';

const router = useRouter();
const postContent = ref("");
const renderedContent = ref("");
const showSubmitForm = ref(false);

const postTitle = ref("")
const postCategory = ref("")
const postAuthor = ref("")
const postTags = ref("")
const postCoverImageUrl = ref("")
const postDate = ref("")
const postSummary = ref("")
const postDisclaimer = ref("")

const toggleFormVisibility = () => {
    showSubmitForm.value = !showSubmitForm.value
}

const submitPost = async () => {
    const PostItem = {
        title: postTitle.value,
        category: postCategory.value,
        author: postAuthor.value,
        tags: postTags.value.split(","),
        coverImageUrl: postCoverImageUrl.value,
        date: postDate.value,
        summary: postSummary.value,
        disclaimer: postDisclaimer.value,
        content: postContent.value
    } as PostModel

    try {
        // Add loader
        const response = await fetch('/api/CreatePost', {
            method: 'POST',
            body: JSON.stringify(PostItem),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (!response.ok) {
            // Add a pop up to say it was not successfully added
        }
        else {
            // Add a pop up to say it was successfully added
            var responseBody = await response.json();
            router.push(`/post/${encodeURIComponent(responseBody.category)}/${responseBody.id}`);
        }
    } catch (error) {
        console.error('Error:', error)
    }
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
</script>

<template>
    <div class="mx-16 my-5">
        <div class="flex items-center mb-6">
            <h1 class="md:text-4xl text-3xl font-semibold font-serif">Edit Post</h1>
            <button @click="toggleFormVisibility"
                class="ml-auto max-w-fit px-6 py-2 bg-black text-white rounded-3xl hover:bg-gray-500 focus:outline-none transition-colors duration-200">
                Post Article
            </button>
        </div>
        <div class="flex h-svh space-x-3">
            <div class="flex flex-col h-full w-1/2 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <textarea v-model="postContent"
                    class="h-full w-full p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Start typing to see the magic"></textarea>
            </div>
            <div class="overflow-y-scroll h-full w-1/2 border border-gray-300 rounded-lg py-5 px-3 shadow-sm">
                <article class="prose prose-base lg:prose-lg" v-html="renderedContent"></article>
            </div>
        </div>
    </div>
    <div @click="toggleFormVisibility" class="bg-black opacity-50 fixed inset-0 z-[10]"
        :class="{ 'block': showSubmitForm, 'hidden': !showSubmitForm }">
    </div>
    <div class="absolute py-5 px-40 h-fit w-fit z-[11] self-center bg-black rounded-3xl overflow-y-scroll"
        :class="{ 'block': showSubmitForm, 'hidden': !showSubmitForm }">
        <form id="blog-details-form" class="flex flex-col items-center space-y-2">

            <h1 class="text-3xl text-white font-serif">Enter blog post details</h1>

            <div class="flex flex-col">
                <label class="text-white" for="title">Title:</label>
                <input v-model="postTitle" class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="title" name="title"
                    placeholder='e.g. "How I Used the OpenAI API to build an automated budgeting app"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="category">Category:</label>
                <input v-model="postCategory"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text"
                    id="category" name="category" placeholder='e.g. "Tutorial"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="author">Author:</label>
                <input v-model="postAuthor" class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="author" name="author" placeholder='e.g. "Tech TruthTalker"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="tags">Tags:</label>
                <input v-model="postTags" class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="tags" name="tags" placeholder='e.g. "Truth, Science, nature"' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="coverImageUrl">Cover Image URL:</label>
                <input v-model="postCoverImageUrl"
                    class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2" type="text"
                    id="coverImageUrl" name="coverImageUrl"
                    placeholder='e.g. "https://storageazureblogify.blob.core.windows.net/blogimages/placeholder-image.png"'
                    required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="date">Date:</label>
                <input v-model="postDate" class="min-w-[500px] rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="date" name="date" placeholder='e.g. "20th April 2024' required />
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="summary">Summary:</label>
                <textarea v-model="postSummary"
                    class="min-h-32 min-w-[500px] resize-none rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="summary" name="summary"
                    placeholder='e.g. "This is a test description about this article. Nothing too detailed, just a bite sized summary."'
                    required></textarea>
            </div>

            <div class="flex flex-col">
                <label class="text-white" for="disclaimer">Disclaimer:</label>
                <textarea v-model="postDisclaimer"
                    class="min-h-32 min-w-[500px] resize-none rounded-md text-sm shadow-sm placeholder-slate-400 p-2"
                    type="text" id="disclaimer" name="disclaimer"
                    placeholder='e.g. "Disclaimer: This article was written in part by AI. This was purely for grammatical and syntactic checks. All the views, opinions and ideas expressed in this article are my own and you can find all the source code on GitHub."'
                    required></textarea>
            </div>
        </form>

        <div class="w-full flex justify-evenly py-6">
            <button @click="submitPost"
                class="max-w-fit px-6 py-2 bg-white  rounded-3xl hover:bg-gray-500 hover:text-white focus:outline-none transition-colors duration-200">
                Submit
            </button>

            <button @click="toggleFormVisibility"
                class="max-w-fit px-6 py-2 bg-white  rounded-3xl hover:bg-gray-500 hover:text-white focus:outline-none transition-colors duration-200">
                Back
            </button>
        </div>
    </div>
</template>
