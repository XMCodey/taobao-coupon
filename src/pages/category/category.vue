<template>
<search-box @tap="handleSearchBoxClick"></search-box>32
<foot-menu checked="4"></foot-menu>
</template>

<script>
import FootMenu from '../basic/footMenu'
import SearchBox from '../search/search-box/search-box.vue'
export default {
  name: "category",
  components: {
    FootMenu,
    SearchBox
  },
  setup: function (props, context) {
    console.log(props, context);
    const handleSearchBoxClick = function () {
      console.log(323);
    }
    return {
      handleSearchBoxClick
    }
  }
}
</script>

<style scoped lang="scss">

</style>