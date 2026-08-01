<template>
  <div class="home">
    <HomeHero :images="carouselImages" :interval="5000" /> 
    <LazySomeComponent >
      <HomeServices />
      <HomeNewsSlider />
      <ImageCarousel />
      <Swiper  />
      <HomeArticles />
    </LazySomeComponent>
  </div>
</template>

<script setup>
const carouselImages = [
  { src: '/assets/3.jpeg', alt: '首页横幅1' },
  { src: '/assets/banner.jpg', alt: '远程图片' },
  { src: '/assets/banner2.jpg', alt: '首页横幅3' }
]

</script>

<style scoped>
.home {
  margin-top: -60px;
}
</style>
