import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexPersistedState} from "vue-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    goodsCar: []
  },
  getters: {
    // 获取购物车价格
    goodsCarPriceTotal(state) {
      let total = 0
      state.goodsCar.forEach(item => {
        if (item.isCheck) total += item.price * item.buyNum;
      })
      return total * 100
    },
    // 购物车单选的状态
    getGoodsCarSingleStatus(state) {
      const Status = {}
      state.goodsCar.forEach((item, index) => {
        Status[index] = item.isCheck
      })
      return Status
    },
    // 购物车全选的状态
    getGoodsCarAllStatus(state) {
      let status = false
      status = state.goodsCar.some(item => {
        return item.isCheck === false
      })
      return !status
    },
  },
  mutations: {
    // 添加购物车商品
    AddToGoodsCar(state, goods) {
      let findIndex = state.goodsCar.findIndex(item => item.id === goods.id)
      if (findIndex >= 0) {
        state.goodsCar[findIndex].buyNum += goods.buyNum
      } else {
        state.goodsCar.push(goods)
      }
    },
    // 更新单个复选框的数据
    updateSingleCheck(state, {status, index}) {
      state.goodsCar[index].isCheck = !status
    },
    // 更新全选框的数据
    updateAllCheck(state, status) {
      state.goodsCar.forEach((item, index) => {
        state.goodsCar[index].isCheck = status
      })
    },
    updateGoodsNum(state,{num,index}){
      state.goodsCar[index].buyNum = num
    }
  },
  actions: {},
  modules: {},
  plugins: [createVuexPersistedState()]
})
