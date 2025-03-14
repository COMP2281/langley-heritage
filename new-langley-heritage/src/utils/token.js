// 提供三个函数，设置token  获取token  清除token
const KEY = 'zhifou-token'

const setToken = (token) => {
  localStorage.setItem(KEY, token)
}

const getToken = () => {
  return localStorage.getItem(KEY) || ''
}

const clearToken = () => {
  localStorage.removeItem(KEY)
}

export { setToken, getToken, clearToken }