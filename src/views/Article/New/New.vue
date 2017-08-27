<template>
  <div class="new-container">
    <div class="new-content">
      <div class="form">
        <div class="form-header">
          写文章
        </div>
        <div class="form-content">
          <el-form ref="form" :model="form" label-position="left" label-width="120px">
            <el-form-item label="文章标题">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="文章关键词">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="文章描述">
              <el-input type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
              <el-tag @click.native="tagClick" :type="type">标签一</el-tag>
              <el-tag>标签二</el-tag>
              <el-tag>标签三</el-tag>
            </el-form-item>
            <markdown-editor v-model="content" :configs="configs" @input="handleInput" preview-class="markdown-body"></markdown-editor>
          </el-form>
        </div>
      </div>
    </div>
    <div class="new-side">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { markdownEditor } from 'vue-simplemde'
require.ensure([], () => require('github-markdown-css'), 'markdown-style')
import 'github-markdown-css'

export default {
  components: {
    markdownEditor
  },
  data () {
    return {
      type: '',
      form: {

      },
      content: '',
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    }
  },
  methods: {
    handleInput () {
      // do some things
    },
    tagClick () {
      console.log(1)
      this.type = 'success'
    }
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
      flex: 0 1 360px
      padding: 10px
</style>
