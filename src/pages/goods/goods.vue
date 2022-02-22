<template>
  <view class="topMenuContainer" style="position: fixed">
    <view class="menu__back">
      <uni-icons class="menu__back__icon"></uni-icons>
    </view>
    <view class="menu__text"></view>
    <view class="menu__childMenu">
      <uni-icons class="menu__childMenu__icon"></uni-icons>
      <view class="menu__popups">
        <navigation class="menu__popups__item" v-for="i in [['首页', 323], ['搜索', 3232], ['客服', 3232]]">
          <uni-icons :type="i[1]" class="menu__popups__item__icon"></uni-icons>
    <text class="menu__popups__item__text">{{ i[0] }}</text>
        </navigation>
      </view>
    </view>
  </view>
  <scroll-top-container heightCss="100px" @scroll="scroll" >
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
