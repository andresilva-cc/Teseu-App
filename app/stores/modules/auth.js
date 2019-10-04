import api from '../../services/api'
import * as ApplicationSettings from 'application-settings'

export default {
  namespaced: true,

  state: {
    user: null,
    authenticated: false,
    token: '',
    requestId: ''
  },

  getters: {
    getUser: state => {
      if (state.user)
        return state.user
      else
        return {
          id: 1,
          username: 'Desconhecido',
          phone: '5500000000000',
          level: 1,
          points: 10
        }
    },

    isAuthenticated: state => {
      return state.authenticated
    }
  },

  mutations: {
    load (state) {
      if (ApplicationSettings.getString('store/auth')) {
        Object.assign(state, JSON.parse(ApplicationSettings.getString('store/auth')))
      }
    },

    setUser (state, user) {
      state.user = user
    },

    setToken (state, token) {
      state.token = token
      state.authenticated = true
    },

    setRequestId (state, requestId) {
      state.requestId = requestId
    },

    logout (state) {
      state.user = null
      state.authenticated = false
      state.token = ''
      state.requestId = ''
    }
  },

  actions: {
    register: async ({ commit }, data) => {
      try {
        const res = await api.post('/auth/register', data)
        commit('setUser', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    },

    sendSMS: async ({ state, commit }) => {
      try {
        const res = await api.post('/auth/sms/send',
        {
          phone: state.user.phone
        })

        commit('setRequestId', res.data.request_id)

        return res.data.status
      
      } catch (ex) {
        throw ex.response.data
      }
    },

    checkSMS: async ({ state, commit }, code) => {
      try {
        const res = await api.post('/auth/sms/check',
        {
          phone: state.user.phone,
          request: state.requestId,
          code
        })

        commit('setToken', res.data.token)
        commit('setUser', res.data.user)
        commit('setRequestId', '')

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}