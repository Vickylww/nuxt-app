import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: '缺少 slug 参数' })
  }

  // 使用 process.cwd() 确保路径正确
  const filePath = path.resolve(process.cwd(), 'articles', `${slug}.md`)
  // 临时调试输出
  console.log('尝试读取文件:', filePath)
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, message: `文章不存在: ${slug}` })
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const html = md.render(content)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      html,
      createdAt: data.createdAt || new Date().toISOString(),
    }
  } catch (err) {
    throw createError({ statusCode: 500, message: '文章解析失败' })
  }
})