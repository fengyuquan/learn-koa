import Koa from 'koa'
import { registerRouter } from './routers/index.js'

const app = new Koa()

app.use(registerRouter())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
