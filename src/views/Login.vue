<template>
  <div class="login">
    <!--    登录表单-->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {fetchCarousel} from '@/api/login'

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 表单提交
    async onSubmit(userInfo) {
      let loginRes = await fetchCarousel(userInfo)
      console.log(loginRes)
      if (loginRes.status === 0) {
        // 添加到store
        this.$store.commit('addUserOrToken', {
          userInfo: loginRes.userInfo,
          token: loginRes.token
        })
        if(this.$route.query.redirect){
          this.$router.push(this.$route.query.redirect)
        }else{
          this.$router.push('/index/home')
        }
      }
      this.$toast(loginRes.message)
    }
  },
}
</script>

<style lang="scss" scoped>
.login {

}
</style>
