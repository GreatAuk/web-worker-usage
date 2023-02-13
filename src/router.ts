import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/home/home.vue"),
  },
  {
    path: "/excel",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/excel/excel.vue"),
  },
  {
    path: "/inline_worker",
    component: () => import("@/views/inlineWork/index.vue"),
  },
];

const pathBase = import.meta.env.PROD ? "/web-worker-demo/" : undefined;
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(pathBase),
  routes, // `routes: routes` 的缩写
});
