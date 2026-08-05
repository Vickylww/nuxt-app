
import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(() => {
  const filePath = join(process.cwd(), 'server/data/articles.json');
  const raw = readFileSync(filePath, 'utf-8');
  const articles = JSON.parse(raw);
  // 返回时按时间倒序，最新的在最前面
  return articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});