import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-ghibli-sand/30 dark:border-ghibli-mist/10
      bg-ghibli-parchment dark:bg-[#1a1a14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg text-ghibli-moss dark:text-ghibli-leaf">reaepita</p>
            <p className="text-sm text-ghibli-earth dark:text-ghibli-sand mt-1">
              在文字的森林里漫步
            </p>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            {[
              { href: '/', label: '首页' },
              { href: '/blog', label: '归档' },
              { href: '/tags', label: '标签' },
              { href: '/about', label: '关于' },
              { href: '/search', label: '搜索' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ghibli-earth dark:text-ghibli-sand
                  hover:text-ghibli-moss dark:hover:text-ghibli-leaf
                  transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-ghibli-sand dark:text-ghibli-sand/60">
            © {year} reaepita · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
