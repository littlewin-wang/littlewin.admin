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
        <el-dropdown class="item" :hide-on-click="false">
          <el-badge :value="notReadCount" style="cursor:pointer">
            <i class="el-icon-information" style="font-size:16px"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(e, index) in events" :key="index" class="event-item" :class="{active: !readList.includes(e.id)}" @click.native="handleRead(e.id)">
              <h5>{{eventTranslate(e.person, e.action, e.target.type)}}</h5>
              <span>{{new Date(e.createAt).toLocaleString()}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    user: Object,
    events: Array
  },
  data () {
    return {
      isCollapse: false,
      input2: '',
      readList: JSON.parse(localStorage.getItem('readEvent')) || []
    }
  },
  computed: {
    notReadCount () {
      let count = 0
      this.events.map(e => {
        if (!this.readList.includes(e.id)) {
          count += 1
        }
      })
      return count
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('collapse', this.isCollapse)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    handleRead (id) {
      if (!(this.readList).includes(id)) {
        this.readList.push(id)
        localStorage.setItem('readEvent', JSON.stringify(this.readList))
      }
    },
    eventTranslate (person, action, target) {
      let actionZh = ''
      let targetZh = ''

      if (action === 'NEW') {
        actionZh = '新建'
      } else if (action === 'MODIFY') {
        actionZh = '修改'
      } else if (action === 'MODIFYLIST') {
        actionZh = '批量修改'
      } else if (action === 'DELETE') {
        actionZh = '删除'
      } else if (action === 'DELETELIST') {
        actionZh = '批量删除'
      } else if (action === 'LIKE') {
        actionZh = '喜欢'
      } else {
        actionZh = action
      }

      if (target === 'ARTICLE') {
        targetZh = '文章'
      } else if (target === 'CATEGORY') {
        targetZh = '分类'
      } else if (target === 'TAG') {
        targetZh = '标签'
      } else if (target === 'SITE') {
        targetZh = '本站'
      } else if (target === 'COMMENT') {
        targetZh = '评论'
      } else {
        targetZh = target
      }

      return `${(person === 'Admin' || person === 'ADMIN') ? '小主人' : person} ${actionZh} ${targetZh}`
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

  .event-item
    margin: .5rem 1rem
    border-left: 2px solid #e5e8ee
    h5
      height: 1.2rem
      margin: 0 0 .2rem 0
      font-size: .9rem
      font-weight: normal
    span
      font-size: .8rem
      color: #888
    &.active
      background-color: #e4e8f1
</style>
