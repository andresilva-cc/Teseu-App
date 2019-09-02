import axios from 'axios'
import store from './stores'

const instance = axios.create({
  baseURL: 'http://192.168.0.108:3000'
})

instance.interceptors.request.use(
  config => {
    if (store.state.auth.token)
      config.headers.Authorization = `Bearer ${store.state.auth.token}`

    return config
    },
  error => {
    return Promise.reject(error)
  }
)

export default instance