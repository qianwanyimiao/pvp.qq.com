import axios from 'axios'
import Vue from 'vue'

const httpRequest = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

httpRequest.interceptors.request.use( config => {
  // 将http请求头部授权信息设为token
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
},err => {
  return Promise.reject(err)
})

httpRequest.interceptors.response.use(res => {
  return res
},err => {
  if(err.response.data.message) {
    Vue.prototype.$message({
    type: 'error',
    duration: 1200,
    message: err.response.data.message
  })
  }
  return Promise.reject(err)
})

export default httpRequest