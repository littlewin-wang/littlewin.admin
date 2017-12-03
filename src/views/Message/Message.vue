<template>
  <div class="msg-container">
    <div class="msg-form">
      <LForm :title="'添加公告'" :formData.sync="msgInfo" @confirm="confirmMsg"></LForm>
    </div>
    <div class="msg-list">
      <LTable ref="table" :title="'公告管理'" :columns="msgColumns" :tableData="msg.messages || []" :pages="msg.pages" :page="msg.page" @deleteList="handleDeleteList" @search="handleSearch" @edit="handleEdit" @delete="handleDelete" @goPage="handlePage">
      </LTable>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <LForm :title="formTitle" :formData="msgEdit" @confirm="editMsg"></LForm>
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
      msgInfo: {
        content: {
          val: '',
          label: '公告内容',
          type: 'input',
          rule: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },
            { type: 'string', message: '请正确输入公告内容', trigger: 'blur' }
          ]
        }
      },
      msgEdit: {
        _id: {
          val: '',
          label: 'ID',
          type: 'input'
        },
        content: {
          val: '',
          label: '公告内容',
          type: 'input',
          rule: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },
            { type: 'string', message: '请正确输入公告内容', trigger: 'blur' }
          ]
        }
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['msg']),
    msgColumns () {
      return {
        content: {
          label: '内容',
          'min-width': '200'
        }
      }
    }
  },
  methods: {
    ...mapActions(['getMsg']),
    confirmMsg (data) {
      let msgInfo = {
        content: data.content
      }

      API.CreateMsgAPI(msgInfo).then(() => {
        this.$message({
          message: '添加公告成功',
          type: 'success'
        })

        // 计算新增元素所在page
        let page = Math.ceil((this.msg.total + 1) / (this.msg.limit))

        // 重新获取数据
        this.getMsg({
          keyword: '',
          page: page
        })
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    editMsg (data) {
      let msgInfo = {
        content: data.content
      }

      API.ModifyMsgAPI(data._id, msgInfo).then(() => {
        this.dialogVisible = false
        this.$message({
          message: '修改公告成功',
          type: 'success'
        })

        this.getMsg(this.$refs.table.query)
      }).catch(err => {
        this.$message.error(err.response ? err.response.data.message : '好像哪里不对劲~')
      })
    },
    handleDeleteList (data) {
      this.$confirm('确认删除？')
        .then(_ => {
          API.DeleteMsgListAPI({ messages: data }).then(() => {
            this.$message({
              message: '批量删除公告成功',
              type: 'success'
            })
            this.getMsg({})
          }).catch(err => {
            this.$message.error(err.response ? err.response.data.message : '好像哪里不对劲~')
          })
        })
        .catch(_ => { })
    },
    handleSearch (query) {
      this.getMsg(query)
    },
    handleEdit (data) {
      for (let key in this.msgEdit) {
        this.msgEdit[key]['val'] = data[key] ? data[key] : ''
      }

      this.formTitle = '修改公告: ' + data.id + ' at ' + new Date().toLocaleString()
      this.dialogVisible = true
    },
    handleDelete (data) {
      this.$confirm('确认删除？')
        .then(_ => {
          API.DeleteMsgAPI(data._id).then(() => {
            this.$message({
              message: '删除公告成功',
              type: 'success'
            })
            this.getMsg(this.$refs.table.query)
          }).catch(err => {
            this.$message.error(err.response ? err.response.data.message : '好像哪里不对劲~')
          })
        })
        .catch(_ => { })
    },
    handlePage (query) {
      this.getMsg(query)
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
  .msg-container
    display: flex
    .msg-form
      flex: 1 1 360px
      padding: 10px
    .msg-list
      flex: 1 1 auto
      padding: 10px
      overflow-y: scroll
</style>
