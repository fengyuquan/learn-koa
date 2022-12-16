import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/api/getUserInfo', async (ctx) => {
  ctx.body = 'hello cors'
})

// 加载cors中间件，更多参数见https://github.com/koajs/cors
// 装载@koa/cors中间件一定要在koa-router之前，如果在请求过程中还没有进行cors设置，跨域问题会依然存在。
app.use(
  cors({
    origin: '*',
  }),
)

app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
