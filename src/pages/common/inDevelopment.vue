<template>
  <view @click="gotohome" style="font-size: 10vw;display: flex;justify-content: center;align-items:center;height: 100vh;">开发中</view>
</template>

<script>
export default {
  name: "inDevelopment",
  methods: {
    gotohome: function () {
      uni.navigateTo({
        url: '/'
      })
    }
  }
}
</script>

<style scoped>

</style>