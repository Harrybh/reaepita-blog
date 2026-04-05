import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'posts')

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const safeSlug = slug.replace(/[^\w\u4e00-\u9fa5-]/g, '')
  const filePath = path.join(postsDir, `${safeSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}
