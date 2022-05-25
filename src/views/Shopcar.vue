<template>
  <div class="shopcar">
    <!--  先判断购物车有没有商品-->
    <div v-if="GoodsInfo.length > 0">
      <!--      判断有没有地址-->
      <div v-if="hasAddress" class="hasAddress">
        <div class="icon">
          <van-icon name="location-o"/>
        </div>
        <div>
          <div>
            <span>{{ defaultAddress.name }} / {{ defaultAddress.tel }} / {{ defaultAddress.postalCode }}</span>
          </div>
          <div><span>{{ defaultAddress.province }}{{ defaultAddress.city }}
          {{ defaultAddress.country }}{{ defaultAddress.addressDetail }}</span></div>
          <div>
          </div>
        </div>
      </div>
      <!-- 当没有地址 -->
      <van-button v-else plain type="info" to="/addaddress" block>添加地址</van-button>
    </div>

    <!-- 当购物车没有商品-->
    <van-empty
      class="custom-image"
      :image="require('../assets/images/car.png')"
      description="你的购物车空空如也"
      v-else
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
              <van-stepper :value="getAllGoodsNum[item.id]" @change="updateGoodsNum" :name="item.id"/>
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(index, item.id)"/>
        </template>
      </van-swipe-cell>
    </div>

    <!--购物车核算-->
    <van-submit-bar :price="getGoodsCarPriceTotal" :disabled="isNoSubmit" button-text="提交订单">
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
import {fetchGetUserAddress} from '@/api/address'

// store辅助函数
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Shopcar',
  computed: {
    ...mapState(['goodsCar']),
    ...mapGetters([
      'getGoodsSingleStatus',
      'getGoodsCarPriceTotal',
      'getGoodsAllStatus',
      'getAllGoodsId',
      'getAllGoodsNum',
      'getCarisNoGoods',
      'isNoSubmit',
    ])
  },
  data() {
    return {
      GoodsInfo: [],
      hasAddress: false,
      defaultAddress: {}
    }
  },
  methods: {
    // 回首页
    goHome() {
      this.$router.push('/')
    },
    // 获取购物车商品的信息
    async getGoodsInfo() {
      if (this.getAllGoodsId) {
        let {message} = await fetchGoodscar(this.getAllGoodsId)
        this.GoodsInfo = message
      }
    },
    // 更新单个商品的状态
    updateSingleCheck(id) {
      this.$store.commit('updateSingleCheck', id)
    },
    // 更新全选的状态
    updateAllCheck(status) {
      this.$store.commit('updateAllCheck', !status)
    },
    // 更新购物车某个商品的数量
    updateGoodsNum(num, {name: id}) {
      this.$store.commit('updateGoodsNum', {num, id})
    },
    // 删除商品
    deleteGoods(index, id) {
      this.$store.commit('deleteGoods', id)
      let findIndex = this.GoodsInfo.findIndex(item => {
        return Number(item.id) === id
      })
      this.GoodsInfo.splice(findIndex, 1)
    },
    // 地址
    async _fetchGetUserAddress() {
      // 获取所有id来判断是否有商品
      if (!this.getAllGoodsId) {
        return
      }

      //判断是否有登录
      let userId = this.$store.state.userInfo.id
      if (!userId) {
        this.$dialog.alert({
          message: '请先登录哦',
        }).then(() => {
          this.$router.replace('/login')
        });
        return;
      }

      // 获取地址
      let addressList = await fetchGetUserAddress(userId)
      // 判断有没有地址
      this.hasAddress = !!addressList.length
      if (!this.hasAddress) {
        this.$dialog({message: '请先完善收货地址'});
        return
      }

      // 只有有1个的话，采用第一个
      if (addressList.length === 1) {
        this.defaultAddress = addressList[0]
      }

      // 多个的话先获取默认地址
      let DefaultAddressIndex = addressList.findIndex(item => {
        return item.isDefault === 1
      })
      if (DefaultAddressIndex !== -1) {// 没有默认地址就获取第一个地址
        this.defaultAddress = addressList[DefaultAddressIndex]
      } else {
        this.defaultAddress = addressList[0]
      }
    }
  },
  async created() {
    // 获取购物车商品
    this.getGoodsInfo()
    // 处理用户地址
    this._fetchGetUserAddress()
  },
  filters: {
    // 价格补零
    zeroPadding(value) {
      return value.toFixed(2, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.shopcar {
  background-color: #f6f6f6;
  height: 100vh;

  .have-goods {
    padding-bottom: 134px;
  }

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


  .hasAddress {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    background-color: #fff;
    border-radius: 6px;
    margin: 6px auto;
    box-sizing: border-box;
    width: 98%;

    .icon {
      margin-right: 20px;
      color: red;
      font-size: 20px;
    }
  }
}


</style>
