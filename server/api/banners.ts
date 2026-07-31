

// // server/api/banners.ts
// export default defineCachedEventHandler(async () => {
//   // 这里模拟从数据库或后端服务获取轮播图数据
//   // 请替换为真实的数据获取逻辑，例如：
//   // const data = await $fetch('https://your-cms.com/api/banners')
//   // const banners = [
//   //   {
//   //     id: 1,
//   //     src: 'https://picsum.photos/id/10/1200/600',
//   //     alt: '轮播图 1'
//   //   },
//   //   {
//   //     id: 2,
//   //     src: 'https://picsum.photos/id/20/1200/600',
//   //     alt: '轮播图 2'
//   //   },
//   //   {
//   //     id: 3,
//   //     src: 'https://picsum.photos/id/30/1200/600',
//   //     alt: '轮播图 3'
//   //   }
//   // ]

//   // return banners
// }, {
//   maxAge: 300,          // 缓存 300 秒（5 分钟）
//   name: 'banners-cache' // 缓存键名（便于调试）
// })