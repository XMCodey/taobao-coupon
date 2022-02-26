<template>
  <view class="topMenuContainer" style="position: fixed">
    <view class="menu__back">
      <uni-icons class="menu__back__icon" type="back"></uni-icons>
    </view>
    <view class="menu__text">
      <text class="menu__text__item" @click="() => { scrollTo }">商品</text>
      <text class="menu__text__item">推荐</text>
    </view>
    <view class="menu__childMenu">
      <uni-icons class="menu__childMenu__icon" type="more"></uni-icons>
      <view class="menu__popups">
        <navigator class="menu__popups__item" v-for="i in [['首页', 'home'], ['搜索', 'search'], ['客服', 'chatbubble']]">
          <uni-icons :type="i[1]" class="menu__popups__item__icon"></uni-icons>
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
import {getCurrentInstance} from "vue";
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
    return {
      scroll
    }
  }
}
</script>

<style lang="scss" scoped>
.topMenuContainer {
  height: 90rpx;
  padding: 0 20rpx;
}
</style>
