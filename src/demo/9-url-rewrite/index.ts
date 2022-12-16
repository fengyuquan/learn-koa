import Koa from 'koa'
import rewrite from 'koa-rewrite'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/api/new/getUserInfo', async (ctx) => {
  ctx.body = '这是新接口数据！'
})

// 具体方法见https://github.com/koajs/rewrite
app.use(rewrite('/api/getUserInfo', '/api/new/getUserInfo'))
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
