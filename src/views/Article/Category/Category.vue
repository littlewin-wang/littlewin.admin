<template>
  <div class="cate-container">
    <div class="cate-form">
      <LForm :title="'添加分类'" :formData="categoryInfo" @confirm="confirmCategory"></LForm>
    </div>
    <div class="cate-list">
      <LTable ref="table" :title="'分类管理'" :columns="CategoryColumns" :tableData="categories.categories" :pages="categories.pages" :page="categories.page" :disableBatch="true" @deleteList="handleDeleteList" @search="handleSearch" @edit="handleEdit" @delete="handleDelete" @goPage="handlePage">
      </LTable>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
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
          options: this.categories.categories
        },
        description: {
          val: '',
          label: '描述',
          type: 'textarea',
          rule: { type: 'string', message: '请正确输入标签描述', trigger: 'blur' }
        },
        icon: {
          val: '',
          label: '图标',
          type: 'input',
          rule: [
            { required: true, message: '请输入图标名称', trigger: 'blur' },
            { type: 'string', message: '请正确输入图标名称', trigger: 'blur' }
          ]
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
          options: this.categories.categories
        },
        description: {
          val: '',
          label: '描述',
          type: 'textarea',
          rule: { type: 'string', message: '请正确输入标签描述', trigger: 'blur' }
        },
        icon: {
          val: '',
          label: '图标',
          type: 'input',
          rule: [
            { required: true, message: '请输入图标名称', trigger: 'blur' },
            { type: 'string', message: '请正确输入图标名称', trigger: 'blur' }
          ]
        }
      }
    },
    CategoryColumns () {
      return {
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
        },
        icon: {
          label: '图标',
          width: '80'
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
        description: data.description,
        extends: [
          {
            name: 'icon',
            value: data.icon
          }
        ]
      }

      API.CreateCateAPI(categoryInfo).then(() => {
        this.$message({
          message: '添加标签成功',
          type: 'success'
        })

        // 计算新增元素所在page
        let page = Math.ceil((this.categories.total + 1) / (this.categories.limit))

        // 重新获取数据
        this.getCategories({
          keyword: '',
          page: page
        })
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    editCategory (data) {
      let categoryInfo = {
        name: data.name,
        super: data.super,
        description: data.description,
        extends: [
          {
            name: 'icon',
            value: data.icon
          }
        ]
      }
      API.ModifyCateAPI(data._id, categoryInfo).then(() => {
        this.dialogVisible = false
        this.$message({
          message: '修改分类成功',
          type: 'success'
        })
        this.getCategories(this.$refs.table.query)
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
            this.getCategories({})
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
        .catch(_ => { })
    },
    handleSearch (query) {
      this.getCategories(query)
    },
    handleEdit (data) {
      for (let key in this.categoryEdit) {
        if (key === 'icon') {
          this.categoryEdit[key]['val'] = data.extends.find(e => e.name === 'icon').value
        } else {
          this.categoryEdit[key]['val'] = data[key] ? data[key] : ''
        }

        if (key === 'super') {
          this.categoryEdit['super'].options = this.categories.categories.filter(category => {
            return category._id !== data._id
          })
        }
      }

      this.formTitle = '修改分类: ' + this.categoryEdit.name.val + ' ' + new Date().toLocaleString()
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
            this.getCategories(this.$refs.table.query)
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
        .catch(_ => { })
    },
    handlePage (query) {
      this.getCategories(query)
    },
    handleClose (done) {
      this.formTitle = '确认关闭？'
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
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
