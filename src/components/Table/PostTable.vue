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
        <div class="panel-tag">
          <el-select v-model="tag" placeholder="请选择标签" clearable @change="handleSearch">
            <el-option v-for="item in tags" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </div>
        <div class="panel-category">
          <el-select v-model="category" placeholder="请选择分类" clearable @change="handleSearch">
            <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </div>
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
            <el-form label-position="left" label-width="70px">
              <el-form-item label="标题: ">
                <span style="color:#99A9BF">{{props.row.title}}</span>
              </el-form-item>
              <el-form-item label="关键词 : ">
                <span style="color:#99A9BF">{{props.row.keywords}}</span>
              </el-form-item>
              <el-form-item label="描述: ">
                <div style="color:#99A9BF;white-space:pre" v-html="props.row.description"></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="handlePreview(props.row._id)">查看文章</el-button>
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
            </div>
            <el-tag v-else-if="key==='category'">{{scope.row.category.name}}</el-tag>
            <el-tag type="primary" style="margin:2px 0" v-else-if="key==='tag'" v-for="(tag,index) in scope.row.tag" v-bind:key="index">{{tag.name}}</el-tag>
            <div v-else-if="key==='comments'">
              <span v-if="scope.row.meta.comments===0" style="color:#99A9BF">暂无</span>
              <span v-else>{{scope.row.meta.comments}}</span>
            </div>
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
            <el-button style="margin: 2px 0" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              编辑文章
            </el-button>
            <el-button style="margin: 2px 0" size="mini" type="warning" @click="handleDraft(scope.$index, scope.row)">
              移到草稿
            </el-button>
            <el-button style="margin: 2px 0" size="mini" type="danger" @click="handleTrash(scope.$index, scope.row)">
              移回收站
            </el-button>
            <el-button style="margin: 2px 0" size="mini" type="success" @click="handlePublish(scope.$index, scope.row)">
              移到发布
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-pagination">
      <el-pagination layout="prev, pager, next" :page-count="pages" :current-page.sync="currentPage" @current-change="handlePage">
      </el-pagination>
    </div>
    <el-dialog :title="article.title" :visible.sync="isPreview" size="full" :before-close="resetPreview">
      <markdown-editor ref="markdownEditor" :configs="{toolbar: false}" v-model="article.content" preview-class="markdown-body"></markdown-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPreview()">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import API from '@/api/index'

export default {

  props: {
    title: String,
    columns: Object,
    tableData: Array,
    page: Number,
    pages: Number,
    tags: Array,
    categories: Array,
    disableBatch: Boolean
  },
  data () {
    return {
      tag: '',
      category: '',
      searchInput: '',
      currentPage: this.page,
      state: '全部',
      rawData: {},
      multipleSelection: [],
      article: {
        title: '',
        content: ''
      },
      isPreview: false
    }
  },
  computed: {
    searchQuery () {
      return {
        page: this.currentPage,
        tag: this.tag,
        category: this.category,
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
    handlePreview (id) {
      API.GetArticleAPI(id).then(res => {
        if (res.data.success) {
          this.article.title = res.data.data.title
          this.article.content = res.data.data.content
          this.isPreview = true
          setTimeout(() => {
            if (!this.$refs.markdownEditor.simplemde.isPreviewActive()) {
              this.$refs.markdownEditor.simplemde.togglePreview()
            }
          }, 0)
        } else {
          this.$message.error('获取文章失败')
        }
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    resetPreview () {
      this.isPreview = false
      this.article.title = ''
      this.article.content = ''
      if (this.$refs.markdownEditor.simplemde.isPreviewActive()) {
        this.$refs.markdownEditor.simplemde.togglePreview()
      }
    },
    handleEdit (index, row) {
      this.$emit('edit', row._id)
    },
    handleTrash (index, row) {
      this.$emit('state', { articles: [{ _id: row._id }], action: 1 }, this.searchQuery)
    },
    handleDraft (index, row) {
      this.$emit('state', { articles: [{ _id: row._id }], action: 2 }, this.searchQuery)
    },
    handlePublish (index, row) {
      this.$emit('state', { articles: [{ _id: row._id }], action: 3 }, this.searchQuery)
    },
    handleDelete (index, row) {
      this.$emit('delete', row)
    },
    handlePage () {
      // 分页栏主动触发改动时，才触发事件
      if (this.currentPage !== this.page) {
        this.$emit('goPage', this.searchQuery)
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
    .table-pagination
      padding: 0 20px 10px 20px
      text-align: right
    .table-markdown
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom: 0
      z-index: 9
</style>
