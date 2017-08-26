<template>
  <div class="cate-container">
    <div class="cate-form">
      <LForm :title="'添加分类'" :formData="categoryInfo" @confirm="confirmCategory"></LForm>
    </div>
    <div class="cate-list">
      <LTable
        :title="'分类管理'"
        :columns="CategoryColumns"
        :tableData="categories"
        :disableBatch="true"
        @deleteList="handleDeleteList"
        @search="handleSearch"
        @edit="handleEdit"
        @delete="handleDelete"
      >
      </LTable>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <LForm :title="formTitle" :formData="categoryEdit" @confirm="editCategory"></LForm>
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
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters(['categories']),
      categoryInfo () {
        return {
          name: {
            val: '',
            label: '分类名称',
            type: 'input',
            rule: [
              { required: true, message: '请输入分类名称', trigger: 'blur' },
              { type: 'string', message: '请正确输入分类名称', trigger: 'blur' }
            ]
          },
          super: {
            val: '',
            label: '父分类',
            type: 'select',
            placeholder: '请选择父分类',
            options: this.categories
          },
          description: {
            val: '',
            label: '描述',
            type: 'textarea',
            rule: { type: 'string', message: '请正确输入标签描述', trigger: 'blur' }
          }
        }
      },
      categoryEdit () {
        return {
          _id: {
            val: '',
            label: 'ID',
            type: 'input'
          },
          name: {
            val: '',
            label: '分类名称',
            type: 'input',
            rule: [
              { required: true, message: '请输入分类名称', trigger: 'blur' },
              { type: 'string', message: '请正确输入分类名称', trigger: 'blur' }
            ]
          },
          super: {
            val: '',
            label: '父分类',
            type: 'select',
            placeholder: '请选择父分类',
            options: this.categories
          },
          description: {
            val: '',
            label: '描述',
            type: 'textarea',
            rule: { type: 'string', message: '请正确输入标签描述', trigger: 'blur' }
          }
        }
      },
      CategoryColumns () {
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
      ...mapActions(['getCategories']),
      confirmCategory (data) {
        let categoryInfo = {
          name: data.name,
          super: data.super,
          description: data.description
        }

        API.CreateCateAPI(categoryInfo).then(() => {
          this.$message({
            message: '添加标签成功',
            type: 'success'
          })
          this.getCategories()
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      },
      editCategory (data) {
        let categoryInfo = {
          name: data.name,
          super: data.super,
          description: data.description
        }
        API.ModifyCateAPI(data._id, categoryInfo).then(() => {
          this.$message({
            message: '修改分类成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.getCategories()
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      },
      handleDeleteList (data) {
        this.$confirm('确认删除？')
          .then(_ => {
            API.DeleteTagListAPI({tags: data}).then(() => {
              this.$message({
                message: '批量删除标签成功',
                type: 'success'
              })
              this.getTags()
            }).catch(err => {
              this.$message.error(err.response.data.message)
            })
          })
          .catch(_ => {})
      },
      handleSearch (str) {
        this.getCategories(str)
      },
      handleEdit (data) {
        for (let key in this.categoryEdit) {
          this.categoryEdit[key]['val'] = data[key] ? data[key] : ''
          if (key === 'super') {
            this.categoryEdit['super'].options = this.categories.filter(category => {
              return category._id !== data._id
            })
          }
        }

        this.formTitle = '修改分类: ' + this.categoryEdit.name.val
        this.dialogVisible = true
      },
      handleDelete (data) {
        this.$confirm('确认删除？')
          .then(_ => {
            API.DeleteCateAPI(data._id).then(() => {
              this.$message({
                message: '删除分类成功',
                type: 'success'
              })
              this.getCategories()
            }).catch(err => {
              this.$message.error(err.response.data.message)
            })
          })
          .catch(_ => {})
      },
      handleClose (done) {
        this.formTitle = '确认关闭？'
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    },
    mounted () {
      this.getCategories()
    }
  }
</script>

<style lang="stylus" scoped>
  .cate-container
    display: flex
    .cate-form
      flex: 1 1 360px
      padding: 10px
    .cate-list
      flex: 1 1 auto
      padding: 10px
      overflow-y: scroll
</style>
