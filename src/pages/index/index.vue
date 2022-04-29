<template>
  <view class="head">
    <view @click="goSearchPage" class="search">
      <uni-search-bar cancelButton="none"></uni-search-bar>
    </view>
    <view @click="goSearchPage" class="" style="opacity: 0;">
      <uni-search-bar cancelButton="none"></uni-search-bar>
    </view>
    <view class="search_help">
      <text class="search_help__left">三步查券</text>
      <text class="search_help__number">1</text>进入淘宝<text class="search_help__number">2</text>复制商品标题<text class="search_help__number">3</text>粘贴搜索<navigator url="/" class="search_help__right">攻略</navigator>
    </view>
  </view>
  <view class="head_category_container">
    <view class="head_category">
      <view class="head_category__item" v-for="item in [0,1,2,3,4]" :key="headCategoryData.data.icons[item].title">
        <image class="head_category__icon" :src="headCategoryData.data.icons[item].img"></image>
        <navigator url="/" class="head_category__title">{{ headCategoryData.data.icons[item].title }}</navigator>
      </view>
    </view>
    <view class="head_category">
      <view class="head_category__item" v-for="item in [0,1,2,3,4]" :key="headCategoryData.data.small_icons[item].title">
        <image class="head_category__icon" :src="headCategoryData.data.small_icons[item].img"></image>
        <navigator url="/" class="head_category__title">{{ headCategoryData.data.small_icons[item].title }}</navigator>
      </view>
    </view>
  </view>
  <view class="content">
    <view class="hot_sell">
      <view class="hot_sell__title">
        <view class="title">全网热销榜</view>
        <view class="hot_sell__desc">
          <image class="hot_sell__desc__icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAASJJREFUOE+V08suBFEQxvHfGZcFVgQrli6ReBEh8RJsWHgSCzY8hsSLSMRlZ6xIWBkLl2mpntPSaY1MJ93pc6rqX199JydpPAWdRL9gCyc5vJs4q2L1ktQExLpgDBdYyfFrrCfem/mpIKWypvxU3SfwiMlc0MN8olfPj1ipoGA8L97yug0wl3jN8bIuGoeCTRxiBHuJ84IpPCBA8UThbADqPpRqCrpYyIm3WDVQ9NQGaCoOQH8whQ5i1pkMe24AwoOXgg0c4xMHFaDyI6RO/wIIcHh0haWccx+A6B5vGPMXoALHaHE6obz0YFhANVp59MOM0BytFVA3sZIajdr2vwF3WMym3GAt/19i+Z/9boywjSOMYicuTT7rH5eptn+KD+x/Adlpb2CRJ4eqAAAAAElFTkSuQmCC"></image>
          实时好货
        </view>
      </view>
      <view class="hot__sell__container">
        <view class="hot_sell__item">
          <view class="hot_sell__number left">{{ hotSellData.data[0].ranking}}</view>
          <image class="hot_sell__img" :src="hotSellData.data[0].mainPic"></image>
          <view class="hot_sell__volume left">2H抢{{ hotSellData.data[0].twoHoursSales}}件</view>
          <view class="hot_sell__price">¥{{ hotSellData.data[0].actualPrice}}</view>
        </view>
        <view class="hot_sell__item">
          <view class="hot_sell__number right">{{ hotSellData.data[1].ranking}}</view>
          <image class="hot_sell__img" :src="hotSellData.data[1].mainPic"></image>
          <view class="hot_sell__volume right">2H抢{{ hotSellData.data[1].twoHoursSales}}件</view>
          <view class="hot_sell__price">¥{{ hotSellData.data[1].actualPrice}}</view>
        </view>
      </view>
    </view>
    <view class="hot_sell ddq">
      <view class="hot_sell__title">
        <view class="title">限时秒杀</view>
        <view class="hot_sell__desc">
          <view class="hot__sell__time">
            {{ ddqData.data.ddqTime.slice(11,13) }}点场
          </view>
        </view>
      </view>
      <view class="hot__sell__container">
        <view class="hot_sell__item">
          <image class="hot_sell__img" :src="ddqData.data.goodsList[0].mainPic"></image>
          <view class="hot_sell__volume">{{ ddqData.data.goodsList[0].specialText[0]}}</view>
          <view class="hot_sell__price">¥{{ ddqData.data.goodsList[0].actualPrice}}</view>
        </view>
        <view class="hot_sell__item">
          <image class="hot_sell__img" :src="ddqData.data.goodsList[1].mainPic"></image>
          <view class="hot_sell__volume">{{ ddqData.data.goodsList[1].specialText[0]}}</view>
          <view class="hot_sell__price">¥{{ ddqData.data.goodsList[1].actualPrice}}</view>
        </view>
      </view>
    </view>
  </view>
  <view class="category_container">
    <view class="category">
      <view class="category__item"  :class="{active: currentCategoryIndex === index }"
            v-for="(item, index) in category" :key="item.name"
            @click="handelCategoryClick(index)">
        <view class="category__title">{{ item.name }}</view>
        <view class="category__desc">{{ item.description }}</view>
      </view>
    </view>
  </view>
  <goods-item :data="category[currentCategoryIndex].data" class="goods"></goods-item>
  <foot-menu checked="0"></foot-menu>
  <scroll-top></scroll-top>
</template>

<script>
import { getHeadCategory, getHotSell, getCategoryGoodsData } from './index';
import GoodsItem from '../common/goodsItem'
import FootMenu from '../basic/footMenu'
import ScrollTop from '../basic/scrollTop'

export default {
  components: {
    ScrollTop,
    GoodsItem,
    FootMenu
  },
  onPageScroll() {},
  onLoad() {
    // uni.preloadPage({url: '/pages/search/index'})
    // let response =  getGoodsList( {material_id: 27160})
    // response.then(value => {
    // })
  },
  methods: {
    goSearchPage() {
      uni.navigateTo({url: '/pages/search/index'})
    }
  },
  setup(props, context) {
    const { headCategoryData } = getHeadCategory()
    const { hotSellData, ddqData } = getHotSell()
    const { category, currentCategoryIndex, handelCategoryClick } = getCategoryGoodsData()
    return {
      headCategoryData,
      hotSellData,
      ddqData,
      category,
      currentCategoryIndex,
      handelCategoryClick
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
