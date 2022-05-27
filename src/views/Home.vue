<template>
  <div class="home">
    <!--  粘性搜索栏  -->
    <van-sticky>
      <div class="search">
        <div class="logo">
          <img src="../assets/logo.png" alt="">
        </div>
        <van-search shape="round" @focus="$router.push('/index/home/search'+'?')" placeholder="请输入搜索关键词"/>
      </div>
    </van-sticky>

    <!-- 搜索框   -->
    <van-popup v-model="show" position="top" :close-on-click-overlay="false" :style="{ height: '50%' }" :duration="0.2" >
        <router-view></router-view>
    </van-popup>


    <!-- swiper-bg -->
    <div class="swiper-bg"></div>

    <!--  轮播  -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in carouselData" :key="item.message">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 九宫格 -->
    <van-grid :gutter="10" :border="false">
      <van-grid-item v-for="value in menuData" :key="value.text"
                     :icon="value.img" :text="value.text" :to="value.to"/>
    </van-grid>

    <!-- 分割线 -->
    <van-divider>推荐商品</van-divider>

    <!-- 商品列表 -->
    <div class="products">
      <!-- productData传给商品组件 -->
      <product v-for="item in product" :key="item.id" :productData="item" @GoodsDetails="GoodsDetails"></product>
    </div>

    <!-- 回到顶部 -->
    <backTop :scrollTop="600"/>
  </div>
</template>

<script>
// 请求
import {fetchCarousel, fetchProductList} from '@/api/home'

// 组件
import product from "@/components/product";
import backTop from "@/components/BackTop";

export default {
  name: 'home',
  data() {
    return {
      show: false,
      carouselData: [],
      product: [],
      menuData: [
        {img: require('@/assets/images/1.png'), text: '惠淘超市', to: '/goodlist'},
        {img: require('@/assets/images/2.png'), text: '惠淘超市2', to: '/goodlist'},
        {img: require('@/assets/images/3.png'), text: '惠淘超市3', to: '/goodlist'},
        {img: require('@/assets/images/4.png'), text: '惠淘超市4', to: '/goodlist'},
        {img: require('@/assets/images/5.png'), text: '惠淘超市5', to: '/goodlist'},
        {img: require('@/assets/images/6.png'), text: '惠淘超市6', to: '/goodlist'},
        {img: require('@/assets/images/7.png'), text: '惠淘超市7', to: '/goodlist'},
        {img: require('@/assets/images/8.png'), text: '惠淘超市8', to: '/goodlist'},
      ]
    }
  },
  created() {
    this.getCarouselData()
    this.getProductData()
  },
  methods: {
    async getCarouselData() {
      let res = await fetchCarousel()
      this.carouselData = res.message
    },
    async getProductData() {
      let res = await fetchProductList(1, 12)
      if (!res.message) {
        this.product = []
      } else {
        this.product = res.message
      }

    },
    GoodsDetails(id) {
      this.$router.push(`/goodsDetail/${id}`)
    },
  },
  components: {
    product,
    backTop
  },
  watch:{
    $route: {
      handler(newRouter) {
        this.show = newRouter.name=== 'search'
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
  // 搜索
  .van-sticky {
    .search {
      display: flex;
      max-width: 750px;
      min-width: 350px;
      margin: 0 auto;
      height: 44px;
      background-color: #c4261d;

      .logo {
        width: 50px;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .van-search {
        flex-grow: 1;
        height: 100%;
        background-color: #c4261d;
      }
    }
  }

  .swiper-bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: -25%;
    width: 150%;
    height: 150px;
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  //轮播图
  .van-swipe {
    width: 95%;
    height: 140px;
    margin: 0 auto;
    border-radius: 10px;

    .van-swipe-item {

      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  // 九宫格
  .van-grid {
    width: 95%;
    margin: 20px auto 0;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;

    .van-grid-item {
      border-radius: 10px;
      overflow: hidden;

      .van-grid-item__content {
        border-radius: 10px;
      }
    }
  }

  // 商品列表
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 10px;
    background-color: #f6f6f6;
  }
}


</style>
