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
        <router-view></router-view>
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
    .main-nav
      height: 40px
      background: #bbb
    .main-content
      position: absolute
      top: 40px
      right: 0
      bottom: 0
      left: 0
      background: #999
</style>
