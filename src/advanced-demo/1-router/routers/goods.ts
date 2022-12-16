import Router from 'koa-router'

const router = new Router()

// 设置路由前缀
router.prefix('/goods')

router.get('/getInfo', (ctx) => {
  ctx.body = 'this is koa book.'
})

export { router }
