<template>
  <div class="tag-container">
    <div class="tag-form">
      <LForm :title="'添加标签'" :formData="tagInfo" @confirm="confirmTag"></LForm>
    </div>
    <div class="tag-list">
      <LTable
        :title="'标签管理'"
        :columns="tagColumns"
        :tableData="tags"
        @edit="handleEdit"
      >
      </LTable>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <LForm :title="'修改标签'" :formData="tagEdit" @confirm="editTag"></LForm>
    </el-dialog>
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
    data () {
      return {
        tagInfo: {
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
        },
        tagEdit: {
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
        },
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters(['tags']),
      tagColumns () {
        return {
          id: {
            label: 'ID',
            width: '100'
          },
          name: {
            label: '名称',
            width: '180'
          },
          description: {
            label: '描述',
            'min-width': '200'
          },
          count: {
            label: '文章',
            width: '100',
            sortable: true
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

        API.CreateTagAPI(tagInfo).then(() => {
          this.$message({
            message: '添加标签成功',
            type: 'success'
          })
          this.getTags()
        })
      },
      editTag (data) {
        let tagInfo = {
          name: data.name,
          description: data.description
        }
        console.log(tagInfo)
      },
      handleEdit (data) {
        this.dialogVisible = true
        console.log(data)
        for (let key in this.tagEdit) {
          this.tagEdit[key]['val'] = data[key] ? data[key] : ''
        }
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
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
