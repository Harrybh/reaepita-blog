import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TagBadgeProps {
  tag: string
  count?: number
  active?: boolean
  className?: string
}

export default function TagBadge({ tag, count, active, className }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
        'border hover:scale-105',
        active
          ? 'bg-ghibli-moss text-white border-ghibli-moss'
          : 'bg-ghibli-cloud text-ghibli-moss border-ghibli-sky/40 hover:bg-ghibli-sky/20 dark:bg-ghibli-ink/40 dark:text-ghibli-sky dark:border-ghibli-sky/30',
        className
      )}
    >
      <span>{tag}</span>
      {count !== undefined && (
        <span className="text-xs opacity-70">({count})</span>
      )}
    </Link>
  )
}
