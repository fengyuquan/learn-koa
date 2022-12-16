import path from 'path'
import Koa from 'koa'
import error from 'koa-error'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const viewPath = path.join(__dirname, '../../../../view')

app.use(
  error({
    engine: 'pug',
    template: path.join(viewPath + '/error.pug'),
  }),
)

router.get('/api/getUserInfo', async (ctx) => {
  console.log(ctx.request.query)
  if (ctx.request.query.name !== 'fyq') {
    throw Error('出现异常')
  }
  ctx.body = '200: fyq' // http://127.0.0.1:4000/api/getUserInfo?name=fyq
})

app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
