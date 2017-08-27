<template>
  <div class="tags-container">
    <el-tag class="tag" v-for="tag in tagsList" v-bind:key="tag._id" :type="getType(tag._id)" @click.native="handleClick(tag._id)">{{tag.name}}</el-tag>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    tag: Array,
    tagsList: Array
  },
  methods: {
    getType (id) {
      return (this.tag && this.tag.indexOf(id) !== -1) ? '' : 'gray'
    },
    handleClick (id) {
      let selected = this.tag
      selected.remove = function (val) {
        let index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }

      if (this.getType(id) === '') {
        selected.remove(id)
      } else {
        selected.push(id)
      }

      this.$emit('select', selected)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tag
    cursor: pointer
    margin: 2px 4px
</style>
