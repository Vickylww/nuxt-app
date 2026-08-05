import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  const filePath = join(process.cwd(), 'server/data/articles.json');
  const raw = readFileSync(filePath, 'utf-8');
  const articles = JSON.parse(raw);
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    throw createError({ statusCode: 404, message: '文章不存在' });
  }
  return article;
});