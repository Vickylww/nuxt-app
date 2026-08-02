<template>
  <section class="services" aria-labelledby="services-heading">
      <!-- 隐藏的区域标题，对屏幕阅读器可见，对视觉用户隐藏 -->
      <h2 id="services-heading" class="sr-only">我们的服务</h2>
  
    <ul class="container">
      <li v-for="item in items" :key="item.id" class="service-card">
        <span class="service-icon" aria-hidden="true">{{ item.icon }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <span class="hover-line" aria-hidden="true"></span>
      </li>
    </ul>
  </section>
</template>

<script setup>
const items = [
  { id: 1, icon: '🎯', title: '产品广告', desc: '精准投放，提升品牌曝光与转化' },
  { id: 2, icon: '📈', title: '投放指南', desc: '数据驱动，优化广告投放策略' },
  { id: 3, icon: '📚', title: '营销学原', desc: '经典理论，指导实战营销创新' }
]
</script>

<style scoped>
.services {
  background-color: #ffffff;
  padding: 80px 0;
  container-type: inline-size;
}
.container {
 
  margin: 0 auto;
  display: flex;
  flex-direction: column;
   gap: var(--service-card-gap);
  justify-content: space-between;
  padding: 0 20px;
}
   @container (min-width: 800px) {
      .container {
          flex-direction: row;
          flex-wrap: nowrap;
      }
  }
.service-card {
  flex-direction: column;
    flex: 1 1 0%;
  text-align: center;
  padding: 40px 20px;
  background: #ffffff;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
  @container (max-width: 799px) {
          .service-card {
              flex: 1 1 auto;
          }
      }
.service-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}
.service-icon {
  font-size: 48px;
  margin-bottom: 20px;
}
.service-card h3 {
  color: #222;
  margin-bottom: 15px;
  font-weight: 500;
}
.service-card p {
  color: #666;
  line-height: 1.6;
}
.hover-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 3px;
  background-color: #c0392b;
  transition: none;
  transform-origin: center;
}
.service-card:hover .hover-line {
  transform: translateX(-50%) scaleX(1);
  transition: transform 0.3s ease;
}
</style>
