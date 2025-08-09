<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">澜庭汇</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryList" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      <div class="cart">
        <a href="javascript:;" class="curr">
          <i class="iconfont icon-cart"></i>
          <em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// 引入路由组件
import { RouterLink } from 'vue-router';
//type CategoryItem = 导入CategoryItem这个类型定义
//加上type关键字表示我们只是导入类型，不是导入实际的代码
import { getCategoryAPI, type CategoryItem } from '@/apis/layout';
import { onMounted,ref } from 'vue';

// - ref<CategoryItem[]> =
// 告诉TypeScript这个响应式变量存储的是CategoryItem类型的数组
//  - <CategoryItem[]> = 这叫"泛型"，就是给ref指定具体的类型
const categoryList = ref<CategoryItem[]>([])
const getCategory = async () =>{
  const res = await getCategoryAPI()
  console.log(res.result)
  categoryList.value = res.result
}

onMounted(
()=>{
    getCategory()
}
)
</script>

<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $LTHColor;
          border-bottom: 1px solid $LTHColor;
        }
      }

      .active {
        color: $LTHColor;
        border-bottom: 1px solid $LTHColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
      border: none;
      outline: none;
      background: transparent;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
