import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于 reaepita 博客',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-ghibli-ink dark:text-ghibli-mist mb-8">关于</h1>

      <div className="ghibli-card p-8 space-y-6">
        <section>
          <h2 className="font-serif text-xl font-semibold text-ghibli-moss dark:text-ghibli-leaf mb-3">
            你好，我是 reaepita
          </h2>
          <p className="text-ghibli-ink dark:text-ghibli-mist leading-relaxed">
            欢迎来到我的小小角落。这里是我记录思考、分享技术与生活感悟的地方。
            就像吉卜力动画里的那些宁静村庄，我希望这个博客能给你带来一份安静与温暖。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ghibli-moss dark:text-ghibli-leaf mb-3">
            关于这个博客
          </h2>
          <p className="text-ghibli-ink dark:text-ghibli-mist leading-relaxed">
            这个博客使用 Next.js 14 构建，采用吉卜力美学设计风格——温暖的羊皮纸色背景、
            柔和的自然色调、还有来自宫崎骏电影的那种宁静感。
          </p>
          <ul className="mt-3 space-y-2 text-ghibli-earth dark:text-ghibli-sand">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ghibli-moss inline-block" />
              技术文章：前端开发、部署运维
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ghibli-leaf inline-block" />
              设计思考：色彩、排版、美学
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ghibli-sky inline-block" />
              随笔杂谈：生活感悟与日常记录
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ghibli-moss dark:text-ghibli-leaf mb-3">
            联系方式
          </h2>
          <p className="text-ghibli-ink dark:text-ghibli-mist">
            域名：<span className="text-ghibli-moss dark:text-ghibli-leaf font-medium">reaepita.top</span>
          </p>
        </section>
      </div>
    </div>
  )
}
