<template>
  <div class="page-container">
    <h1>广告制作</h1>
    <p class="subtitle">创意视觉，精准传达</p>
    <div class="service-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="card-icon">{{ service.icon }}</div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const services = [
  { id: 1, icon: '🎬', title: '视频广告', desc: '创意脚本、高清拍摄、后期特效，打造品牌故事。' },
  { id: 2, icon: '🖼️', title: '平面设计', desc: '海报、画册、VI设计，提升品牌视觉识别度。' },
  { id: 3, icon: '📱', title: '数字营销', desc: '社交媒体运营、信息流广告，精准触达目标用户。' },
  { id: 4, icon: '💡', title: '创意策划', desc: '从策略到执行，提供全案广告策划服务。' }
]

</script>

<style scoped>

h1 {
  font-size: 36px;
  color: #c5a47e;
  margin-bottom: 10px;
  font-weight: 300;
  letter-spacing: 6px;
}
.subtitle {
  color: #aaa;
  margin-bottom: 50px;
  font-size: 18px;
}
.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}
.service-card {
  background: #15171e;
  padding: 40px 20px;
  border-radius: 8px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(197, 164, 126, 0.15);
}
.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
}
.service-card h3 {
  color: #e0e0e0;
  margin-bottom: 15px;
}
.service-card p {
  color: #888;
  line-height: 1.6;
}
</style>
