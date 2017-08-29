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
        <LForm :title="'文章标签'" ref="postThumb" :formData="thumbInfo" :noSubmit="true"></LForm>
      </div>
      <div class="new-publish">
        <LForm :title="'文章发布'" ref="postPublish" :formData="publishInfo" :noSubmit="true"></LForm>
      </div>
      <div class="new-submit">
        <div class="form">
          <div class="form-header">
            操作
          </div>
          <div class="form-content">
            <el-button class="post-button" type="primary" @click.native="confirmPost">确认</el-button>
            <el-button class="post-button" type="danger" @click.native="resetPost">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LForm from '@/components/Form/Form.vue'
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/index'

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
    },
    publishInfo () {
      return {
        state: {
          val: '',
          label: '状态',
          type: 'select',
          options: [
            {
              name: '回收站',
              _id: -1
            },
            {
              name: '草稿',
              _id: 0
            },
            {
              name: '发布',
              _id: 1
            }
          ]
        },
        pub: {
          val: '',
          label: '公开状态',
          type: 'select',
          options: [
            {
              name: '私密',
              _id: -1
            },
            {
              name: '加密',
              _id: 0
            },
            {
              name: '公开',
              _id: 1
            }
          ]
        },
        password: {
          val: '',
          label: '密码',
          type: 'password',
          rule: { pattern: /^[\S]{6,10}$/, message: '密码由6-10位数字，字母或_组成', trigger: 'blur' }
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
    },
    confirmPost () {
      this.$refs.postBasic.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$refs.postBasic.form.content) {
            console.log(this.$refs.postBasic.form)
          } else {
            this.$message.error('文章内容为空')
            return false
          }
        } else {
          this.$message.error('文章信息输入有错')
          return false
        }
      })

      let obj = Object.assign({}, this.$refs.postBasic.form, this.$refs.postCategory.form, this.$refs.postThumb.form, this.$refs.postPublish.form)

      console.log(obj)
      this.$confirm('确认文章内容')
        .then(_ => {
          API.CreateArticleAPI(obj).then((res) => {
            this.$message({
              message: '文章添加成功',
              type: 'success'
            })
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        })
        .catch(_ => { })
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
      .new-thumb
        margin-bottom: 20px
      .new-publish
        margin-bottom: 20px
      .new-submit
        .post-button
          margin-bottom: 20px
</style>
