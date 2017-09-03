<template>
  <div class="table">
    <div class="table-header">
      {{title}}
    </div>
    <div class="table-panel">
      <div class="panel-left">
        <el-radio-group v-model="state" size="small" @change="handleSearch">
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
              <h3>{{scope.row.title}}
                <i v-if="scope.row.state===1" class="el-icon-check" style="color:#13CE66"></i>
                <i v-if="scope.row.state===0" class="el-icon-edit" style="color:#F7BA2A"></i>
                <i v-if="scope.row.state===-1" class="el-icon-delete" style="color:#FF4949"></i>
              </h3>
              <p>{{scope.row.description}}</p>
            </div>
            <el-tag v-else-if="key==='category'">{{scope.row.category.name}}</el-tag>
            <el-tag type="primary" style="margin:2px 0" v-else-if="key==='tag'" v-for="(tag,index) in scope.row.tag" v-bind:key="index">{{tag.name}}</el-tag>
            <div v-else-if="key==='comments'">{{scope.row.meta.comments}}</div>
            <div v-else-if="key==='createAt'">
              {{new Date(scope.row.createAt).toLocaleString()}}
            </div>
            <el-tag v-else-if="key==='pub'" :type="scope.row.pub===-1?'danger':scope.row.pub===0?'warning':'success'">
              {{scope.row.pub===-1?'私密':scope.row.pub===0?'加密':'公开'}}
            </el-tag>
            <el-tag v-else-if="key==='state'" :type="scope.row.state===-1?'danger':scope.row.state===0?'warning':'success'">
              {{scope.row.state===-1?'回收站':scope.row.state===0?'草稿':'发布'}}
            </el-tag>
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
  computed: {
    searchQuery () {
      return {
        keyword: this.searchInput,
        state: this.state === '全部' ? '' : this.state === '已发布' ? 1 : this.state === '草稿' ? 0 : -1
      }
    }
  },
  methods: {
    handleRefresh () {
      this.$emit('search', this.searchQuery)
    },
    handleReset () {
      this.searchInput = ''
      this.$emit('search', this.searchQuery)
    },
    handleDeleteList () {
      this.$emit('deleteList', this.multipleSelection)
    },
    handleSearch () {
      this.$emit('search', this.searchQuery)
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
