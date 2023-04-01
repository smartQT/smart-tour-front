'use strict'
const path = require('path')

// const proxyAPIList = ['/user']

// const proxyList = proxyAPIList.reduce((acc, cur) => {
//   acc[cur] = {
//     target: process.env.VUE_APP_BASE_URL_2
//   }
//   return acc
// }, {})

function resolve(dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'moblle-uniapp',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    // proxy: proxyList,
    setupMiddlewares: (middlewares, { app }) => {
      console.log('开启中间件')
      require('./mock/mock-server.js')(app)

      middlewares.unshift({
        name: 'destination',
        // `path` 是可选的
        path: '/destination/recommend',
        middleware: (req, res) => {
          console.log('请求的路径:' + req.path)
          res.send('成功拦截请求')
        }
      })

      // console.log(app._router.stack)

      return middlewares
    }
  }
}