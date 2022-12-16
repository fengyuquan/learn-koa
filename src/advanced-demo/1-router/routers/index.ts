import compose, { ComposedMiddleware } from 'koa-compose'
import glob from 'glob'
import { resolve } from 'path'
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 这里可以使用koa-compose对koa-router进行整合，这是因为koa-router里面的routers方法和allowedMethods方法和我们平时用的中间件回调方法是一样的
const registerRouter = (): ComposedMiddleware<unknown> => {
  const routers = []
  // 递归式获取当前文件夹下所有的.js文件
  glob
    .sync(resolve(__dirname, './', '**/*.js'))
    // 排除index.js文件, 因为这个文件不是具体的路由文件
    .filter((routerPath) => routerPath.indexOf('index.js') === -1)
    .forEach((routerPath) => {
      const filepath = `./${path.basename(routerPath)}`
      import(filepath).then(({ router }) => {
        routers.push(router.routes())
        routers.push(router.allowedMethods())
      })
    })
  return compose(routers)
}

export { registerRouter }
