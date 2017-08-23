<template>
  <div class="tag-container">
    <div class="tag-form">
      <LForm :title="'添加标签'" :formData="tagInfo" @confirm="confirmTag"></LForm>
    </div>
    <div class="tag-list">
      <LTable :title="'标签管理'" :tableData="tags"></LTable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LForm from '@/components/Form/Form.vue'
  import LTable from '@/components/Table/Table.vue'
  import { mapGetters, mapActions } from 'vuex'
  import API from '@/api/index'

  export default {
    components: {
      LForm,
      LTable
    },
    computed: {
      ...mapGetters(['tags']),
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
            type: 'textarea',
            rule: { type: 'string', message: '请正确输入标签描述', trigger: 'blur' }
          }
        }
      }
    },
    methods: {
      ...mapActions(['getTags']),
      confirmTag (data) {
        let tagInfo = {
          name: data.name,
          description: data.description
        }

        console.log(tagInfo)
        API.CreateTagAPI(tagInfo).then(() => {
          this.$message({
            message: '添加标签成功',
            type: 'success'
          })
          this.getTags()
        })
      }
    },
    mounted () {
      this.getTags()
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
