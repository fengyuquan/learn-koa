import Router from 'koa-router'

const router = new Router()

router.prefix('/user')

router.get('/getInfo', (ctx) => {
  ctx.body = 'my name is fyq.'
})

export { router }
