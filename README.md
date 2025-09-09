# 澜庭汇vue3+ts电商项目（本质上是小兔鲜电商项目）

### 🚀本项目本地部署与亮点总结

#### 1.部署步骤如下：

##### 1.拉取代码到本地

``` bash
git clone https://github.com/LIU2020822LMC/vue-LanTingHui-shopping-project.git
```

##### 2.进入项目文件夹安装依赖

```bash
cd vue-LanTingHui-shopping-project
npm install
```

##### 3.启动项目

```bahs
npm run dev
```

##### 4.登录的账号与密码如下：

```bash
账号		     手机号       密码
heima282	12056258282	hm#qd@23!
heima283	12056258283	hm#qd@23!
heima284	12056258284	hm#qd@23!
heima285	12056258285	hm#qd@23!
heima286	12056258286	hm#qd@23!
heima287	12056258287	hm#qd@23!
heima288	12056258288	hm#qd@23!
heima289	12056258289	hm#qd@23!
heima290	12056258290	hm#qd@23!
heima291	12056258291	hm#qd@23!
heima292	12056258292	hm#qd@23!
heima293	12056258293	hm#qd@23!

沙箱新账号 fukuvb7569@sandbox.com			
登录和支付的密码还是111111			
```

#### 2.项目总结

##### 使用的技术栈有：**axios + vue3 + dayjs + element-plus + pinia + pinia-plugin-persistedstate + vue-router**

##### 1、基于业务的逻辑组件拆分思想

整个项目拆分成十个模块：购物车列表、商品分类、订单详情、商品详情、首页、整体布局、用户登录、会员中心、支付管理、热门商品信息

<img width="352" height="323" alt="image" src="https://github.com/user-attachments/assets/a0a42f90-e2a4-434f-b7df-6574ce65d731" />

##### 2、长页面吸顶交互的实现

**使用原因：** 电商平台的页面大部分都很长，如果没有吸顶导航，用户将页面滑动到底部并且想要切换到其他页面时，只能再次将页面滑动到顶部，这种设计是很不友好的。有了吸顶导航后，用户可以随时点击吸顶导航进行页面切换。

**基本思想：** 浏览器在上下滑动的过程中，如果距离顶部的滚动距离大于某个值，就让固定的导航栏显示出来，小于这个值则隐藏。

未超过设定的距离顶部的值时显示的头部页面是这样子的：

<img width="1557" height="138" alt="image" src="https://github.com/user-attachments/assets/bc87a26b-661a-4b6c-bdbf-33267e7a6424" />

超过了之后显示是这样子的：

<img width="1582" height="112" alt="image" src="https://github.com/user-attachments/assets/f39874db-307c-4b70-8b3c-1ad2329c4b7a" />

**实现过程：**

准备LayoutFixed组件与LayoutHeader组件，这两个组件的模板差不多是一样的，不同的是，LayoutHeader组件是一直显示在顶部的，而LayoutFixed组件则在距离顶部的滚动距离大于设定某个值的时候才会显示出来，并且不会随着滑下去而被其他覆盖掉，就超过设置的距离之后就一直显示在顶部

<img width="350" height="220" alt="image" src="https://github.com/user-attachments/assets/e03e8d55-13a0-4d53-8e68-335f06c01267" />

LayoutFixed组件实现页面吸顶交互详情解释：

首先需要vueuse中的useScroll函数来获取你在页面距离顶部的滚动距离y

<img width="1103" height="147" alt="image" src="https://github.com/user-attachments/assets/5c7d49ec-ad62-406f-9a27-932cd08e645a" />

当y>78px的时候，添加show类名show类名里面有个opacity的属性

<img width="928" height="224" alt="image" src="https://github.com/user-attachments/assets/d71fc53d-7b47-4577-ae2b-e23e3bdbdc9a" />

show类名里面有个opacity的属性，当这个属性变为1的时候，让这个组件显示出来

<img width="910" height="268" alt="image" src="https://github.com/user-attachments/assets/a88d1b61-1c54-4ba9-904c-56036a969300" />

<img width="1131" height="420" alt="image" src="https://github.com/user-attachments/assets/e3e39d2b-b821-4797-b8fb-8403f76069d9" />

通过设置 “position: fixed;” 来实现，无论用户如何滚动页面，导航栏都一直显示在屏幕的特定位置。这样子就无论你往下滚动多少就一直显示在顶部

<img width="1156" height="424" alt="image" src="https://github.com/user-attachments/assets/5c3e2d59-32bb-4b3d-a314-cc3f31af9c3f" />

##### 3、自定义图片懒加载指令并封装为插件

**使用原因：** 电商平台项目有大量的商品图片, 同时加载和渲染全部的图片资源会挤占带宽, 首页白屏与加载时间过长,用户体验感不好, 同时还会浪费用户的流量，有些用户并不想全部看完，全部加载会耗费大量流量。所以需要使用到图片懒加载。将懒加载指令封装为插件是为了方便在项目各个组件中的使用。

**实现逻辑：** 
（1）懒加载：只有当图片出现在视口区域才会发送图片的网络请求，将图片的src替换成接口返回的图片地址。

（2）封装插件：使用app将指令封装成插件，然后再入口文件main.js文件中注册

**实现过程：**

通过useIntersectionObserver函数中isIntersecting属性判断图片是否进入视口区，如果达到标准则会向接口请求图片资源链接将其放在img中的src里

<img width="1751" height="697" alt="image" src="https://github.com/user-attachments/assets/19cc7953-6712-463c-8901-a50d89e05642" />

设置 rootMargin，提前80px开始加载图片

<img width="629" height="136" alt="image" src="https://github.com/user-attachments/assets/1bb7d914-5a3e-429e-8e22-0d50ee492f44" />

将指令注册为插件：在main.ts文件中引入图片懒加载指令所在文件（即@/directives/index），然后通过app实例注册为全局指令，这样子就可以在其他组件使用img-lazy这个指令了

<img width="989" height="586" alt="image" src="https://github.com/user-attachments/assets/45c9f844-7d98-41ec-926b-1eea879eb9a4" />

在组件使用的时候需要写成v-img-lazy这样子的形式

<img width="993" height="128" alt="image" src="https://github.com/user-attachments/assets/90d9af6b-a088-4ccb-9dad-6f6b0f13fb97" />

<img width="822" height="142" alt="image" src="https://github.com/user-attachments/assets/872007af-8f65-4f67-9a02-97b6a6aad856" />

<img width="615" height="167" alt="image" src="https://github.com/user-attachments/assets/bebe7234-3406-42f3-b98b-5e26a1e36e21" />

<img width="698" height="106" alt="image" src="https://github.com/user-attachments/assets/43f09d26-5e54-4790-bc54-942fc75d21df" />

<img width="697" height="193" alt="image" src="https://github.com/user-attachments/assets/a3a7eabe-3fae-4923-8f55-54a82a1d857a" />

##### 4、画板插槽组件等业务通用组件封装








