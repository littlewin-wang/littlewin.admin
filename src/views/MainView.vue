<template>
  <div class="main-body">
    <div class="main-sidebar">
      <SideBar></SideBar>
    </div>
    <div class="main-container">
      <div class="main-nav"></div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from '@/components/SideBar/SideBar.vue'
  export default {
    components: { SideBar }
  }
</script>

<style lang="stylus" scoped>
  .main-body
    display: flex
  .main-sidebar
    background: #777
    height: 100vh
  .main-container
    position: relative
    flex: 1
    height: 100vh
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
