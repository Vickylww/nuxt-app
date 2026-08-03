<template>
    <div class="blogbox">

    
    <div class="blog-main">
        <div class="blog-content">
            <div v-if="pending">加载中...</div>
            <div v-else-if="error">加载失败：{{ error.message }}</div>
            <article  v-else-if="article">
                <h1>{{ article.title  }}</h1>
                <p class="meta">{{ article.createdAt  }}</p>
                 <div class="content" v-html="article.html" />
            </article>
             <div v-else>文章不存在</div>
        </div>
        <aside class="blog-sidebar">
            <h3>最新文章</h3>
            <blog/>
        </aside>
    </div>
    </div>
</template>
<script setup lang="ts">
// 指定使用 layouts/blog.vue
definePageMeta({
  layout: 'blog'
})


const route = useRoute()


const { data: article,pending, error } = await useAsyncData(
  `article-${route.params.slug}`,
  () => $fetch(`/api/public-articles/${route.params.slug}`)
)

useHead({
  title: computed(() => article.value?.title || '文章'),
  meta: [
    { name: 'description', content: computed(() => article.value?.description) }
  ]
})
</script>

<style scoped>
.article-page {
  max-width: 800px;
}
.content {
  line-height: 1.8;
  font-size: 16px;
}
.meta {
  color: #666;
  margin: 10px 0 20px;
}
.blogbox{ container-type:inline-size;}
.article-page h1{margin:0;}
.blog-main {
  display: flex;
  gap: 40px;
  margin-top: 20px;
 
}
.blog-content {
 width:1000px;overflow:hidden;
}
.blog-content pre code {
  white-space: pre-wrap;
  word-break: break-word;
}
.blog-sidebar {
  width: 250px;
}
   @container (max-width: 700px) {
      .blog-main {
          flex-direction:column-reverse;
          flex-wrap: nowrap;
      }
      .blog-content {
        width:100%;
        }
      .blog-sidebar{text-align: center;width:100%}
   
  }
</style>