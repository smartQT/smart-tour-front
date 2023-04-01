const chokidar = require('chokidar') // 用于监听文件变化，实现热更新；
const Mock = require('mockjs') // ：用于解析 HTTP 请求体，支持 JSON、Raw、文本、URL-encoded 格式；
const chalk = require('chalk') // 终端输出彩色文字，方便区分信息；
const bodyParser = require('body-parser')
const path = require('path')

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    console.log('代理: ', mock.url)
    app[mock.type](mock.url, mock.response)
    // app._router.stack.length 的作用是获取已注册的中间件、路由和错误处理函数的数量。
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// 删除已注册的 mock 接口
function unregisterRoutes() {
  // 遍历 Node.js 中已加载的所有模块（包括已经缓存的模块）；
  console.log('require.cache: ', Object.keys(require.cache))
  Object.keys(require.cache).forEach(i => {
    // 判断当前模块的路径是否包含 mockDir，即是否为 mock 目录中的模块
    if (i.includes(mockDir)) {
      // 调用 require.resolve(i) 方法获取当前模块的绝对路径
      // 并使用 delete 关键字删除该模块的缓存
      delete require.cache[require.resolve(i)]
    }
  })
}

// 用于生成一个 mock 接口
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('请求的路径:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports = app => {
  // console.log(app)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  var { mockRoutesLength, mockStartIndex } = mockRoutes

  // 监视文件，热重载模拟服务器
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        console.log(mockRoutesLength)
        // console.log(app._router.stack.slice(mockStartIndex, mockRoutesLength))
        // 用于删除已注册的 mock 接口
        // app._router.stack：express 实例中的一个中间件栈，它包含了所有已注册的中间件、路由和错误处理函数；
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 清楚所有 mock 的路由
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}