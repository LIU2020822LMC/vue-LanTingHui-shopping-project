import request from "@/utils/http";

//二级分类列表接口相关配置

export interface CategoryChildrenGoodsItem {
  id: string;
  name: string;
  desc:string;
  price:string;
  picture:string;
  orderNum:number;
}

export interface CategoryChildrenItem {
  id: string;
  name: string;
  picture: string;
  parentName: null;
  goods: CategoryChildrenGoodsItem;
  categories:null;
  brands:null;
  saleProperties:null;
}


export interface CategoryItem {
  id: string;
  name: string;
  picture: null;
  children: CategoryChildrenItem[];
}

export interface CategoryResponse {
  code: string;
  msg: string;
  result: CategoryItem;
}

export function getCategoryAPI(id: string[] | string): Promise<CategoryResponse> {
  return request({
    url: "/category",
    params: {
      id,
    },
  });
}