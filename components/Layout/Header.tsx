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
            {/* SillyTavern 入口 */}
            <a
              href="https://st.reaepita.top"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                bg-ghibli-moss/10 dark:bg-ghibli-moss/20
                text-ghibli-moss dark:text-ghibli-leaf
                border border-ghibli-moss/30 dark:border-ghibli-leaf/30
                hover:bg-ghibli-moss hover:text-white dark:hover:bg-ghibli-moss
                transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
              </svg>
              SillyTavern
            </a>

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
          <a
            href="https://st.reaepita.top"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 px-3 rounded-lg text-sm font-medium
              text-ghibli-moss dark:text-ghibli-leaf
              hover:bg-ghibli-cloud dark:hover:bg-ghibli-ink/40
              transition-colors"
          >
            SillyTavern ↗
          </a>
        </div>
      )}
    </header>
  )
}
