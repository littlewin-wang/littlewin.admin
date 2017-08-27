<template>
  <el-upload
    class="avatar-uploader"
    action="http://up-z0.qiniu.com"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :data="postData">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      url: String
    },
    data () {
      return {
        postData: {
          token: '-rQlXW3eYxSuLxyJJfBWDAuYVB3VMMEvpT7DcHUI:D5H_gepHofw--NJmMKl7JKypoJc=:eyJzY29wZSI6ImxpdHRsZXdpbiIsImRlYWRsaW5lIjoxNTAzODA0Mjc4fQ=='
        }
      }
    },
    computed: {
      imageUrl () {
        return this.url
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.$emit('upload', res)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
