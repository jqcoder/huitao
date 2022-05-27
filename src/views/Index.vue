<template>
  <div>
    <router-view></router-view>

    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/index/home">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/index/shopcar" :badge="getGoodsCQuantity">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/index/user">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
// store辅助函数
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  computed: {
    ...mapGetters(['getGoodsCQuantity'])
  },
  data () {
    return {
      active: 0,
    }
  },
  watch: {
    // 监听路由,映射实现tabbar激活状态
    $route: {
      handler: function (newRouter) {
        const routerMap = {
          'home': 0,
          'shopcar': 1,
          'user': 2
        }
        const {name} = newRouter.meta
        this.active = routerMap[name]
      },
      immediate: true
    },
  },
}
</script>

<style scoped>
.van-tabbar {
  min-width: 350px;
  max-width: 750px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
