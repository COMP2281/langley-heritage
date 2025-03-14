import axios from 'axios'
import { getToken } from "./token.js"
const instance = axios.create({
  baseURL: 'http://118.89.133.167:8083/zhifou-blog',
  timeout: 5000
})
instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['token'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {

  return Promise.reject(error)
})

export default instance;