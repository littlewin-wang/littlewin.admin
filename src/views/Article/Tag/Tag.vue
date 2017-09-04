<template>
  <div class="tag-container">
    <div class="tag-form">
      <LForm :title="'添加标签'" :formData="tagInfo" @confirm="confirmTag"></LForm>
    </div>
    <div class="tag-list">
      <LTable :title="'标签管理'" :columns="tagColumns" :tableData="tags" @deleteList="handleDeleteList" @search="handleSearch" @edit="handleEdit" @delete="handleDelete">
      </LTable>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <LForm :title="formTitle" :formData="tagEdit" @confirm="editTag"></LForm>
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
      formTitle: '',
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
        _id: {
          val: '',
          label: 'ID',
          type: 'input'
        },
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
          width: '60'
        },
        name: {
          label: '名称',
          width: '120'
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
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    editTag (data) {
      let tagInfo = {
        name: data.name,
        description: data.description
      }
      API.ModifyTagAPI(data._id, tagInfo).then(() => {
        this.dialogVisible = false
        this.$message({
          message: '修改标签成功',
          type: 'success'
        })
        this.getTags()
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    handleDeleteList (data) {
      this.$confirm('确认删除？')
        .then(_ => {
          API.DeleteTagListAPI({ tags: data }).then(() => {
            this.$message({
              message: '批量删除标签成功',
              type: 'success'
            })
            this.getTags()
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
        .catch(_ => { })
    },
    handleSearch (str) {
      this.getTags(str)
    },
    handleEdit (data) {
      for (let key in this.tagEdit) {
        this.tagEdit[key]['val'] = data[key] ? data[key] : ''
      }

      this.formTitle = '修改标签: ' + this.tagEdit.name.val + ' ' + new Date().toLocaleString()
      this.dialogVisible = true
    },
    handleDelete (data) {
      this.$confirm('确认删除？')
        .then(_ => {
          API.DeleteTagAPI(data._id).then(() => {
            this.$message({
              message: '删除标签成功',
              type: 'success'
            })
            this.getTags()
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
        .catch(_ => { })
    },
    handleClose (done) {
      this.formTitle = '确认关闭？'
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .tag-container
    display: flex
    .tag-form
      flex: 1 1 360px
      padding: 10px
    .tag-list
      flex: 1 1 auto
      padding: 10px
      overflow-y: scroll
</style>
