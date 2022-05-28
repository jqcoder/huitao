<template>
  <div class="search-result">
    <form action="/">
      <van-search
        ref="input"
        v-model="searchVal"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>

    <van-empty v-if="searchRes.length < 1" image="search" description="暂无搜索结果"/>
    <template v-else>
      <van-dropdown-menu>
        <van-dropdown-item v-model="sort" :options="option1" @change="ReviseOp1"/>
        <van-dropdown-item v-model="order" :options="option2" @change="ReviseOp2"/>
      </van-dropdown-menu>
      <div class="goodsList">
        <product v-for="item in searchRes" @GoodsDetails="goDetail" :key="item.id" :productData="item"></product>
      </div>
    </template>
  </div>
</template>

<script>
import product from "@/components/product";
import {fetchSearch} from '@/api/search'

export default {
  name: "Search-Result",
  data() {
    return {
      sort: 'buy',
      order: 'desc',
      option1: [
        {text: '销量', value: 'buy'},
        {text: '好评', value: 'likes'},
        {text: '价格', value: 'sell_price'},
      ],
      option2: [
        {text: '降序↓', value: 'desc'},
        {text: '升序↑', value: 'asc'},
      ],
      searchVal: this.$route.params.searchVal,
      searchRes: []
    }
  },
  methods: {
    async sendSearch() {
      this.searchRes = await fetchSearch({
        value: this.searchVal,
        sort: this.sort,
        order: this.order,
        page: 1,
        pagesize: 10
      })
    },
    ReviseOp1(value) {
      this.sort = value
      this.sendSearch()
    },
    ReviseOp2(value) {
      this.order = value
      this.sendSearch()
    },
    onSearch() {
      this.sendSearch()
    },
    goDetail(id) {
      this.$router.push(`/goodsdetail/${id}`)
    }
  },
  created() {
    this.sendSearch()
  },
  components: {
    product
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  .goodsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
