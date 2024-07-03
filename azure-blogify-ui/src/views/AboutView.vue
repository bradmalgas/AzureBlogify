<script setup lang="ts">
import AboutMe from '@/components/AboutMe.vue';
import { onMounted } from 'vue';
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center pt-5 px-5 md:max-w-[768px] lg:max-w-[1024px]">
      <AboutMe />
      <div class="my-6 space-y-3 text-sm">
        <p>Brad Malgas is an innovative software developer with 6 years of experience specializing in developing,
          deploying, and managing cloud-based systems. He is an intermediate .NET developer and Azure cloud enthusiast
          with a strong passion for building cloud-native solutions. Proven proficiency in designing and coding robust
          applications using multiple programming languages, Brad is an expert in leveraging Azure DevOps for seamless
          CI/CD operations and utilizing infrastructure-as-code for efficient resource management. His demonstrated
          ability to enhance application functionality and performance through backend API development highlights his
          commitment to delivering high-quality solutions.</p>
        <p>Brad is dedicated to continuous learning and professional growth, with a particular passion for Microsoft
          technologies and Azure cloud solutions. His adept project leadership skills have consistently led to
          successful completions ahead of schedule, contributing significantly to operational improvements and cost
          savings.</p>
      </div>
    </div>
  </div>
</template>

<style></style>
