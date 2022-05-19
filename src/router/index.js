import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/home'
  },
  {
    // index才显示tabbar
    path: '/index',
    component: () => import('../views/Index'),
    children: [
      {
        path: 'home',
        component: () => import('../views/Home'),
        meta: {
          name: 'home',
          isIndexPage: true
        }
      },
      {
        path: 'shopcar',
        component: () => import('../views/Shopcar'),
        meta: {
          name: 'shopcar',
          isIndexPage: false
        }
      },
      {
        path: 'user',
        component: () => import('../views/User'),
        meta: {
          name: 'user',
          isIndexPage: true
        }
      }
    ]
  },
  {
    path: '/goodlist',
    component: () => import('../views/Goodlist'),
    meta:{
      title:'商品列表'
    }
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from,next) => {
  NProgress.start();
  next()
  return false
})

router.afterEach((to, from) => {
  NProgress.done();
  return false
})

export default router
