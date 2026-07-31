<template>
  <div class="page-container">
    <h1>企业动态</h1>
    <div class="news-list">
      <div v-for="item in news" :key="item.id" class="news-item">
        <h3>{{ item.title }}</h3>
        <p class="date">{{ item.date }}</p>
        <p>{{ item.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const news = ref([
  {
    id: 1,
    title: '公司荣获2026年度创新企业大奖',
    date: '2026-05-20',
    summary: '在近日举行的行业峰会上，我司凭借出色的技术实力荣获年度创新企业称号。'
  },
  {
    id: 2,
    title: '新产品发布会圆满成功',
    date: '2026-04-10',
    summary: '新一代智能解决方案正式发布，吸引了众多客户和媒体的关注。'
  },
  {
    id: 3,
    title: '与多家知名企业达成战略合作',
    date: '2026-03-05',
    summary: '公司将与合作伙伴共同开拓国际市场，推动数字化转型。'
  }
])
</script>

<style scoped>

</style>
