<template>
  <div class="icon-box">
    <div class="icon-container">
      <div class="icon">
        <i class="iconfont" :class="icon"></i>
      </div>
      <h5 class="title">{{title}}</h5>
    </div>
    <p>{{content}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      title: String,
      content: String
    }
  }
</script>

<style lang="stylus" scoped>
.icon-box
  display: inline-block
  vertical-align: top
  width: 8rem
  padding: 0 1rem
  text-align: center
  .icon-container
    padding: 1rem
    color: #324157
    border-bottom: 1px solid #324157
    .icon
      i
        font-size: 3rem
    .title
        margin: 1rem 0 0 0
        font-size: 1.2rem
  p
    display: none
    font-size: 12px
  &:hover
    background: #eef1f6
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2)
    .icon-container
      border-bottom: 1px solid #eef1f6
    p
      display: block
</style>
