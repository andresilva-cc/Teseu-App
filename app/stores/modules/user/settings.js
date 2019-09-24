import api from '../../../api'

export default {
  namespaced: true,

  state: {
    settings: []
  },

  getters: {
    get: state => {
      return state.settings
    }
  },

  mutations: {
    set (state, settings) {
      state.settings = settings
    }
  },

  actions: {
    get: async ({ commit }) => {
      try {
        const res = await api.get('/user/settings')
        commit('set', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}