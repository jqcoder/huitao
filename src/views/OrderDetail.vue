<template>
  <div class="order-detail">
    <div class="order-status">
      <div>交易成功</div>
      <img src="../assets/images/car2.png" alt="">
    </div>

    <!--  地址-->
    <div class="addressWrap">
      <div class="address">
        <div class="location">
          <van-icon name="location-o"/>
        </div>
        <div class="info" v-if="orderInfo.address_info">
          <div>{{ orderInfo.address_info.name }} {{ orderInfo.address_info.tel }}</div>
          <div>
            {{ orderInfo.address_info.province }}{{ orderInfo.address_info.city }}
            {{ orderInfo.address_info.country }}{{ orderInfo.address_info.addressDetail }}
          </div>
        </div>
        <van-divider/>
      </div>
    </div>

    <!--  商品-->
    <van-card
      v-for="item in goodsInfo"
      :key="item.id"
      :price="item.sell_price | zeroPadding"
      :title="item.title"
      :thumb="item.thumb_path"
    />


    <!--    订单信息-->
    <div class="orderInfo">
      <div class="item">
        <span>下单时间</span>
        <span>{{ orderInfo.add_time | formatTime }}</span>
      </div>
      <div class="item">
        <span>商品总价</span>
        <span>&yen; {{ orderInfo.total_price }}</span>
      </div>
      <div class="item">
        <span>实付款</span>
        <span>&yen; {{ orderInfo.actual_price }}</span>
      </div>
      <div class="item">
        <span>付款方式</span>
        <span>{{ orderInfo.pay_way }}</span>
      </div>
      <div class="item">
        <span>运费险</span>
        <span>&yen; 0.00</span>
      </div>
      <div class="item">
        <span>订单号</span>
        <span>{{ orderInfo.order_id }}</span>
        <span class="copy" v-clipboard:copy="orderInfo.order_id" v-clipboard:success="onCopy">复制</span>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btn-group">
      <van-button type="primary" size="mini"
                  v-if="orderInfo.is_out === 1 && orderInfo.status !== 0"
                  @click.stop="showLogistics"
      >
        物流信息
      </van-button>
      <van-button type="info" size="mini" v-if="orderInfo.status === 2">已完成</van-button>
      <van-button type="danger" size="mini" v-if="orderInfo.status === 0" @click="payment">立即付款</van-button>
      <van-button type="danger" size="mini"
                  v-if="orderInfo.status === 1 && orderInfo.is_out === 0 && orderInfo.is_take === 0">提醒发货
      </van-button>
    </div>

    <!-- 查看物流信息 -->
    <van-popup v-model="isShow" position="bottom" round :style="{ height: '50%' }">
      <div class="addressWrap">
        <div class="address">
          <div class="location">
            <van-icon name="location-o"/>
          </div>
          <div class="info" v-if="orderInfo.address_info">
            <div>{{ orderInfo.address_info.name }} {{ orderInfo.address_info.tel }}</div>
            <div>
              {{ orderInfo.address_info.province }}{{ orderInfo.address_info.city }}
              {{ orderInfo.address_info.country }}{{ orderInfo.address_info.addressDetail }}
            </div>
          </div>
          <van-divider/>
        </div>
      </div>

      <van-steps direction="vertical" :active="0">
        <van-step v-for="item in kuaiDi" :key="item.time">
          <h3>{{ item.location }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>

    </van-popup>
  </div>
</template>

<script>
import {fetchGetOrderDetail, fetchPayment, fetchKuaiDi} from '@/api/order'
import {fetchGoodscar} from '@/api/goodscar'

export default {
  name: "OrderDetail",
  data() {
    return {
      order_id: this.$route.params.order_id,
      orderInfo: [],
      goodsInfo: [],
      isShow: false,
      kuaiDi: []
    }
  },
  methods: {
    onCopy() {
      event.stopPropagation(); // 阻止事件冒泡
      this.$toast("订单号复制成功");
    },
    // 立即支付
    payment() {
      this.$dialog.confirm({
        title: '付款',
        message: '确认支付吗',
      })
        .then(async () => {
          let result = await fetchPayment(this.order_id)
          if (result.status === 0) {
            this.$toast(result.meaasge)
          }
        })
        .catch(() => {
          this.$toast('你已取消支付')
        });
    },
    // 显示物流信息
    async showLogistics() {
      this.isShow = true
      this.kuaiDi = await fetchKuaiDi()
    }
  },
  async created() {
    // 获取订单信息
    let orderInfo = await fetchGetOrderDetail(this.order_id)
    this.orderInfo = orderInfo

    // 获取订单商品信息
    let {message} = await fetchGoodscar(orderInfo.goods_ids)
    this.goodsInfo = message

    console.log(this.orderInfo)
  },
}
</script>

<style lang="scss" scoped>
.order-detail {
  padding-bottom: 60px;

  .order-status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    background-color: #fe5102;
    color: #f4d9be;

    img {
      width: 80px;
      height: 80px;
    }
  }

  .addressWrap {
    .address {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      background-color: #fff;
      border-radius: 6px;
      margin: 6px 0;

      .location {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #ef4b17;
        margin-right: 20px;

        .van-icon {
          color: #fff;
          font-size: 20px;
        }
      }

    }
  }

  .orderInfo {
    padding: 2px 10px;

    .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #787373;
      margin: 5px 0;

      .copy {
        color: orangered;
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0 10px;
    box-shadow: 0 0 10px rgba(204, 204, 204, 0.53);
    background-color: #fff;
  }

}
</style>
