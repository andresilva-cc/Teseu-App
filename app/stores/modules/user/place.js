import api from '../../../services/api'

export default {
  namespaced: true,

  state: {
    places: []
  },

  getters: {
    get: state => {
      return state.places
    }
  },

  mutations: {
    set (state, places) {
      state.places = places
    }
  },

  actions: {
    fetch: async ({ commit }) => {
      try {
        const res = await api.get('/user/places')
        commit('set', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}