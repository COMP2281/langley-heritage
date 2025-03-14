import http from "../utils/http";
const getBlogList = (data) => {
  return http.get("/blog/page", data);
};
const saveBlog = (data) => {
  return http.post("/blog/save", data);
};
const delBlog = (data) => {
  return http.del("/blog/delete/" + data);
};
const getBlogInfo = (data) => {
  return http.get("/blog/info/" + data);
};
export default {
  getBlogList,
  saveBlog,
  delBlog,
  getBlogInfo
}