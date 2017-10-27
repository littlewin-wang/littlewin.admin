<template>
  <div class="table">
    <div class="table-header">
      {{title}}
    </div>
    <div class="table-panel">
      <div class="panel-left">
        <el-button-group>
          <el-button icon="more" size="small" @click="handleRefresh">刷新列表</el-button>
          <el-button icon="delete" size="small" @click="handleReset">清空搜索词</el-button>
          <el-dropdown>
            <el-button icon="plus" size="small" :disabled="this.multipleSelection.length===0||disableBatch">
              批量操作
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteList">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
      </div>
      <div class="panel-right">
        <el-input placeholder="搜索相关标签" autosize icon="search" v-model="searchInput" @change="handleSearch" :on-icon-click="handleSearch">
        </el-input>
      </div>
    </div>
    <div class="table-content">
      <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%" max-height="720" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
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

        <el-table-column v-for="(value, key) in columns" v-bind:key="key" :prop="key" :label="value.label" :width="value.width" :sortable="value.sortable" :minWidth="value['min-width']">
          <template scope="scope">
            <div v-if="key==='icon'">
              <i class="iconfont" :class="scope.row.extends.find(e => e.name === 'icon').value"></i>
            </div>
            <div v-else>{{scope.row[key]}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-pagination">
      <el-pagination layout="prev, pager, next" :page-count="pages" :current-page.sync="currentPage" @current-change="handlePage">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: String,
    columns: Object,
    tableData: Array,
    page: Number,
    pages: Number,
    disableBatch: Boolean
  },
  data () {
    return {
      searchInput: '',
      currentPage: this.page,
      rawData: {},
      multipleSelection: []
    }
  },
  computed: {
    query () {
      return {
        keyword: this.searchInput,
        page: this.currentPage
      }
    }
  },
  watch: {
    page () {
      this.currentPage = this.page
    }
  },
  methods: {
    handleRefresh () {
      this.currentPage = 1
      this.$emit('search', this.query)
    },
    handleReset () {
      this.searchInput = ''
      this.currentPage = 1
      this.$emit('search', this.query)
    },
    handleDeleteList () {
      this.$emit('deleteList', this.multipleSelection)
    },
    handleSearch () {
      this.currentPage = 1
      this.$emit('search', this.query)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      this.$emit('edit', row, this.query)
    },
    handleDelete (index, row) {
      this.$emit('delete', row)
    },
    handlePage () {
      // 分页栏主动触发改动时，才触发事件
      if (this.currentPage !== this.page) {
        this.$emit('goPage', this.query)
      }
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
    .table-panel
      display: flex
      justify-content: space-between
      padding: 20px 20px 0 20px
    .table-content
      padding: 20px 20px 10px 20px
    .table-pagination
      padding: 0 20px 10px 20px
      text-align: right
</style>
