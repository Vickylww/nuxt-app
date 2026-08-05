import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, content } = body;
  
  if (!title || !content) {
    throw createError({ statusCode: 400, message: '标题和内容不能为空' });
  }

  // 生成 slug（简单的拼音或时间戳，这里用时间戳避免中文问题，你可以改）
  const slug = Date.now().toString(36) + '-' + title.replace(/\s+/g, '-').toLowerCase().slice(0, 20);
  
  const filePath = join(process.cwd(), 'server/data/articles.json');
  const raw = readFileSync(filePath, 'utf-8');
  const articles = JSON.parse(raw);
  
  const newArticle = {
    slug,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  articles.push(newArticle);
  writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8');
  
  return { success: true, article: newArticle };
});