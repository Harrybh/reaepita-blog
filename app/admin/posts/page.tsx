'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState(false)
  const [buildMsg, setBuildMsg] = useState('')
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)

  async function fetchPosts() {
    const res = await fetch('/api/admin/posts')
    const data = await res.json()
    setPosts(data.posts || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  async function handleDelete(slug: string) {
    if (!confirm(`确认删除《${slug}》？此操作不可恢复。`)) return
    setDeletingSlug(slug)
    const res = await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.slug !== slug))
    } else {
      alert('删除失败')
    }
    setDeletingSlug(null)
  }

  async function handleBuild() {
    setBuilding(true)
    setBuildMsg('')
    const res = await fetch('/api/admin/build', { method: 'POST' })
    const data = await res.json()
    setBuildMsg(data.message || '构建已触发，请稍等约30秒后刷新博客查看。')
    setBuilding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            文章管理
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            共 {posts.length} 篇文章
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBuild}
            disabled={building}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-60"
            style={{
              borderColor: 'var(--color-ghibli-moss)',
              color: 'var(--color-ghibli-moss)',
            }}
          >
            {building ? '构建中...' : '🔨 重新构建'}
          </button>
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--color-ghibli-moss)' }}
          >
            + 新建文章
          </Link>
        </div>
      </div>

      {buildMsg && (
        <div
          className="mb-4 px-4 py-3 rounded-lg text-sm"
          style={{ background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }}
        >
          {buildMsg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
          加载中...
        </div>
      ) : posts.length === 0 ? (
        <div
          className="ghibli-card text-center py-16"
          style={{ color: 'var(--text-secondary)' }}
        >
          暂无文章，
          <Link href="/admin/posts/new" style={{ color: 'var(--color-ghibli-moss)' }}>
            立即新建
          </Link>
        </div>
      ) : (
        <div className="ghibli-card overflow-hidden" style={{ background: 'var(--card-bg)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
              >
                <th className="text-left px-4 py-3 font-medium">标题</th>
                <th className="text-left px-4 py-3 font-medium w-28">日期</th>
                <th className="text-left px-4 py-3 font-medium w-36">标签</th>
                <th className="text-left px-4 py-3 font-medium w-20">Slug</th>
                <th className="px-4 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                >
                  <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-medium">{post.title}</span>
                    {post.excerpt && (
                      <p
                        className="text-xs mt-0.5 line-clamp-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                    {post.date}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {post.slug}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-xs px-2 py-1 rounded transition-colors"
                        style={{ color: 'var(--color-ghibli-moss)' }}
                      >
                        预览
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        disabled={deletingSlug === post.slug}
                        className="text-xs px-2 py-1 rounded transition-colors disabled:opacity-40"
                        style={{ color: '#dc3545' }}
                      >
                        {deletingSlug === post.slug ? '删除中' : '删除'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
