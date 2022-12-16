import Koa from 'koa'
import views from 'koa-views'
import path from 'path'

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const viewPath = '../../../../view'

const app = new Koa()

// 加载模板引擎
app.use(
  views(path.join(__dirname, viewPath), {
    extension: 'ejs',
  }),
)

app.use(async (ctx) => {
  const title = 'koa'
  await ctx.render('index', {
    title,
  })
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
