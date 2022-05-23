import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexPersistedState} from "vue-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {
    goodsCar: []
  },
  getters: {
    // 获取购物车总价格
    getGoodsCarPriceTotal(state) {
      let total = 0
      state.goodsCar.forEach(item => {
        if (item.isCheck) total += item.price * item.buyNum;
      })
      return total * 100
    },
    // 获取购物车多少件打勾
    getGoodsCQuantity(state) {
      let num = 0
      state.goodsCar.forEach(item => {
        if (item.isCheck) num++;
      })
      return num
    },
    // 购物车单选的状态
    getGoodsSingleStatus(state) {
      const Status = {}
      state.goodsCar.forEach(item => {
        Status[item.id] = item.isCheck
      })
      return Status
    },
    // 购物车全选的状态
    getGoodsAllStatus(state) {
      let status = false
      if(state.goodsCar.length>0){
        status = state.goodsCar.some(item => {
          return item.isCheck === false
        })
        return !status
      }else{
        return status
      }

    },
    // 获取购物车所有商品的id
    getAllGoodsId(state) {
      if (state.goodsCar.length > 0) {
        return state.goodsCar.map(item => item.id).join()
      } else {
        return false
      }
    },
    // 获取购物车某个商品的数量
    getAllGoodsNum(state) {
      const Status = {}
      state.goodsCar.forEach(item => {
        Status[item.id] = item.buyNum
      })
      return Status
    },
    // 获取购物车有无商品
    getCarisNoGoods(state) {
      return state.goodsCar.length <= 0
    },
    // 提交是否禁用
    isNoSubmit(state,getters){
      return !getters.getGoodsCQuantity > 0
    }
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
    updateSingleCheck(state, id) {
      let findIndex = state.goodsCar.findIndex(item => {
        return Number(item.id) === id
      })
      state.goodsCar[findIndex].isCheck = !state.goodsCar[findIndex].isCheck
    },
    // 更新全选框的数据
    updateAllCheck(state, status) {
      state.goodsCar.forEach((item, index) => {
        state.goodsCar[index].isCheck = status
      })
    },
    // 更新某个商品的数量
    updateGoodsNum(state, {num, id}) {
      let findIndex = state.goodsCar.findIndex(item => {
        return Number(item.id) === id
      })
      state.goodsCar[findIndex].buyNum = num
    },
    // 删除商品
    deleteGoods(state, id) {
      let findIndex = state.goodsCar.findIndex(item => {
        return item.id === id
      })
      state.goodsCar.splice(findIndex, 1)
    }
  },
  actions: {},
  modules: {},
  plugins: [createVuexPersistedState()]
})
