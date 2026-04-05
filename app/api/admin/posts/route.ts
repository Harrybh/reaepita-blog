import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export async function GET() {
  if (!fs.existsSync(postsDir)) {
    return NextResponse.json({ posts: [] })
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
    }
  })

  posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  return NextResponse.json({ posts })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, slug, date, excerpt, cover, tags, author, readingTime, content } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: '标题、slug 和正文不能为空' }, { status: 400 })
  }

  // Sanitize slug: only allow alphanumeric, Chinese, hyphens
  const safeSlug = slug.replace(/[^\w\u4e00-\u9fa5-]/g, '').replace(/-+/g, '-')
  if (!safeSlug) {
    return NextResponse.json({ error: 'Slug 格式不合法' }, { status: 400 })
  }

  const filePath = path.join(postsDir, `${safeSlug}.mdx`)
  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: `文章 "${safeSlug}" 已存在` }, { status: 409 })
  }

  const tagsArray: string[] = Array.isArray(tags) ? tags : []
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: ${JSON.stringify(date || new Date().toISOString().split('T')[0])}`,
    `excerpt: ${JSON.stringify(excerpt || '')}`,
    `cover: ${JSON.stringify(cover || '')}`,
    `tags: [${tagsArray.map((t) => JSON.stringify(t)).join(', ')}]`,
    `author: ${JSON.stringify(author || 'reaepita')}`,
    `readingTime: ${Number(readingTime) || 5}`,
    '---',
    '',
  ].join('\n')

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  fs.writeFileSync(filePath, frontmatter + content, 'utf8')

  return NextResponse.json({ ok: true, slug: safeSlug })
}
