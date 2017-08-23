<template>
  <div class="table">
    <div class="table-header">
      {{title}}
    </div>
    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="720"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="count"
          label="文章"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              @click="handleShow(scope.$index, scope.row)"
            >
              查看
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String,
      tableData: Array
    },
    data () {
      return {
        multipleSelection: []
      }
    },
    methods: {
      formatter (row, column) {
        return row.address
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleShow (index, row) {
        console.log(index, row)
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .table
    background: #eef1f6
    .table-header
      padding-left: 1rem
      height: 40px
      line-height: 40px
      background: #99A9BF
      border-radius: 4px 4px 0 0
    .table-content
      padding: 20px 20px 10px 20px
</style>
