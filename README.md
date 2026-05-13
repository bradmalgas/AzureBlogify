# AzureBlogify

AzureBlogify is a personal blog prototype built around Azure Static Web Apps. The idea is to keep the frontend light, host it cheaply, and leave room for blog content to come from Azure services instead of hardcoded pages.

## Why This Exists

I wanted a small project that tied together a real cloud hosting story:

- Static frontend hosting through Azure Static Web Apps.
- A Vue UI that can grow into a proper blog editor/reader.
- Azure Functions and Cosmos DB as the planned backend path.
- Pipeline and deployment files checked in so the infrastructure story is visible.

## What It Does Today

- Runs a Vue 3 blog UI from `azure-blogify-ui/`.
- Includes Azure deployment templates and pipeline files.
- Uses Pinia, Vue Router, Tailwind, Flowbite, Markdown parsing, and syntax highlighting.
- Keeps the app simple enough to understand without needing a big backend running locally.

## Stack

- Vue 3 and TypeScript
- Vite
- Pinia and Vue Router
- Tailwind CSS and Flowbite
- Azure Static Web Apps
- Azure Functions and Cosmos DB planned for the backend

## Local Setup

```bash
cd azure-blogify-ui
npm install
npm run dev
```

Useful checks:

```bash
npm run build
npm run test:unit
npm run lint
```

## Status

This is an Azure-focused blog prototype. The strongest part of the repo is the hosting/deployment direction and the Vue frontend foundation. The backend content pipeline is still the next natural step.

## Project Notes

- Root Azure deployment files show the intended cloud setup.
- The frontend app lives in `azure-blogify-ui/`.
- The README is intentionally short so reviewers can quickly understand the purpose, stack, and how to run it.
