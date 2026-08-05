<template>
  <div class="blog-layout">
    <!-- 博客专属导航栏，可与企业官网不同 -->
    <header class="blog-header">
      <nav>
        <NuxtLink to="/" class="logo" active-class="active">企业官网</NuxtLink>
        <NuxtLink to="/blog" class="logo" active-class="active">博客文章</NuxtLink>
        <NuxtLink to="/admin" class="logo" active-class="active">新增文章</NuxtLink>
      </nav>
    </header>

    <!-- 主体内容区域，通过 slot 插入页面组件 -->
    <main >
        <slot />
    </main>

    <!-- 博客专属页脚 -->
    <footer class="blog-footer">
      <p>© 2025 企业官网 - 博客</p>
    </footer>
  </div>
</template>

<script setup>
// 这里可以写博客布局的逻辑，如获取侧边栏数据
</script>

<style scoped>
.blog-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 6%;
}
.blog-header {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.blog-header nav {
  display: flex;
  gap: 20px;
}
.blog-header a {
  text-decoration: none;
  color: #333;
}
.logo.active {
  color: #c5a47e;
 
}
.blog-footer {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  text-align: center;
}
</style>