<template>
  <scroll-view :style="{ height: heightCss }" @scroll="scroll" >
    <slot></slot>
  </scroll-view>
  <view class="scrollTop">

  </view>
</template>

<script>
export default {
  name: "scrollTopContainer",
  props: {
    heightCss: {
      type: String,
      default: '0'
    }
  },
  emits: [
   "scroll"
  ],
  computed: {
    scroll (e) {
      this.$emit('scroll', e)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
