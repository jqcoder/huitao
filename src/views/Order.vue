<template>
  <div class="order">
    <van-tabs v-model="active" @click="changeTab">

      <van-tab v-for="item in tabList" :title="item.text" :name="item.status">内容 1</van-tab>


      <!--      <van-tab title="全部">-->
      <!--&lt;!&ndash;        <van-card&ndash;&gt;-->
      <!--&lt;!&ndash;          v-for="item in AllOrder"&ndash;&gt;-->
      <!--&lt;!&ndash;          num="2"&ndash;&gt;-->
      <!--&lt;!&ndash;          :price="item.total_price | zeroPadding"&ndash;&gt;-->
      <!--&lt;!&ndash;          :desc="item.pay_way"&ndash;&gt;-->
      <!--&lt;!&ndash;          title="飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器"&ndash;&gt;-->
      <!--&lt;!&ndash;          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"&ndash;&gt;-->
      <!--&lt;!&ndash;        >&ndash;&gt;-->
      <!--&lt;!&ndash;          <template #tags>&ndash;&gt;-->
      <!--&lt;!&ndash;            <span>下单时间:{{ item.add_time | formatTime }}</span>&ndash;&gt;-->
      <!--&lt;!&ndash;          </template>&ndash;&gt;-->
      <!--&lt;!&ndash;          <template #num>&ndash;&gt;-->
      <!--&lt;!&ndash;            <span>共{{ item.number }}件</span>&ndash;&gt;-->
      <!--&lt;!&ndash;          </template>&ndash;&gt;-->
      <!--&lt;!&ndash;          <template #footer>&ndash;&gt;-->
      <!--&lt;!&ndash;            <van-button size="mini" color="#3589f7">已完成</van-button>&ndash;&gt;-->
      <!--&lt;!&ndash;            <van-button size="mini" color="#fc976d">去评价</van-button>&ndash;&gt;-->
      <!--&lt;!&ndash;            <van-button size="mini" color="#ea1128">客服</van-button>&ndash;&gt;-->
      <!--&lt;!&ndash;          </template>&ndash;&gt;-->
      <!--&lt;!&ndash;        </van-card>&ndash;&gt;-->
      <!--      </van-tab>-->

    </van-tabs>
  </div>
</template>

<script>
import {fetchGetUserOrder} from '@/api/order'

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
  methods: {
    async getAllOrder() {
      let user_id = this.$store.state.userInfo.id
      let orderData = await fetchGetUserOrder(user_id)


      console.log(orderData)
      console.log()

    },
    changeTab(name) {
      console.log(name)
    },
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
      console.log(value)
      return moment(value).format("YYYY-MM-DD HH:mm:ss")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
