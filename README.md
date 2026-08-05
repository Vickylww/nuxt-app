# Nuxt 3 全栈内容发布平台

一个基于 Nuxt 3 和 Express 构建的现代全栈内容发布站点，专注于服务端渲染 (SSR) 性能优化与动态内容管理。支持 Markdown 实时渲染与增量静态再生 (ISR)。

![Lighthouse Badge](https://img.shields.io/badge/Lighthouse-92%2B-success?style=flat-square)
![Nuxt Version](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

## 在线演示

> **注意**：项目部署在 GitHub Pages，首次加载可能因服务器位置较慢。如遇打不开的情况，请参照下方“本地运行”步骤体验完整效果。

演示地址：[https://your-demo-link.vercel.app](https://your-demo-link.vercel.app) (如果重新部署了国内能访问的链接，则放上)

## 功能特性

- **高性能渲染**：基于 Nuxt 3 的同构渲染，首屏加载极快，Lighthouse 评分稳定 92+
- **动态内容管理**：使用 Express 自建 CMS 接口，支持 Markdown 文章实时解析与渲染
- **增量静态再生 (ISR)**：内容更新时自动重建指定页面，兼顾动态发布与静态性能
- **极致加载优化**：路由级代码分包、资源按需加载、图片自动转 WebP
- **响应式图片**：集成 `@nuxt/image`，根据设备自动加载最优尺寸和格式的图片

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Nuxt 3 (Vue 3) |
| 构建工具 | Vite |
| 服务端 | Node.js / Express |
| 样式 | CSS / Tailwind CSS (根据实际填写) |
| 内容 | Markdown (自定义解析) |
| 部署 | GitHub Pages / Vercel (根据实际填写) |
| 性能 | @nuxt/image, ISR, 代码分包 |

## 本地运行

确保你的开发环境已安装 Node.js (>= 20.x) 和 npm/pnpm。

```bash
# 1. 克隆仓库
git clone https://github.com/vickylww/nuxt-app.git

# 2. 进入项目目录
cd nuxt-app

# 3. 安装依赖
npm install
# 或者
pnpm install

# 4. 启动开发服务器
npm run dev

# 或者
pnpm dev


## 许可证

MIT License
