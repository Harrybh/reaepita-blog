'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const links = [
    { href: '/admin/posts', label: '文章管理' },
    { href: '/admin/posts/new', label: '新建文章' },
  ]

  return (
    <nav
      style={{ background: 'var(--color-ghibli-moss)', color: '#fff' }}
      className="px-6 py-3 flex items-center gap-6 shadow-md"
    >
      <span className="font-bold text-lg tracking-wide select-none">🌿 后台管理</span>
      <div className="flex items-center gap-4 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm px-3 py-1 rounded transition-colors"
            style={{
              background: pathname.startsWith(link.href) ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: '#fff',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        target="_blank"
        className="text-sm opacity-70 hover:opacity-100 transition-opacity"
        style={{ color: '#fff' }}
      >
        查看博客 ↗
      </Link>
      <button
        onClick={handleLogout}
        className="text-sm px-3 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors"
        style={{ color: '#fff' }}
      >
        退出登录
      </button>
    </nav>
  )
}
