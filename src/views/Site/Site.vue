<template>
  <div class="site-container">
    <div class="site-form">
      <LForm :title="'全局设置'" :formData="siteInfo" @confirm="confirmSite"></LForm>
    </div>
    <div class="owner-form">
      <LForm ref="userForm" :title="'用户设置'" :formData="userInfo" @imageSync="handleImageSync" @confirm="confirmUser"></LForm>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LForm from '@/components/Form/Form.vue'
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/index'
const cos = require('@/utils/qcloud')

export default {
  components: {
    LForm
  },
  data () {
    return {
      avatarData: ''
    }
  },
  computed: {
    ...mapGetters(['upToken', 'site', 'user', 'qcloudToken']),
    siteInfo () {
      return {
        title: {
          val: this.site.title || '',
          label: '标题',
          type: 'input',
          rule: { required: true, message: '请输入标题', trigger: 'blur' }
        },
        sub_title: {
          val: this.site.sub_title || '',
          label: '副标题',
          type: 'input',
          rule: { required: true, message: '请输入副标题', trigger: 'blur' }
        },
        keywords: {
          val: String(this.site.keywords) || '',
          label: '关键词',
          type: 'input',
          rule: { pattern: /^(([\u4e00-\u9fa5a-zA-Z])+,)+([\u4e00-\u9fa5a-zA-Z])+$/, message: '请正确输入关键词', trigger: 'blur' }
        },
        description: {
          val: this.site.description || '',
          label: '描述',
          type: 'textarea',
          rule: { type: 'string', message: '请正确输入描述', trigger: 'blur' }
        },
        site_url: {
          val: this.site.site_url || '',
          label: '网址',
          type: 'input',
          rule: [
            { required: true, message: '请输入网址', trigger: 'blur' },
            { type: 'url', message: '请正确输入网址', trigger: 'blur' }
          ]
        },
        site_email: {
          val: this.site.site_email || '',
          label: '邮件地址',
          type: 'input',
          rule: { type: 'email', message: '请正确输入邮箱', trigger: 'blur' }
        },
        site_icp: {
          val: this.site.site_icp || '',
          label: '网站备案号',
          type: 'input',
          rule: { pattern: /^([\u4e00-\u9fa5a-zA-Z0-9])+$/, message: '请正确输入备案号', trigger: 'blur' }
        }
      }
    },
    userInfo () {
      return {
        gravatar: {
          val: this.user.gravatar || '',
          label: '头像',
          type: 'avatar',
          token: this.qcloudToken,
          rule: { type: 'url', message: '请输入头像', trigger: 'blur' }
        },
        username: {
          val: this.user.username || '',
          label: '姓名',
          type: 'input',
          rule: { required: true, message: '请输入姓名', trigger: 'blur' }
        },
        slogan: {
          val: this.user.slogan || '',
          label: '个性签名',
          type: 'input',
          rule: { type: 'string', message: '请输入个性签名', trigger: 'blur' }
        },
        password: {
          val: '',
          label: '密码',
          type: 'password',
          rule: [
            { required: true, message: '请输入密码(6-10位数字，字母或_)', trigger: 'blur' },
            { pattern: /^[\S]{6,10}$/, message: '密码由6-10位数字，字母或_组成', trigger: 'blur' }
          ]
        },
        new_password: {
          val: '',
          label: '新密码',
          type: 'password',
          rule: { pattern: /^[\S]{6,10}$/, message: '密码由6-10位数字，字母或_组成', trigger: 'blur' }
        },
        new_password_ag: {
          val: '',
          label: '确认新密码',
          type: 'password',
          rule: { pattern: /^[\S]{6,10}$/, message: '密码由6-10位数字，字母或_组成', trigger: 'blur' }
        }
      }
    }
  },
  methods: {
    ...mapActions(['setUpToken', 'getSite', 'getUser', 'getQcloudToken']),
    confirmSite (data) {
      let siteInfo = {
        title: data.title,
        sub_title: data.sub_title,
        site_url: data.site_url,
        keywords: data.keywords.split(','),
        description: data.description,
        site_email: data.site_email,
        site_icp: data.site_icp
      }
      API.ModifySiteInfoAPI(siteInfo).then(() => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.getSite()
      })
    },
    handleImageSync (data) {
      this.avatarData = data
    },
    b64toBlob (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512
      let byteCharacters = atob(b64Data)
      let byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize)
        let byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }
        let byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      let blob = new Blob(byteArrays, { type: contentType })
      return blob
    },
    confirmUser (data) {
      let userInfo = {
        gravatar: data.gravatar,
        username: data.username,
        slogan: data.slogan,
        password: data.password
      }

      if (data.new_password) {
        if (data.new_password === data.password) {
          this.$message.error('新密码与原密码一致')
          return false
        } else {
          if (data.new_password_ag !== data.new_password) {
            this.$message.error('确认新密码与新密码不一致')
            return false
          } else {
            userInfo.new_password = data.new_password
            userInfo.new_password_ag = data.new_password_ag
          }
        }
      }

      API.ModifyUserInfoAPI(userInfo).then(() => {
        // 显示信息
        this.$message({
          message: '更新成功',
          type: 'success'
        })

        // 处理图片上传
        if (this.avatarData !== userInfo.gravatar) {
          let cosAPI = cos(this.qcloudToken)

          cosAPI.putObject({
            Bucket: this.qcloudToken.Bucket,
            Region: this.qcloudToken.Region,
            Key: this.qcloudToken.Bucket + '/' + data.gravatar.split('/').reverse()[0],
            Body: this.b64toBlob(this.avatarData.replace(/^data:image\/\w+;base64,/, ''))
          }, (err, data) => {
            if (err) {
              this.$message.error('图片上传失败')
            } else {
              this.getUser()
            }
          })
        }
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    }
  },
  mounted () {
    this.setUpToken()
    this.getQcloudToken()
    this.getSite()
    this.getUser()
  }
}
</script>

<style lang="stylus" scoped>
  .site-container
    display: flex
    .site-form
    .owner-form
      flex: 1
      padding: 10px
</style>
