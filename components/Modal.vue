<!-- Modal.vue -->
<template>
  <!-- 使用指令：点击遮罩外部（即模态框内容外部）关闭模态框 -->
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div v-click-outside="close" class="modal-content">
      <h2>提示</h2>
      <p>{{ message }}</p>
      <button @click="close">确定</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  show: Boolean,
  message: String
})
const emit = defineEmits(['update:show'])

function close() {
  emit('update:show', false) // 通过 v-model:show 同步到父组件
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>
