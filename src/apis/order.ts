import request from "@/utils/http";

/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

export interface properties {
  propertyMainName: string;
  propertyValueName: string;
}

export interface skus {
  id: string;
  spuId: string;
  name: string;
  quantity: number;
  image: string;
  realPay: number;
  curPrice: number;
  totalMoney: null;
  properties: properties[];
  attrsText: string;
}

export interface getUserOrderResultItem{
  id:string,
  createTime:string,
  payType:number,
  orderState:number,
  payLatesTime:string,
  postFee:number,
  payMoney:number,
  totalMoney:number,
  totalNum:number,
  skus:skus[],
  payChannel:number,
  countdown:number
}

export interface getUserOrderResult {
  counts: number;
  pageSize: number;
  pages: number;
  page: number;
  items: getUserOrderResultItem[];
}

export interface getUserOrderResponse {
  code: string;
  msg: string;
  result: getUserOrderResult;
}

//这段代码中 Promise 的具体含义
//函数 getUserOrder 的返回值类型被声明为 Promise<getUserOrderResponse>，这意味着：
//函数内部执行的是异步操作（这里是 request 网络请求）。
// 函数不会直接返回请求的结果（因为请求还没完成），而是返回一个 Promise 对象。
// 这个 Promise 对象会 “持有” 异步操作的最终结果：
// 当网络请求成功时，Promise 会变成 “已完成”（fulfilled）状态，结果是服务器返回的数据（类型为 getUserOrderResponse，这是 TypeScript 的类型约束，明确了成功时的数据结构）。
// 当网络请求失败时（比如网络错误、服务器报错），Promise 会变成 “已拒绝”（rejected）状态，结果是错误信息。

export const getUserOrder = (params:object):Promise<getUserOrderResponse> => {
  return request({
    url:'/member/order',
    method:'GET',
    params
  })
}
