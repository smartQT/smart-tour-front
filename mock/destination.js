module.exports = [
  {
    url: '/',
    type: 'post',
    response: config => {
      config.res.json({
        code: 20000,
        data: '拦截 /'
      })
      return {
        code: 20000,
        data: '拦截 /'
      }
    }
  },
  {
    url: '/destination/recommend',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '拦截 /destination/recommend'
      }
    }
  }
]