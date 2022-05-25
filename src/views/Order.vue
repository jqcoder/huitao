<template>
  <div class="order">
    <van-tabs v-model="active">
      <van-tab title="全部">
        <van-card
          num="2"
          price="2.00"
          desc="微信支付"
          title="飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #tags>
            <span>下单时间: 2022-05-25 09:11:06</span>
          </template>
          <template #num>
            <span>共3件</span>
          </template>
          <template #footer>
            <van-button size="mini" color="#3589f7">已完成</van-button>
            <van-button size="mini" color="#fc976d">去评价</van-button>
            <van-button size="mini" color="#ea1128">客服</van-button>
          </template>
        </van-card>
      </van-tab>

      <van-tab title="未付款">未付款</van-tab>
      <van-tab title="已付款">已付款</van-tab>
      <van-tab title="完成">完成</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
