import { getToken } from '@/utils/auth'

const blackList = [
  '/pages/tabbar/user/index',
  '/pages/tabbar/collect/index'
]

const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']

list.map(item => {
  uni.addInterceptor(item, {
    invoke({ url }) {
      if (!hasPermission(url)) {
        uni.navigateTo({
          url: '/pages/login/login'
        })

        return false
      }
      return true
    }
  })
})

function hasPermission(url) {
  // 在黑名单存在 url ，则 token 中必须存在token
  if (blackList.includes(url) && !getToken()) {
    return false
  }

  return true
}