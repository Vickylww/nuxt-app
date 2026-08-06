

## 欢迎使用全栈 CMS 博客

这篇文章展示 **Markdown** 的常见语法。通过 Nuxt3 与 Nitro API，文章内容在服务端渲染为 HTML，页面速度极快。

### 功能清单

- 支持 **粗体**、*斜体* 和 ~~删除线~~
- 自动生成锚点链接
- 代码块高亮（需额外配置）

### 什么是Nitro？

Nitro 是一个全栈服务器框架，兼容任何运行时和任何部署目标。
Nitro 为您提供生产就绪的服务器，具有文件系统路由、代码分割以及对存储、缓存和数据库的内置支持——所有这些都与运行时无关，并且可以部署在任何地方。


在目录内创建服务器和 API 路由routes/。每个文件直接映射到一个 URL 路径，其余部分由 Nitro 处理——路由、代码分割和优化构建。
您还可以通过创建文件来完全控制服务器条目server.ts。Nitro 的高级、运行时无关的方法允许您使用任何 HTTP 库，例如Elysia、h3或Hono。

### 表现

Nitro 在构建时编译路由，无需运行时路由器。它只加载和执行处理每个传入请求所需的代码。这使其成为无服务器托管的理想选择，无论项目大小，启动时间都接近 0 毫秒。

### 随时随地部署

无需任何配置，即可将服务器构建到.output/与 Node.js、Bun、Deno 和众多托管平台（例如 Cloudflare Workers、Netlify、Vercel 等）兼容的优化文件夹中。无需更改任何代码，即可利用 ESR、ISR 和 SWR 等平台特性。
服务器端渲染
使用您喜爱的模板引擎渲染 HTML，或直接在服务器端使用 React、Vue 或 Svelte 等组件库。通过客户端水合实现完全通用的渲染。Nitro 提供基础架构和渐进式方法，助您达成目标。

### 贮存
Nitro 内置了一个与运行时无关的键值存储层。它默认使用内存存储，但您可以连接 20 多种不同的驱动程序（FS、Redis、S3 等），将它们附加到不同的命名空间，并在不更改代码的情况下切换它们。

### 缓存
Nitro 支持服务器路由和服务器函数的缓存，由服务器存储（通过cache命名空间）直接支持。

### 数据库
Nitro 还内置了一个 SQL 数据库。它默认使用 SQLite，但您可以使用相同的 API 连接和查询 10 多个数据库（Postgres、MySQL、PGLite 等）。

### 元框架基础
Nitro 可以作为构建您自己的元框架的基础。Nuxt、SolidStart 和 TanStack Start 等流行的框架都全部或部分地利用了 Nitro。

### Vite整合
Nitro 可以作为插件与Vite无缝集成。如果您正在使用 Vite 构建前端应用程序，添加 Nitro 即可获得 API 路由、服务器端渲染和完整的生产服务器——所有这些都与 Vite 集成在一起vite build。
vite.config.ts

import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [nitro()],
});
Nitro 可以vite build生成一个优化的.output/文件夹，其中包含您的前端和后端——随时可以部署到任何地方。