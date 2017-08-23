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

        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item :label="key" v-for="(value, key) in props.row" v-bind:key="key">
                <span>{{value}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column v-for="(value, key) in columns" v-bind:key="key"
          :prop="key"
          :label="value.label"
          :width="value.width"
          :sortable="value.sortable"
          :minWidth="value['min-width']">
        </el-table-column>

        <el-table-column
          label="操作"
          width="150"
        >
          <template scope="scope">
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
      columns: Object,
      tableData: Array
    },
    data () {
      return {
        rawData: {},
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        this.$emit('edit', row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style lang="stylus" scope>
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
