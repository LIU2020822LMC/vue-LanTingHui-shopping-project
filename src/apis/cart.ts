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

//================================================================================================================
//删除购物车列表物品接口相关配置

export interface deleteCartListResponse{
  code:string,
  msg:string,
  result:boolean
}

export const deleteCartList = (ids: string[]): Promise<deleteCartListResponse> => {
  return request({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};

//================================================================================================================

//合并购物车列表物品接口相关配置
export interface MergeCartItem {
  skuId: string;
  selected: boolean;
  count: number;
}

export interface MergeCartResponse {
  code: string;
  msg: string;
  result: null;
}

export const mergeCartAPI = (data: MergeCartItem[]): Promise<MergeCartResponse> => {
  return request({
    url: "/member/cart/merge",
    method: "POST",
    data
  });
}
