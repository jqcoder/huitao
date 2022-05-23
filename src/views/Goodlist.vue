<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="my-product">
        <product v-for="item in goodsList" :key="item.title" :productData="item" @GoodsDetails="GoodsDetails">
          <template #info>
              <div class="product-info">
                  <div class="title"><span>{{item.title}}</span></div>
                  <div class="price">
                    <span class="yen">&yen;</span>
                    <span class="new-price">{{item.sell_price}}</span>
                    <span class="old-price">{{item.market_price}}</span>
                  </div>
                  <div class="hot-sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                  </div>
              </div>
          </template>

        </product>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
// 组件
import product from "@/components/product";

//请求
import {fetchGoodsList} from '@/api/goodlist'


export default {
  name: 'goodlist',
  data() {
    return {
      page:0,
      pageSize:8,
      goodsList: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
      this.page++
      this.getGoodListData()
    },
    onRefresh() {
      this.page = 0
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },

    async getGoodListData() {
      if (this.refreshing) {
        this.goodsList = [];
        this.refreshing = false;
      }
      let result = await fetchGoodsList(this.page,this.pageSize)
      this.goodsList = [...this.goodsList,...result.message]
      this.loading = false
      if (result.message.length ===  0) {
        this.finished = true;
      }
    },
    GoodsDetails(id){
      this.$router.push(`/goodsDetail/${id}`)
    }
  },
  components:{
    product
  }
};
</script>

<style lang="scss" scoped>

  .my-product{
    display: flex;
    justify-content: center;
    column-gap: 10px;
    background-color: #f6f6f6;
    flex-wrap: wrap;

    .product-info{

      .title{
        margin: 2px 0 10px 0;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price{
        margin-bottom: 10px;
        .yen{
          color: #ff4142;
          font-size: 12px;
        }
        .new-price{
          color: #ff4142;
          font-size: 18px;
          margin-right: 2px;
        }
        .old-price{
          font-size: 12px;
          text-decoration: line-through;
        }
      }
      .hot-sell{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
      }
    }
  }

</style>
