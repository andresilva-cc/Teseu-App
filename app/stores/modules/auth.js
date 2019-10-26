import api from '~/services/api'
import * as ApplicationSettings from 'application-settings'
import * as Toast from 'nativescript-toast'
import i18n from '~/resources/lang'
import Error from '~/utils/error'

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
          username: 'Não Autenticado',
          phone: null,
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

    setViewOnlyToken (state, token) {
      state.token = token
      state.authenticated = false
    },

    setRequestId (state, requestId) {
      state.requestId = requestId
    },

    updateLevel (state, level) {
      state.user.level = level.level
      state.user.points = level.points
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
        throw ex.response? ex.response.data : ex
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
        throw ex.response? ex.response.data : ex
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
        throw ex.response? ex.response.data : ex
      }
    },

    checkPhone: async (ctx, phone) => {
      try {
        const res = await api.post('/auth/phone/check', {
          phone
        })

        if (!res.data) {
          throw new Error('UserNotFoundError')
        }

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    updateLevel: async ({ state, commit }) => {
      try {
        const res = await api.get('/user/level')

        if (res.data.level !== state.user.level) {
          Toast.makeText(i18n.t('auth.levelUp', {
            level: res.data.level
          })).show()
        }

        commit('updateLevel', res.data)


        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    generateViewOnlyToken: async ({ commit }) => {
      try {
        const res = await api.get('/auth/viewOnly/token')
        
        commit('setViewOnlyToken', res.data.token)

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}