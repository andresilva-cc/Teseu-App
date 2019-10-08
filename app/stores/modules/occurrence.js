import api from '~/services/api'
import moment from 'moment'

export default {
  namespaced: true,

  state: {
    nearbyOccurrences: [],
    lastUpdateAt: null
  },

  getters: {
    getNearby: state => {
      return state.nearbyOccurrences
    },

    getLastUpdateAt: state => {
      return state.lastUpdateAt
    }
  },

  mutations: {
    setNearby (state, occurrences) {
      state.nearbyOccurrences = occurrences
      state.lastUpdateAt = moment()
    },
  },

  actions: {
    nearby: async ({ commit }, data) => {
      try {
        console.log('entrou na action')
        const res = await api.post('/occurrences/nearby', data)
        commit('setNearby', res.data)


        return true

      } catch (ex) {
        console.log(ex)
        throw ex.response.data
      }
    },

    create: async (ctx, data) => {
      try {
        const res = await api.post('/occurrences', data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}