<template>
  <search-box style="background-color: #bd1919"></search-box>
  <view class="search" @click="handleSearchBoxClick"></view>
  <view class="category">
    <view class="category__item" v-for="(i, index) in categoryData"
          :class="{ active: currentCategoryIndex === index}"
          :key="i.name" @click="currentCategoryIndex = index"
    >
      {{ i.name }}
    </view>
  </view>
  <scroll-view scroll-y="true" class="categoryChild">
    <view class="categoryChild__title" v-for="i in categoryData[currentCategoryIndex].category" :key="i.name">
      <view class="categoryChild__item" v-for="item in i.item">
        <image :src="item.img" class="image" lazy-load="true"></image>
        <view class="title">{{ item.name }}</view>
      </view>
    </view>
  </scroll-view>
  <foot-menu checked="4"></foot-menu>
</template>

<script>
import FootMenu from '../basic/footMenu'
import SearchBox from '../search/search-box/search-box.vue'
import categoryData from '../../static/category.js'
import { ref } from 'vue'

export default {
  name: "category",
  components: {
    FootMenu,
    SearchBox
  },
  data: function() {
    return {
    }
  },
  setup: function (props, context) {
    console.log(props, context);
    const handleSearchBoxClick = function () {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    }
    const currentCategoryIndex = ref(0)
    return {
      handleSearchBoxClick,
      categoryData,
      currentCategoryIndex
    }
  }
}
</script>

<style scoped lang="scss">
  .search {
    height: 112rpx;
    width: calc(100% - 80rpx);
    background-color: #262828;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    opacity: 0;
  }
  .active {
    color: #323233;
    font-weight: bold;
    background-color: #fff;
    &::before {
      content: '';
      width: 4rpx;
      height: 100%;
      background-color: #ee0a24;
      float: left;
    }
  }
  .category {
    width: 136rpx;
    background-color: #f7f8fa;
    font-size: 28rpx;
    //height: 100vh;
    padding-bottom: 101rpx;
    overflow-y: scroll;
    &__item {
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      &::before {
        content: '';
        width: 4rpx;
        height: 100%;
        float: left;
      }
    }
  }
  .categoryChild {
    position: fixed;
    top: 112rpx;
    right: 0;
    width: calc(100vw - 136rpx);
    height: calc(100vh - 213rpx);
    &__title {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text-align: center;
    }
    &__item {
      width: 33%;
      height: 210rpx;
    }
    .image {
      width: 140rpx;
      height: 140rpx !important;
    }
    .title {
      font-size: 28rpx;
    }
  }
</style>