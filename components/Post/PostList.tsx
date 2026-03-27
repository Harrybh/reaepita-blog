import { PostMeta } from '@/lib/posts'
import PostCard from './PostCard'

interface PostListProps {
  posts: PostMeta[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-ghibli-earth dark:text-ghibli-sand">
        <p className="text-lg font-serif">还没有文章...</p>
        <p className="text-sm mt-2">森林里还很安静</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
