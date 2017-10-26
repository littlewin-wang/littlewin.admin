<template>
  <div class="login-page">
    <div class="login-container">
      <LForm :formData="userInfo" @confirm="confirmUser"></LForm>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LForm from '@/components/Form/Form.vue'

import API from '@/api/index'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    LForm
  },
  data () {
    return {
      userInfo: {
        username: {
          val: '',
          label: '账户',
          type: 'input',
          rule: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { type: 'string', message: '请正确输入账户', trigger: 'blur' }
          ]
        },
        password: {
          val: '',
          label: '密码',
          type: 'password',
          rule: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', message: '请正确输入密码', trigger: 'blur' }
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['userLogin']),
    confirmUser (data) {
      API.UserLoginAPI(data).then(res => {
        if (res.data.success === true) {
          // token注册保存
          const token = `Bearer ${res.data.data.token}`
          this.userLogin(token)
          this.$notify({
            title: '芝麻开门',
            message: '欢迎小主人归来',
            type: 'success'
          })

          // 跳转到重定向页面
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({
            path: redirect
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$notify.error({
          title: '错误',
          message: err.response ? err.response.data.message : '登录失败, 查看控制台!!!'
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-page
  position: relative
  width: 100%
  height: 100vh
  background-color: #324157
  .login-container
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 320px
    .form
      background: #fff
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)

  @media only screen and (max-width: 320px)
    .login-container
      position: relative
      top: 50%
      left: 0
      width: 100%
      transform: translate(0, -50%)
</style>
