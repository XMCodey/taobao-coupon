<template>

</template>

<script>
import {getCurrentInstance, onMounted} from "vue";

export default {
  name: "index",
  data () {
    return {
      q: ''
    }
  },
  onLoad: function (option) {
    this.q = option.q
  },
  setup(props, content) {
    let q = ''
    const internalInstance = getCurrentInstance()
    onMounted(() => {
      q = internalInstance.data.q
      console.log("detail----" + internalInstance.data.q);
    })
  }
}
</script>

<style scoped>

</style>
