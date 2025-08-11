import request from "@/utils/http";
//轮播图接口相关配置
export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

export interface BannerResponse {
  code: string;
  msg: string;
  result: BannerItem[];
}

export  function getBannerAPI(): Promise<BannerResponse> {
  return request({
    url: "/home/banner",
  });
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

//新鲜好物接口相关配置

export interface NewItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNUm:number;
}


export interface NewResponse {
  code: string;
  msg: string;
  result: NewItem[];
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 * 
 */
export const findNewAPI = (): Promise<NewResponse> => {
  return request({
    url:'/home/new'
  })
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

//人气推荐相关接口配置

export interface HotItem {
  id: string;
  picture: string;
  title:string
  alt: number;
}

export interface HotResponse {
  code: string;
  msg: string;
  result: HotItem[];
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = (): Promise<HotResponse> => {
  return request({
    url: "home/hot",
  });
};