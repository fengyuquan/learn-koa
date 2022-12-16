import path from 'path'
import koa from 'koa'
import koaStatic from 'koa-static'
import Router from 'koa-router'
import jwtPkg from 'jsonwebtoken'
import koaJwt from 'koa-jwt'
import { koaBody } from 'koa-body'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = new koa()
const router = new Router()

const { sign } = jwtPkg
const secret = 'my_secret'
const jwt = koaJwt({ secret })

app.use(koaBody())
app.use(koaStatic(path.join(__dirname, '../../../../static')))

router
  .post('/login', async (ctx) => {
    const { userName } = ctx.request.body
    if (userName) {
      const token = sign({ userName }, secret, { expiresIn: '1h' })
      ctx.body = {
        mssage: 'get token success!',
        code: 1,
        token,
      }
    } else {
      ctx.body = {
        message: 'param error',
        code: -1,
      }
    }
  })
  .get('/welcome', jwt, async (ctx) => {
    ctx.body = { message: 'welcome!!!' }
  })

app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
