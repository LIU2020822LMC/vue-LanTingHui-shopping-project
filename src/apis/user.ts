//登录接口相关配置
import request from "@/utils/http";

export interface loginResult{
  id:string,
  account:string,
  mobile:string,
  token:string,
  avatar:string,
  nickname:string,
  gender:string,
  birthday:string,
  cityCode:string,
  provinceCode:string,
  profession:string
}

export interface loginResponse{
  code:string,
  msg:string,
  result:loginResult
}

export const loginAPI = ({account,password}:{account:string,password:string}):Promise<loginResponse> =>{
  return request({
    url:'/login',
    method:'POST',
    data:{
      account,
      password
    }
  })
}
