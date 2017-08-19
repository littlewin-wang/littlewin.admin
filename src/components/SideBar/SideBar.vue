<template>
  <el-menu default-active="1-4-1" theme="dark" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <!--<div class="avatar"></div>-->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  import SidebarItem from './components/SideBarItem.vue'
  export default {
    components: { SidebarItem },
    data () {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
//    computed: {
//      ...mapGetters([
//        'permission_routers',
//        'sidebar'
//      ]),
//      isCollapse() {
//        return !this.sidebar.opened
//      }
//    }
  }
</script>

<style lang="stylus" scoped>
  .avatar
    width: 100%
    height: 200px
    background: yellow

  .el-menu:not(.el-menu--collapse)
    min-width: 200px
</style>
