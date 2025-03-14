import http from "../utils/http";
const login = (data) => {
  return http.post("/user/login", data);
};
const getUserList = (data) => {
  return http.get("/user/page", data);
};

export default {
  login, getUserList
}