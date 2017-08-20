<template>
  <div class="main-body">
    <div class="main-sidebar">
      <SideBar class="sidebar" :isCollapse="isCollapse"></SideBar>
    </div>
    <div class="main-container">
      <div class="main-nav">
        <LHeader @collapse="handleCollapse"></LHeader>
      </div>
      <div class="main-content">
        <div class="main-breadcrumb"></div>
        <router-view></router-view>
      </div>
      <div class="main-footer">
        <div class="copyright">
          © 2017 Littlewin.Admin
        </div>
        <div class="else">
          Create with <span class="red"> ❤ </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from '@/components/SideBar/SideBar.vue'
  import LHeader from '@/components/Header/Header.vue'
  export default {
    components: {
      SideBar,
      LHeader
    },
    data () {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleCollapse (isCollapse) {
        this.isCollapse = isCollapse
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main-body
    display: flex
    position: relative
    height: 100%
    width: 100%
  .main-sidebar
    background: #777
    min-height: 100vh
    .sidebar
      height: 100%
  .main-container
    position: relative
    flex: 1
    background: #475669
    color: #F9FAFC
    .main-nav
      height: 40px
      background: #bbb
    .main-content
      position: absolute
      top: 40px
      right: 0
      bottom: 40px
      left: 0
      padding: 0 30px
    .main-footer
      position: absolute
      bottom: 0
      left: 0
      right: 0
      height: 40px
      padding: 0 30px
      font-size: 14px
      font-weight: 300
      .copyright
        display: inline-block
        float: left
        height: 100%
        line-height: 40px
      .else
        display: inline-block
        float: right
        height: 100%
        line-height: 40px
        .red
          color: #e54e53
</style>
