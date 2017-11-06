<template>
  <div class="form">
    <div class="form-header" v-if="title">
      {{title}}
    </div>
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="120px">
        <el-form-item v-for="(value, key) in formData" v-bind:key="key" :label="value.label" :prop="key">
          <el-select v-model="form[key]" :placeholder="value.placeholder" filterable clearable v-if="value.type==='select'">
            <el-option v-for="option in value.options" v-bind:key="option._id" :label="option.name" :value="option._id"></el-option>
          </el-select>
          <Avatar ref="avatar" v-else-if="value.type==='avatar'" :url="form[key]" :token="value.token" @changeName="handleChangeName"></Avatar>
          <Tags v-else-if="value.type==='tag'" :tag="form[key]" :tagsList="value.default" :update="value.update" @select="handleSelect"></Tags>
          <markdown-editor v-else-if="value.type==='markdown'" v-model="form[key]" :configs="value.configs" preview-class="markdown-body" @input="handleInput"></markdown-editor>
          <el-input :type="value.type" :rows=4 v-model="form[key]" :disabled="['_id','id'].indexOf(key)!==-1" v-else></el-input>
        </el-form-item>
        <el-form-item v-if="!noSubmit">
          <el-button type="primary" @click.native="submitForm('form')" style="width:100%">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Avatar from '@/components/Avatar/Avatar.vue'
import Tags from '@/components/Tags/Tags.vue'

export default {
  components: {
    Avatar,
    Tags
  },
  props: {
    title: String,
    formData: Object,
    noSubmit: Boolean
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
    handleChangeName (name) {
      if ('gravatar' in this.form) {
        this.$set(this.form, 'gravatar', this.formData['gravatar'].token.prefixURL + this.formData['gravatar'].token.Bucket + '/' + name)
      }

      if ('thumb' in this.form) {
        this.$set(this.form, 'thumb', this.formData['gravatar'].token.prefixURL + this.formData['gravatar'].token.Bucket + '/' + name)
      }
    },
    handleSelect (data) {
      this.$set(this.form, 'tag', data)
    },
    handleInput (data) {
      localStorage.setItem('new_content', data)
    },
    formatForm () {
      for (let key in this.formData) {
        this.$set(this.form, key, this.formData[key]['val'])
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.avatar) {
            this.$emit('imageSync', this.$refs.avatar[0].dataUrl)
          }

          this.$emit('confirm', this.form)
          // this.formatForm()
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
    formData: {
      handler: function () {
        this.formatForm()
      },
      deep: true
    }
  },
  mounted () {
    this.formatForm()
  }
}
</script>

<style lang="stylus" scoped>
</style>
