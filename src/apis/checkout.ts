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
  goods:[{
    id:string,
    name:string,
    picture:string,
    count:number,
    skuId:string,
    attrsText:string,
    price:string,
    payPrice:string,
    totalPrice:string,
    totalPayPrice:string
  }],
  summary:{
    goodsCount:number,
    totalPrice:number,
    totalPayPrice:number,
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

//创建订单接口相关配置

export interface DataItem {
  deliveryTimeType:number,
  payType:number,
  payChannel:number,
  buyerMessage:string,
  goods:[
    {
      skuId:string,
      count:number,
    }
  ],
  addressId:string,
}

export interface createOrderResult{
  id:string,
  createTime:string,
  payType:number,
  orderState:number,
  payLatestTime:string,
  postFee:number,
  payMoney:number,
  totalMoney:number,
  totalNum:number,
  skus:null,
  payChannel:number,
  countdown:null
}

export interface createOrderResponse {
  code: string;
  msg: string;
  result: createOrderResult;
}

export const createOrderAPI = (data: DataItem): Promise<createOrderResponse> => {
  return request({
    url: "/member/order",
    method: "POST",
    data,
  });
};
