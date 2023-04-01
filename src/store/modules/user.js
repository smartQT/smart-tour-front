import { registerEmail, register, login } from '@/api/user'
import { setToken } from '@/utils/auth'

const state = {
  token: ''
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

const actions = {
  registerEmail({ commit }, info) {
    return new Promise((resolve, reject) => {
      registerEmail(info).then(
        ({ data }) => {
          if (data.status === -1) {
            reject('邮箱验证码获取失败，请再次尝试')
          } else {
            resolve()
          }
        },
        error => {
          console.log(error)
        }
      )
    })
  },

  register({ commit }, info) {
    return new Promise((resolve, reject) => {
      register(info).then(
        ({ data }) => {
          console.log('注册信息: ', data)

          if (data.status === -1) {
            reject(data.errorMsg)
          } else {
            resolve(data.data)
          }
        },
        err => {
          console.log('注册失败: ', err)
          reject(err)
        }
      )
    })
  },

  login({ commit }, info) {
    console.log('登录信息: ', info)
    return new Promise((resolve, reject) => {
      login(info).then(
        ({ data }) => {
          console.log('store/user: ', data)

          switch (data.status) {
            case -1:
              console.log('登录失败: ', data.errorMsg)
              reject(data.errorMsg)
              break
            case 200:
              setToken(data.data)
              commit('SET_TOKEN', data.data)
              resolve()
              break

            default:
              reject('未知状态码')
              break
          }
        }
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}