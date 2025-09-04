import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import { findNewcartListAPI, insertCart, deleteCartList } from "@/apis/cart";

// 定义购物车商品的类型
export interface CartItem {
  //这里的 “?” 表明 此属性 是可选的，即该数据结构中 此属性 字段可以存在，也可以不存在。
  id?: string;
  name?: string;
  picture?: string;
  price?: string;
  count: number;
  skuId: string;
  attrsText?: string;
  selected: boolean;
}



export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo?.token);
    //1.  定义state - cartList
    const cartList = ref<CartItem[]>([]);
    //2. 定义action - addCart
    const addCart = async (goods: CartItem) => {
      //已登录时添加购物车操作
      if (isLogin.value) {
        const { skuId, count } = goods;
        await insertCart(skuId, count);
        updateNewList();
      } else {
        //未登录时添加购物车的操作
        //添加购物车操作
        //已添加过 - count + 1
        //没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item: CartItem) => item.skuId === goods.skuId);
        if (item) {
          //如果符合条件的item存在
          item.count++;
        } else {
          //如果不存在
          cartList.value.push(goods);
        }
      }
    };

    //删除购物车
    const delCart = async (skuId: string) => {
      try {
        if (isLogin.value) {
          //调用接口实现接口购物车中的删除功能
          await deleteCartList([skuId]);
          updateNewList();
          ElMessage.success("删除成功");
        } else {
          //思路：
          //1.找到要删除项的下标值 - splice
          //2.使用数组的过滤方法 - filter
          const idx = cartList.value.findIndex((item) => skuId === item.skuId);
          // 判断是否找到要删除的商品
          //在 JavaScript/TypeScript 中，
          // findIndex() 方法有两种返回值： 1. 找到元素时：返回该元素在数组中的索引位置（0 或正整数） 2. 没找到元素时：返回 -1
          //如果idx > -1 为 true：说明找到了元素（因为任何大于-1的数都表示有效的数组索引）
          // 如果idx > -1 为 false：说明没找到元素（因为findIndex() 返回了 -1）
          if (idx > -1) {
            //从idx索引位置开始删除一个元素
            cartList.value.splice(idx, 1);
            ElMessage.success("删除成功");
          } else {
            ElMessage.error("商品不存在");
          }
        }
      } catch (error) {
        console.error("删除商品时出错:", error);
        ElMessage.error("删除失败");
      }
    };

    //获取最新购物车列表的action
    const updateNewList = async () => {
      const res = await findNewcartListAPI();
      cartList.value = res.result;
    };

    // 计算商品总件数
    //reduce 是 JavaScript 数组的一个方法。
    // 它对数组中的每个元素按序执行一个 “累加器” 函数，将数组元素组合为一个单一的值
    //0是sum的初始值，item是cartList的值
    const totalCount = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0);
    });

    //计算机商品总价
    const totalPrice = computed(() => {
      return cartList.value.reduce((sum, item) => sum + Number(item.price), 0);
    });

    //选择框
    const Elected = (skuId: string, selected: boolean) => {
      const item = cartList.value.find((item) => (item.skuId = skuId));
      if (item) {
        item.selected = selected;
      } else {
        console.warn(`未找到 skuId 为 ${skuId} 的商品`);
      }
    };

    //是否全选
    //“every” 一般是 JavaScript 数组的一个方法，用于检测数组的所有元素是否都满足指定条件。
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    //全选功能
    const AllSelect = () => {
      if (!isAll.value) {
        cartList.value.forEach((item) => (item.selected = true));
      } else {
        cartList.value.forEach((item) => (item.selected = false));
      }
    };

    // 购物车列表已选数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected === true)
        .reduce((sum, item) => sum + item.count, 0)
    );

    //清购物车列表的数据
    const clearCartListInfo = ()=>{
      cartList.value = []
    }

    // 购物车列表已选商品总价
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected === true)
        .reduce((sum, item) => sum + Number(item.price) * item.count, 0)
    );

    return {
      cartList,
      addCart,
      delCart,
      totalCount,
      totalPrice,
      Elected,
      isAll,
      AllSelect,
      selectedCount,
      selectedPrice,
      updateNewList,
      clearCartListInfo,
    };
  },
  //
  {
    persist: true,
  }
);
