<template>
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
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 其他按钮可留空或添加提示
const items = reactive([
  { label: '在线客服', icon: '💬', active: false, action: () => '' },
  { label: '致电顾问', icon: '📞', active: false, action: () => '' },
  { label: '手机下载', icon: '📱', active: false, action: () => '' },
  { label: '帮助中心', icon: '❓', active: false, action: () => router.push('/help-center') },
  { label: '返回顶部', icon: '⬆️', active: false, action: scrollToTop }
])
</script>

<style scoped>
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
