<template>
  <div class=" blog-list" >
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">加载失败：{{ error.message }}</div>
    <ul v-else-if="articles && articles.length">
      <li v-for="article in articles" :key="article.slug" :title="ccc == article.title">
        <NuxtLink :to="`/blog/${article.slug}`">
          <h2  :class="ccc == article.title ? 'active' : ''">{{ article.title }}</h2>
        </NuxtLink>
       
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 获取当前请求的 origin，拼接完整 API URL  ${origin}/nuxt-app
const { origin } = useRequestURL()
const apiUrl = `/api/public-articles`
const route = useRoute()
const { data: articles, pending, error } = await useAsyncData(
  'blog-list',
  () => $fetch(apiUrl)
)
let ccc= route.params.slug
// 监听路由变化（可选）
watch(() => route.path, (newPath) => {
   ccc= newPath.split('/')[2]
})
</script>

<style scoped>
.blog-list { max-width: 700px; margin: 0 auto; }
.meta { color: gray; font-size: 0.9em; }
.blog-list .active{color:red;}
</style>