import api from '../../../api'

export default {
  namespaced: true,

  state: {
    contacts: []
  },

  getters: {
    get: state => {
      return state.contacts
    }
  },

  mutations: {
    set (state, contacts) {
      state.contacts = contacts
    }
  },

  actions: {
    fetch: async ({ commit }) => {
      try {
        const res = await api.get('/user/contacts')
        commit('set', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}