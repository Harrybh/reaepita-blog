import Link from 'next/link'
import Image from 'next/image'
import { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import TagBadge from '@/components/UI/TagBadge'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="ghibli-card overflow-hidden group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-ghibli-sky/40 to-ghibli-moss/30">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ghibli-sky/60 to-ghibli-moss/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {post.tags.length > 0 && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium
              bg-ghibli-moss/80 text-white backdrop-blur-sm">
              {post.tags[0]}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-serif text-lg font-semibold text-ghibli-ink dark:text-ghibli-mist
            line-clamp-2 hover:text-ghibli-moss dark:hover:text-ghibli-leaf transition-colors mb-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-ghibli-earth dark:text-ghibli-sand line-clamp-3 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3 text-xs text-ghibli-earth dark:text-ghibli-sand">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
