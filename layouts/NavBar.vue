<template>
  <nav class="navbar" :style="{ backgroundColor: `rgba(255, 0, 0, ${alpha})` }">
    <div class="nav-left">
      <router-link to="/" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/news" class="nav-item" active-class="active">动态</router-link>
      <router-link to="/ad-production" class="nav-item" active-class="active">广告制作</router-link>
      <router-link to="/task-list" class="nav-item" active-class="active">任务看板</router-link>
    </div>
    <div class="nav-right">
      <router-link to="/login" class="nav-item" active-class="active">登录</router-link>
      <router-link to="/register" class="nav-item" active-class="active">注册</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const alpha = ref(0)

const handleScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = 300
  alpha.value = Math.min(scrollY / maxScroll, 1)
}

// 根据路由决定是否启用滚动监听
const toggleScrollListener = (isHome) => {
  if (isHome) {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 立即执行一次
  } else {
    window.removeEventListener('scroll', handleScroll)
    alpha.value = 1 // 直接红色背景
  }
}

onMounted(() => {
  toggleScrollListener(route.path === '/')
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 路由变化时切换
watch(
  () => route.path,
  (newPath) => {
    toggleScrollListener(newPath === '/')
  }
)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}
.nav-left,
.nav-right {
  display: flex;
  gap: 30px;
}
.nav-item {
  font-size: 16px;
  color: #ffffff;
  padding: 5px 0;
  transition:
    color 0.3s,
    border-bottom 0.3s;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.nav-item:hover {
  color: #ffd700;
}
.nav-item.active {
  color: #ffd700;
  border-bottom: 2px solid #ffd700;
}
</style>
