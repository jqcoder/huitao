<template>
  <div class="shopcar">
    <!-- 当购物车没有商品-->

    <van-empty
      class="custom-image"
      :image="require('../assets/images/car.png')"
      description="你的购物车空空如也"
      v-show="getCarisNoGoods"
    >
      <van-button type="danger" @click="goHome">去首页</van-button>
    </van-empty>

    <!-- 当购物车有商品 -->
    <div class="have-goods">
      <van-swipe-cell v-for="(item,index) in GoodsInfo" :key="item.id">
        <div class="shopcard">
          <van-checkbox v-model="getGoodsSingleStatus[item.id]"
                        @click="updateSingleCheck(item.id)"/>
          <van-card
            :num="getAllGoodsNum[item.id]"
            :price="item.sell_price | zeroPadding"
            :title="item.title"
            class="goods-card"
            :thumb="item.thumb_path"
          >
            <template #footer>
              <van-stepper :value="getAllGoodsNum[item.id]" @change="updateGoodsNum" :name="item.id" min="0"/>
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(index, item.id)"/>
        </template>
      </van-swipe-cell>
    </div>

    <!--购物车核算-->
    <van-submit-bar :price="getGoodsCarPriceTotal" :disabled="getCarisNoGoods" button-text="提交订单">
      <van-checkbox :value="getGoodsAllStatus"
                    @click="updateAllCheck(getGoodsAllStatus)">全选
      </van-checkbox>
      <template #tip>
        <span>你购买的东西永远不会发货</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
// 请求
import {fetchGoodscar} from '@/api/goodscar'

// store辅助函数
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Shopcar',
  computed:{
    ...mapState(['goodsCar']),
    ...mapGetters([
      'getGoodsSingleStatus',
      'getGoodsCarPriceTotal',
      'getGoodsAllStatus',
      'getAllGoodsId',
      'getAllGoodsNum',
      'getCarisNoGoods'
    ])
  },
  data() {
    return {
      GoodsInfo: [],
    }
  },
  methods: {
    // 回首页
    goHome() {
      this.$router.push('/')
    },
    // 更新单个的状态
    updateSingleCheck(id) {
      this.$store.commit('updateSingleCheck', id)
    },
    // 更新全选的状态
    updateAllCheck(status) {
      this.$store.commit('updateAllCheck', !status)
    },
    // 更新购物车某个商品的数量
    updateGoodsNum(num, {name: id}) {
      // console.log('前')
      this.$store.commit('updateGoodsNum', {num, id})
    },
    // 删除商品
    deleteGoods(index,id) {
      this.$store.commit('deleteGoods', id)
      this.GoodsInfo.splice(index, 1)
    },
    // 获取购物车商品的信息
    async getGoodsInfo() {
      if(this.getAllGoodsId){
        let {message} = await fetchGoodscar(this.getAllGoodsId)
        this.GoodsInfo = message
      }
    }
  },
  created() {
    this.getGoodsInfo()
  },
  filters:{
    zeroPadding(value){
      return value.toFixed(2,0)
    }
  }
}
</script>

<style lang="scss" scoped>
.shopcar {
  background-color: #f7f6f6;

  .shopcard {
    display: flex;
    background-color: #fff;

    .goods-card {
      margin: 0;
      background-color: #fff;
      flex: 1;
    }

  }

  .delete-button {
    height: 100%;
  }


  .van-submit-bar {
    margin-bottom: 50px;
  }

}


</style>
