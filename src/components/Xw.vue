<template lang="pug">
.xw
  a(:href="parasXW") {{xw}}
</template>
<script>
export default {
  props: ['xw'],
  computed: {
    parasXW() {
      // 加上了一个斜杠解决了,跳转的时候总是有前面的一坨
      return `/pages/detail/main?name=${encodeURI(this.xw)}`
    }
  }
}
</script>
<style lang="sass" scoped>
 a
  width: 50px
  margin: 5px 1px 5px
</style>
