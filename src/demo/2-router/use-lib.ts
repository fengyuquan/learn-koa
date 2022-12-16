import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/api/get/userInfo', async (ctx) => {
  ctx.body = '200: this is getUserInfo request'
})

router.get('/api/update/userInfo', async (ctx) => {
  ctx.body = '200: this is updateUserInfo request'
})

// 加载路由中间件
app.use(router.routes()).use(async (ctx) => {
  ctx.body = '404: no router match'
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
