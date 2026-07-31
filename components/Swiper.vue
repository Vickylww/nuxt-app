<template>
  <!-- :pagination="{ clickable: true }" -->
  <swiper
    :modules="[Navigation]"
    :navigation="true"
    :loop="true"
    :slides-per-view="1"
    :space-between="0"
    class="carousel"
  >
    <swiper-slide v-for="(img, idx) in images" :key="idx">
      <NuxtImg :src="img" :alt="'图片' + (idx + 1)" class="slide-img" format="webp"  loading="lazy"/>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
defineProps({
  images: {
    type: Array,
    default: () => [
      '/assets/img.jpg',
      '/assets/img1.jpg',
      '/assets/img2.jpg'
    ]
  }
})
</script>

<style scoped>
.carousel {
  max-width: 1200px;
  margin: 40px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.slide-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

/* 自定义箭头颜色（保持黑金风格） */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #c5a47e;
  background: rgba(11, 12, 16, 0.7);
  width: 50px;
  height: 60px;
  margin-top: -30px;
  border-radius: 4px;
}
:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(11, 12, 16, 0.9);
}
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 24px;
}
</style>
