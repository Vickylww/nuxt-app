
---

## 2. `articles/nuxt3-isr-guide.md`

```markdown
---
title: "Nuxt3 增量静态再生（ISR）完全指南"
description: "深入理解 ISR 原理，如何在企业官网中实现动态内容的高速渲染。"
createdAt: "2025-06-15"
---

## 什么是 ISR？

增量静态再生（Incremental Static Regeneration）是一种混合渲染策略：页面在首次请求时动态生成并缓存，后续请求直接返回缓存，同时后台静默更新缓存，确保内容最终一致。

### 为什么选择 ISR？

| 传统 SSR         | ISR                          |
| ---------------- | ---------------------------- |
| 每次请求都渲染   | 仅首次或缓存失效后渲染       |
| 服务器压力大     | 大部分请求命中缓存，压力极低 |
| 响应速度依赖后端 | 缓存命中时接近静态文件速度   |

## 在 Nuxt3 中启用 ISR

只需在 `nuxt.config.ts` 中配置：

```typescript
routeRules: {
  '/articles/**': { swr: 3600 }
}