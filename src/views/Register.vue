<template>
  <div class="register">
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

      <van-field
        v-model="user.twoPassword"
        type="password"
        name="twoPassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import {fetchRegister} from '@/api/register'

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: '',
        password: '',
        twoPassword: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.user.password !== this.user.twoPassword) {
        this.$toast('两次密码不一致')
        return
      }
      let result = await fetchRegister({
        username: this.user.username,
        password: this.user.password
      })
      this.$toast(result.message)
      if (result.status === 0) {
        this.$router.push('/login')
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
