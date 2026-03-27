import { getAllTags, getPostsByTag } from '@/lib/posts'
import PostList from '@/components/Post/PostList'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagParam } = await params
  const tag = decodeURIComponent(tagParam)
  return {
    title: `标签: ${tag}`,
    description: `所有关于 ${tag} 的文章`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag: tagParam } = await params
  const tag = decodeURIComponent(tagParam)
  const posts = getPostsByTag(tag)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-sm text-ghibli-earth dark:text-ghibli-sand mb-1">标签</p>
        <h1 className="font-serif text-3xl font-bold text-ghibli-ink dark:text-ghibli-mist">
          # {tag}
        </h1>
        <p className="text-ghibli-earth dark:text-ghibli-sand mt-2">共 {posts.length} 篇文章</p>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
