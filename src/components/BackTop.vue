<template>
  <div class="backtop" v-show="isShow" @click="backTop">
    <slot>
      <img src="../assets/images/backtop.png" alt="">
    </slot>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      isShow: true
    }
  },
  props: {
    scrollTop: {
      type: Number,
      default: 800
    }
  },
  methods: {
    scrollFun () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > this.scrollTop ? this.isShow = true : this.isShow = false
    },
    backTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  },
  mounted () {
    this.scrollFun()
    document.addEventListener('scroll', this.scrollFun)
  },
  destroyed () {
    document.removeEventListener('scroll', this.scrollFun)
  }
}
</script>

<style lang="scss" scoped>
.backtop {
  position: fixed;
  right: 8px;
  bottom: 120px;
  width: 38px;
  height: 38px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
