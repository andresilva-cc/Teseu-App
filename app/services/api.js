import axios from 'axios'
import store from '../stores'
import config from './config.json'

const instance = axios.create({
  baseURL: config.API_URL
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