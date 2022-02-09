<template>
  <search-box>
    <view class="sort">
      <view v-for="(item, index) in ['人气', '销量', '价格']" :key="item"
            @click="changeSort(index)"
            :class="{ active: presentSort === index, sort__price: item === '价格'}"
      >
        <template v-if="item === '价格'">
          <view class="sort__price__upIcon"></view>
          <view class="sort__price__downIcon"></view>
          <view></view>
        </template>
        {{ item }}</view>
    </view>
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

    const changeSort = function (index) {
      if (presentSort.value === index) {
        if (presentSort.value === 3) {

          return
        }
        return;
      }
      console.log(index);
      presentSort.value = index
    }
    const presentSort = ref(null)
    return {
      changeSort,
      presentSort
    }
  }
}
</script>

<style scoped lang="scss">
  .sort {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .active {
      color: red;
    }
    &__price {
      &__upIcon{
        border-bottom: 1rem solid red;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
      }
      &__downIcon{
        border-top: 1rem solid red;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
      }
    }
  }
</style>
