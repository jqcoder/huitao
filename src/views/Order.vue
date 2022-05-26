<template>
  <div class="order">
    <van-tabs v-model="active" @click="changeTab">
      <van-tab v-for="item in tabList" :key="item.status" :title="item.text" :name="item.status">
        <van-card
          @click="$router.push(`/orderdetail/${item.order_id}`)"
          v-for="item in orderData"
          :key="item.order_id"
          num="2"
          :price="item.total_price | zeroPadding"
          :desc="item.pay_way"
          :title="item.goodsInfo[0].title"
          :thumb="item.goodsInfo[0].thumb_path"
        >
          <template #num>共 {{ item.number }} 件 </template>
          <template #tags>下单时间：{{item.add_time | formatTime}}</template>
          <template #footer>
            <template v-if="item.status === 0">
              <van-button size="mini" v-clipboard:copy="item.order_id"  type="danger" @click="onCopy" >复制订单号</van-button>
              <van-button size="mini" type="danger" >立即付款</van-button>
            </template>
            <van-button v-if="item.status === 1 && item.is_out === 0" size="mini" type="danger">提醒发货</van-button>
            <template v-if="item.is_take === 1 && item.is_out === 1 && item.status === 2">
              <van-button size="mini" type="info">已完成</van-button>
              <van-button size="mini" type="warning">去评价</van-button>
            </template>
            <van-button size="mini" type="danger" @click.stop="callPhone">客服</van-button>
          </template>
        </van-card>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import {fetchGetUserOrder} from '@/api/order'
import {fetchGoodscar} from '@/api/goodscar'

import moment from 'moment'

export default {
  name: "Order",
  data() {
    return {
      active: 'All',
      AllOrder: [],
      tabList: [
        {status: 'All', text: '全部'},
        {status: '0', text: '未付款'},
        {status: '1', text: '已付款'},
        {status: '2', text: '完成'}
      ]
    }
  },
  computed: {
    orderData() {
      if(this.active === 'All'){
        return this.AllOrder
      }
      return this.AllOrder.filter(item=>{
        return item.status === Number(this.active)
      })
    }
  },
  methods: {
    async getAllOrder() {
      let user_id = this.$store.state.userInfo.id
      if (!user_id) {
        return
      }
      let orderData = await fetchGetUserOrder(user_id)

      // 并发获取每个订单的商品数据
      let promiseArr = []
      orderData.forEach(item => {
        promiseArr.push(fetchGoodscar(item.goods_ids))
      })
      let goodsInfo = await Promise.all(promiseArr)

      // 给每个订单数据加上商品的数据
      orderData = orderData.map((item, index) => {
        item.goodsInfo = goodsInfo[index].message
        return item
      })

      this.AllOrder = orderData
    },
    changeTab() {
      console.log(this.orderData)
    },
    onCopy(e) {
      e.stopPropagation();// 阻止事件冒泡
      this.$toast('复制成功')
    },
    callPhone(){
      window.location.href = "tel:13412342234"
    }
  },
  created() {
    this.getAllOrder()
  },
  filters: {
    // 价格补零
    zeroPadding(value) {
      return value.toFixed(2, 0)
    },
    formatTime(value) {
      return moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
