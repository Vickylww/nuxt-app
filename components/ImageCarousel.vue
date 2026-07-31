<template>
  <div class="image-carousel">
    <div ref="viewport" class="carousel-viewport">
      <div
        class="carousel-track"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease'
        }"
      >
        <div v-for="(img, idx) in images" :key="idx" class="carousel-slide">
          <NuxtImg :src="img" :alt="'图片' + (idx + 1)" format="webp"  loading="lazy"/>
        </div>
      </div>
    </div>
    <button class="carousel-arrow left" @click="prev">‹</button>
    <button class="carousel-arrow right" @click="next">›</button>
    <!-- 可选：指示器 -->
    <div v-if="images.length > 1" class="carousel-dots">
      <span
        v-for="(_, idx) in images"
        :key="idx"
        :class="{ active: idx === currentIndex }"
        @click="goTo(idx)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      '/assets/img.jpg',
      '/assets/img1.jpg',
      '/assets/img2.jpg'
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
