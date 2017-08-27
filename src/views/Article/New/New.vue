<template>
  <div class="new-container">
    <div class="new-content">
      <LForm :title="'写文章'" :formData="articleInfo" @confirm="confirmArticle"></LForm>
    </div>
    <div class="new-side">
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
    ...mapGetters(['tags']),
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
          val: ['599d69fb05eb401ce131ecf0'],
          label: '文章标签',
          type: 'tag',
          default: this.tags
        },
        content: {
          val: '',
          label: '文章内容',
          type: 'markdown'
        }
      }
    }
  },
  methods: {
    ...mapActions(['getTags']),
    confirmArticle (data) {
      console.log(data.title)
    },
    tagClick () {
      console.log(1)
      this.type = this.type === 'success' ? '' : 'success'
    }
  },
  mounted () {
    this.getTags()
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
</style>
