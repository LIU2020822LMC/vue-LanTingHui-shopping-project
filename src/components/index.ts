//把components中的所有组件都进行全局化注册
//通过插件的方式

import ImageView from "@/components/ImageView/index.vue"
import Sku from "@/components/LthSku/index.vue"
import type { App } from "vue"


export const componentPlugin = {
  install(app:App){
    //app.component('组件名字'，组件配置对象)
    app.component('ImageView',ImageView)
    app.component('LthSku',Sku)
  }
}
