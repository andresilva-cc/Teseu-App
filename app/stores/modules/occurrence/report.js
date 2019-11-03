import api from '~/services/api'

export default {
  namespaced: true,

  state: {
    report: null
  },

  getters: {
    getReport: state => {
      return state.report
    }
  },

  mutations: {
    setReport (state, report) {
      state.report = report
    }
  },

  actions: {
    create: async ({ commit }, payload) => {
      try {
        const report = await api.post(`/occurrences/${payload.occurrenceId}/reports`, {
          description: payload.description
        })

        commit('setReport', report)

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    },

    fetch: async ({ commit }, occurrenceId) => {
      try {
        const res = await api.get(`/occurrences/${occurrenceId}/myReport`)

        commit('setReport', res.data)

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}