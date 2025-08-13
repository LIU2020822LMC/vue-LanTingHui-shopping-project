<script setup lang="ts">
import { getCategoryAPI, type CategoryItem } from '@/apis/category'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBannerAPI, type BannerItem } from "@/apis/home"
import GoodsItem from '../Home/components/GoodsItem.vue';
import { onBeforeRouteUpdate } from 'vue-router';

//获取分类列表数据
//根据 category.ts 文件中的定义，为 categoryData 提供一个包含所有必需属性的初始值：{id: '', name: '', picture: null, children: []}
//这样初始化后，TypeScript 不会再报错，因为现在提供的初始值完全符合 CategoryItem 接口的类型要求。
// 当 API 请求成功后，这些初始值会被实际数据替换。
const categoryData = ref<CategoryItem>({ id: '', name: '', picture: null, children: [] })
const route = useRoute()
const getCategory = async (id = route.params.id) => {
  const res = await getCategoryAPI(id)
  categoryData.value = res.result
}

//目标：路由参数变化的时候，可以把分类数据接口重新发送
onBeforeRouteUpdate((to)=>{
  //更新后获得的数据
  getCategory(to.params.id)
})

//获取banner
const BannerList = ref<BannerItem[]>([])
const getBanner = async () => {
  const res = await getBannerAPI({ distributionSite: 2 })
  // console.log(res)
  BannerList.value = res.result
}

onMounted(() => getBanner())

//初始化得到的数据
onMounted(() => getCategory())
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <!-- <el-breadcrumb> 是面包屑的容器组件，用来包裹所有的面包屑项 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in BannerList" :key="item.id">
            <img :src="item.imgUrl" alt="图片资源请求失败">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: #3f72af;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
.home-banner {
  width: 1340px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
