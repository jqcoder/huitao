<template>
  <div class="search">
    <form action="/">
      <van-search
        ref="input"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>

    <div class="history">
      <div class="header">
        <h3>搜索历史</h3>
        <van-icon name="delete-o" @click="removeHistory"/>
      </div>
      <div class="footer">
        <span v-for="(item,index) in searchHistory" :key="index" @click="$router.push(`/search-result/${item}`)">
          {{ item }}
        </span>
      </div>

    </div>

    <van-divider/>

    <div class="hot-search">
      <div class="header">
        <h3>热门搜索</h3>
        <van-icon :name="iconClass" @click="showHotSearch = !showHotSearch"/>
      </div>
      <div class="footer" v-if="!!showHotSearch">
        <span @click="$router.push(`/search-result/惠普`)">惠普</span>
        <span @click="$router.push(`/search-result/联想`)">联想</span>
        <span @click="$router.push(`/search-result/iphone`)">iphone</span>

      </div>
      <div class="text-center" v-else>
        以隐藏热门搜索
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchHistory: '',
      show: true,
      value: '',
      showHotSearch: true,
    };
  },
  computed: {
    iconClass() {
      return this.showHotSearch ? 'eye-o' : 'closed-eye'
    }
  },
  methods: {
    onSearch(val) {
      if (this.value.trim() === '') {
        return;
      }
      if (this.searchHistory.includes(val)) {
        this.$router.push(`/search-result/${val}`)
        return;
      }
      this.searchHistory.push(val)
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      this.$router.push(`/search-result/${val}`)
    },
    removeHistory() {
      localStorage.removeItem('searchHistory')
      this.searchHistory = []
    }

  },
  mounted() {
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    this.$refs.input.children[0].children[0].__vue__.$refs.input.focus()
  }
}
</script>

<style lang="scss" scoped>
.search {
  .history {
    padding: 0 2%;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      column-gap: 5px;

      span {
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 14px;
        border-radius: 6px;
        background: #f3f5f6;
        padding: 0 5px;
      }
    }

  }

  .hot-search {
    padding: 0 2%;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      column-gap: 5px;

      span {
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 14px;
        border-radius: 6px;
        background: #f3f5f6;
        padding: 0 5px;
      }
    }

    .text-center {
      text-align: center;
    }

  }
}
</style>
