<template>
  <div class="goods-detail">
    <!--    轮播和图片预览-->
    <van-swipe class="my-swipe" :autoplay="3000" @change="reviseCarouselIndex">
      <van-swipe-item v-for="item in GoodsCarousel" :key="item" @click="previewImg">
        <img v-lazy="item" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ GoodsCarousel.length }}</div>
      </template>
    </van-swipe>

    <!--    商品信息(title,price)-->
    <div class="goods-info">
      <div class="price">
        <span class="newPrice"><span class="yen">&yen;</span>{{ GoodsDetail.sell_price }}</span>
        <span class="oldPrice">&yen;{{ GoodsDetail.market_price }}</span>
      </div>
      <div class="title">
        <span>{{ GoodsDetail.title }}</span>
      </div>
    </div>

    <!--    商品详情-->
    <div class="goods-content">
      <van-divider :style="{'fontSize':'18px'}">商品信息</van-divider>
      <div v-html="GoodsDetail.content"></div>
    </div>


    <!--    商品规格-->
    <van-sku
      v-model="isShowSku"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :show-add-cart-btn="isShowGoodsCar"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />

    <!--    商品导航-->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" to="/index/shopcar"  :badge="getGoodsCQuantity"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="openSku(true)"/>
      <van-goods-action-button type="danger" text="立即购买" @click="openSku(false)"/>
    </van-goods-action>
  </div>
</template>

<script>
// 请求
import {fetchGoodsCarousel, fetchGoodsDetail} from '@/api/goodsdetail'

// 组件
import {ImagePreview} from 'vant';

// store辅助函数
import { mapGetters } from 'vuex'

export default {
  name: "GoodsDetail",
  computed: {
    ...mapGetters(['getGoodsCQuantity'])
  },
  data() {
    return {
      goodsId: this.$route.params.id,
      GoodsCarousel: [], // 轮播图数据
      current: 0, // 轮播到第几张
      GoodsDetail: {},

      isShowSku: false, // 显示商品购买选择
      isShowGoodsCar: true, // 加入购物车按钮
      sku: {
        tree: [],
        price: "0.00", // 默认价格（单位元）
        stock_num: 5, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: ""
      },
    }
  },
  async created() {
    // 轮播图和详情数据
    let {message} = await fetchGoodsCarousel(this.goodsId)
    let GoodsDetail = await fetchGoodsDetail(this.goodsId)
    this.GoodsCarousel = message.map(item => item.src)
    this.GoodsDetail = GoodsDetail.message
    // sku数据
    this.sku.price = this.GoodsDetail.sell_price
    this.sku.stock_num = this.GoodsDetail.stock_quantity
    this.goods.picture = this.GoodsCarousel[0]
  },
  methods: {
    reviseCarouselIndex(index) {
      this.current = index
    },
    // 轮播图预览
    previewImg() {
      ImagePreview({
        images: this.GoodsCarousel,
        startPosition: this.current,
      });
    },
    openSku(isopen) {
      this.isShowSku = true
      this.isShowGoodsCar = isopen
    },
    // 立即购买按钮
    onBuyClicked() {
      console.log('立即购买')
    },
    // 购物车按钮
    onAddCartClicked({selectedNum}) {
      // 收集数据
      const goodsInfo = {
        id: this.goodsId,
        isCheck: true,
        buyNum: selectedNum,
        price: this.GoodsDetail.sell_price
      }
      this.$store.commit('AddToGoodsCar', goodsInfo)
      this.$toast.success('添加成功')
      this.isShowSku = false
    }
  },
}
</script>

<style lang="scss" scoped>
.goods-detail {
  padding: 5px 0 55px 0;
  background-color: #f6f6f6;

  .van-swipe {
    width: 98%;
    height: 240px;
    margin: 0 auto 5px;
    border-radius: 6px;
    background-color: #fff;

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }

    .van-swipe-item {
      text-align: center;

      img {
        height: 100%;
      }
    }
  }

  .goods-info {
    width: 98%;
    margin: 10px auto;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #fff;

    .price {
      .newPrice {
        font-size: 30px;
        color: #ee2a16;

        .yen {
          font-size: 18px;
          margin-right: 3px;
        }
      }

      .oldPrice {
        margin-left: 5px;
        text-decoration: line-through;
        color: #999;
      }
    }
  }

  .goods-content {
    width: 98%;
    margin: 15px auto 0;
    border-radius: 10px;
    background-color: #fff;
    padding: 5px;
    box-sizing: border-box;

    ::v-deep img {
      width: 100%;
      height: 100%;
    }

    ::v-deep table {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
