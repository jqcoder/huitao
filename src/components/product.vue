<template>
  <div class="product" @click="goGoodsDetails(productData.id)">
    <div class="productImg">
      <img v-lazy="productData.img_url" alt="">
    </div>
    <slot name="info">
      <div class="title">{{ productData.title }}</div>
      <div class="info">
        <span class="price"><span class="yen">&yen;</span>{{ productData.sell_price }}</span>
        <span class="buy">{{ productData.likes }}人购买</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "product",
  props: {
    // 商品数据
    productData: {
      type: Object
    }
  },
  methods:{
    goGoodsDetails(id){
      this.$emit('GoodsDetails',id)
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  box-sizing: border-box;
  overflow: hidden;
  width: 46%;
  padding: 6px;
  margin-top: 5px;
  border-radius: 10px;
  background-color: #fff;

  .productImg {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 124px;
    overflow: hidden;

    img {
      height: 100%;
    }
  }

  .title {
    margin: 2px 0 10px 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price{
      color: #ff4142;
      font-size: 18px;
      font-weight: bold;

      .yen{
        font-size: 12px;
        margin-right: 2px;
      }
    }

    .buy{
      font-size: 12px;
      color: #999;
    }
  }
}

</style>
