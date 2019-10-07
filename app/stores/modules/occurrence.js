import api from '~/services/api'

export default {
  namespaced: true,

  state: {
    occurrences: []
  },

  getters: {
    get: state => {
      return state.occurrences
    }
  },

  mutations: {
    set (state, occurrences) {
      state.occurrences = occurrences
    }
  },

  actions: {
    create: async (ctx, data) => {
      try {
        const res = await api.post('/occurrences', data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}