# reaepita.top

> 在文字的森林里漫步

个人博客，灵感来自宫崎骏的手绘美学。访问地址：**[reaepita.top](https://reaepita.top)**

## 技术栈

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + @tailwindcss/typography
- **MDX**：next-mdx-remote + gray-matter，文章以本地 `.mdx` 文件存储
- **代码高亮**：rehype-pretty-code
- **深色模式**：next-themes
- **搜索**：Fuse.js 客户端模糊搜索
- **SEO**：next-sitemap 自动生成 sitemap
- **部署**：Ubuntu + PM2 + Nginx + Let's Encrypt

## 快速开始

```bash
git clone https://github.com/Harrybh/reaepita-blog.git
cd reaepita-blog
npm install
npm run dev
# 访问 http://localhost:3000
```

## 写文章

在 `posts/` 目录下新建 `.mdx` 文件，文件名即为文章 URL：

```
posts/my-post.mdx  →  reaepita.top/blog/my-post
```

文件格式：

```mdx
---
title: "文章标题"
date: "2026-03-27"
excerpt: "显示在卡片和搜索结果中的摘要"
cover: "/images/cover.jpg"
tags: ["技术", "随笔"]
author: "reaepita"
readingTime: 5
---

正文内容，支持完整 MDX 语法...
```

## 发布

```bash
git add .
git commit -m "新文章：xxx"
git push
```

推送后 GitHub Actions 自动构建并部署到服务器，约 2-3 分钟生效。

## 项目结构

```
├── app/                  # 页面路由
│   ├── page.tsx          # 首页
│   ├── blog/[slug]/      # 文章详情
│   ├── tags/[tag]/       # 标签页
│   ├── about/            # 关于
│   └── search/           # 搜索
├── components/
│   ├── Layout/           # Header、Footer
│   ├── Post/             # PostCard、PostList、MDXComponents
│   └── UI/               # TagBadge、SearchBox、ThemeToggle
├── posts/                # MDX 文章
├── lib/
│   ├── posts.ts          # 文章读取逻辑
│   └── utils.ts          # 工具函数
└── styles/globals.css    # 全局样式 + 主题色变量
```

## License

MIT
