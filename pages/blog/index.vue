<template>
  <div class=" blog-list" style="min-height:360px;" >
    <h1>博客文章</h1>
    <blog/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blog'
})
useHead({
  title: '博客',
})
</script>

<style scoped>
.blog-list { max-width: 700px; margin: 0 auto; }
.meta { color: gray; font-size: 0.9em; }
</style>