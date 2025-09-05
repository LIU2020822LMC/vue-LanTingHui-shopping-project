//封装倒计时逻辑函数
import { computed, onUnmounted, ref } from "vue";
import dayjs from "dayjs";

export const useCountDown = () =>{
  let timer: number | null = null;
  //1.响应式数据
  const Time = ref(0)
  //格式化时间
  const formatTime = computed(()=>dayjs.unix(Time.value).format('mm分ss秒'))
  //2.开启倒计时的函数
  const start = (currentTime:number) =>{
    Time.value = currentTime
    //每隔一秒就减一
    timer = setInterval(()=>{
      Time.value--
    },1000)
  }

  //组件优化
  //组件销毁时清除定时器
  onUnmounted(()=>{
   if (timer) {
     clearInterval(timer);
   }
  })
  return {
    formatTime,
    start,
  };
}
