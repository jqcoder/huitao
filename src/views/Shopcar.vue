<template>
  <div class="shopcar">
    <!-- 当购物车没有商品-->
    <div class="no-goods" v-show="noGoods">
      <div class="img">
        <img src="../assets/images/car.png" alt="">
      </div>
      <p class="title">你的购物车空空如也</p>
      <van-button type="danger" @click="goHome">去首页</van-button>
    </div>


    <!-- 当购物车有商品 -->
    <div class="have-goods">
      <van-swipe-cell v-for="(item,index) in $store.state.goodsCar">
        <div>
          <van-checkbox v-model="$store.getters.getGoodsCarSingleStatus[index]" @click="updateSingleCheck(item.isCheck,index)"/>
          <van-card
            :num="item.buyNum"
            :price="item.price"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
          >
            <template #footer>
              <van-stepper :value="item.buyNum" @change="updateGoodsNum" :name="index" />
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button"/>
        </template>
      </van-swipe-cell>
    </div>


    <!--购物车核算-->
    <van-submit-bar :price="$store.getters.goodsCarPriceTotal" button-text="提交订单">
      <van-checkbox :value="$store.getters.getGoodsCarAllStatus" @click="updateAllCheck($store.getters.getGoodsCarAllStatus)">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: 'Shopcar',
  data() {
    return {
      noGoods: true,
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    // 更新单个的状态
    updateSingleCheck(status,index){
      this.$store.commit('updateSingleCheck',{
        status,
        index
      })
    },
    updateAllCheck(status){
      this.$store.commit('updateAllCheck',!status)
    },

    updateGoodsNum(num,{name:index}){
      this.$store.commit('updateGoodsNum',{num,index})
    }

  },
  mounted() {
    this.noGoods = this.$store.state.goodsCar.length <= 0
  }
}
</script>

<style lang="scss" scoped>
.shopcar {
  height: 80vh;
  background-color: #f7f6f6;

  .no-goods {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;

    .img {
      width: 160px;
      height: 160px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      color: #969799;
      font-size: 14px;
      margin-bottom: 30px;
    }

  }

  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }


  .van-submit-bar {
    margin-bottom: 50px;
  }

}


</style>
