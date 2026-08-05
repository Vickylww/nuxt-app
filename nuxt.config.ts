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
    provider: 'ipxStatic',
    // provider: 'ipx',  //动态生成ipx图片功能，上线后需要放开，目前只为github pages 静态界面展示用 
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
      crawlLinks: true,  // 自动爬取页面里出现的所有链接，包括图片
    routes: ['/']      // 从首页开始爬
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