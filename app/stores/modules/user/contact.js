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
      state.contacts.push(contact)
    },
  },

  actions: {
    fetch: async ({ commit }) => {
      try {
        const res = await api.get('/user/contacts')
        commit('set', res.data)

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    create: async ({ commit, dispatch }, data) => {
      try {
        const res = await api.post('/user/contacts', data)
        commit('push', res.data)

        await dispatch('auth/updateLevel', {}, { root: true })

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    delete: async ({ dispatch }, id) => {
      try {
        await api.delete(`/user/contacts/${id}`)
        await dispatch('fetch')

        await dispatch('auth/updateLevel', {}, { root: true })

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}