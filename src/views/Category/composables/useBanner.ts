//封装轮播图业务相关代码
import { ref, onMounted } from "vue";
import { getBannerAPI, type BannerItem } from "@/apis/home";

export function useBanner(){
  //获取banner
  const BannerList = ref<BannerItem[]>([]);
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: 2 });
    // console.log(res)
    BannerList.value = res.result;
  };

  onMounted(() => getBanner());

  return {
    BannerList
  }
}
