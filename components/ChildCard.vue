<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>ID: {{ id }}</p>
    <p>状态：{{ isActive ? '激活' : '未激活' }}</p>
    <p>标签：{{ tags.join('、') }}</p>
    <p v-if="config">配置：{{ config.theme }}</p>
    <button @click="$emit('update:isActive', !props.isActive)">切换状态</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineEmits(['update:isActive'])
const props = defineProps({
  // 简单类型 + 必填
  id: {
    type: Number,
    required: true
  },
  // 带默认值
  title: {
    type: String,
    default: '默认标题'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  // 数组/对象默认值必须使用工厂函数
  tags: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: null
  }
})
</script>
