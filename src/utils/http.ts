//axios基础的封装
import axios from 'axios'

const request = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

//axios请求拦截器
request.interceptors.request.use(config =>{
  //第一个函数（config => { return config }）：请求成功准备发送时会执行。
  //config 是请求的 “配置信息”（比如请求地址、请求头、参数等）。
  //这里 return config 表示 “让请求按原计划发送”（不做修改）。
  //实际开发中，这里经常用来加东西，比如给所有请求加个身份令牌（token）：config.headers.token = 'xxx'，再 return 出去。
  return config
},e => Promise.reject(e))

//axios响应式拦截器
request.interceptors.response.use(res => res.data,e=>{
  return Promise.reject(e)
})


export default request