<template>
  <scroll-view :style="style" :scroll-top="scrollTop" @scroll="scroll" scroll-y="true">
    <slot></slot>
  </scroll-view>
  <view class="scrollTop" @tap="goTop" :class="{ show: showGoTopButton }">
    <uni-icons type="top" size="22"></uni-icons>
      顶部
  </view>
</template>

<script>
export default {
  name: "scrollTopContainer",
  props: {
    style: {
      type: Object,
      default: ''
    }
  },
  emits: [
   "scroll"
  ],
  data () {
    return {
      showGoTopButton: false,
      scrollTop: 0,
      old: {
        scrollTop: 0
      }
    }
  },
  methods: {
    scroll (e) {
      if (e.detail.scrollTop > 500) {
        this.showGoTopButton = true
      } else {
        this.showGoTopButton = false
      }
      this.old.scrollTop = e.detail.scrollTop
      this.$emit('scroll', e)
    },
    goTop (e) {
      this.scrollTop = this.old.scrollTop
      this.$nextTick(() => {
        this.scrollTop = 0
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .scrollTop {
    transition: opacity .5s, bottom 1.2s;
    display: flex;
    flex-direction: column;
    width: 80rpx;
    height: 80rpx;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    right: 30rpx;
    bottom: -150rpx;
    z-index: 99;
    font-size: 24rpx;
    box-shadow: 0 4rpx 16rpx 0 rgb(0 0 0 / 18%);
    align-items: center;
    justify-content: center;
    opacity: 0;
    :last-child {
      line-height: 22rpx;
    }
  }
  .show {
    bottom: 150rpx;
    opacity: 1;
    transition: opacity 1.2s, bottom .5s;
  }
</style>
