import request from "@/utils/http";

export function getCategory(){
  return request({
    url:'home/category/head'
  })
}