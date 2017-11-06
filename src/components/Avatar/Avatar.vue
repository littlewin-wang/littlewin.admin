<template>
  <div class="avatar-uploader">
    <VueImgInputer ref="image" v-model="file" accept="image/*" :imgSrc="url" @onChange="fileChange"></VueImgInputer>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    url: String,
    token: Object
  },
  data () {
    return {
      file: null
    }
  },
  computed: {
    dataUrl () {
      return this.$refs.image.dataUrl
    }
  },
  methods: {
    fileChange (file, name) {
      this.$emit('changeName', name)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
