import api from '~/services/api'

export default {
  namespaced: true,

  actions: {
    updateFCMToken: async (ctx, token) => {
      try {
        await api.post('/user/fcm/token', { token })

        return true

      } catch (ex) {
        throw ex.response? ex.response.data : ex
      }
    }
  }
}