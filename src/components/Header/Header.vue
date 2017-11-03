<template>
  <div class="header">
    <div class="header-collapse" @click="toggleCollapse()">
      <i v-if="!this.isCollapse" class="el-icon-d-arrow-left"></i>
      <i v-else class="el-icon-d-arrow-right"></i>
    </div>
    <div class="header-search">
      <el-input class="input" size="small" placeholder="Search for" icon="search" v-model="input2" :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <div class="header-info">
      <div class="info">
        <el-badge :value="12" class="item">
          <i class="el-icon-information"></i>
        </el-badge>
        <el-badge :value="3" class="item">
          <i class="el-icon-message"></i>
        </el-badge>
      </div>
      <el-dropdown class="avatar">
        <img :src="user.gravatar">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push({ path: '/site' })">个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="$router.push({ path: '/login' })">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    user: Object
  },
  data () {
    return {
      isCollapse: false,
      input2: ''
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('collapse', this.isCollapse)
    },
    handleIconClick (ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    height: 100%
    background: #eef1f6
    color: #324057
    .header-collapse
      display: inline-block
      vertical-align: top
      width: 40px
      height: 100%
      cursor: pointer
      i
        position: relative
        height: 100%
        &:before
          position: absolute
          top: 50%
          transform: translateY(-50%)
          padding: 0 10px

    .header-search
      display: inline-block
      vertical-align: top
      width: 300px
      padding: 5px 0

    .header-info
      float: right
      display: inline-block
      vertical-align: top
      height: 100%
      .info
        display: inline-block
        vertical-align: top
        padding: 10px
        .item
          margin-right: 30px
      .avatar
        display: inline-block
        position: relative
        height: 100%
        width: 40px
        img
          border-radius: 9999px
          height: 32px
          width: 32px
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
</style>
