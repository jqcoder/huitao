import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import home from '../views/'
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
  // {
  //   path: 'goodlist',
  //   component: () => import('../views/goodlist')
  // }
]

const router = new VueRouter({
  routes
})

export default router
