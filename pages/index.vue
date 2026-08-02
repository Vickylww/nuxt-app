<template>
  <div class="home">
    <HomeHero :images="safeBanners" :interval="5000" /> 
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
// 使用 useAsyncData 获取轮播数据（key 用于缓存标识）
 const { data: banners } = await useAsyncData(
  'home-banners',                      // 唯一 key，用于避免重复请求
  () => $fetch('/api/banners')      // API 调用
//   {
//     // 可选：设置服务端数据在客户端的保鲜时间（stale-while-revalidate）
//     // getCachedData(key) {
//     //   // 这里可使用 nuxtApp.payload.data 或手动实现 SWR
//     //   // 若无特殊需求，默认行为（服务端直出，客户端不重新请求）已经足够
//     // },
//   }
 )
// 使用 computed 确保始终为数组
const safeBanners = computed(() => banners.value ?? [])
</script>

<style scoped>
.home {
  margin-top: -60px;
}
</style>
