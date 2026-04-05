'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
}

function calcReadingTime(content: string): number {
  const words = content.replace(/[#*`>\-\[\]()!]/g, '').length
  return Math.max(1, Math.ceil(words / 300))
}

export default function NewPostPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: today,
    excerpt: '',
    cover: '',
    tags: '',
    author: 'reaepita',
    readingTime: 5,
    content: '',
  })

  const [coverPreviewValid, setCoverPreviewValid] = useState(false)

  useEffect(() => {
    if (form.title && !form.slug) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }))
    }
  }, [form.title])

  useEffect(() => {
    const rt = calcReadingTime(form.content)
    setForm((f) => ({ ...f, readingTime: rt }))
  }, [form.content])

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function insertMarkdown(before: string, after = '') {
    const ta = document.getElementById('md-content') as HTMLTextAreaElement
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = form.content.substring(start, end)
    const newContent =
      form.content.substring(0, start) + before + selected + after + form.content.substring(end)
    set('content', newContent)
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 0)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.slug || !form.content) {
      setError('标题、Slug 和正文不能为空')
      return
    }
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    })

    if (res.ok) {
      setSuccess(true)
      setTimeout(() => router.push('/admin/posts'), 1500)
    } else {
      const data = await res.json()
      setError(data.error || '创建失败')
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-20" style={{ color: 'var(--text-primary)' }}>
        <div className="text-5xl mb-4">✅</div>
        <p className="text-lg font-medium">文章已创建！正在跳转...</p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    outline: 'none',
  }

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
        >
          新建文章
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="ghibli-card p-6 space-y-4" style={{ background: 'var(--card-bg)' }}>
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
            基本信息
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => {
                  set('title', e.target.value)
                  set('slug', slugify(e.target.value))
                }}
                placeholder="文章标题"
                required
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                Slug（URL路径）<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="url-friendly-slug"
                required
                className="w-full px-3 py-2 rounded-lg text-sm font-mono"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                发布日期
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                作者
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                标签（逗号分隔）
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="技术, Next.js, 随笔"
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={inputStyle}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                摘要
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
                placeholder="文章简短描述，显示在卡片和搜索结果中..."
                rows={2}
                className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* 封面图 */}
        <div className="ghibli-card p-6" style={{ background: 'var(--card-bg)' }}>
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
            封面图（外链）
          </h2>
          <input
            type="url"
            value={form.cover}
            onChange={(e) => set('cover', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 rounded-lg text-sm mb-3"
            style={inputStyle}
          />
          {form.cover && (
            <div className="relative w-full max-w-xs h-40 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
              <Image
                src={form.cover}
                alt="封面预览"
                fill
                className="object-cover"
                onLoad={() => setCoverPreviewValid(true)}
                onError={() => setCoverPreviewValid(false)}
                unoptimized
              />
              {!coverPreviewValid && (
                <div
                  className="absolute inset-0 flex items-center justify-center text-sm"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                >
                  图片加载失败
                </div>
              )}
            </div>
          )}
        </div>

        {/* 正文编辑器 */}
        <div className="ghibli-card p-6" style={{ background: 'var(--card-bg)' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
              正文（Markdown）<span className="text-red-500">*</span>
            </h2>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              预计阅读 {form.readingTime} 分钟
            </span>
          </div>

          {/* Toolbar */}
          <div
            className="flex flex-wrap gap-1 mb-2 pb-2"
            style={{ borderBottom: '1px solid var(--border-color)' }}
          >
            {[
              { label: 'H2', action: () => insertMarkdown('## ') },
              { label: 'H3', action: () => insertMarkdown('### ') },
              { label: 'B', action: () => insertMarkdown('**', '**') },
              { label: 'I', action: () => insertMarkdown('*', '*') },
              { label: '`', action: () => insertMarkdown('`', '`') },
              { label: '> 引用', action: () => insertMarkdown('> ') },
              { label: '- 列表', action: () => insertMarkdown('- ') },
              { label: '[链接]', action: () => insertMarkdown('[', '](url)') },
              { label: '![图片]', action: () => insertMarkdown('![alt](', ')') },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.action}
                className="px-2 py-0.5 rounded text-xs font-mono transition-colors hover:opacity-80"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <textarea
            id="md-content"
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            placeholder={`在这里输入 Markdown 正文...\n\n## 段落标题\n\n正文内容...`}
            rows={24}
            required
            className="w-full px-3 py-2 rounded-lg text-sm font-mono resize-y"
            style={{ ...inputStyle, lineHeight: '1.6' }}
          />
        </div>

        {error && (
          <div
            className="px-4 py-3 rounded-lg text-sm"
            style={{ background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}
          >
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2 rounded-lg text-sm border transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            取消
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-60"
            style={{ background: 'var(--color-ghibli-moss)' }}
          >
            {submitting ? '保存中...' : '保存文章'}
          </button>
        </div>
      </form>
    </div>
  )
}
