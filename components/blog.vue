<template>
  <div class=" blog-list" >
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">加载失败：{{ error.message }}</div>
    <ul v-else-if="articles && articles.length">
      <li v-for="article in articles" :key="article.slug">
        <NuxtLink :to="`/blog/${article.slug}`">
          <h2>{{ article.title }}</h2>
        </NuxtLink>
       
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 获取当前请求的 origin，拼接完整 API URL
const { origin } = useRequestURL()
const apiUrl = `${origin}/nuxt-app/api/public-articles`

const { data: articles, pending, error } = await useAsyncData(
  'blog-list',
  () => $fetch(apiUrl)
)

</script>

<style scoped>
.blog-list { max-width: 700px; margin: 0 auto; }
.meta { color: gray; font-size: 0.9em; }
</style>