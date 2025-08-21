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
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ImgLazyPlugin)
app.use(componentPlugin)

app.mount("#app");


