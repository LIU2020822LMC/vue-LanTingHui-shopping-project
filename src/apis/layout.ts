import request from "@/utils/http";

// 定义分类数据接口
//  - interface = 接口，就像是一个"模板"，定义了数据应该长什么样
//  - CategoryItem = 接口名称，代表一个分类项目
//  - id: string = 每个分类都有一个id属性，类型是字符串
//  - name: string = 每个分类都有一个name属性，类型也是字符串
//  - export = 导出，让其他文件也能使用这个接口
export interface CategoryItem {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[];
}

// 定义API响应接口
export interface CategoryResponse {
  code: string;
  msg: string;
  //  - result: CategoryItem[] =真正的分类数据，是一个数组，数组里每个元素都是CategoryItem类型
  //- [] = 表示数组
  result: CategoryItem[];
}

// Promise<CategoryResponse> = 告诉TypeScript这个函数返回一个Promise，Promise里包含的是CategoryResponse类型的数据
export function getCategoryAPI(): Promise<CategoryResponse> {
  return request({
    url: "/home/category/head",
  });
}