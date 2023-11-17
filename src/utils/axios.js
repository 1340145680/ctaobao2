import axios from "axios";
axios.defaults.baseURL = "http://localhost:808";

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.code == 200) {
        return response.data;
      }
      if (response.data.code == 400) {
        return Promise.reject(response.data);
      }
      if (response.data.code == 401) {
        //登录过期
        // router.push("/");
      }
      if (response.data.code == 402) {
        //服务器运行错误
        sMessage.error(response.data.msg + response.data.code);
      }
    } else {
      return Promise.reject(response.data);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
