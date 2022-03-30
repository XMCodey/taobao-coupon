<!--父组件必须有onPageScroll生命周期-->
<template>
  <view >
    <slot></slot>
  </view>
  <view class="scrollTop" @tap="goTop" :class="{ show: showGoTopButton }">
    <uni-icons type="top" size="22" class="scrollTop__icon"></uni-icons>
      顶部
  </view>
</template>

<script>
export default {
  name: "scrollTop",
  onPageScroll(object) {
    if (object.scrollTop > 500) {
      this.showGoTopButton = true
    } else {
      this.showGoTopButton = false
    }
  },
  data () {
    return {
      showGoTopButton: false,
    }
  },
  methods: {
    goTop () {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
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
    position: fixed;
    right: 30rpx;
    bottom: -150rpx;
    z-index: 99;
    font-size: 24rpx;
    box-shadow: 0 4rpx 16rpx 0 rgb(0 0 0 / 18%);
    align-items: center;
    justify-content: center;
    opacity: 0;
    &__icon {
      line-height: 22rpx;
    }
  }
  .show {
    bottom: 150rpx;
    opacity: 1;
    transition: opacity 1.2s, bottom .5s;
  }
</style>
