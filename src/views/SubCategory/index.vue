<script setup lang="ts">
import { getCategoryFilterAPI, type CategoryFilterResultItem, getSubCategoryAPI, type SubCategoryItem, type SubCategoryParams } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

//获取面包屑导航数据
const route = useRoute()
const categoryList = ref<CategoryFilterResultItem>({ id: "", name: "", picture: null, parentId: "", parentName: "", goods: [], categories: [], brands: [], saleProperties: [] })
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryList.value = res.result
}
onMounted(() => getCategoryFilter())

//获取基础列表数据渲染
const goodsList = ref<SubCategoryItem>({
  counts: 1,
  pageSize: 1,
  pages: 1,
  page: 1,
  items: []
})
const dataList = ref <SubCategoryParams> ({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime"
})
const getGoodsList = async () =>{
  const res = await getSubCategoryAPI(dataList.value)
  goodsList.value = res.result
}

//点击切换事件函数
const tabCharge = () =>{
  //为什么要重置为1？当用户切换排序方式时，需要重新从第一页开始显示数据
  //这样的用户体验更好，不会让用户停留在之前排序方式的某个中间页面。
  dataList.value.page=1
  getGoodsList()
}

//加载更多
const disabled = ref(false)
const load = async () =>{
  //获取下一页的数据
  dataList.value.page ++
  const res = await getSubCategoryAPI(dataList.value)
  //goodsList.value = [...goodsList.value, ...res.result.items] ==>问题：试图把整个分页对象和商品数组拼接，就像把一本书和几张纸强行粘在一起，类型不匹配。
  //改正后的代码逐句解释：
  //goodsList.value = {...} 给整个商品列表重新赋值，就像换了一本新的笔记本，但保留了之前写过的内容
  goodsList.value = {
    //展开运算符：把新获取的分页信息（总数量、总页数等）复制过来，就像把新笔记本的封面信息复制过来
    //展开运算符的作用相当于传统循环将每个数据逐个赋值
    //展开运算符是原生语法，执行速度更快
    ...res.result,
    //数组拼接：把旧商品和新商品合并成一个长列表，就像把旧笔记本里的纸张和新拿到的纸张按顺序放在一起
    items: [...goodsList.value.items, ...res.result.items]
  }
  //加载完毕，停止监听
  if (res.result.items.length === 0){
    disabled.value = true
  }
}

onMounted(() => getGoodsList())
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryList.parentId}` }">{{ categoryList.parentName
          }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="dataList.sortField" @tab-change="tabCharge">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodsList.items" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
