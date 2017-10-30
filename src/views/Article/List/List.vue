<template>
  <div class="list-container">
    <div class="post-list">
      <PostTable :title="'全部文章'" :columns="articleColumns" :tableData="articles" :tags="tags.tags" :categories="categories.categories" @search="handleSearch" @edit="handleEdit" @state="handleState">
      </PostTable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import PostTable from '@/components/Table/PostTable.vue'
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/index'
export default {
  components: {
    PostTable
  },
  computed: {
    ...mapGetters(['articles', 'tags', 'categories']),
    articleColumns () {
      return {
        post: {
          label: '文章',
          'min-width': '200'
        },
        category: {
          label: '分类',
          width: '120'
        },
        tag: {
          label: '标签',
          width: '120'
        },
        comments: {
          label: '评论',
          width: '100',
          sortable: true
        },
        createAt: {
          label: '创建时间',
          width: '200',
          sortable: true
        },
        pub: {
          label: '公开',
          width: '80'
        },
        state: {
          label: '状态',
          width: '100'
        }
      }
    }
  },
  methods: {
    ...mapActions(['getArticles', 'getTags', 'getCategories']),
    handleSearch (query) {
      this.getArticles(query)
    },
    handleEdit (id) {
      this.$router.push(`/article/post/${id}`)
    },
    handleState (data, query) {
      API.ModifyArticleStateAPI(data).then(res => {
        this.getArticles(query)
        this.$message.success('更新状态成功')
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.getTags({limit: 100})
    this.getCategories({limit: 100})
  },
  mounted () {
    this.getTags({limit: 100})
    this.getCategories({limit: 100})
    this.getArticles({})
  }
}
</script>

<style lang="stylus" scoped>
</style>
