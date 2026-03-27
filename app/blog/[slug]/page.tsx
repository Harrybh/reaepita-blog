import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import TagBadge from '@/components/UI/TagBadge'
import MDXComponents from '@/components/Post/MDXComponents'
import type { Metadata } from 'next'
import rehypePrettyCode from 'rehype-pretty-code'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: post.meta.cover ? [post.meta.cover] : [],
      type: 'article',
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const options = {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'one-dark-pro',
            keepBackground: true,
          },
        ],
      ],
    },
  }

  return (
    <article>
      {/* Cover */}
      <div className="relative h-[60vh] min-h-[300px] overflow-hidden">
        {post.meta.cover ? (
          <Image
            src={post.meta.cover}
            alt={post.meta.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ghibli-sky/60 to-ghibli-moss/40" />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.meta.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-white/20 text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
            {post.meta.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-white/80 text-sm">
            <span>{post.meta.author}</span>
            <span>·</span>
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            <span>·</span>
            <span>{post.meta.readingTime} 分钟阅读</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-serif
          prose-a:text-ghibli-moss dark:prose-a:text-ghibli-leaf
          prose-blockquote:border-ghibli-moss
          prose-code:text-ghibli-sunset
          prose-img:rounded-2xl">
          <MDXRemote
            source={post.content}
            components={MDXComponents}
            options={options as any}
          />
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-ghibli-sand/30 dark:border-ghibli-mist/10">
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>

        {/* Prev/Next Navigation */}
        <nav className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`}
              className="ghibli-card p-4 group">
              <p className="text-xs text-ghibli-earth dark:text-ghibli-sand mb-1">← 上一篇</p>
              <p className="text-sm font-medium text-ghibli-ink dark:text-ghibli-mist
                group-hover:text-ghibli-moss dark:group-hover:text-ghibli-leaf
                transition-colors line-clamp-2">
                {prevPost.title}
              </p>
            </Link>
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`}
              className="ghibli-card p-4 group md:text-right">
              <p className="text-xs text-ghibli-earth dark:text-ghibli-sand mb-1">下一篇 →</p>
              <p className="text-sm font-medium text-ghibli-ink dark:text-ghibli-mist
                group-hover:text-ghibli-moss dark:group-hover:text-ghibli-leaf
                transition-colors line-clamp-2">
                {nextPost.title}
              </p>
            </Link>
          )}
        </nav>
      </div>
    </article>
  )
}
