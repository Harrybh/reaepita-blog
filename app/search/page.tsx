import { getAllPosts } from '@/lib/posts'
import SearchBox from '@/components/UI/SearchBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '搜索',
  description: '搜索文章',
}

export default function SearchPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-ghibli-ink dark:text-ghibli-mist mb-8">搜索</h1>
      <div className="ghibli-card p-6">
        <SearchBox posts={posts} />
        <p className="text-sm text-ghibli-earth dark:text-ghibli-sand mt-4">
          可以搜索文章标题、摘要和标签
        </p>
      </div>
    </div>
  )
}
