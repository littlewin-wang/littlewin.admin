<template>
  <el-menu :default-active="route.path" theme="dark" router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <div class="sidebar-title">
      <div v-if="!isCollapse">
        <span>Littlewin</span> Admin
      </div>
      <span v-else>L</span>
    </div>
    <div class="sidebar-avatar" :class="{isCollapse: isCollapse}">
      <img :src="user.gravatar">
    </div>
    <div class="sidebar-info">
      <div class="name">{{user.username}}</div>
      <el-tooltip class="item" effect="dark" :content="user.slogan" placement="right">
        <div class="tongue">{{user.slogan}}</div>
      </el-tooltip>
    </div>
    <div class="sidebar-menu" v-for="routes in routerMap" v-if="routes.path==='/'">
      <div class="sidebar-menu-item" v-for="route in routes.children" v-bind:key="route.path">
        <el-submenu v-if="route.children" :index="route.meta.fullPath">
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span slot="title">{{route.name}}</span>
          </template>
          <el-menu-item :index="subRoute.meta.fullPath" v-for="subRoute in route.children" v-bind:key="subRoute.path">{{subRoute.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="route.meta.fullPath">
          <i :class="route.meta.icon"></i>
          <span slot="title">{{route.name}}</span>
        </el-menu-item>
      </div>
    </div>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    props: {
      isCollapse: Boolean,
      user: Object
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    computed: {
      ...mapGetters(['routerMap', 'route'])
    }
  }
</script>

<style lang="stylus" scoped>
  .sidebar-title
    width: 100%
    height: 40px
    line-height: 40px
    color: #F9FAFC
    font-size: 1.1rem
    font-weight: 300
    text-align: center
    cursor: pointer
    box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.5)
    span
      color: #13CE66

  .sidebar-avatar
    height: 140px
    position: relative
    width: 100%
    img
      border-radius: 9999px
      height: 100px
      width: 100px
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
    &.isCollapse
      img
        height: 50px
        width: 50px

  .sidebar-info
    margin: 4px 0
    color: #F9FAFC
    font-weight: 100
    text-align: center
    letter-spacing: 1px
    box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.5)
    .tongue
      width: 90%
      margin: 0 auto
      color: #99A9BF
      font-size: 12px
      height: 2rem
      line-height: 2rem
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

  .el-menu:not(.el-menu--collapse)
    width: 200px
</style>
