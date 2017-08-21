<template>
  <div class="site-container">
    <div class="site-form">
      <LForm :title="'全局设置'" :formData="siteInfo" @confirm="handleConfirm"></LForm>
    </div><div class="owner-form">
      <LForm></LForm>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LForm from '@/components/Form/Form.vue'
  import { mapGetters, mapActions } from 'vuex'
  import API from '@/api/index'

  export default {
    components: {
      LForm
    },
    computed: {
      ...mapGetters(['site']),
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
            rule: { pattern: /^(([\u4e00-\u9fa5a-zA-Z])+,)+([\u4e00-\u9fa5a-zA-Z])$/, message: '请正确输入关键词', trigger: 'blur' }
          },
          site_url: {
            val: this.site.site_url || '',
            label: '网址',
            type: 'input',
            rule: [
              { required: true, message: '请输入网址', trigger: 'blur' },
              { type: 'url', message: '请正确输入网址', trigger: 'blur' }
            ]
          }
        }
      }
    },
    methods: {
      ...mapActions(['getSite']),
      handleConfirm (data) {
        let siteInfo = {
          title: data.title,
          sub_title: data.sub_title,
          site_url: data.site_url
        }
        console.log(siteInfo)
        API.ModifySiteInfoAPI(siteInfo).then(res => {
          console.log(res.data)
          this.getSite()
        })
      }
    },
    mounted () {
      this.getSite()
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
