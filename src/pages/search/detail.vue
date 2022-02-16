<template>
  <search-box>
    <view class="sort">
      <view v-for="(item, index) in ['人气', '销量', '价格']" :key="item"
            @click="changeSort(index)"
            :class="{ active: presentSort === index, sort__price: item === '价格'}"
      >
        {{ item }}
        <template v-if="item === '价格'">
          <view class="sort__price__container" :class="presentPriceClass">
            <view class="sort__price__upIcon"></view>
            <view class="sort__price__downIcon"></view>
          </view>
        </template>
      </view>
    </view>
    <view style="height: 80rpx;"></view>
    <scroll-view scroll-y="true" show-scrollbar="true" class="goods" lower-threshold="50" @scrolltolower="scrollToLower">
      <view style="height: 16rpx;background-color: rgb(246, 246, 246);"></view>
      <view class="goods__item" v-for="i in [,,,,,,,,,]">
        <image mode="widthFix" lazy-load="true" src="https://img.alicdn.com/bao/uploaded/i1/522723912/O1CN01xA9Y8H1elk7xHi77u_!!522723912.jpg_310x310.jpg" class="goods__item__img"></image>
        <view class="goods__item__contentContainer">
          <view class="goods__titleContainer">
            <view class="goods__titleContainer__title">
              <image mode="widthFix" src="data:image/png;base64,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" class="goods__titleContainer__icon"></image>
              32寸144hz40寸2k高清曲面屏显示器
            </view>
          </view>
          <view class="goods__price">
            <view class="goods__price__left">
              <text class="goods__price__text">券后</text>
              <text class="goods__price__rmb">￥</text>
              <text class="goods__price__value">555</text>
            </view>
            <view class="goods__price__right">
              <text class="goods__price__coupon">券</text>
              25元
            </view>
          </view>
          <view class="goods__volume">
            <view class="goods__volume__left">
              <text class="goods__volume__text">重庆诚信电333333333器</text>
              &nbsp;
              <uni-icons type="right" size="24rpx" color="#888" style="transform: translateY(2rpx)"></uni-icons>
            </view>
            <text class="goods__volume__right">
              已售300
            </text>
          </view>
        </view>
      </view>
    </scroll-view>
  </search-box>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from "vue";
import { getSearchItem } from "../../network/search";
import searchBox from "./search-box/search-box.vue";

export default {
  name: "index",
  components: {
    searchBox
  },
  data () {
    return {
      q: ''
    }
  },
  onLoad: function (option) {
    console.log(option);
    // 读取url
    this.q = option.q
  },
  setup(props, content) {
    let q = ''
    let params = { material_id: 17004, q: '', has_coupon: true, sort: '' }
    // 获取当前实例，实例可以读到data里到数据
    const internalInstance = getCurrentInstance()
    onMounted(() => {
      q = internalInstance.data.q
      params.q = q
      // getSearchItem(params).then((r,e) => {
      //   console.log(e);
      //   console.log(r.data.tbk_dg_material_optional_response.result_list.map_data);
      // })
      // console.log("search-detail----" + q);
    })


    const presentSort = ref(null)
    const presentPriceClass = ref(null)

    const changeSort = function (index) {
      if (index === 2) {
        if (presentPriceClass.value === null) {
          presentSort.value = index
          presentPriceClass.value = 'sort__price__up'
        } else if (presentPriceClass.value === 'sort__price__down') {
          presentPriceClass.value = 'sort__price__up'
        } else if (presentPriceClass.value === 'sort__price__up') {
          presentPriceClass.value = 'sort__price__down'
        }
      } else if (presentSort.value === index) {
          return;
      } else {
        presentSort.value = index
        presentPriceClass.value = null
      }
      console.log(index);
    }

    const scrollToLower = function (e) {
      console.log(e);
      console.log(32323232323);
    }

    return {
      changeSort,
      presentSort,
      presentPriceClass,
      scrollToLower,
    }
  }
}
</script>

<style scoped lang="scss">
  .sort {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    font-size: 24rpx;
    color: #646566;
    height: 80rpx;
    position: fixed;
    width: 100%;
    background: #ffffff;
    z-index: 1;
    .active {
      color: rgb(254, 55, 56);
      transition: all 1s ease-out;
    }
    &__price {
      display: flex;
      justify-content: space-around;
      align-items: center;
      &__container {
        margin-left: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 30rpx;

      }
      &__down &__downIcon{
        border-top-color: black;
      }
      &__up &__upIcon {
        border-bottom-color: black;
      }
      &__upIcon{
        border-bottom: 12rpx solid #d8d8d8;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
        transition: all .6s ease-out;

      }
      &__downIcon{
        border-top: 12rpx solid #d8d8d8;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
        transition: all .6s ease-out;

      }
    }
  }
  .goods {
    height: calc(100vh - 192rpx);
    &__item {
      display: flex;
      justify-content: space-around;
      padding: 14rpx;
      border-bottom: #f5f5f5 2rpx solid;
      &__img {
        border-radius: 10px;
        width: 244rpx;
      }
      &__contentContainer {
        display: flex;
        flex-direction: column;

      }
    }
    &__titleContainer {
      min-height: 76rpx;
      width: 454rpx;
      flex: 1;
      &__icon {
        width: 26rpx;
        vertical-align: center;
        transform: translateY(3rpx);
      }
      &__title {
        display: inline-block;
        width: 426rpx;
        color: #333;
        font-size: 28rpx;
      }
    }
    &__price {
      font-size: 24rpx;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__left {

      }

      &__text {
        color: #666;
        font-size: 24rpx;

      }
      &__rmb {
        color: #ff2b22;
        font-size: 24rpx;
      }
      &__value {
        color: #ff2b22;
        font-size: 36rpx;
      }

      &__right {
        color: #ffffff;
        background: linear-gradient(
                90deg
            ,#ff8873,#ff4f4f);
        border: 1px solid red;
        border-radius: 2px;
        padding: 0 5rpx 0 0;
        line-height: 34rpx;

      }
      &__coupon {
        color: #fe3a33;
        background: #ffffff;
        padding: 0 5rpx;
        margin-right: 5rpx;
      }
    }
    &__volume {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12rpx;

      &__left {
        background: #f4f4f4;
        font-size: 24rpx;
        color: #888;
        padding: 4rpx 10rpx;
        border-radius: 8px;
        display: flex;
        align-items: center;
      }
      &__text {
        max-width: 172rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &__right {
        font-size: 24rpx;
        color: #888;
      }
    }
  }
</style>
