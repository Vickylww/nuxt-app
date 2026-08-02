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
  { src: usePublicUrl('/assets/3.jpeg'), alt: '首页横幅1' },
  { src: usePublicUrl('/assets/banner.jpg'), alt: '远程图片' },
  { src: usePublicUrl('/assets/banner2.jpg'), alt: '首页横幅3' }
]

</script>

<style scoped>
.home {
  margin-top: -60px;
}
</style>
