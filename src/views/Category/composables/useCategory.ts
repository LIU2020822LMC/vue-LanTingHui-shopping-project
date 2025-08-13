//封装分类数据业务相关代码
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getCategoryAPI, type CategoryItem } from "@/apis/category";

export function useCategory(){
  //获取分类列表数据
  //根据 category.ts 文件中的定义，为 categoryData 提供一个包含所有必需属性的初始值：{id: '', name: '', picture: null, children: []}
  //这样初始化后，TypeScript 不会再报错，因为现在提供的初始值完全符合 CategoryItem 接口的类型要求。
  // 当 API 请求成功后，这些初始值会被实际数据替换。
  const categoryData = ref<CategoryItem>({ id: "", name: "", picture: null, children: [] });
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };

  //目标：路由参数变化的时候，可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    //更新后获得的数据
    getCategory(to.params.id);
  });

  //初始化得到的数据
  onMounted(() => getCategory());

  return {
    categoryData
  }
}
