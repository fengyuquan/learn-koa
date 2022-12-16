import path from 'path'
import Koa from 'koa'
import koaStatic from 'koa-static'

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../../../../static'

const app = new Koa()

app.use(koaStatic(path.join(__dirname, staticPath)))

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
