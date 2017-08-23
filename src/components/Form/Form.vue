<template>
  <div class="form">
    <div class="form-header">
      {{title}}
    </div>
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="120px">
        <el-form-item v-for="(value, key) in formData" v-bind:key="key" :label="value.label" :prop="key">
          <el-input :type="value.type" :rows=4 v-model="form[key]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.naive="submitForm('form')">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String,
      formData: Object
    },
    data () {
      return {
        form: {}
      }
    },
    computed: {
      rules () {
        let rules = {}
        for (let key in this.formData) {
          rules[key] = this.formData[key]['rule']
        }
        return rules
      }
    },
    methods: {
      formatForm () {
        for (let key in this.formData) {
          this.$set(this.form, key, this.formData[key]['val'])
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('confirm', this.form)
            this.formatForm()
          } else {
            this.$message.error('输入有错哦')
            return false
          }
        })
      }
    },
    watch: {
      formData () {
        console.log(1)
        this.formatForm()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .form
    background: #eef1f6
    .form-header
      padding-left: 1rem
      height: 40px
      line-height: 40px
      background: #99A9BF
      border-radius: 4px 4px 0 0
    .form-content
      padding: 20px 20px 10px 20px
</style>
