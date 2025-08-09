import { ref,} from 'vue'
import { defineStore } from 'pinia'
  //type CategoryItem = 导入CategoryItem这个类型定义
  //加上type关键字表示我们只是导入类型，不是导入实际的代码
import { getCategoryAPI, type CategoryItem } from "@/apis/layout";

export const useCategoryStore = defineStore('category', () => {
  //导航列表数据管理
  //state 导航列表数据
  // - ref<CategoryItem[]> =
  // 告诉TypeScript这个响应式变量存储的是CategoryItem类型的数组
  //  - <CategoryItem[]> = 这叫"泛型"，就是给ref指定具体的类型
  const categoryList = ref<CategoryItem[]>([]);

  //action 获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;
  };

  return {
    categoryList,
    getCategory,
  };
})
