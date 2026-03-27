# reaepita — 在文字的森林里漫步

一个以**吉卜力美学**为灵感的个人博客，使用 Next.js 14 构建，部署于 [reaepita.top](https://reaepita.top)。

温暖的羊皮纸色背景、柔和的自然色调、还有那种来自宫崎骏电影的宁静感。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) + TypeScript |
| 样式 | Tailwind CSS v4 + @tailwindcss/typography |
| 内容 | next-mdx-remote + gray-matter（本地 MDX 文件） |
| 代码高亮 | rehype-pretty-code |
| 主题切换 | next-themes（深色 / 浅色模式） |
| 搜索 | Fuse.js（客户端模糊搜索） |
| SEO | next-sitemap（自动生成 sitemap.xml） |
| 部署 | PM2 + Nginx + Let's Encrypt |

## 视觉主题

色彩灵感来自吉卜力手绘景观：苔藓绿、天空蓝、大地棕、羊皮纸白。

```
ghibli-moss:      #4a7c59   深林绿
ghibli-leaf:      #7ab648   嫩叶绿
ghibli-sky:       #7bb3c0   天空蓝
ghibli-parchment: #f5f0e8   羊皮纸白（背景色）
ghibli-earth:     #8b6f47   大地棕
ghibli-ink:       #2c2416   暖墨黑（正文色）
ghibli-sunset:    #d4845a   日落橙（强调色）
```

字体：Noto Serif SC（标题）/ Noto Sans SC（正文）/ JetBrains Mono（代码）

## 项目结构

```
reaepita-blog/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页：Hero + 文章网格 + 侧边栏
│   ├── blog/[slug]/        # 文章详情（MDX 渲染）
│   ├── tags/[tag]/         # 标签筛选页
│   ├── about/              # 关于页
│   └── search/             # 搜索页（客户端组件）
├── components/
│   ├── Layout/             # Header、Footer
│   ├── Post/               # PostCard、PostList、MDXComponents
│   ├── UI/                 # TagBadge、SearchBox、ThemeToggle
│   └── SEO/                # OpenGraph
├── posts/                  # MDX 文章（在此添加新文章）
├── lib/
│   ├── posts.ts            # getAllPosts / getPostBySlug / getAllTags
│   └── utils.ts            # formatDate / readingTime / cn()
└── styles/
    └── globals.css         # 全局样式 + Tailwind 主题变量
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000

# 生产构建
npm run build
npm run start
```

## 写新文章

在 `posts/` 目录下新建 `.mdx` 文件，文件名即为 URL slug：

```mdx
---
title: "文章标题"
date: "2024-05-01"
excerpt: "文章摘要，显示在卡片和 meta 标签中。"
cover: "/images/your-cover.jpg"
tags: ["技术", "随笔"]
author: "reaepita"
readingTime: 5
---

正文内容（支持完整 MDX 语法）...
```

保存后页面自动热更新，无需重启服务。

## 部署到服务器

```bash
# 克隆项目
git clone https://github.com/Harrybh/reaepita-blog.git /var/www/reaepita-blog
cd /var/www/reaepita-blog

# 一键部署（安装依赖 → 构建 → 启动 PM2）
bash deploy.sh

# 设置开机自启
pm2 startup   # 按提示执行输出的命令
```

Nginx 配置参考 `nginx.conf`，SSL 证书使用 Let's Encrypt：

```bash
sudo certbot --nginx -d reaepita.top -d www.reaepita.top
```

## 更新部署

```bash
cd /var/www/reaepita-blog
git pull origin master
npm install
npm run build
pm2 restart reaepita-blog
```

## License

MIT
