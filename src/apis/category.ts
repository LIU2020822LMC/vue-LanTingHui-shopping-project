import request from "@/utils/http";

//一级分类列表接口相关配置
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
  goods: CategoryChildrenGoodsItem[];
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

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

//二级分类列表接口相关配置

//goods相关
export interface CategoryFilterResultGoodsItem{
  id: string;
  name: string;
  desc:string;
  price:string;
  picture:string;
  orderNum:number;
}

//category相关
export interface CategoryFilterResultCategoryItem{
  id: string;
  name: string;
  layer:number;
  parent:null;
}

//brand相关
export interface CategoryFilterResultBrandItem{
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type:null;
  desc:string;
  place:string;
}

//saleProperty相关
export interface CategoryFilterResultSalePropertyItem {
  id: string;
  name: string;
  properties:CategoryFilterResultSalePropertyPropertyItem[];
}

//salePropertyProperty相关
export interface CategoryFilterResultSalePropertyPropertyItem {
  id: string;
  name: string;
}

//二级分类列表相关
export interface CategoryFilterResultItem {
  id: string;
  name: string;
  picture: null;
  parentId:string;
  parentName: string;
  goods: CategoryFilterResultGoodsItem[];
  categories: CategoryFilterResultCategoryItem[];
  brands: CategoryFilterResultBrandItem[];
  saleProperties: CategoryFilterResultSalePropertyItem[];
}

export interface CategoryFilterResponse {
  code: string;
  msg: string;
  result: CategoryFilterResultItem;
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id: string[] | string):Promise<CategoryFilterResponse> => {
  return request({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
};
