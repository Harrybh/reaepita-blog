'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface SearchBoxProps {
  posts: PostMeta[]
}

export default function SearchBox({ posts }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PostMeta[]>([])

  const fuse = useMemo(() => new Fuse(posts, {
    keys: ['title', 'excerpt', 'tags'],
    threshold: 0.4,
    includeScore: true,
  }), [posts])

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([])
        return
      }
      const hits = fuse.search(q).map((r) => r.item)
      setResults(hits.slice(0, 8))
    },
    [fuse]
  )

  useEffect(() => {
    search(query)
  }, [query, search])

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文章..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl
            bg-ghibli-cloud dark:bg-ghibli-ink/60
            border border-ghibli-sand/40 dark:border-ghibli-mist/20
            text-ghibli-ink dark:text-ghibli-mist
            placeholder-ghibli-sand dark:placeholder-ghibli-sand/50
            focus:outline-none focus:ring-2 focus:ring-ghibli-moss/40
            font-sans text-sm transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ghibli-earth dark:text-ghibli-sand"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50
          bg-ghibli-parchment dark:bg-[#252520]
          border border-ghibli-sand/40 dark:border-ghibli-mist/20
          rounded-xl shadow-lg overflow-hidden">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block px-4 py-3 hover:bg-ghibli-cloud dark:hover:bg-ghibli-ink/40 transition-colors border-b border-ghibli-mist/30 dark:border-ghibli-mist/10 last:border-0"
              onClick={() => setQuery('')}
            >
              <p className="text-sm font-medium text-ghibli-ink dark:text-ghibli-mist line-clamp-1">{post.title}</p>
              <p className="text-xs text-ghibli-earth dark:text-ghibli-sand mt-0.5">{formatDate(post.date)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
