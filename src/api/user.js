export function registerEmail(email) {
  return uni.request({
    url: '/user/code',
    method: 'post',
    data: {
      email
    }
  })
}

export function register(info) {
  return uni.request({
    url: '/user/register',
    method: 'POST',
    data: {
      ...info
    }
  })
}

export function login(info) {
  return uni.request({
    url: '/user/login',
    method: 'post',
    data: info
  })
}