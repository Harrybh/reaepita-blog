'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from '@/components/UI/ThemeToggle'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/blog', label: '归档' },
    { href: '/tags', label: '标签' },
    { href: '/about', label: '关于' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md
      bg-ghibli-parchment/80 dark:bg-[#1a1a14]/80
      border-b border-ghibli-sand/30 dark:border-ghibli-mist/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-bold
            text-ghibli-moss dark:text-ghibli-leaf
            hover:text-ghibli-earth dark:hover:text-ghibli-sand
            transition-colors">
            reaepita
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ghibli-ink dark:text-ghibli-mist
                  hover:text-ghibli-moss dark:hover:text-ghibli-leaf
                  transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/search"
              className="w-9 h-9 flex items-center justify-center rounded-full
                bg-ghibli-cloud dark:bg-ghibli-ink/60
                text-ghibli-earth dark:text-ghibli-sand
                hover:bg-ghibli-sky/30 dark:hover:bg-ghibli-moss/30
                transition-all duration-200 border border-ghibli-sand/40 dark:border-ghibli-mist/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </Link>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full
                bg-ghibli-cloud dark:bg-ghibli-ink/60
                text-ghibli-earth dark:text-ghibli-sand
                border border-ghibli-sand/40 dark:border-ghibli-mist/20"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ghibli-sand/30 dark:border-ghibli-mist/10
          bg-ghibli-parchment dark:bg-[#1a1a14] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 px-3 rounded-lg text-sm font-medium
                text-ghibli-ink dark:text-ghibli-mist
                hover:bg-ghibli-cloud dark:hover:bg-ghibli-ink/40
                hover:text-ghibli-moss dark:hover:text-ghibli-leaf
                transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
