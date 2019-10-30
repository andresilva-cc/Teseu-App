import api from '~/services/api'
import moment from 'moment'

export default {
  namespaced: true,

  state: {
    nearbyOccurrences: [],
    syncing: true,
    lastUpdateAt: null
  },

  getters: {
    getNearby: state => {
      return state.nearbyOccurrences
    },

    getLastUpdateAt: state => {
      return state.lastUpdateAt
    },

    isSyncing: state => {
      return state.syncing
    }
  },

  mutations: {
    setNearby (state, occurrences) {
      state.nearbyOccurrences = occurrences
      state.lastUpdateAt = moment()
    },

    setSyncing (state, value) {
      state.syncing = value
    }
  },

  actions: {
    nearby: async ({ commit }, data) => {
      try {
        const res = await api.post('/occurrences/nearby', data)
        commit('setNearby', res.data)


        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    create: async ({ dispatch }, data) => {
      try {
        const res = await api.post('/occurrences', data)

        await dispatch('auth/updateLevel', {}, { root: true })

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}