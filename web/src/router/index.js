import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/home/Home.vue"),
      },
      {
        path: "/articles/:id",
        name: "article",
        component: () => import("../views/article/Article.vue"),
        props: true, // 表示所有在path里的参数，比如:id，都映射为组件里的props参数
      },
    ],
  },
  {
    path: "/heroes/:id",
    name: "hero",
    component: () => import("../views/hero/Hero.vue"),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
