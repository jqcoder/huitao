<template>
  <div class="edit-address">
    <van-address-edit
      :address-info="oldAddress"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="onChangeArea"
    />
  </div>
</template>

<script>
// 省市区数据
import {areaList} from '@vant/area-data';

import {fetchDeleteUserAddress, fetchEditUserAddress} from '@/api/address'

export default {
  name: "EditAddress",
  data() {
    return {
      areaList,
      // 原数据
      address: JSON.parse(this.$route.params.addressInfo),
      areaCode: JSON.parse(this.$route.params.addressInfo).areaCode
    };
  },
  //
  computed: {
    oldAddress() {
      console.log(JSON.parse(this.$route.params.addressInfo))
      let address = this.address

      address.areaCode = JSON.parse(this.$route.params.addressInfo).areaCode.split('-')[2]
      return address
    }
  },
  methods: {
    // 保存地址
    async onSave(newAddress) {
      let address = {
        ...newAddress,
        country: newAddress.county,
        areaCode: this.areaCode
      }
      address.isDefault = address.isDefault ? 1 : 0
      let result = await fetchEditUserAddress(this.address.id, address)
      if(result.status === 0){
        this.$toast(result.message)
        this.$router.back()
      }
    },

    //
    async onDelete(content) {
      let result = await fetchDeleteUserAddress(content.id)
      if (result.status === 0) {
        this.$toast('删除成功')
        this.$router.back()
      }
    },
    // 修改省市区
    onChangeArea(val) {
      this.areaCode = val.map(item => {
        return item.code
      }).join('-')
    }
  },
}
</script>

<style lang="scss" scoped>
.edit-address {
  height: 100vh;
  background-color: #f6f6f6;
}
</style>
