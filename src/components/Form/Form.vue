<template>
  <div class="form">
    <div class="form-header">
      {{title}}
    </div>
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="120px">
        <el-form-item v-for="(value, key) in formData" v-bind:key="key" :label="value.label" :prop="key">
          <el-select v-model="form[key]" :placeholder="value.placeholder" filterable clearable v-if="value.type==='select'">
            <el-option v-for="option in value.options" v-bind:key="option.label" :label="option.name" :value="option._id"></el-option>
          </el-select>
          <Avatar v-else-if="value.type==='avatar'" :url="form[key]" @upload="handleUpload"></Avatar>
          <el-input :type="value.type" :rows=4 v-model="form[key]" :disabled="['_id','id'].indexOf(key)!==-1" v-else></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.naive="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Avatar from '@/components/Avatar/Avatar.vue'

  export default {
    components: {
      Avatar
    },
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
      handleUpload (data) {
        let baseUrl = 'http://7xpot0.com1.z0.glb.clouddn.com/'
        this.$set(this.form, 'gravatar', baseUrl + data.key)
      },
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
      title () {
        this.formatForm()
      },
      formData () {
        this.formatForm()
      }
    },
    mounted () {
      this.formatForm()
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
