import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/posts'
import PostList from '@/components/Post/PostList'
import TagBadge from '@/components/UI/TagBadge'

export default function HomePage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const recentPosts = posts.slice(0, 5)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ghibli-sky/60 via-ghibli-moss/40 to-ghibli-earth/50" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            reaepita
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow max-w-xl leading-relaxed">
            在文字的森林里漫步，记录生活、技术与设计的点滴
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/blog"
              className="px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white
                border border-white/40 hover:bg-white/30 transition-all text-sm font-medium">
              浏览文章
            </Link>
            <Link href="/about"
              className="px-6 py-2.5 rounded-full bg-ghibli-moss/80 backdrop-blur-sm text-white
                border border-ghibli-moss hover:bg-ghibli-moss transition-all text-sm font-medium">
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Posts Grid */}
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-2xl font-semibold text-ghibli-ink dark:text-ghibli-mist mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-ghibli-moss rounded-full inline-block" />
              最新文章
            </h2>
            <PostList posts={posts} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
            {/* Tag Cloud */}
            <div className="ghibli-card p-5">
              <h3 className="font-serif text-lg font-semibold text-ghibli-ink dark:text-ghibli-mist mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-ghibli-leaf rounded-full inline-block" />
                标签云
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                  <TagBadge key={tag} tag={tag} count={count} />
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="ghibli-card p-5">
              <h3 className="font-serif text-lg font-semibold text-ghibli-ink dark:text-ghibli-mist mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-ghibli-sky rounded-full inline-block" />
                最近更新
              </h3>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}
                      className="text-sm text-ghibli-ink dark:text-ghibli-mist
                        hover:text-ghibli-moss dark:hover:text-ghibli-leaf
                        transition-colors line-clamp-2 font-medium">
                      {post.title}
                    </Link>
                    <p className="text-xs text-ghibli-earth dark:text-ghibli-sand mt-0.5">
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
