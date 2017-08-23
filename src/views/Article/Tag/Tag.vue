<template>
  <div class="tag-container">
    <div class="tag-form">
      <LForm :title="'添加标签'" :formData="tagInfo"></LForm>
    </div>
    <div class="tag-list">
      123
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LForm from '@/components/Form/Form.vue'
  import { mapGetters, mapActions } from 'vuex'
//  import API from '@/api/index'

  export default {
    components: {
      LForm
    },
    computed: {
      ...mapGetters(['site', 'user']),
      tagInfo () {
        return {
          name: {
            val: '',
            label: '标签名称',
            type: 'input',
            rule: [
              { required: true, message: '请输入标签名称', trigger: 'blur' },
              { type: 'string', message: '请正确输入标签名称', trigger: 'blur' }
            ]
          },
          description: {
            val: '',
            label: '描述',
            type: 'textarea'
          }
        }
      }
    },
    methods: {
      ...mapActions(['getSite', 'getUser'])
    },
    mounted () {
      this.getSite()
      this.getUser()
    }
  }
</script>

<style lang="stylus" scoped>
  .tag-container
    display: flex
    .tag-form
      flex: 0 360px
      padding: 10px
    .tag-list
      flex: 1
      padding: 10px
</style>
