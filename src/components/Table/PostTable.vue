<template>
  <div class="table">
    <div class="table-header">
      {{title}}
    </div>
    <div class="table-panel">
      <div class="panel-left">
        <el-radio-group v-model="state" size="small">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="已发布"></el-radio-button>
          <el-radio-button label="草稿"></el-radio-button>
          <el-radio-button label="回收站"></el-radio-button>
        </el-radio-group>
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
        <el-input placeholder="搜索相关" autosize icon="search" v-model="searchInput" @change="handleSearch" :on-icon-click="handleSearch">
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
            <div v-if="key==='post'">
              <h3>{{scope.row.title}}</h3>
              <p>{{scope.row.description}}</p>
            </div>
            <div v-else-if="key==='category'">{{scope.row.category.name}}</div>
            <div v-else-if="key==='tag'">{{scope.row.tag[0].name}}</div>
            <div v-else-if="key==='updateAt'">
              {{new Date(scope.row.updateAt).toLocaleString()}}
            </div>
            <div v-else-if="key==='pub'">
              {{scope.row.pub===-1?'私密':scope.row.pub===0?'加密':'公开'}}
            </div>
            <div v-else-if="key==='state'">
              {{scope.row.state===-1?'回收站':scope.row.state===0?'草稿':'发布'}}
            </div>
            <div v-else>{{scope.row[key]}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template scope="scope">
            <el-button style="margin: 2px 0 2px 0" size="small" type="success" @click="handleEdit(scope.$index, scope.row)">
              编辑文章
            </el-button>
            <el-button style="margin: 2px 0 2px 0" size="small" type="warning" @click="handleDelete(scope.$index, scope.row)">
              移到草稿
            </el-button>
            <el-button style="margin: 2px 0 2px 0" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
              移回收站
            </el-button>
            <el-button style="margin: 2px 0 2px 0" size="small" type="info" @click="handleDelete(scope.$index, scope.row)">
              查看文章
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
    tableData: Array,
    disableBatch: Boolean
  },
  data () {
    return {
      searchInput: '',
      state: '全部',
      rawData: {},
      multipleSelection: []
    }
  },
  methods: {
    handleRefresh () {
      this.$emit('search', this.searchInput)
    },
    handleReset () {
      this.searchInput = ''
      this.$emit('search', this.searchInput)
    },
    handleDeleteList () {
      this.$emit('deleteList', this.multipleSelection)
    },
    handleSearch () {
      this.$emit('search', this.searchInput)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      this.$emit('edit', row)
    },
    handleDelete (index, row) {
      this.$emit('delete', row)
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
      padding: 20px 20px 0 20px
      .panel-left
        display: inline-block
        vertical-align: top
      .panel-right
        display: inline-block
        float: right
        vertical-align: top
    .table-content
      padding: 20px 20px 10px 20px
</style>
