<template>
  <div class="list-container">
    <div class="comment-list">
      <CommentTable :title="'全部文章'" :columns="commentColumns" :tableData="comments" @search="handleSearch" @state="handleState">
      </CommentTable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CommentTable from '@/components/Table/CommentTable.vue'
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/index'
export default {
  components: {
    CommentTable
  },
  computed: {
    ...mapGetters(['comments']),
    commentColumns () {
      return {
        id: {
          label: 'ID',
          width: '60'
        },
        pid: {
          label: 'PID',
          width: '60'
        },
        postID: {
          label: '文章ID',
          width: '80'
        },
        content: {
          label: '评论内容',
          'min-width': '200'
        },
        person: {
          label: '个人信息',
          width: '220'
        },
        terminal: {
          label: '终端',
          width: '200'
        },
        likes: {
          label: '点赞',
          width: '80'
        },
        isTop: {
          label: '置顶',
          width: '80'
        },
        createAt: {
          label: '创建时间',
          width: '180',
          sortable: true
        },
        state: {
          label: '状态',
          width: '100'
        }
      }
    }
  },
  methods: {
    ...mapActions(['getComments']),
    handleSearch (query) {
      this.getComments(query)
    },
    handleState (data, query) {
      console.log(data, query, API)
    }
  },
  mounted () {
    this.getComments({})
  }
}
</script>

<style lang="stylus" scoped>
</style>
