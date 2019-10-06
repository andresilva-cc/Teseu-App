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
    },

    push (state, place) {
      state.places.push(place)
    },
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
    },

    create: async ({ commit }, data) => {
      try {
        const res = await api.post('/user/places', data)
        commit('push', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    },

    delete: async ({ dispatch }, id) => {
      try {
        await api.delete(`/user/places/${id}`)
        await dispatch('fetch')

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}