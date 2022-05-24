<template>
  <div class="add-address">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-area="onChangeArea"
    />
  </div>
</template>

<script>
import {areaList} from '@vant/area-data';
import {fetchAddUserAddress} from "@/api/address";

export default {
  name: "AddAddress",
  data() {
    return {
      areaList,
      area: ''
    };
  },
  methods: {
    async onSave(address) {
      console.log(address)
      let addressInfo = {
        ...address,
        areaCode: this.area
      }
      addressInfo.isDefault = address.isDefault ? 1 : 0
      let result = await fetchAddUserAddress(this.$store.state.userInfo.id,addressInfo)
      console.log(result)
      this.$toast(result.message)
      this.$router.back()
    },
    onChangeArea(val) {
      this.area = val.map(item => {
        return item.code
      }).join('-')
    },
  },
}
</script>

<style lang="scss" scoped>
.add-address{
  background-color: #f6f6f6;
  height: 100vh;
}
</style>
