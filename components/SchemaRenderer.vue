<template>
  <component :is="renderSchema(schema)" />
</template>
<script setup>
import { h } from 'vue'
// 接收 schema 属性，可为对象或字符串
const props = defineProps({
  schema: {
    type: [Object, String],
    required: true
  }
})
/**
 * 将单个 schema 节点转为 VNode
 * @param {object|string} node
 */
/**
 * 核心递归渲染函数
 * @param {Object|String} node - schema 节点或文本
 * @returns {VNode}
 */
function renderSchema(node) {
  // 文本节点
  if (typeof node === 'string') {
    return node
  }

  const { type, props: rawProps = {}, children = [] } = node

  // 构建 h() 的第二个参数
  const vnodeProps = {}
  for (const [key, value] of Object.entries(rawProps)) {
    if (key === 'className') {
      // 统一转为 class
      vnodeProps.class = value
    } else if (key === 'style' && typeof value === 'object') {
      vnodeProps.style = value
    } else if (key.startsWith('on') && typeof value === 'function') {
      // 事件：onClick → onClick（Vue 直接识别）
      vnodeProps[key] = value
    } else if (key === 'value' || key === 'checked' || key === 'selected') {
      // 表单元素特殊属性
      vnodeProps[key] = value
    } else if (key === 'innerHTML') {
      vnodeProps.innerHTML = value
    } else {
      // 其他属性（id, name, placeholder, type 等）
      vnodeProps[key] = value
    }
  }

  // 递归处理子节点
  const childNodes = children.map((child) => renderSchema(child))

  // 使用 h() 创建 VNode
  // 若 type 是组件名，Vue 会从全局/局部注册中查找；原生 HTML 标签直接使用
  return h(type, vnodeProps, childNodes)
}

// 返回渲染函数
// return () => renderNode(props.schema);
</script>
