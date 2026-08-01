

<template>
  <section
  class="carousel-container"
  aria-roledescription="carousel"
  aria-label="图片轮播"
>
    <div
    role="group"
    aria-roledescription="slide"
    :aria-label="`第 ${currentIndex + 1} 张，共 ${totalSlides} 张`"
  >
    <!-- 当前图 -->
    <NuxtImg
      :src="currentSrc"
      :key="'current-' + currentIndex"
      :alt="currentAlt"
      class="carousel-image current"
      :class="{ 'fade-out': isSwitching }"
      width="100%"
      max-height="700"
      loading="eager"
       quality="80" 
       preload 
      format="webp"
    />
    <!-- 下一张图（预加载） -->
    <div  v-if="nextSrc"
    role="group"
    aria-roledescription="slide"
    aria-hidden="true">
    <NuxtImg
      :src="nextSrc"
      :key="'next-' + nextIndex"
      :alt="nextAlt"
      class="carousel-image next"
      :class="{ 'fade-in': isSwitching }"
      width="100%"
      max-height="700"
      loading="eager"
      preload 
       quality="80" 
      format="webp"
      @load="onNextImageLoaded"
    />
   </div>
  </div>
  </section>
</template>

<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  interval: { type: Number, default: 4000 }
})

const currentIndex = ref(0)
const nextIndex = computed(() => (currentIndex.value + 1) % props.images.length)
const currentSrc = computed(() => props.images[currentIndex.value]?.src)
const currentAlt = computed(() => props.images[currentIndex.value]?.alt)
const nextSrc = computed(() => props.images[nextIndex.value]?.src)
const nextAlt = computed(() => props.images[nextIndex.value]?.alt)

const isSwitching = ref(false)
let timer = null
let switchTimeout = null


// 执行切换
function goToNext() {
  if (isSwitching.value) return
  isSwitching.value = true
}

// 当下一张图片加载完成后立即开始淡入
function onNextImageLoaded() {
  // 这里可以不用做额外处理，因为 isSwitching 为 true 时
  // .next 会应用 fade-in 类，图片加载完后自然显示
}

// 监听 isSwitching 的变化，在过渡结束后重置状态
watch(isSwitching, (val) => {
  if (val) {
    // 设置一个短暂的延迟，等待浏览器开始过渡
    nextTick(() => {
      // 过渡持续时间与 CSS 中的 transition 一致（例如 0.8s）
      switchTimeout = setTimeout(() => {
        
        currentIndex.value = nextIndex.value
        isSwitching.value = false
         console.log('currentIndex:', currentIndex.value, 'nextIndex:', nextIndex.value)
    console.log('next banner data:', props.images[nextIndex.value]) // 查看数据
      }, 800) // 与 opacity 过渡时间一致
    })
  }
})

// 自动播放
function startAutoPlay() {
  stopAutoPlay()
  timer = setInterval(() => {
    goToNext()
  }, props.interval)
}
function stopAutoPlay() {
  clearInterval(timer)
  clearTimeout(switchTimeout)
}

onMounted(startAutoPlay)
onUnmounted(stopAutoPlay)
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.8s ease;
}

/* 默认状态：当前图完全不透明，下一张完全透明 */
.current {
  opacity: 1;
  z-index: 1;
}
.next {
  opacity: 0;
  z-index: 0;
}

/* 切换中：当前图淡出，下一张淡入 */
.fade-out {
  opacity: 0;
}
.fade-in {
  opacity: 1;
  z-index: 2; /* 确保在旧图之上 */
}
</style>