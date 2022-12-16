import Koa from 'koa'
import session from 'koa-session'
import shortid from 'shortid'
import { koaBody } from 'koa-body'
import { router as cookieRouter } from './cookie.js'
import { router as sessionRouter } from './session.js'
import { RedisStore } from './store.js'

const app = new Koa()

// 选择1：将session存储在cookie中，不安全
/*
const sessionConfig = {
  // Cookie 键名
  key: 'koa:sess',
  // 过期时间为一天
  maxAge: 86400000,
  // 不做签名
  signed: false,
}
*/

// 选择2：将session存储在服务器的redis中，安全
const redisConfig = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
}

const sessionConfig = {
  // Cookie 键名
  key: 'koa:sess',
  // 保存期限为一天
  maxAge: 86400000,
  // 不做签名
  signed: false,
  // 提供外部存储
  store: new RedisStore(redisConfig),
  // 键的生成函数
  genid: (): string => shortid.generate(),
}

app.use(session(sessionConfig, app))
app.use(koaBody())
app.use(cookieRouter.routes())
app.use(sessionRouter.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
