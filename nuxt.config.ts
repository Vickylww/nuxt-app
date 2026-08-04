// https://nuxt.com/docs/api/configuration/nuxt-config
// import viteImagemin from 'vite-plugin-imagemin'

export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  app:{
    head:{
      meta:[{ content: 'width=device-width, initial-scale=1' }],
      title:"企业官网",
       htmlAttrs: {
        lang: 'zh-CN'
      }
    }
  },
  image: {
    // 默认使用 ipx 作为提供者（支持本地点压缩和转换）
    provider: 'ipx',
    // 可选全局质量
    quality: 80,
    // 可选格式（如自动转 webp）
    format: ['webp'],
     // 可选：让生成的图片放在 .output/public 下
    // staticFilename: '[publicPath]/_img/[hash][ext]'
  },
   // 开启静态图片预生成
  nitro: {
    prerender: {
      routes: [
        '/_ipx/f_webp&q_80/assets/banner.jpg',
        '/_ipx/f_webp&q_80/assets/banner2.jpg',
        '/_ipx/f_webp&q_80/assets/3.jpeg',
        '/_ipx/f_webp&q_80&s_1200x400/assets/img.jpg',
        '/_ipx/f_webp&q_80&s_1200x400/assets/img1.jpg',
        '/_ipx/f_webp&q_80&s_1200x400/assets/img2.jpg',
        '/_ipx/f_webp&q_80&s_421x180/assets/photo.jpg',
        '/_ipx/f_webp&q_80&s_421x180/assets/photo1.jpg',
        '/_ipx/f_webp&q_80&s_421x180/assets/photo2.jpg',
        '/_ipx/f_webp&q_80&s_347x200/assets/img.jpg',
        '/_ipx/f_webp&q_80&s_347x200/assets/img1.jpg',
        '/_ipx/f_webp&q_80&s_347x200/assets/img2.jpg'
        
      ]
    }
  },
  
   vite: {
     css: {
      transformer: 'lightningcss'  // 默认，极速 CSS 压缩
      // transformer: 'postcss'    // 改用 postcss
    },
    //  resolve: {
    //   alias: { '@': '/<sourceDir>' }
    // },
    // plugins: [
    //   viteImagemin({
    //     gifsicle: { optimizationLevel: 7 },
    //     optipng: { optimizationLevel: 7 },
    //     mozjpeg: { quality: 80 },
    //     svgo: { plugins: [{ removeViewBox: false }] },
        
    //   })
    // ],
     build: {
      cssMinify: 'esbuild', // 或 'lightningcss'（更快但需安装）
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,   // 生产移除 console
          drop_debugger: true
        }
      }
    }
  },
   compatibilityDate: '2025-07-28',
  devtools: { enabled: true },
    ssr: true,
     experimental: {
  renderJsonPayloads: true
},
 routeRules: {
    '/articles/**': { 
      swr: 3600,   // 仅针对博客文章启用 SWR 缓存
    }
  
  } 
})