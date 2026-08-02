

// // // server/api/banners.ts
// export default defineCachedEventHandler(async () => {
//   // 这里模拟从数据库或后端服务获取轮播图数据
//   // 请替换为真实的数据获取逻辑，例如：
//   // const data = await $fetch('https://your-cms.com/api/banners')
//   const banners = [
//     {
//       id: 1,
//       src: 'https://picsum.photos/id/10/1200/600',
//       alt: '轮播图 1'
//     },
//     {
//       id: 2,
//       src: 'https://picsum.photos/id/20/1200/600',
//       alt: '轮播图 2'
//     },
//     {
//       id: 3,
//       src: 'https://picsum.photos/id/30/1200/600',
//       alt: '轮播图 3'
//     }
//   ]

//   return banners
// }, {
//   maxAge: 300,          // 缓存 300 秒（5 分钟）
//   name: 'banners-cache' // 缓存键名（便于调试）
// })

// server/api/banners.get.ts
// 内存缓存对象（仅在服务端生命周期有效）
// const cache = new Map<string, { data: any; expire: number }>()

// export default defineEventHandler(async (event) => {
//   const cacheKey = 'home_banners'
//   const cached = cache.get(cacheKey)

//   // 缓存有效则直接返回
//   if (cached && cached.expire > Date.now()) {
//     setResponseHeader(event, 'Cache-Control', 'public, max-age=60, s-maxage=300')
//     return cached.data
//   }

//   // 模拟从数据库或下游服务获取数据
// //   const banners = await $fetch('https://api.example.com/banners') // 实际接口
//   const banners = [
//     {
//       id: 1,
//       src: 'https://picsum.photos/id/10/1200/600',
//       alt: '轮播图 1'
//     },
//     {
//       id: 2,
//       src: 'https://picsum.photos/id/20/1200/600',
//       alt: '轮播图 2'
//     },
//     {
//       id: 3,
//       src: 'https://picsum.photos/id/30/1200/600',
//       alt: '轮播图 3'
//     }
//   ]

//   // 写入缓存，设置 60 秒本地过期
//   cache.set(cacheKey, {
//     data: banners,
//     expire: Date.now() + 60_000,
//   })

//   // 设置 HTTP 缓存头（CDN 缓存 5 分钟）
//   setResponseHeader(event, 'Cache-Control', 'public, max-age=60, s-maxage=300')
//   return banners
// })

// server/api/banners.get.ts
export default defineEventHandler(() => {
  // 直接返回硬编码的轮播数据
  const banners = [
    {
      id: 1,
      src: 'https://picsum.photos/id/10/1200/600',
      alt: '轮播图 1'
    },
    {
      id: 2,
      src: 'https://picsum.photos/id/20/1200/600',
      alt: '轮播图 2'
    },
    {
      id: 3,
      src: 'https://picsum.photos/id/30/1200/600',
      alt: '轮播图 3'
    }
  ]
  return banners;
})