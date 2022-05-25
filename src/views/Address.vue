<template>
  <div class="address">
    <van-empty v-if="addressList.length < 1" description="您还没添加地址，请添加地址"/>

      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
  </div>
</template>

<script>
import {fetchGetUserAddress} from '@/api/address'

export default {
  name: "Address",
  data() {
    return {
      // 选中的地址（id）
      chosenAddressId: '0',
      addressList: [],
      loading: true,
    }
  },
  created() {
    this.getAddress(this.$store.state.userInfo.id)
  },
  methods: {
    // 获取用户地址
    async getAddress(id) {
      let addressList = await fetchGetUserAddress(id)

      // 边界处理（设置默认打勾状态）
      if (addressList.length < 1) {
        return
      }
      if (addressList.length === 1) {
        console.log(addressList[0].id)
        this.chosenAddressId = addressList[0].id
      }

      // 当有多条地址，处理地址数据并且找出默认地址
      addressList = addressList.map(item => {
        // 找出默认地址
        if (item.isDefault === 1) {
          this.chosenAddressId = item.id
        }
        // 处理卡片显示的地址
        item.address = `${item.province} ${item.city} ${item.country} ${item.addressDetail}`
        // 处理数据的默认选中状态(方便数据回显)
        if (item.isDefault === 1) {
          item.isDefault = true
        }
        return item
      })

      // 把默认地址放到最前面(找到所在的下标-保存起来-在数组中删除-再加到数组前面)
      let defaultIndex = addressList.findIndex(item => item.isDefault === true)
      if (defaultIndex !== -1) {
        let defaultAddress = addressList[defaultIndex]
        addressList.splice(defaultIndex, 1)
        addressList.unshift(defaultAddress)
      }

      this.addressList = addressList
    },

    // 添加地址
    onAdd() {
      this.$router.push('/addaddress')
    },

    // 编辑地址
    onEdit(item) {
      // 将地址数据放到动态路由，方便编辑获取
      let address = JSON.stringify(item)
      this.$router.push(`/editaddress/${address}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.address {
  background-color: #f6f6f6;
}
</style>
