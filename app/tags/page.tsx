import { getAllTags } from '@/lib/posts'
import TagBadge from '@/components/UI/TagBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '标签',
  description: '所有文章标签',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-ghibli-ink dark:text-ghibli-mist mb-8">标签</h1>
      <div className="ghibli-card p-6">
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <TagBadge key={tag} tag={tag} count={count} />
          ))}
        </div>
      </div>
    </div>
  )
}
