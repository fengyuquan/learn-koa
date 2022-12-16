import fs from 'fs'
import path from 'path'
import Router from 'koa-router'

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '../../../../static')

const router = new Router()

// 用来加载前端页面
router.get('/', async (ctx) => {
  ctx.set({ 'Content-Type': 'text/html' })
  ctx.body = fs.readFileSync(path.join(staticPath, './login.html'))
})

// 当用户登录时
router.post('/login', async (ctx) => {
  const postData = ctx.request.body // 获取用户的提交数据
  if (ctx.session.usr) {
    ctx.body = `欢迎, ${ctx.session.usr}`
  } else {
    ctx.session = postData
    ctx.body = '您第一次登录系统'
  }
})

export { router }
