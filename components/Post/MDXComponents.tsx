import Image from 'next/image'
import Link from 'next/link'

const MDXComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="font-serif text-3xl font-bold text-ghibli-ink dark:text-ghibli-mist mt-8 mb-4 pl-4 border-l-4 border-ghibli-moss">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-serif text-2xl font-semibold text-ghibli-ink dark:text-ghibli-mist mt-8 mb-3 pl-3 border-l-3 border-ghibli-moss">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-serif text-xl font-semibold text-ghibli-ink dark:text-ghibli-mist mt-6 mb-2 pl-3 border-l-2 border-ghibli-leaf">
      {children}
    </h3>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-6 pl-4 pr-4 py-3 border-l-4 border-ghibli-moss
      bg-ghibli-cloud dark:bg-ghibli-ink/40
      rounded-r-xl italic text-ghibli-earth dark:text-ghibli-sand">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link
      href={href || '#'}
      className="text-ghibli-moss dark:text-ghibli-leaf underline underline-offset-2
        decoration-ghibli-leaf/50 hover:decoration-ghibli-moss transition-colors"
    >
      {children}
    </Link>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-8">
      <div className="relative w-full h-64 md:h-96">
        <Image
          src={src || ''}
          alt={alt || ''}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-ghibli-earth dark:text-ghibli-sand mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-ghibli-cloud dark:bg-ghibli-ink/60
          text-ghibli-sunset font-mono text-sm">
          {children}
        </code>
      )
    }
    return <code className={className}>{children}</code>
  },
}

export default MDXComponents
