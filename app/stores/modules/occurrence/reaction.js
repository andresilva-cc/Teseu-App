import api from '~/services/api'

export default {
  namespaced: true,

  state: {
    reactions: [],
    myReactions: [false, false, false]
  },

  getters: {
    getReactions: state => {
      return state.reactions
    },

    getMyReactions: state => {
      return state.myReactions
    }
  },

  mutations: {
    setReactions (state, reactions) {
      state.reactions = reactions
    },

    setMyReaction (state, payload) {
      state.myReactions[payload.reaction] = payload.value
    },

    setMyReactions (state, myReactions) {
      state.myReactions = myReactions
    }
  },

  actions: {
    fetch: async ({ commit }, occurrenceId) => {
      try {
        const res = await api.get(`/occurrences/${occurrenceId}/reactions`)
        commit('setReactions', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    },

    myReactions: async ({ commit }, occurrenceId) => {
      try {
        const res = await api.get(`/occurrences/${occurrenceId}/myReactions`)
        commit('setMyReactions', res.data)

        return true

      } catch (ex) {
        throw ex.response.data
      }
    },

    create: async ({ commit, dispatch }, payload) => {
      try {
        await api.post(`/occurrences/${payload.occurrenceId}/reactions`, {
          reaction: payload.reaction
        })
        await dispatch('fetch', payload.occurrenceId)
        commit('setMyReaction', { reaction: payload.reaction, value: true })
        
        return true
        
      } catch (ex) {
        throw ex.response.data
      }
    },
    
    delete: async ({ commit, dispatch }, payload) => {
      try {
        await api.delete(`/occurrences/${payload.occurrenceId}/reactions/${payload.reaction}`)
        await dispatch('fetch', payload.occurrenceId)
        commit('setMyReaction', { reaction: payload.reaction, value: false })

        return true

      } catch (ex) {
        throw ex.response.data
      }
    }
  }
}