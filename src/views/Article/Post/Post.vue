<template>
  <div class="new-container">
    <div class="new-content">
      <LForm :title="'写文章'" ref="postBasic" :formData="articleInfo" @confirm="confirmArticle"></LForm>
    </div>
    <div class="new-side">
      <div class="new-category">
        <LForm :title="'文章分类'" ref="postCategory" :formData="categoryInfo" :noSubmit="true"></LForm>
        <div class="update">
          <el-button :plain="true" type="info" size="small" @click="updateCategory">更新分类</el-button>
        </div>
      </div>
      <div class="new-thumb">
        <LForm :title="'文章标签'" :formData="thumbInfo" :noSubmit="true"></LForm>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LForm from '@/components/Form/Form.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    LForm
  },
  data () {
    return {
      type: '',
      form: {

      },
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    }
  },
  computed: {
    ...mapGetters(['upToken', 'tags', 'categories']),
    articleInfo () {
      return {
        title: {
          val: '',
          label: '文章标题',
          type: 'input',
          rule: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { type: 'string', message: '请正确输入文章标题', trigger: 'blur' }
          ]
        },
        keywords: {
          val: '',
          label: '文章关键词',
          type: 'input',
          rule: { pattern: /^(([\u4e00-\u9fa5a-zA-Z])+,)+([\u4e00-\u9fa5a-zA-Z])+$/, message: '请正确输入关键词', trigger: 'blur' }
        },
        description: {
          val: '',
          label: '文章描述',
          type: 'textarea',
          rule: { type: 'string', message: '请正确输入文章描述', trigger: 'blur' }
        },
        tag: {
          val: [],
          label: '文章标签',
          type: 'tag',
          default: this.tags,
          update: this.getTags.bind(this, '')
        },
        content: {
          val: '',
          label: '文章内容',
          type: 'markdown',
          configs: {
            renderingConfig: {
              codeSyntaxHighlighting: true, // 开启代码高亮
              highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
            }
          }
        }
      }
    },
    categoryInfo () {
      return {
        category: {
          val: '',
          label: '分类',
          type: 'select',
          placeholder: '请选择文章分类',
          options: this.categories
        }
      }
    },
    thumbInfo () {
      return {
        thumb: {
          val: '',
          label: '缩略图',
          type: 'avatar',
          upToken: this.upToken,
          placeholder: '请选择文章缩略图'
        }
      }
    }
  },
  methods: {
    ...mapActions(['setUpToken', 'getTags', 'getCategories']),
    confirmArticle (data) {
      console.log(data.title)
    },
    tagClick () {
      console.log(1)
      this.type = this.type === 'success' ? '' : 'success'
    },
    updateCategory () {
      this.getCategories()
      console.log(this.$refs.postBasic.form)
    }
  },
  mounted () {
    this.setUpToken()
    this.getTags()
    this.getCategories()
  }
}
</script>

<style lang="stylus" scoped>
  .new-container
    display: flex
    .new-content
      flex: 1 1 auto
      padding: 10px
    .new-side
      flex: 0 0 360px
      padding: 10px
      .new-category
        margin-bottom: 20px
        .update
          background: #eef1f6
          margin-top: -20px
          padding: 0 20px 10px 20px
</style>
