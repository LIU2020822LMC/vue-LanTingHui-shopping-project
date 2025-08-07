import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  //createWebHistory 表示使用 "HTML5 History 模式"，这种模式下 URL 看起来很干净，比如 http://你的网站/home（没有多余的#符号）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          path: "home",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "category",
          component: () => import("@/views/Category/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
});

export default router
