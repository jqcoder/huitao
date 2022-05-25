<template>
  <div class="user">
    <div class="head-bg">

      <div class="userInfo">
        <van-image :src="'http://api.w0824.com/'+ $store.state.userInfo.avatar">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
        <div><span class="username">用户名:{{ $store.state.userInfo.username }}</span></div>
      </div>

      <div class="setting">
        <van-cell-group>
          <van-cell title="我的订单" is-link to="/order" value="全部订单"/>
          <van-cell title="收货地址" is-link to="/address" />
          <van-cell title="设置" is-link @click="show = true"/>
          <van-cell title="关于惠淘" value="1.0.0"/>
          <van-button type="danger" block @click="signOut">退出登录</van-button>
        </van-cell-group>
      </div>
    </div>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="selectItem"
    />

    <van-uploader v-show="false" ref="uploadImg" :after-read="afterRead"/>
  </div>
</template>

<script>
import {ImagePreview} from 'vant';
import {fetchUpdateUserImg} from '@/api/user'

export default {
  name: 'User',
  data() {
    return {
      show: false,
      actions: [{name: '更换头像'}, {name: '下载头像'}],
    }
  },
  methods: {
    signOut() {
      this.$store.commit('removeUserOrToken')
      this.$router.push('/')
    },
    selectItem(item) {
      if (item.name === '更换头像') {
        this.$refs.uploadImg.$refs.input.click()
      }
    },
    async afterRead(file) {
      let result = await fetchUpdateUserImg({
        user_id: this.$store.state.userInfo.id,
        file: file.file
      })
      if (result.status === 0) {
        this.$store.commit('uploadUserImg', result.src)
      }
      this.$toast(result.message)
    },
    aaa(){

    }
  },
}
</script>

<style lang="scss" scoped>

.user {
  height: 100vh;
  background-color: #f6f6f6;

  .head-bg {
    position: relative;
    display: flex;
    align-items: center;
    height: 180px;
    background-color: #3590f8;

    .userInfo {
      display: flex;
      align-items: center;
      margin: 0 0 0 10%;


      .van-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 10px;
        overflow: hidden;
      }
    }
  }

  .setting {
    position: absolute;
    top: 144px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>
