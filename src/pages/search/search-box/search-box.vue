<template >
  <view :class="{changeHeight: pullDownData, overflow: 'hidden'}" @click="clearPullDownData">
    <view class="search">
      <uni-icons type="left" size="20" class="search__back" @click=""></uni-icons>
      <uni-search-bar class="search__input" placeholder="支持搜索淘宝优惠" cancelButton="none"
                      v-model="searchValue"
                      @clear="clearPullDownData"
                      @confirm="search(), emitSearch(searchValue)"
                      :focus="false"
                      @focus="focusInput(input)"
                      @blur=""
                      @tap.stop=""
                      @input="input"
      >
      </uni-search-bar>
      <view class="search__button" @click="search(), emitSearch(searchValue)">搜索</view>
    </view>
    <view class="popupList container">
      <view @tap.stop="emitSearch(pullData[0])" v-for="pullData in pullDownData" :key="pullData[0]">
        <navigator :url="'detail?q=' + pullData[0]" :hover-stop-propagation="true" class="popupList__item"
        style="font-size: 28rpx;line-height: 84rpx;width: 100%;height: 84rpx;display: inline-block;color: #323233;border-bottom: 1px solid #ffefef;"
        >
          {{ pullData[0] }}
        </navigator>
      </view>
    </view>
    <view v-show="!pullDownData">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { setSearchBox, setPullDown } from "./search-box";

export default {
  name: "SearchBox",
  emits: ['search'],
  methods: {
    emitSearch (value) {
      this.$emit('search', value)
    }
  },
  setup(props, context) {

    const { search, searchValue, focusInput } = setSearchBox()

    const { pullDownData, input, clearPullDownData } = setPullDown()

    return {
      searchValue,
      search,
      input,
      pullDownData,
      clearPullDownData,
      focusInput
    }
  }
}
</script>

<style lang="scss" scoped>
  .changeHeight {
    height: 100vh;
  }
  .search {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background-color: #ffffff;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
    height: 112rpx;
    &__back {
      padding: 0 16rpx;
    }
    .uni-icons {
      font-size: 40rpx !important;
    }
    &__input {
      flex: 30;
    }
    &__button {
      padding: 0 16rpx;
      font-size: 28rpx;
    }
  }

  .containerSpace {
    height: 20rpx;
    background-color: #f6f6f6;
  }

  .container {
    padding: 0 20rpx;
    &__title {
      font-weight: 700;
      padding: 20rpx 0;
      line-height: 48rpx;
    }
  }

  .popupList {
    padding-top: 112rpx;
    background-color: #ffffff;
    //不知道为什么这个样式不编译出来，导致我直接写了个行内样式
    //&__item {
    //  font-size: 28rpx;
    //  line-height: 84rpx;
    //  height: 84rpx;
    //  display: inline-block;
    //  color: #323233;
    //  border-bottom: 1px solid #ffefef;
    //}
  }

  //不知道为什么这个样式不编译出来，导致我直接写了个行内样式
  //这样也不行
  //.popupList__item {
  //  font-size: 28rpx;
  //  line-height: 84rpx;
  //  height: 84rpx;
  //  width: 100%;
  //  display: inline-block;
  //  color: #323233;
  //  border-bottom: 1px solid #ffefef;
  //}

</style>
