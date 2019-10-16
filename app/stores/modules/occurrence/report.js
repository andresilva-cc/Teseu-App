import api from '~/services/api'

export default {
  namespaced: true,

  actions: {
    create: async (ctx, payload) => {
      try {
        await api.post(`/occurrences/${payload.occurrenceId}/reports`, {
          description: payload.description
        })

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}