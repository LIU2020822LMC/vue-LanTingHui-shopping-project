import request from "@/utils/http";

//商品详情接口相关配置

export interface DetailResultItem {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: {
    id: string;
    name: string;
    nameEn: string;
    logo: string;
    picture: string;
    type: null;
    desc: null;
    place: null;
  };
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: [];
  videoScale: number;
  //使用 string[] 类型可以正确表示这个结构，每个元素都是一个字符串类型的图片URL。
  mainPictures: string[];
  specs: [
    {
      name: string;
      id: string;
      values: [
        {
          name: string;
          picture: string;
          desc: string;
        }
      ];
    }
  ];
  skus: [
    {
      id: string;
      skuCode: string;
      price: string;
      oldPrice: string;
      inventory: string;
      specs: [
        {
          name: string;
          valueName: string;
        }
      ];
    }
  ];
  categories: [
    {
      id: string;
      name: string;
      layer: number;
      parent: {
        id: string;
        name: string;
        layer: number;
        parent: null;
      };
    },
    {
      id: string;
      name: string;
      layer: number;
      parent: null;
    }
  ];
  details: {
    pictures: string[];
    properties:[
      {
        name:string,
        value:string;
      }
    ]
  };
  isPreSale: boolean;
  isCollect: null;
  recommends: null;
  userAddresses: null;
  similarProducts: [
    {
      id: string;
      name: string;
      desc: string;
      picture: string;
      orderNum: number;
    }
  ];
  hotByDay: [
    {
      id: string;
      name: string;
      desc: string;
      price: string;
      picture: string;
      orderNum: number;
    }
  ];
  evaluationInfo: {
    id: string;
    orderInfo: {
      specs: [];
      quantity: 1;
      createTime: null;
    };
    member: null;
    score: number;
    tags: null;
    content: string;
    pictures: null;
    officialReply: null;
    praiseCount: number;
    createTime: string;
    praisePercent: number;
  };
}

export interface DetailResponse {
  code: string;
  msg: string;
  result: DetailResultItem;
}

export const getDetailAPI = (id: string | string[]): Promise<DetailResponse> => {
  return request({
    url: "/goods",
    params: {
      id,
    },
  });
};

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

//热榜商品接口相关配置

export interface ResultItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNum: number;
}

export interface getHotGoodsResponse {
  code: string;
  msg: string;
  result: ResultItem[];
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({
  id,
  type,
  limit = 4,
}: {
  id?: string | string[];
  type?: number;
  limit?: number;
}): Promise<getHotGoodsResponse> => {
  return request({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};
