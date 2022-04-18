<template>
  <view class="head">
    <view @click="goSearchPage">
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
  <goods-item :data="goodsData"></goods-item>
</template>

<script>
import { getGoodsList } from '../../network/requests'
import { getHeadCategory, getHotSell } from './index'
import {reactive, ref} from "vue";
import GoodsItem from '../common/goodsItem'

export default {
  data() {
    return {
      category: [
        { name: "精选", description: "精选好物" },
        { name: "女装", description: "潮流穿搭" },
        { name: "母婴", description: "宝妈精选" },
        { name: "美妆", description: "达人推荐" },
        { name: "居家日用", description: "实惠百货" },
        { name: "鞋品", description: "潮牌特价" },
        { name: "美食", description: "吃货福利" },
        { name: "文娱车品", description: "超低折扣" },
        { name: "数码家电", description: "全网矩惠" },
        { name: "男装", description: "品质优选" },
        { name: "内衣", description: "亲肤舒适" },
        { name: "箱包", description: "潮流出街" },
        { name: "配饰", description: "搭配精品" },
        { name: "户外运动", description: "健康生活" },
        { name: "家装家纺", description: "品质家居" },
      ]
    }
  },
  components: {
    GoodsItem
  },
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
    console.log(props);
    console.log(context);
    const { headCategoryData } = getHeadCategory()
    const { hotSellData, ddqData } = getHotSell()
    console.log(hotSellData);
    console.log(ddqData);

    const currentCategoryIndex = ref(0)
    const handelCategoryClick = function (index) {
      currentCategoryIndex.value = index
    }

    const goodsData = ref([])

    let response =  getGoodsList( {material_id: 27160})
    response.then(value => {
      goodsData.value = value.data.tbk_dg_optimus_material_response.result_list.map_data
      console.log()
    })
    return {
      headCategoryData,
      hotSellData,
      ddqData,
      currentCategoryIndex,
      handelCategoryClick,
      goodsData
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index";
</style>
