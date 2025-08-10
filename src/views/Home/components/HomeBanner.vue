<script setup lang="ts">
import { getBannerAPI, type BannerItem } from "@/apis/home"
import {ref,onMounted} from "vue"
 
 const BannerList = ref<BannerItem[]>([])
const getBanner = async () =>{
  const res = await getBannerAPI()
  console.log(res)
  BannerList.value = res.result
}

onMounted(()=>getBanner())

</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in BannerList" :key="item.id">
        <img
          :src="item.imgUrl"
          alt="图片资源请求失败">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1040px;
  height: 500px;
  position: absolute;
  left: 250px;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>