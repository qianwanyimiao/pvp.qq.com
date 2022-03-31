import axios from "axios";
import Vue from "vue";
import router from "./router";

// baseURL在开发环境下需要一个动态地址或者绝对地址
const httpRequest = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/admin/api",
  // baseURL: 'http://localhost:3000/admin/api'
});

httpRequest.interceptors.request.use(
  (config) => {
    // 将http请求头部授权信息设为token(token有可能是undefined，所以赋值为空)
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

httpRequest.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        duration: 1200,
        message: err.response.data.message,
      });

      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default httpRequest;
