<template>
  <div id="app">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      v-show="isShowNavBar"
    />

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

#app {
  min-width: 350px;
  max-width: 750px;
  margin: 0 auto;
}
</style>
