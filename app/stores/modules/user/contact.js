import api from '../../../services/api'

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
    },

    push (state, contact) {

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
    },

    create: async ({ commit }, data) => {
      try {
        const res = await api.post('/user/contacts', data)
        commit('push', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}