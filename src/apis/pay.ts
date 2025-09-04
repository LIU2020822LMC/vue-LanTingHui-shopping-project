import request from "@/utils/http";

export interface getOrderResult {
  id: string;
  createTime: string;
  payType: number;
  orderState: number;
  payLatestTime: string;
  countdown: number;
  postFee: number;
  payMoney: number;
  payChannel: number;
  payState: number;
  totalMoney: number;
  totalNum: number;
  deliveryTimeType: number;
  receiverContact: string;
  receiverMobile: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  receiverAddress: string;
  payTime: null;
  consignTime: null;
  endTime: null;
  closeTime: string;
  evaluationTime: null;
  skus: [
    {
      id: string;
      spuId: string;
      name: string;
      quantity: 2;
      image: string;
      realPay: 270;
      curPrice: 135;
      totalMoney: null;
      properties: [
        {
          propertyMainName: string;
          propertyValueName: string;
        }
      ];
      attrsText: string;
    },
  ];
  arrivalEstimatedTime: null;
}

export interface getOrderResponse {
  code: string;
  msg: string;
  result: getOrderResult;
}

export const getOrderAPI = (id: string): Promise<getOrderResponse> => {
  return request({
    url: `/member/order/${id}`,
  });
};
