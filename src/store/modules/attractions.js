import { getAttractionList } from '@/api/attractions'

const state = {
  list: []
}

const mutations = {
  SET_LIST(state, list) {
    state.list = list
  }
}

const actions = {
  getAttractionList({ commit }, id) {
    return new Promise((resolve, reject) => {
      getAttractionList().then(
        ({ data }) => {
          if (data.status === -1) {
            reject(data.errorMsg)
          }

          const list = data.data
          commit('SET_LIST', list)

          resolve(list)
        },
        err => {
          reject(err)
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