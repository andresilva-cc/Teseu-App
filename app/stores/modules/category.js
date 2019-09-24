import api from '../../api'

export default {
  namespaced: true,

  state: {
    categories: []
  },

  getters: {
    get: state => {
      return state.categories
    }
  },

  mutations: {
    set (state, categories) {
      state.categories = categories
    }
  },

  actions: {
    fetch: async ({ commit }) => {
      try {
        const res = await api.get('/category')
        commit('set', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}