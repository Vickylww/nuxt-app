<template>
  <section class="articles">
    <h2 class="section-title">热门推荐</h2>
    <div class="container">
      <div v-for="item in items" :key="item.id" class="article-card">
        <NuxtImg :src="item.img" :alt="item.desc" class="card-img"  format="webp"   width="347" height="200" loading="lazy"/>
        <div class="card-body">
          <h3>{{ item.title }}</h3>
          <p class="desc">{{ item.desc }}</p>
          <p class="date">{{ item.date }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    id: 1,
    img: '/assets/img.jpg',
    title: '数字化转型之路',
    desc: '如何利用新技术实现企业全面升级',
    date: '2026-06-15'
  },
  {
    id: 2,
    img: '/assets/img1.jpg',
    title: '品牌营销新趋势',
    desc: '2026年不可忽视的五大营销策略',
    date: '2026-06-10'
  },
  {
    id: 3,
    img: '/assets/img2.jpg',
    title: '广告创意实战分享',
    desc: '从洞察到执行的全程复盘',
    date: '2026-06-05'
  }
]
</script>

<style scoped>
.articles {
  background: #ffffff;
  padding: 80px 0;
}
.section-title {
  text-align: center;
  font-size: 32px;
  color: #c5a47e;
  margin-bottom: 50px;
  font-weight: 600;
  letter-spacing: 4px;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
   display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}

.article-card {
  background: #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 15px #aaa;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px #aaa;
}
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-body {
  padding: 20px;
}
.card-body h3 {
  color: #222;
  margin-bottom: 10px;
  font-weight: 500;
}
.desc {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}
.date {
  color: #C5A40A;
  font-size: 13px;
}
</style>
