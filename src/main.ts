// import './assets/main.css'

//引入初始化样式文件
import "@/styles/common.scss";
import { useIntersectionObserver } from "@vueuse/core";

import { createApp} from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

//定义全局指令
app.directive("img-lazy", {
  mounted(el, binding) {
    //el : 指令绑定的那个元素 img
    //binding：binding.value 指令等于号后面绑定的表达式的值 图片url
    // console.log(el,binding.value)
    // 使用 useIntersectionObserver 监听元素是否进入视口
    const { stop } = useIntersectionObserver(
      el, // 监听的元素
      ([{ isIntersecting }]) => {
        // console.log(isIntersecting)
        // 当元素进入视口时 isIntersecting 为 true
        if (isIntersecting) {
          // 停止监听
          stop()
          // 设置图片的 src 属性，开始加载图片
          el.src = binding.value
          // 图片加载完成后的处理
          el.onload = () => {
            // 可以在这里添加淡入效果或移除loading状态
            el.style.opacity = '1'
          }
          // 图片加载失败的处理
          el.onerror = () => {
            // 设置默认图片或错误提示
            el.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzVMMTI1IDEwMEwxMDAgMTI1TDc1IDEwMEwxMDAgNzVaIiBmaWxsPSIjQ0NDIi8+CjwvZz4KPC9zdmc+'
          }
        }
      },
      {
        // 设置 rootMargin，提前50px开始加载图片
        rootMargin: '50px'
      }
    )
  }
});
