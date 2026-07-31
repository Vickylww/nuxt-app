<template>
  <div class="test-page">
    <h1>图片压缩对比</h1>

    <!-- public 目录的图片（不会被压缩） -->
    <div>
      <h2>原始图片（public 目录）</h2>
      <NuxtImg :src="publicImg" style="max-width: 500px" @load="(e) => showSize('原始', e)" />
      <p id="original-size">加载中...</p>
    </div>

    <!-- assets 目录的图片（构建时压缩） -->
    <div>
      <h2>压缩后图片（assets 目录）</h2>
      <NuxtImg :src="assetsImg" style="max-width: 500px" @load="(e) => showSize('压缩后', e)" />
      
      <p id="compressed-size">加载中...</p>
    </div>
  </div>
</template>

<script setup>
import assetsImg from '/assets/banner.jpg'

const publicImg = '/assets/banner.jpg' // 确保 public 下有同名文件

const showSize = (label, event) => {
  const img = event.target
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  canvas.toBlob((blob) => {
    console.log(`${label}图片大小: ${(blob.size / 1024).toFixed(2)}KB`)
  })
}
</script>
