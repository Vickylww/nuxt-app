<template>
 <section class="image-carousel" aria-roledescription="carousel" aria-labelledby="carousel-heading">
    <h2 id="carousel-heading" class="sr-only">图片轮播</h2>
    <div ref="viewport" class="carousel-viewport">
      <ul
        class="carousel-track"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease'
        }"
      >
        <li v-for="(img, idx) in images" :key="idx" class="carousel-slide"  role="group"
        aria-roledescription="slide"
        :aria-label="`第 ${idx + 1} 张，共 ${images.length} 张`"
        :aria-hidden="idx !== currentIndex ? 'true' : undefined">
          <NuxtImg :src="img.src" :alt="img.alt || `图片 ${idx + 1}`" format="webp"  loading="lazy"  width="1200" height="400"/>
        </li>
      </ul>
    </div>
    <button class="carousel-arrow left" @click="prev" aria-label="上一张幻灯片">‹</button>
    <button class="carousel-arrow right" @click="next" aria-label="下一张幻灯片">›</button>
    <!-- 可选：指示器 -->
    <div v-if="images.length > 1" class="carousel-dots"  role="tablist" aria-label="幻灯片指示器">
      <button
        v-for="(_, idx) in images"
        :key="idx"
         role="tab"
      :aria-selected="idx === currentIndex ? 'true' : 'false'"
      :aria-label="`跳转到第 ${idx + 1} 张幻灯片`"
        :class="{ active: idx === currentIndex }"
        @click="goTo(idx)"
         @keydown.enter.prevent="goTo(idx)"
      @keydown.space.prevent="goTo(idx)"
      ></button>
    </div>
     <!-- 动态通知内容变化 -->
  <div aria-live="polite" aria-atomic="true" class="sr-only">
    {{ `当前显示第 ${currentIndex + 1} 张，共 ${images.length} 张` }}
  </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      { src: '/assets/img.jpg', alt: '首页横幅1' },
  { src: '/assets/img1.jpg', alt: '远程图片' },
  { src: '/assets/img2.jpg', alt: '首页横幅3' }
    ]
  }
})

const currentIndex = ref(0)

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
}
const next = () => {
  currentIndex.value = currentIndex.value === props.images.length - 1 ? 0 : currentIndex.value + 1
}
const goTo = (idx) => {
  currentIndex.value = idx
}
</script>

<style scoped>
.image-carousel {
  position: relative;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}
.carousel-viewport {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.carousel-track {
  display: flex;
  will-change: transform;
}
.carousel-slide {
  min-width: 100%;
}
.carousel-slide img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(11, 12, 16, 0.7);
  border: none;
  color: #c5a47e;
  font-size: 36px;
  width: 50px;
  height: 60px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.carousel-arrow:hover {
  background: rgba(11, 12, 16, 0.9);
}
.carousel-arrow.left {
  left: 10px;
}
.carousel-arrow.right {
  right: 10px;
}
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
}
.carousel-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: background 0.3s;
}
.carousel-dots span.active {
  background: #c0392b;
}
</style>
