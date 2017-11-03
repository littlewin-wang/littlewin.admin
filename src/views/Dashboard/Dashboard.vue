<template>
  <div class="dashboard">
    <div class="icon-container">
      <IconBox :icon="'icon-work'" :title="`${articles} 篇`" :content="`目前已撰文${articles}篇 - 人当自勉，坚持行文`"></IconBox>
      <IconBox :icon="'icon-comment'" :title="`${comments} 条`" :content="`目前共获评${comments}条 - 劳谦虚己，则附之者众`"></IconBox>
      <IconBox :icon="'icon-love'" :title="`${likes} 次`" :content="`目前共收集获赞${likes}次 - 一节复一节,千枝攒万叶`"></IconBox>
      <IconBox :icon="'icon-user'" :title="`${links} 人`" :content="`目前共外链${links} 人 - 集思广益，博采众长`"></IconBox>
      <IconBox :icon="'icon-coding'" :title="server==='RUNNING'?'运行正常':'运行异常'" :content="server==='RUNNING'?'目前服务器端运行正常 - 请做好定期备份':'目前服务器运行异常，请登录检查'"></IconBox>
    </div>

    <div class="card-container">
      <div class="card-box-container">
        <div class="card-box">
          <h5 class="title">
            热门文章
          </h5>
          <div class="content">
            <ul>
              <li v-for="(h, index) in hotArticles" :key="index">
                <div class="thumb">
                  <img :src="h.thumb" :title="h.title">
                </div>
                <div class="title">
                  <h5>
                    <a target="_blank" rel="external nofollow" :href="`https://littlewin.wang/article/${h.id}`">
                      {{h.title}}
                    </a>
                  </h5>
                  <span>{{new Date(h.createAt).toLocaleDateString()}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-box-container">
        <div class="card-box">
          <h5 class="title">
            热门评论
          </h5>
          <div class="content">
            <ul>
              <li v-for="(h, index) in hotComments" :key="index">
                <div class="author-avatar">
                  <img :src="gravatar(h.author.email) || '@/assets/anonymous.jpg'" :title="h.author.name">
                </div>
                <div class="comment">
                  <h5>
                    <a target="_blank" rel="external nofollow" :href="`https://littlewin.wang/${h.postID === 0 ? 'guest#comment-item-'.concat(h.id) : 'article/'.concat(h.postID).concat('#comment-item-').concat(h.id)}`">
                      {{h.author.name}}: {{h.content}}
                    </a>
                  </h5>
                  <span>{{new Date(h.createAt).toLocaleDateString()}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-box-container">
        <div class="card-box">
          <h5 class="title">
            服务器情况
          </h5>
          <div class="content">
            <div class="stat-box">
              <h5>CPU负载</h5>
              <el-progress class="stat" type="circle" :percentage="cpu"></el-progress>
            </div>
            <div class="stat-box">
              <h5>内存可用</h5>
              <el-progress class="stat" type="circle" :percentage="mem"></el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBox from './components/IconBox'
import API from '@/api/index'
import gravatar from 'gravatar'

export default {
  data () {
    return {
      articles: 0,
      comments: 0,
      likes: 0,
      links: 0,
      server: 'DOWN',
      hotArticles: [],
      hotComments: [],
      cpu: 0,
      mem: 0,
      // 邮箱和地址校验正则
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      }
    }
  },
  components: {
    IconBox
  },
  methods: {
    // 头像服务
    gravatar (email) {
      if (!this.regexs.email.test(email)) {
        return null
      }
      let gravatarUrl = gravatar.url(email, {
        protocol: 'https'
      })
      return gravatarUrl
    }
  },
  mounted () {
    API.GetArticleListAPI({ limit: 1000 }).then(res => {
      res.data.data.articles.map(a => {
        this.likes += a.meta.likes
      })
      this.hotArticles = res.data.data.articles.sort((a, b) => (b.meta.views - a.meta.views)).slice(0, 5)
      this.articles = res.data.data.total
    })

    API.GetCommentListAPI({}).then(res => {
      res.data.data.comments.map(a => {
        if (a.author.name === 'littlewin') {
          this.likes += a.likes
        } else {
          this.comments += 1
        }
      })
      this.hotComments = res.data.data.comments.sort((a, b) => (b.likes - a.likes)).slice(0, 5)
    })

    API.SiteInfoAPI().then(res => {
      this.likes += res.data.data.site.meta.likes
      this.links = res.data.data.site.links.length
    })

    API.ServerStatAPI().then(res => {
      this.server = 'RUNNING'
      this.cpu = res.data.data.cpu.cpuUsage
      this.mem = res.data.data.mem.memInfo.freeMemPercentage
    })
  }
}
</script>

<style lang="stylus" scoped>
.dashboard
  .icon-container
    height: 200px
    padding: 1rem
    display: flex
    justify-content: space-between

  .card-container
    padding: 1rem
    display: flex
    justify-content: space-between
    .card-box-container
      width: 30%
      .card-box
        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2)
        >.title
          margin: 0
          height: 2rem
          line-height: 2rem
          background: #eef1f6
          font-size: 1rem
          text-align: center
        .content
          padding: .5rem
          ul
            list-style: none
            margin: 0
            padding: 0
            li
              display: flex
              margin-top: .5rem
              .thumb
                flex: 0 0 80px
                img
                  width: 100%
              .author-avatar
                flex: 0 0 50px
                img
                  width: 100%
              .title
                padding-left: 1rem
                flex: 1 1 auto
                font-size: 14px
                h5
                  margin: .2rem 0 .5rem 0
                  a
                    font-size: 14px
                    color: #324057
                    text-decoration: none
                  &:hover
                    text-decoration: underline
                    transform: translateX(.5rem)
              .comment
                padding-left: 1rem
                flex: 1 1 auto
                font-size: 14px
                h5
                  margin: .2rem 0 .5rem 0
                  a
                    font-size: 14px
                    color: #324057
                    text-decoration: none
              &:hover
                background: #eef1f6
          .stat-box
            text-align: center
            h5
              margin: 1rem 0
</style>
