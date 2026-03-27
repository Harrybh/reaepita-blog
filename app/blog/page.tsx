import { getAllPosts } from '@/lib/posts'
import PostList from '@/components/Post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '归档',
  description: '所有文章归档',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ghibli-ink dark:text-ghibli-mist">归档</h1>
        <p className="text-ghibli-earth dark:text-ghibli-sand mt-2">共 {posts.length} 篇文章</p>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
