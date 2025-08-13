import request from "@/utils/http";
//轮播图接口相关配置
export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

//为params参数定义一个明确的接口类型
interface BannerParams {
  distributionSite?: number; // 问号表示这是可选属性
}

export interface BannerResponse {
  code: string;
  msg: string;
  result: BannerItem[];
}

export  function getBannerAPI(params: BannerParams = {}): Promise<BannerResponse> {
  //默认为1，商品为2
  const { distributionSite = 1 } = params;
  return request({
    url: "/home/banner",
    params: {
      distributionSite,
    },
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

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

//产品列表相关接口配置

export interface GoodsChildrenItem{
  id:string;
  name:string;
  layer:string;
  parent:null;
}

export interface GoodsGoodsItem{
  id:string;
  name:string;
  desc:string;
  price:string;
  picture:string;
  orderNum:number;
}

export interface GoodsItem {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: GoodsChildrenItem[];
  goods: GoodsGoodsItem[];
}

export interface GoodsResponse {
  code: string;
  msg: string;
  result: GoodsItem[];
}


/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = (): Promise<GoodsResponse> => {
  return request ({
    url: "/home/goods",
  });
};
