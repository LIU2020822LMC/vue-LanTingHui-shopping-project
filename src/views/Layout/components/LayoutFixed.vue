<script setup lang="ts">
//useScroll函数用于获取页面滚动相关的信息
import { useScroll } from '@vueuse/core'
//调用useScroll函数，并传入window对象作为参数，以获取整个窗口的滚动信息。
// 然后通过对象解构的方式，从useScroll函数返回的对象中提取出y属性。
// y通常表示窗口在垂直方向上的滚动距离，即页面垂直滚动了多少像素。例如，当用户向下滚动页面时，y的值会逐渐增大。
const { y } = useScroll(window)
import { RouterLink } from 'vue-router';

import { useCategoryStore } from '@/stores/categoryStore'

const getCategory = useCategoryStore()


</script>

<template>
  <div class="app-header-sticky " :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <el-button style="border: none;margin-left: 40px;" @click="$router.back()">返回</el-button>
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in getCategory.categoryList" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>

</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 100px;
  //通过设置 “position: fixed;” 来实现，无论用户如何滚动页面，导航栏都一直显示在屏幕的特定位置。
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  //translateY 是控制元素在垂直方向移动的属性。
  //-100% 表示 “向上移动自身高度的 100%”（比如元素高 80px，就向上移 80px）。
  transform: translateY(-100%);
  //控制元素的透明度，0 表示完全透明（即使元素在屏幕里，也看不见）
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.4s linear;
    /* 动画过渡：所有变化在0.4秒内完成 */
    transform: none;
    /* 取消移动（回到原来的位置） */
    opacity: 1;
    /* 完全不透明（可见） */
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    margin-top: 10px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid LTHColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: #3f72af;
      }
    }
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
        color: #3f72af;
        border-bottom: 1px solid #3f72af;
      }
    }

    .active {
      color: #3f72af;
      border-bottom: 1px solid #3f72af;
    }
  }
}
</style>
