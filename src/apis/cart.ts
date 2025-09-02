//封装购物车相关接口
import request from "@/utils/http";

//================================================================================================================
//加入购物车接口相关配置
export interface insertCartResult{
  id:string,
  skuId:string,
  name:string,
  attrsText:string,
  specs:string[],
  picture:string,
  price:string,
  nowPrice:string,
  nowOriginalPrice:string,
  selected:boolean,
  stock:number,
  count:number,
  isEffective:boolean,
  discount:null,
  isCollect:boolean,
  postFee:number
}

export interface insertCartResponse {
  code: string;
  msh: string;
  result: insertCartResult
}

export const insertCart = (skuId: string, count: number): Promise<insertCartResponse> => {
  return request({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
};

//================================================================================================================
//获取购物车列表接口相关配置

export interface findNewcartListAPIResult {
  id: string;
  skuId: string;
  attrsText: string;
  specs: string[];
  picture: string;
  price: string;
  nowPrice: string;
  nowOriginalPrice: string;
  selected: boolean;
  stock: number;
  count: number;
  isEffective: boolean;
  discount: null;
  isCollect: boolean;
  postFee:number
}

export interface findNewcartListAPIresponse {
  code: string;
  msg: string;
  result: findNewcartListAPIResult[];
}

export const findNewcartListAPI = (): Promise<findNewcartListAPIresponse> => {
  return request({
    url: "/member/cart",
  });
};
