import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import LayoutShell from '@/components/Layout/LayoutShell'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'reaepita — 在文字的森林里漫步',
    template: '%s | reaepita',
  },
  description: '一个充满吉卜力美学的个人博客，记录生活、技术与设计的点滴。',
  metadataBase: new URL('https://reaepita.top'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://reaepita.top',
    siteName: 'reaepita',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-ghibli-parchment dark:bg-[#1a1a14]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
