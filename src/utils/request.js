/* eslint-disable no-undef */
import store from '@/store'

uni.addInterceptor('request', {
  invoke(args) {
    // 如果有 token，则在请求头上携带 token
    const token = store.getters.token
    if (token) {
      args.header = { ...args.header, 'X-token': token }
    }

    args.method = args.method || 'get'

    // args.url = process.env.VUE_APP_BASE_URL_2 + args.url
    args.url = process.env.VUE_APP_BASE_URL + args.url

    // if (process.env.ENV === 'development') {
    //   args.url = process.env.VUE_APP_BASE_API + args.url
    //   console.log("process.env.ENV === 'development'")
    // }
  },
  success(args) {

  },
  complete(res) {

  }
})