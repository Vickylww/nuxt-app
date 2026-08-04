<template>
  <!-- :pagination="{ clickable: true }" -->
  <section class="image-carousel" aria-roledescription="carousel" aria-labelledby="carousel-heading">
   <!-- 隐藏的标题，辅助技术可识别 -->
  <h2 id="carousel-heading" class="sr-only">图片轮播</h2>

  <swiper
    :modules="[Navigation]"
    :navigation="true"
    :loop="true"
    :slides-per-view="1"
    :space-between="0"
    class="carousel"
  >
    <swiper-slide v-for="(img, idx) in images" :key="idx" >
      <div    :aria-roledescription="'slide'"
        :aria-label="`第 ${idx + 1} 张，共 ${images.length} 张`">
      <NuxtImg :src="img" :alt="'图片' + (idx + 1)" class="slide-img" format="webp"  width="1200" height="400"/>
      </div>
    </swiper-slide>
  </swiper>
    <!-- 动态通知区域：切换时自动播报当前幻灯片编号 -->
  <div aria-live="polite" aria-atomic="true" class="sr-only">
    {{ `当前显示第 ${activeIndex + 1} 张，共 ${images.length} 张` }}
  </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { usePublicUrl } from '../composables/usePublicUrl'
defineProps({
  images: {
    type: Array,
    default: () => [
      usePublicUrl('/assets/img.jpg'),
      usePublicUrl('/assets/img1.jpg'),
      usePublicUrl('/assets/img2.jpg')
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
