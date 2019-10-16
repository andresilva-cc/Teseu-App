import api from '~/services/api'

export default {
  namespaced: true,

  state: {
    enabled: false
  },

  getters: {
    isEnabled: state => {
      return state.enabled
    }
  },

  mutations: {
    set (state, enabled) {
      state.enabled = enabled
    }
  },

  actions: {
    check: async ({ commit }) => {
      try {
        const res = await api.get('/emergencyMode/check')
        commit('set', res.data)

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    enable: async ({ commit }) => {
      try {
        await api.get('/emergencyMode/enable')
        commit('set', true)
  
        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    disable: async ({ commit }) => {
      try {
        await api.get('/emergencyMode/disable')
        commit('set', false)
  
        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}