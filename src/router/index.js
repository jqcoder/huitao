import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false});

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/home'
  },
  {
    // index才显示tabbar
    path: '/index',
    component: () => import('@/views/Index'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        meta: {
          name: 'home',
          isIndexPage: true
        }
      },
      {
        path: 'shopcar',
        component: () => import('@/views/Shopcar'),
        meta: {
          name: 'shopcar',
          isIndexPage: false,
          title: '购物车',
          LoginPermission: true // 登录权限
        }
      },
      {
        path: 'user',
        component: () => import('@/views/User'),
        meta: {
          name: 'user',
          isIndexPage: false,
          LoginPermission: true // 登录权限
        }
      }
    ]
  },
  {
    path: '/goodlist',
    component: () => import('@/views/Goodlist'),
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/goodsdetail/:id',
    component: () => import('@/views/GoodsDetail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/address',
    component: () => import('@/views/Address'),
    meta: {
      title: '收货地址'
    }
  },
  {
    path: '/addaddress',
    component: () => import('@/views/AddAddress'),
    meta: {
      title: '新增地址'
    }
  },
  {
    path: '/editaddress/:addressInfo',
    component: () => import('@/views/EditAddress'),
    meta: {
      title: '修改地址'
    }
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  NProgress.start();
  // 判断是否要权限
  if (to.meta.LoginPermission) {
    // 判断有没有token
    if (store.state.token) {
      next()
    } else {
      // 没有token就打回登录页面 and 带上上个网页的路径
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    next()
  }
  return false
})

router.afterEach((to, from) => {
  NProgress.done();
  return false
})

export default router
