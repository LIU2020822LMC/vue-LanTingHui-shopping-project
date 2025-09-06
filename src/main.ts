// import './assets/main.css'

//引入初始化样式文件
import "@/styles/common.scss";
//引入图片懒加载插件
import {ImgLazyPlugin} from "@/directives/index"
//引入全局组件插件
import { componentPlugin } from "./components";
import 'element-plus/dist/index.css'
import { createApp} from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import GoodsItem from "./views/Home/components/GoodsItem.vue";

const app = createApp(App);
// 通过 app 实例注册全局组件
app.component('GoodsItem', GoodsItem)  // 组件名和组件对象
//将插件添加到 pinia 实例中
//在设置state的时候会自动把数据同步给localstorage，在获取state数据的时候会优先从localStorage中取
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);
app.use(ImgLazyPlugin)
app.use(componentPlugin)

app.mount("#app");


