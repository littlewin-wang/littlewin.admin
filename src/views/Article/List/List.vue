<template>
  <div class="list-container">
    <div class="post-list">
      <PostTable :title="'全部文章'" :columns="articleColumns" :tableData="articles">
      </PostTable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import PostTable from '@/components/Table/PostTable.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    PostTable
  },
  computed: {
    ...mapGetters(['articles']),
    articleColumns () {
      return {
        id: {
          label: 'ID',
          width: '60'
        },
        post: {
          label: '文章',
          'min-width': '200'
        },
        category: {
          label: '分类',
          width: '80'
        },
        tag: {
          label: '标签',
          width: '80'
        },
        updateAt: {
          label: '更新时间',
          width: '180',
          sortable: true
        },
        pub: {
          label: '公开',
          width: '80'
        },
        state: {
          label: '状态',
          width: '80'
        }
      }
    }
  },
  methods: {
    ...mapActions(['getArticles'])
  },
  mounted () {
    this.getArticles({})
  }
}
</script>

<style lang="stylus" scoped>
</style>
