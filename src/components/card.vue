<template lang="pug">
.container
  .jl {{item.id}}
    .xw(v-for="(xw, i) in item" :key="i") {{xw.xwName}}

</template>
<script>
export default {
  props() {
    return {
      item: {}
    }
  },
  onShow() {
    console.log(this.item)
  }
}
</script>
<style lang="sass" scoped>

</style>

