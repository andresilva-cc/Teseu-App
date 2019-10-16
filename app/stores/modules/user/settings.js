import api from '../../../services/api'

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
        throw ex.response? ex.response.data : ex
      }
    },

    set: async ({ commit, dispatch }, settings) => {
      try {
        const res = await api.patch('/user/settings', settings)
        commit('set', res.data)

        await dispatch('auth/updateLevel', {}, { root: true })

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}