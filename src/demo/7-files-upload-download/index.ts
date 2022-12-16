import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import koaStatic from 'koa-static'
import send from 'koa-send'
import Router from 'koa-router'
import { koaBody } from 'koa-body'

const app = new Koa()
const router = new Router()

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '../../../../static')
const uploadPath = path.join(__dirname, '../../../../upload')

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件的限制, 默认2MB
    },
  }),
)

app.use(koaStatic(staticPath))

router.get('/download/:name', async (ctx) => {
  const name = ctx.params.name
  const path = `${name}`
  ctx.attachment(path)
  await send(ctx, path, {
    root: 'upload',
  })
})

router.post('/upload', async (ctx) => {
  // 获取文件对象
  const file = ctx.request.files.file
  if (!Array.isArray(file)) {
    // 读取文件内容
    const data = fs.readFileSync(file.filepath)
    // 保存到服务端
    fs.writeFileSync(path.join(uploadPath, file.originalFilename), data)
    ctx.body = { message: '上传成功！' }
  }
})

app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
