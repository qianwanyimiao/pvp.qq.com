import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('../views/Main.vue')
const Login = () => import('../views/Login.vue')

const CategoryList = () => import('../views/category/CategoryList.vue')
const CategoryEdit = () => import('../views/category/CategoryEdit.vue')

const ItemList = () => import('../views/item/ItemList.vue')
const ItemEdit = () => import('../views/item/ItemEdit.vue')

const HeroList = () => import('../views/hero/HeroList.vue')
const HeroEdit = () => import('../views/hero/HeroEdit.vue')

const ArticleList = () => import('../views/article/ArticleList.vue')
const ArticleEdit = () => import('../views/article/ArticleEdit.vue')

const AdList = () => import('../views/ad/AdList.vue')
const AdEdit = () => import('../views/ad/AdEdit.vue')

const AdminUserList = () => import('../views/adminuser/AdminUserList.vue')
const AdminUserEdit = () => import('../views/adminuser/AdminUserEdit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      // 分类相关路由
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: 'categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      // 物品相关路由
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: 'items/edit/:id',
        component: ItemEdit,
        props: true
      },
      // 英雄相关路由
      {
        path: '/heroes/create',
        component: HeroEdit
      },
      {
        path: '/heroes/list',
        component: HeroList
      },
      {
        path: 'heroes/edit/:id',
        component: HeroEdit,
        props: true
      },
      // 文章相关路由
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: 'articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      // 广告位相关路由
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: 'ads/edit/:id',
        component: AdEdit,
        props: true
      },
      // 管理员相关路由
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
      {
        path: 'admin_users/edit/:id',
        component: AdminUserEdit,
        props: true
      },

    ]
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

export default router
