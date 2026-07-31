<template>
     <button @click="current = 'A'">组件 A</button>
    <button @click="current = 'B'">组件 B</button>
    <keep-alive>
      <component :is="current === 'A' ? ChildA : ChildB" :title="current" />
    </keep-alive>
    <test />
    <DropdownMenu />
    <button @click="showModal = true">打开模态框</button>
    <!-- v-model:show 是 v-model 的带参数写法，等价于 :show + @update:show -->
    <Modal v-model:show="showModal" message="你确定要执行此操作吗？" />
    <div>
      <!-- 1. 静态传参 -->
      <ChildCard :id="1" v-model:isActive="userActive1" title="静态标题" />

      <!-- 2. 动态传参 -->
      <ChildCard
        :id="userId"
        :title="dynamicTitle"
        :is-active="userActive"
        :tags="['Vue', 'React', 'Angular']"
        :config="{ theme: 'dark' }"
        @update:isActive="userActive = $event"
      />

      <!-- 3. 利用 v-bind 批量传参 -->
      <ChildCard v-bind="cardInfo" v-model:isActive="userActive2" />

      <!-- 4. 所有 prop 都不传，测试默认值 -->
      <ChildCard :id="99" v-model:isActive="userActive3" />
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const showModal = ref(false)
const userId = ref(100)
const dynamicTitle = ref('动态标题')
const userActive = ref(true)
const userActive1 = ref(false)
const userActive2 = ref(false)
const userActive3 = ref(false)

const cardInfo = reactive({
  id: 200,
  title: '通过 v-bind 传递',
  isActive: false,
  tags: ['JavaScript'],
  config: { theme: 'light' }
})

import ChildA from './test.vue'
// ref 包装基本类型，返回响应式引用，通过 .value 读写
import ChildB from './Footer.vue'

const current = ref('A')
</script>