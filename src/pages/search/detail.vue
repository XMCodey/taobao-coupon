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
    <view style="height: 16rpx;background-color: rgb(246, 246, 246);"></view>
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
          presentPriceClass.value = 'sort__price__down'
        }
        if (presentPriceClass.value === 'sort__price__down') {
          presentPriceClass.value = 'sort__price__up'
        }
        if (presentPriceClass.value === 'sort__price__up') {
          presentPriceClass.value = 'sort__price__down'
        }
      }
      if (presentSort.value === index) {
        return;
      }
      console.log(index);
      presentSort.value = index
    }

    return {
      changeSort,
      presentSort,
      presentPriceClass
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
    .active {
      color: rgb(254, 55, 56);
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
      &__upIcon{
        border-bottom: 12rpx solid #d8d8d8;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
      }
      &__downIcon{
        border-top: 12rpx solid #d8d8d8;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
      }
    }
  }
</style>
