<template>
  <section class="news-slider-section" aria-labelledby="news-section-title">
    <!-- 左侧 451px 内容块 -->
    <div class="news-left-wrapper">
      <h2 id="news-section-title" class="section-title">最新动态</h2>
      <div class="slider-wrapper"
             role="region" 
              aria-roledescription="carousel" 
              aria-label="最新动态轮播">
        <div class="slider-viewport">
          <ul
            class="slider-track"
            :style="{
              width: news.length * 421 + 'px',
              transform: `translateX(-${currentIndex * 421}px)`
            }"
          >
            <li v-for="item in news" :key="item.id" class="news-card">
              <NuxtImg :src="item.img" :alt="item.desc" class="news-img" format="webp"  loading="lazy" width="421" height="180"/>
              <h3>{{ item.title }}</h3>
              <p class="news-desc">{{ item.desc }}</p>
              <p class="news-date">{{ item.date }}</p>
            </li>
          </ul>
        </div>
        <!-- 固定控件，位于右下角 -->
        <div class="slider-controls">
          <button class="slider-btn left" @click="prev"  aria-label="上一张幻灯片"
          title="上一张">‹</button>
          <span class="slider-page"  role="status" 
          aria-live="polite" 
          aria-atomic="true">{{ currentIndex + 1 }}/{{ news.length }}</span>
          <button class="slider-btn right" @click="next" aria-label="下一张幻灯片"
          title="下一张">›</button>
        </div>
      </div>
    </div>
    <!-- 右侧空白占位 -->
    <div class="news-right-empty" aria-hidden="true" role="presentation"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)
const news = [
  {
    id: 1,
    img: '/assets/photo.jpg',
    title: '企业荣获创新大奖',
    desc: '在近日举行的行业峰会上，我司凭借出色的技术实力荣获年度创新企业称号。',
    date: '2026-05-20'
  },
  {
    id: 2,
    img: '/assets/photo1.jpg',
    title: '新产品发布会圆满成功',
    desc: '新一代智能解决方案正式发布，吸引了众多客户和媒体的关注。',
    date: '2026-04-10'
  },
  {
    id: 3,
    img: '/assets/photo2.jpg',
    title: '战略合作拓展国际市场',
    desc: '与多家知名企业达成合作，共同推动数字化转型。',
    date: '2026-03-05'
  }
]

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? news.length - 1 : currentIndex.value - 1
}
const next = () => {
  currentIndex.value = currentIndex.value === news.length - 1 ? 0 : currentIndex.value + 1
}
</script>

<style scoped>
.news-slider-section {
  display: flex;
  background-color: #c0392b; /* 红色背景平铺 */
  min-height: 500px;
}

/* 左侧固定宽度内容块 */
.news-left-wrapper {
  margin-left: 15%;
  width: 451px;
  flex-shrink: 0;
  background-color: #ffffff;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 右侧空白 */
.news-right-empty {
  flex: 1;
}

.section-title {
  color: #c0392b;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 4px;
  text-align: center;
}

.slider-wrapper {
  position: relative; /* 为右下角控件提供定位基准 */
  width: 100%;
  padding-bottom: 50px; /* 为底部控件留出空间 */
}

.slider-viewport {
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
}
.slider-track {
  display: flex;
  transition: transform 0.5s ease;
}

.news-card {
  width: 421px;
  padding: 0;
  box-sizing: border-box;
  color: #333;
  display: flex;
  flex-direction: column;
}

.news-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 20px;
}

.news-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 500;
  color: #222;
}

.news-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.news-date {
  font-size: 13px;
  color: #c0392b;
  margin-bottom: 20px;
}

/* 控件固定在右下角 */
.slider-controls {
  position: absolute;
  right: 20px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-btn {
  background: #c0392b;
  border: none;
  color: #fff;
  font-size: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  line-height: 1;
  padding: 0;
}

.slider-btn:hover {
  background: #a93226;
}

.slider-page {
  font-size: 14px;
  color: #c0392b;
  font-weight: 600;
}
</style>
