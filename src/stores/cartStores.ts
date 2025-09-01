import { defineStore } from "pinia";
import { ref,computed } from "vue";

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
    //1.  定义state - cartList
    const cartList = ref<CartItem[]>([]);
    //2. 定义action - addCart
    const addCart = (goods: CartItem) => {
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
    };

    //删除购物车
    const delCart = (skuId: string) => {
      //思路：
      //1.找到要删除项的下标值 - splice
      //2.使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      //该语句的作用是从 cartList.value 数组中位于 idx 索引处开始删除 1 个元素。
      cartList.value.splice(idx, 1);
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
    return {
      cartList,
      addCart,
      delCart,
      totalCount,
      totalPrice,
    };
  },
  //
  {
    persist: true,
  }
);
