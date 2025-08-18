<script setup lang="ts">
import { getHotGoodsAPI, type ResultItem } from '@/apis/detail'
import { ref,onMounted,computed } from 'vue';
import { useRoute } from 'vue-router';

//设置props参数，适配不同的title和数据
const props = defineProps({
  HotType: {
    type: Number
  }
})

const route = useRoute()
const hotGoodsList = ref<ResultItem[]>([])
const getHotGoods = async ()=>{
  const res = await getHotGoodsAPI({
    id:route.params.id,
    type: props.HotType
  })
  hotGoodsList.value = res.result
}

onMounted(()=>getHotGoods())

// 适配 title 1-24小时热榜 2-周热榜
const TYPEMAP: { [key: number]: string } = {
  1: '24小时热榜',
  2: '周热榜'
}
const title = computed((): string =>
  //这里??是 ES2020 引入的空值合并运算符，只有当左侧表达式的值为null或undefined时，才会返回右侧的值
  props.HotType !== undefined ? TYPEMAP[props.HotType] ?? '' : ''
)

</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotGoodsList" :key="item.id">
      <img v-img-lazy="item.picture" alt="图片资源请求失败" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">¥{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>
