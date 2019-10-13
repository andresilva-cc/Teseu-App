import api from '~/services/api'

export default {
  namespaced: true,

  state: {
    comments: []
  },

  getters: {
    getComments: state => {
      return state.comments
    }
  },

  mutations: {
    setComments (state, comments) {
      state.comments = comments
    },
  },

  actions: {
    fetch: async ({ commit }, occurrenceId) => {
      try {
        const res = await api.get(`/occurrences/${occurrenceId}/comments`)
        commit('setComments', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    },

    create: async ({ dispatch }, payload) => {
      try {
        await api.post(`/occurrences/${payload.occurrenceId}/comments`, {
          comment: payload.comment
        })
        await dispatch('fetch', payload.occurrenceId)
        
        await dispatch('auth/updateLevel', {}, { root: true })

        return true
        
      } catch (ex) {
        throw ex.response.data
      }
    },
    
    delete: async ({ dispatch }, payload) => {
      try {
        await api.delete(`/occurrences/${payload.occurrenceId}/comments/${payload.commentId}`)
        await dispatch('fetch', payload.occurrenceId)

        await dispatch('auth/updateLevel', {}, { root: true })

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}