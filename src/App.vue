<template>
  <div id="app">
    <van-sticky>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.back()"
      v-show="isShowNavBar"
    />
    </van-sticky>

    <router-view></router-view>
  </div>


</template>
<script>
export default {
  data() {
    return {
      isShowNavBar: false,
      title: '惠淘'
    }
  },
  watch: {
    $route: {
      handler(newRouter) {
        this.isShowNavBar = !newRouter.meta.isIndexPage
        this.title = newRouter.meta.title ? newRouter.meta.title : '惠淘'
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

body{
  background-color: #f6f6f6;
}

#app {
  color: #333;
  min-width: 350px;
  max-width: 750px;
  margin: 0 auto;
}
</style>
