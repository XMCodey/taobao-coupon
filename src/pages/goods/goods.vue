<template>
  <view class="topMenuContainer" style="position: fixed">
    <view class="menu__back icon_bgc">
      <uni-icons class="menu__back__icon" type="back" size="20" :color="topMenuIconColor"></uni-icons>
    </view>
    <view class="menu__text">
      <text class="menu__text__item" @click="() => { scrollTo }">商品</text>
      <text class="menu__text__item">推荐</text>
    </view>
    <view class="menu__childMenu  icon_bgc">
      <uni-icons class="menu__childMenu__icon" type="more" size="20" :color="topMenuIconColor"></uni-icons>
      <view class="menu__popups">
        <navigator class="menu__popups__item" v-for="i in [['首页', 'home'], ['搜索', 'search'], ['客服', 'chatbubble']]">
          <uni-icons :type="i[1]" :color="topMenuIconColor" class="menu__popups__item__icon"></uni-icons>
          <text class="menu__popups__item__text">{{ i[0] }}</text>
        </navigator>
      </view>
    </view>
  </view>
  <scroll-top-container heightCss="1002px" @scroll="scroll" >
    <view class="topMenuContainer"></view>
    32323
  </scroll-top-container>
  <view class="bottomMenuContainer">

  </view>
</template>

<script>
import {getCurrentInstance, ref} from "vue";
import ScrollTopContainer from "../basic/scrollTopContainer";

export default {
  name: "goods",
  components: {ScrollTopContainer},
  data() {

    return {

    }
  },
  onLoad(option) {
    console.log(option);
  },
  setup(props, context) {
    const internalInstance = getCurrentInstance()
    console.log(internalInstance);

    const scroll = function () {
      console.log('scroll');
    }

    const topMenuIconColor = ref('#fff')

    return {
      scroll,
      topMenuIconColor
    }
  }
}
</script>

<style lang="scss" scoped>
.topMenuContainer {
  .icon_bgc {
    width: 60rpx;
    height: 60rpx;
    background: rgba(0,0,0,.3);
    border-radius: 50%;
    text-align: center;
    line-height: 60rpx;
  }
  height: 90rpx;
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
  .menu__back {

    &__icon {
      line-height: 60rpx;
    }
  }

  .menu__text {
    font-size: 28rpx;
    &__item {

    }
  }

  .menu__childMenu {
    position: relative;
    &__icon {

    }

    .menu__popups {
      width: 240rpx;
      background-color: rgba(51,51,51,.9);
      border-radius: 10rpx;
      position: absolute;
      right: 0;
      top: 90rpx;

      &__item {
        &__icon {
          margin-right: 20rpx;
        }
        &__text {
          color: #ffffff;
          font-size: 32rpx;
        }
      }
    }
  }
}
</style>
