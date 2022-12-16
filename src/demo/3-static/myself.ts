import fs from 'fs'
import path from 'path'
import Koa from 'koa'

// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../../../../static'

// 设置一个mime map, 因为本项目只涉及3种类型, 所以这里只列3种
const MIMES_MAP = {
  css: 'text/css',
  html: 'text/html',
  jpg: 'image/jpeg',
}

const app = new Koa()

// 实现了和app.use(koaStatic(path.join(__dirname, staticPath)))同样的功能
app.use(async (ctx) => {
  // 静态资源目录在本地的绝对路径
  const fullStaticPath = path.join(__dirname, staticPath)

  let content = ''
  try {
    // 获取静态资源内容, 有可能是文件内容、目录或404
    const filepath = path.join(fullStaticPath, ctx.url)
    content = fs.readFileSync(filepath, 'binary')
  } catch (e) {
    ctx.body = 'no such file'
    return
  }

  // 解析请求内容的类型
  const mime = parseMime(ctx.url)

  // 如果有对应的文件类型, 就配置上下文的类型
  if (mime) {
    ctx.type = mime
  }

  // 输出静态资源的内容
  if (mime && mime.indexOf('image/') >= 0) {
    // 如果是图片, 则用Node原生res, 输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write(content, 'binary')
    ctx.res.end()
  } else {
    // 其他则输出文本
    ctx.body = content
  }
})

// 解析资源类型
function parseMime(url: string): string {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return MIMES_MAP[extName]
}

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
