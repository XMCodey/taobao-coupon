<template>
  <view @click="goSearchPage()">
    <uni-search-bar></uni-search-bar>
    {{ value }}
  </view>
</template>

<script>
import { getGoodsList } from '../../network/home'
export default {
  data() {
    return {
      title: 'Hello',
      value: [],
      search: '323',
      input: '323'
    }
  },
  onLoad() {
    // uni.preloadPage({url: '/pages/search/index'})
    let response =  getGoodsList( {material_id: 27160})
    response.then(value => {
      this.value = value
    })
  },
  methods: {
    goSearchPage() {
      uni.navigateTo({url: '/pages/search/index'})
    }
  },
  setup(props, context) {
    console.log(props);
    console.log(context);

  }
}
</script>

<style>

</style>
