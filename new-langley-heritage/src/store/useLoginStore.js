import { create } from 'zustand';
import UserApi from '../api/UserApi.js'
import { setToken, clearToken } from "../utils/token.js"
const useLoginStore = create((set) => ({
  // token
  token: "",
  // 用户登录
  userLogin: async (userForm) => {
    // 发起网络请求
    const { data } = await UserApi.login(userForm);
    if (data.code == 200) {
      // 设置数据
      localStorage.setItem("zhifou-user", JSON.stringify(data.data.userInfo))
      // 设置token
      setToken(data.data.token)
    } else {
      // 抛出异常
      throw new Error(data.message)
    }
  },
  // 退出登录
  userLogout: () => {
    clearToken();
    // 清除用户信息
    localStorage.removeItem("zhifou-user")
  }
}));
export default useLoginStore