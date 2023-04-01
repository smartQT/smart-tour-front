import Cookie from 'js-cookie'

const TokenKey = 'User_token'

export function setToken(token) {
  Cookie.set(TokenKey, token)
}

export function getToken() {
  return Cookie.get(TokenKey)
}