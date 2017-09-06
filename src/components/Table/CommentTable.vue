<template>
  <div class="table">
    <div class="table-header">
      {{title}}
    </div>
    <div class="table-panel">
      <div class="panel-left">
        <el-radio-group v-model="type" size="small" @change="handleSearch">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="留言板"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="state" size="small" @change="handleSearch">
          <el-radio-button label="已发布"></el-radio-button>
          <el-radio-button label="待审核"></el-radio-button>
          <el-radio-button label="回收站"></el-radio-button>
          <el-radio-button label="垃圾评论"></el-radio-button>
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
        <div class="panel-search">
          <el-input placeholder="搜索相关" autosize icon="search" v-model="searchInput" @change="handleSearch" :on-icon-click="handleSearch">
          </el-input>
        </div>
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
            <div v-if="key==='person'">
              <div>名字:
                <span style="color:#99a9bf">{{scope.row.author.name}}</span>
              </div>
              <div>邮箱:
                <a :href="`mailto:${scope.row.author.email}`" style="color:#99a9bf">{{scope.row.author.email}}</a>
              </div>
              <div>网址:
                <a :href="scope.row.author.site" style="color:#99a9bf">{{scope.row.author.site}}</a>
              </div>
            </div>
            <div v-if="key==='terminal'">
              <div>浏览器:
                <span style="color:#99a9bf">{{parseUA(scope.row.agent).browser.name}} - {{parseUA(scope.row.agent).browser.version.original.split('.')[0]}}</span>
              </div>
              <div>系统:
                <span style="color:#99a9bf">{{parseUA(scope.row.agent).os.name}} - {{parseUA(scope.row.agent).os.version.original.split('.')[0]}}</span>
              </div>
            </div>
            <div v-else-if="key==='state'">
              <i v-if="scope.row.state===1" class="el-icon-check" style="color:#13CE66"></i>
              <i v-if="scope.row.state===0" class="el-icon-warning" style="color:#F7BA2A"></i>
              <i v-if="scope.row.state===-1" class="el-icon-delete" style="color:#FF4949"></i>
              <i v-if="scope.row.state===-2" class="el-icon-close" style="color:#1F2D3D"></i>
            </div>
            <div v-else-if="key==='createAt'">
              {{new Date(scope.row.createAt).toLocaleString()}}
            </div>
            <div v-else-if="key==='isTop'">
              <span v-if="scope.row.isTop">是</span>
              <span v-else style="color:#99A9BF">否</span>
            </div>
            <div v-else>{{scope.row[key]}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" fixed="right">
          <template scope="scope">
            <el-button style="margin: 2px 0 2px 0" size="small" type="primary" @click="handleGo(scope.$index, scope.row)">
              评论页面
            </el-button>
            <el-button style="margin: 2px 0 2px 0" size="small" type="warning" @click="handleBan(scope.$index, scope.row)">
              标为垃圾
            </el-button>
            <el-button style="margin: 2px 0 2px 0" size="small" type="danger" @click="handleTrash(scope.$index, scope.row)">
              移回收站
            </el-button>
            <el-button style="margin: 2px 0 2px 0" size="small" type="success" @click="handlePublish(scope.$index, scope.row)">
              通过审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const UA = require('ua-device')
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
      state: '已发布',
      multipleSelection: [],
      type: '全部'
    }
  },
  computed: {
    searchQuery () {
      return {
        state: this.state === '已发布' ? 1 : this.state === '回收站' ? -1 : this.state === '垃圾评论' ? -2 : 0,
        postID: this.type === '全部' ? '' : 0,
        keyword: this.searchInput
      }
    }
  },
  methods: {
    parseUA (ua) {
      return new UA(ua)
    },
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
    handleGo (index, row) {
      console.log('前往评论页面')
    },
    handleBan (index, row) {
      this.$emit('state', { comments: [{ _id: row._id }], state: -2 }, this.searchQuery)
    },
    handleTrash (index, row) {
      this.$emit('state', { comments: [{ _id: row._id }], state: -1 }, this.searchQuery)
    },
    handlePublish (index, row) {
      this.$emit('state', { comments: [{ _id: row._id }], state: 1 }, this.searchQuery)
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
        .panel-tag
          display: inline-block
          vertical-align: top
        .panel-category
          display: inline-block
          vertical-align: top
        .panel-search
          display: inline-block
          vertical-align: top
    .table-content
      padding: 20px 20px 10px 20px
    .table-markdown
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom: 0
      z-index: 9
</style>
