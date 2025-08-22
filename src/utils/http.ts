//axios基础的封装
import axios from 'axios'
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

const request = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

//axios请求拦截器
request.interceptors.request.use(config =>{
  //函数（config => { return config }）：请求成功准备发送时会执行。
  //config 是请求的 “配置信息”（比如请求地址、请求头、参数等）。
  //这里 return config 表示 “让请求按原计划发送”（不做修改）。
  //实际开发中，这里经常用来加东西，比如给所有请求加个身份令牌（token）：config.headers.token = 'xxx'，再 return 出去。

  //给所有请求加个身份令牌（token）
  //1.从pinia获取token数据
  const userStore = useUserStore();
  const token = userStore.userInfo?.token
  //2.按照后端的要求拼接token数据
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
},e => Promise.reject(e))

//axios响应式拦截器
request.interceptors.response.use(
  //返回res.data是为了只提取响应体数据，让调用方直接拿到业务数据，而不需要每次都response.data
  //实际流程：
  // 1.服务器返回的是已经是JSON格式的数据
  // 2.Axios会自动将JSON响应解析成JavaScript对象
  // 3.拦截器只是帮你把response.data提取出来，省去了每次都要.data的步骤
  // 举个例子：
  //没有拦截器时
  // const response = await request.get('/api/goods')
  // const data = response.data  // 需要手动.data

  // 有拦截器时
  // const data = await request.get('/api/goods')  // 直接拿到数据
  (res) => res.data,
  //统一错误提示
  (e) => {
    ElMessage({
      showClose: true,
      message: e.response.data.message,
      type: "error",
    });
    return Promise.reject(e);
  }
);


export default request
