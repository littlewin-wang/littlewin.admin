<template>
  <div class="dashboard">
    <div class="icon-container">
      <IconBox :icon="'icon-work'" :title="`${articles} 篇`" :content="`目前已撰文${articles}篇 - 人当自勉，坚持行文`"></IconBox>
      <IconBox :icon="'icon-comment'" :title="`${comments} 条`" :content="`目前共获评${comments}条 - 劳谦虚己，则附之者众`"></IconBox>
      <IconBox :icon="'icon-love'" :title="`${likes} 次`" :content="`目前共收集获赞${likes}次 - 一节复一节,千枝攒万叶`"></IconBox>
      <IconBox :icon="'icon-user'" :title="`${links} 人`" :content="`目前共外链${links} 人 - 集思广益，博采众长`"></IconBox>
      <IconBox :icon="'icon-coding'" :title="'运行正常'" :content="'目前服务器端运行正常 - 请做好定期备份'"></IconBox>
    </div>
  </div>
</template>

<script>
  import IconBox from './components/IconBox'
  import API from '@/api/index'

  export default {
    data () {
      return {
        articles: 0,
        comments: 0,
        likes: 0,
        links: 0,
        server: 'RUNNING'
      }
    },
    components: {
      IconBox
    },
    mounted () {
      API.GetArticleListAPI({limit: 1000}).then(res => {
        res.data.data.articles.map(a => {
          this.likes += a.meta.likes
        })
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
      })

      API.SiteInfoAPI().then(res => {
        this.links = res.data.data.site.links.length
      })
    }
  }
</script>

<style lang="stylus" scoped>
.dashboard
  .icon-container
    padding: 1rem 2rem
    display: flex
    justify-content: space-between
</style>
