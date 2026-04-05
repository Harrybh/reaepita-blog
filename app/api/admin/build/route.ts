import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST() {
  const cwd = path.join(process.cwd())

  // Spawn build + restart as a detached background process
  const child = spawn(
    'bash',
    ['-c', 'npm run build && pm2 restart reaepita-blog'],
    {
      cwd,
      detached: true,
      stdio: 'ignore',
    }
  )
  child.unref()

  return NextResponse.json({
    ok: true,
    message: '构建已在后台启动，约需 30-60 秒完成，完成后博客将自动更新。',
  })
}
