<template>
  <view class="topMenuContainer" style="position: fixed" :style="{'background-color': topMenuContainerCss.backgroundColor}">
    <navigator hover-class="none" open-type="navigateBack" class="menu__back icon_bgc" :style="{ backgroundColor: topMenuContainerCss.iconBackgroundColor }">
      <uni-icons class="menu__back__icon" type="back" size="20" :color="topMenuContainerCss.iconColor"></uni-icons>
    </navigator>
    <view class="menu__text">
      <view class="menu__text__item" :class="{ active: true }" @click="() => { scrollTo }">商品</view>
      <view class="menu__text__item">推荐</view>
    </view>
    <view class="menu__childMenu  icon_bgc" :style="{ backgroundColor: topMenuContainerCss.iconBackgroundColor }">
      <uni-icons class="menu__childMenu__icon" @click="changeShowChildMenu" type="more-filled" size="20" :color="topMenuContainerCss.iconColor"></uni-icons>
      <view v-show="showChildMenu" class="menu__popups" :style="{ 'background-color': topMenuContainerCss.backgroundColor }">
        <navigator class="menu__popups__item" v-for="i in [['首页', 'home'], ['搜索', 'search'], ['客服', 'chatbubble']]" hover-class="none">
          <uni-icons :type="i[1]" :color="topMenuContainerCss.iconColor" class="menu__popups__item__icon"></uni-icons>
          <text class="menu__popups__item__text" :style="{ color: topMenuContainerCss.iconColor}">{{ i[0] }}</text>
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
import {getCurrentInstance, reactive, ref} from "vue";
import ScrollTopContainer from "../basic/scrollTopContainer";

export default {
  name: "goods",
  components: { ScrollTopContainer },
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

    const topMenuContainerCss = reactive({
      iconColor: 'rgb(51 51 51)',
      backgroundColor: 'rgb(255,255,255)',
      iconBackgroundColor: 'rgba(0,0,0,0)'
    })

    const showChildMenu = ref(false)

    const changeShowChildMenu = function () {
      showChildMenu.value = !showChildMenu.value
    }
    return {
      scroll,
      topMenuContainerCss,
      changeShowChildMenu,
      showChildMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.topMenuContainer {
  z-index: 999;
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
      margin: 0 59.5rpx;
      height: 90rpx;
      line-height: 90rpx;
      display: inline-block;
      position: relative;
    }
    .active:after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 2px;
      background-color: #fd4546;
      position: absolute;
      bottom: 12rpx;
      left: 0;
    }
  }

  .menu__childMenu {
    position: relative;
    &__icon {

    }

    .menu__popups {
      &:before {
        content: '';
        position: absolute;
        border-bottom: 14rpx #ffeeee solid;
        border-left: 14rpx transparent solid;
        border-right: 14rpx transparent solid;
        border-top: none;
        top: -14rpx;
        right: 20rpx;
        transform: translateX(5rpx);
      }
      width: 240rpx;
      background-color: rgba(51,51,51,.9);
      border-radius: 10rpx;
      position: absolute;
      right: 0;
      top: 76rpx;
      box-sizing: border-box;
      border: 1px solid #ffeeee;
      &__item {
        height: 90rpx;
        width: 220rpx;
        line-height: 90rpx;
        border-bottom: 1rpx solid #ffeeee;
        margin: 0 auto;
        &__icon {
          margin-right: 20rpx;
        }
        &__text {
          color: #ffffff;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
