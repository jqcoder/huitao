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
    scrollFun() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > this.scrollTop ? this.isShow = true : this.isShow = false
    },
    backTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    throttle(fn, delay) {
      // 记录上一次函数触发的时间
      let lastTime = 0; // 闭包变量，用来记录保存上一次的执行时间
      return function () {
        // 记录当前函数触发的时间
        let nowTime = Date.now();
        let context = this;
        if (nowTime - lastTime > delay) {
          // 修正this指向问题
          fn.apply(context, arguments);
          // 更新上一次的时间
          lastTime = nowTime;
        }
      }
    }
  },
  mounted() {
    this.scrollFun()
    document.addEventListener('scroll', this.throttle(this.scrollFun, 300))
  },
  destroyed() {
    document.removeEventListener('scroll', this.throttle(this.scrollFun, 300))
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
