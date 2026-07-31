<template>
  <div class="dropdown">
    <button @click="toggleMenu">
      操作
      <span v-if="menuVisible">▲</span>
      <span v-else>▼</span>
    </button>
    <!-- 下拉菜单，绑定点击外部指令 -->
    <ul v-if="menuVisible" v-click-outside="closeMenu" class="dropdown-menu">
      <li @click="handleAction('edit')">编辑</li>
      <li @click="handleAction('delete')">删除</li>
      <li @click="handleAction('share')">分享</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuVisible = ref(false)

function toggleMenu() {
  menuVisible.value = !menuVisible.value
}

function closeMenu() {
  menuVisible.value = false
}

function handleAction(action) {
  console.log('执行操作：', action)
  // 执行对应操作后，一般也要关闭菜单
  closeMenu()
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 0;
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 4px 0 0 0;
}
.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background: #f0f0f0;
}
</style>
