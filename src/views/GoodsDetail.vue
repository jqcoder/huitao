<template>
  <div class="goods-detail">
    <!--    轮播和图片预览-->
    <van-swipe class="my-swipe" :autoplay="3000" @change="reviseCarouseIndex">
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
    <div class="goods-content" v-html="GoodsDetail.content"></div>


    <!--    商品导航-->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" badge="0"/>
      <van-goods-action-button type="warning" text="加入购物车"/>
      <van-goods-action-button type="danger" text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
// 请求
import {fetchGoodsCarousel, fetchGoodsDetail} from '@/api/goodsdetail'

// 组件
import {ImagePreview} from 'vant';

export default {
  name: "GoodsDetail",

  data() {
    return {
      goodsId: this.$route.params.id,
      GoodsCarousel: [],
      GoodsDetail: {},
      current: 0,
    }
  },
  async created() {
    // 轮播图和详情数据
    let GoodsCarousel = await fetchGoodsCarousel(this.goodsId)
    let GoodsDetail = await fetchGoodsDetail(this.goodsId)
    this.GoodsCarousel = GoodsCarousel.message.map(item => {
      return item.src
    })
    this.GoodsDetail = GoodsDetail.message
    console.log(this.GoodsDetail)
  },
  methods: {
    reviseCarouseIndex(index) {
      this.current = index
    },
    previewImg() {
      ImagePreview({
        images: this.GoodsCarousel,
        startPosition: this.current,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail {
  padding-top: 5px;
  background-color: #f6f6f6;

  .van-swipe {
    width: 98%;
    height: 240px;
    margin: 0px auto 5px;
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
