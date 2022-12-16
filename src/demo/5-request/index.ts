import Koa from 'koa'
import Router from 'koa-router'
import { koaBody } from 'koa-body'

const app = new Koa()
const router = new Router()

app.use(koaBody())

// http://127.0.0.1:4000/api/get/userInfo?name=aaa
router.get('/api/get/userInfo', async (ctx) => {
  const { name } = ctx.request.query
  ctx.body = `请求参数为${name}` // 请求参数为aaa
})

// http://127.0.0.1:4000/api/get/userInfo {"name": "bbb"}
router.post('/api/get/userInfo', async (ctx) => {
  const { name } = ctx.request.body
  ctx.body = `请求参数为${name}` // 请求参数为bbb
})

// 加载路由中间件
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
