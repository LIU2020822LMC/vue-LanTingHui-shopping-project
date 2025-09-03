import request from "@/utils/http"
//获取订单详情接口相关配置

export interface userAddressesItem{
  id:string,
  receiver:string,
  contact:string,
  provinceCode:string,
  countyCode:string,
  address:string,
  isDefault:number,
  fullLocation:string,
  postalCode:null,
  addressTags:null
}

export interface CheckoutInfoItem {
  userAddresses: userAddressesItem[],
  goods:string[],
  summary:{
    goodsCount:number,
    totalPrice:number,
    postFee:number,
    discountPrice:number
  }
}

export interface CheckoutInfoResponse {
  code: string;
  msg: string;
  result: CheckoutInfoItem;
}

export const getCheckoutInfo = ():Promise<CheckoutInfoResponse> =>{
  return request({
    url: "/member/order/pre",
  });
}
