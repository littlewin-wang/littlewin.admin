<template>
  <div class="main-body">
    <div class="main-sidebar">
      <SideBar class="sidebar" :isCollapse="isCollapse" :user="user"></SideBar>
    </div>
    <div class="main-container">
      <div class="main-nav">
        <LHeader @collapse="handleCollapse" :user="user"></LHeader>
      </div>
      <div class="main-content">
        <div class="main-breadcrumb">
          <div class="title">
            全站设置
          </div>
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <router-view></router-view>
      </div>
      <div class="main-footer">
        <div class="copyright">
          © 2017 Littlewin.Admin
        </div>
        <div class="else">
          Create with
          <span class="red"> ❤ </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { routerMap } from '@/router'
import SideBar from '@/components/SideBar/SideBar.vue'
import LHeader from '@/components/Header/Header.vue'
import { mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['setRouteMap', 'getUser', 'getTags', 'getCategories', 'getArticles']),
    handleCollapse (isCollapse) {
      this.isCollapse = isCollapse
    }
  },
  mounted () {
    this.setRouteMap(routerMap)
    this.getUser()
    this.getTags({})
    this.getCategories()
    this.getArticles({})
  }
}
</script>

<style lang="stylus" scoped>
  .main-body
    display: flex
    position: relative
    width: 100%
    .main-sidebar
      bottom: 0
      background-color: #324157
      .sidebar
        height: 100%
    .main-container
      display: flex
      flex-direction: column
      bottom: 0
      position: relative
      flex: 1
      color: #324057
      .main-nav
        flex: 0 40px
        background: #bbb
      .main-content
        flex: 1
        padding: 0 30px
        .main-breadcrumb
          height: 40px
          .title
            display: inline-block
            float: left
            height: 100%
            line-height: 40px
          .breadcrumb
            display: inline-block
            float: right
            height: 100%
            .el-breadcrumb
              height: 100%
              line-height: 40px
      .main-footer
        flex: 0 40px
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
