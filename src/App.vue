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
        this.isShowNavBar = !newRouter.meta.isIndexPage || newRouter.meta.showNavbar
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

@font-face {
  font-family: Emoji;
  src: local("Apple Color Emojiji"), local("Segoe UI Emoji"), local("Segoe UI Symbol"), local("Noto Color Emoji");
  unicode-range: U+1F000-1F644, U+203C-3299;
}

body {
  background-color: #f6f6f6;
  font-family: system-ui, —apple-system, Segoe UI, Rototo, Emoji, Helvetica, Arial, sans-serif;
}

#app {
  color: #333;
  min-width: 350px;
  max-width: 750px;
  margin: 0 auto;
}
</style>
