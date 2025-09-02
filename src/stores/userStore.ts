// 管理用户数据相关
import { defineStore } from "pinia";
import {ref} from "vue"
import { loginAPI, type loginResult } from "@/apis/user";
import { useCartStore } from "./cartStores.ts"


export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    //1.定义管理用户数据的state
    const userInfo = ref<loginResult | null>(null);
    const loginInfo = ref();
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }: { account: string; password: string }) => {
      const res = await loginAPI({ account, password });
      loginInfo.value = res;
      userInfo.value = res.result;
    };

    const clearUserInfo = () =>{
      loginInfo.value = null
      userInfo.value = null
      // 手动清除localStorage中的持久化数据
      localStorage.removeItem('user')
      cartStore.clearCartListInfo()
    }
    // 3.以对象的格式把state和action return
    return {
      userInfo,
      loginInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  //默认的持久化配置，存入localStorage
  //每次用到action的方法，就会把state里面的数据存储到本地浏览器中，即键：本文件的名字 值：state数据
  {
    persist: true,
  }
);
