// server/api/public-articles/index.get.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default defineEventHandler(() => {
  const articlesDir = path.resolve(process.cwd(), 'pages/articles')

  // 如果文件夹不存在，返回空数组
  if (!fs.existsSync(articlesDir)) {
    return []
  }

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))

  const articles = files.map(file => {
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8')
    const { data } = matter(raw)
    const slug = file.replace('.md', '')
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      createdAt: data.createdAt || '',
    }
  })

  // 按创建时间倒序排列（可选）
  articles.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

  return articles
})