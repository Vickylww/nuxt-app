<template>
  <nav class="navbar" :style="{ backgroundColor: `rgba(255, 0, 0, ${alpha})` }">
    <div class="nav-left">
      <router-link to="/" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/news" class="nav-item" active-class="active">动态</router-link>
      <router-link to="/adproduction" class="nav-item" active-class="active">广告制作</router-link>
      <router-link to="/tasklist" class="nav-item" active-class="active">任务看板</router-link>
      <router-link to="/helpcenter" class="nav-item" active-class="active">帮助中心</router-link>
    </div>
    <div class="nav-right">
      <router-link to="/login" class="nav-item" active-class="active">登录</router-link>
      <router-link to="/register" class="nav-item" active-class="active">注册</router-link>
    </div>
  </nav>
      <main class="flex-grow">
      <slot />
        <div class="right-sidebar">
            <ul>
            <li
                v-for="item in items"
                :key="item.label"
                :class="['sidebar-item', { active: item.active }]"
                @mouseenter="item.active = true"
                @mouseleave="item.active = false"
                @click="item.action"
            >
                <span class="item-text">{{ item.label }}</span>
                <span class="item-icon">{{ item.icon }}</span>
            </li>
            </ul>
        </div>
    </main>
    <footer class="footer">
        <div class="footer-content">
            <p>© 2026 企业官网 | 联系我们</p>
            <p>电话：400-123-4567 | 邮箱：contact@example.com</p>
        </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch,reactive } from 'vue'
// import { useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const alpha = ref(0)



const handleScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = 300
  alpha.value = Math.min(scrollY / maxScroll, 1)
}

// 根据路由决定是否启用滚动监听
const toggleScrollListener = (isIndex) => {
  if (isIndex) {
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 其他按钮可留空或添加提示
const items = reactive([
  { label: '在线客服', icon: '💬', active: false, action: () => '' },
  { label: '致电顾问', icon: '📞', active: false, action: () => '' },
  { label: '手机下载', icon: '📱', active: false, action: () => '' },
  { label: '帮助中心', icon: '❓', active: false, action: () => router.push('/helpcenter') },
  { label: '返回顶部', icon: '⬆️', active: false, action: scrollToTop }
])

</script>

<style scoped>
main .flex-grow{martin-top:60px;}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.navbar a{padding:0 20px;}
.nav-left{margin-left:20px;}
.nav-right{margin-right:20px;}
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
 
}
.nav-left a{text-decoration:none}

.footer {
  width: 100%;
  color: #000;
  text-align: center;
  padding: 30px 0px;
  font-size: 14px;
  line-height: 1.8;
}
.footer-content p {
  margin: 5px 0;
}
.right-sidebar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  position: relative;
  height: 48px;
  transition: all 0.3s ease;
}

.item-icon {
  width: 48px;
  height: 48px;
  background-color: rgba(197, 164, 126, 0.9); /* 与网站金色主题一致 */
  color: #0b0c10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 4px 0 0 4px;
  transition:
    background-color 0.3s,
    border-radius 0.3s;
  z-index: 2;
}

.item-text {
  background-color: rgba(21, 23, 30, 0.95);
  color: #e0e0e0;
  white-space: nowrap;
  padding: 0;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-radius: 0 4px 4px 0;
  max-width: 0;
  overflow: hidden;
  transition:
    max-width 0.3s ease,
    padding 0.3s ease;
  box-shadow: none;
}

/* 悬停时展开文字 */
.sidebar-item:hover .item-text,
.sidebar-item.active .item-text {
  max-width: 120px; /* 足够显示文字 */
  padding: 0 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* 展开时图标颜色微调 */
.sidebar-item:hover .item-icon {
  background-color: #b8956a;
}
</style>
