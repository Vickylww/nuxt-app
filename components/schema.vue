<template>
     <div class="toolbar">
      <button @click="currentCase = 'form'">📋 我要制作广告</button>
      <button @click="currentCase = 'page'">🏗️ 我是代理商</button>
    </div>
    <!-- 渲染引擎入口 -->
    <SchemaRenderer :schema="currentSchema" />
</template>
<script setup>
import { computed, ref } from 'vue'
const currentCase = ref('form')
const formSchema = {
  type: 'div',
  props: { className: 'dynamic-form' },
  children: [
    { type: 'h2', props: {}, children: ['📝 用户注册'] },
    {
      type: 'div',
      props: { className: 'form-group' },
      children: [
        { type: 'label', props: { for: 'username' }, children: ['用户名'] },
        { type: 'input', props: { name: 'username', id: 'username', placeholder: '请输入用户名' } }
      ]
    },
    {
      type: 'div',
      props: { className: 'form-group' },
      children: [
        { type: 'label', props: { for: 'email' }, children: ['电子邮箱'] },
        {
          type: 'input',
          props: { name: 'email', id: 'email', type: 'email', placeholder: 'you@example.com' }
        }
      ]
    },
    {
      type: 'div',
      props: { className: 'form-group' },
      children: [
        { type: 'label', props: { for: 'role' }, children: ['角色'] },
        {
          type: 'select',
          props: { name: 'role', id: 'role' },
          children: [
            { type: 'option', props: { value: 'user' }, children: ['普通用户'] },
            { type: 'option', props: { value: 'admin' }, children: ['管理员'] },
            { type: 'option', props: { value: 'editor' }, children: ['编辑'] }
          ]
        }
      ]
    },
    {
      type: 'button',
      props: {
        type: 'button',
        className: 'btn-submit',
        onClick: (event) => {
          // 找到按钮所在的表单容器（此处不是标准 form，但我们可以向上找）
          const container = event.currentTarget.closest('.dynamic-form')
          if (!container) return
          // 从容器中提取所有输入值
          const data = {}
          container.querySelectorAll('input, select').forEach((el) => {
            if (el.name) {
              data[el.name] = el.type === 'checkbox' ? el.checked : el.value
            }
          })
          alert('📦 表单数据:\n' + JSON.stringify(data, null, 2))
        }
      },
      children: ['✅ 提交注册']
    }
  ]
}
const pageSchema = {
  type: 'div',
  children: [
    {
      type: 'header',
      props: { className: 'page-header' },
      children: [
        { type: 'h1', children: ['🌐 Schema 搭建的页面'] },
        { type: 'p', children: ['完全由 JSON 驱动的动态界面'] }
      ]
    },
    {
      type: 'section',
      props: { className: 'card' },
      children: [
        { type: 'h3', children: ['💡 什么是 Schema 驱动？'] },
        {
          type: 'p',
          children: [
            '使用结构化 JSON 描述 UI 布局与行为，渲染引擎将其高效转化为真实 DOM。特别适合低代码平台与动态页面。'
          ]
        }
      ]
    },
    {
      type: 'section',
      props: { className: 'card' },
      children: [
        { type: 'h3', children: ['📌 核心特性'] },
        {
          type: 'ul',
          children: [
            { type: 'li', children: ['递归组件渲染，任意嵌套'] },
            { type: 'li', children: ['智能属性映射（class、style、事件）'] },
            { type: 'li', children: ['极简 API，易于扩展'] }
          ]
        }
      ]
    },
    {
      type: 'footer',
      props: { className: 'page-footer' },
      children: [{ type: 'p', children: ['© 2026 Vue 3 Schema Engine'] }]
    }
  ]
}
// 根据当前案例选择 Schema
const currentSchema = computed(() => {
  return currentCase.value === 'form' ? formSchema : pageSchema
})
</script>