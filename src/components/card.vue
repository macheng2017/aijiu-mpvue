<template lang="pug">
.container
  .jl
    .time {{str}}
    a(:href="parasJL") {{item.name}}
    // 现在只能用多层组件嵌套解决template 传值问题
  .xwlist
    Xw(:xw = "xw"  v-for="xw in item.xwName" :key="item.id" )

</template>
<script>
import Xw from '@/components/Xw.vue'
export default {
  // data() {
  //   return {
  //     xw: xw
  //   }
  // },
  props: ['item'],
  mounted() {
    // console.log(this.item)
    // console.log(this.xw)
  },
  computed: {
    parasJL() {
      // return encodeURI(this.item.name)
      return `/pages/jlDetail/main?name=${encodeURI(this.item.name)}&id=${
        this.item.jlId
      }`
    },
    str() {
      return this.item.abbr + ' ' + (this.item.jltime || '')
    }
    // parasXW() {
    //   return encodeURI(this.xw)
    // }
  },
  methods: {},
  components: {
    Xw
  }
}
</script>
<style lang="sass" scoped>
.container
  font-size: 14px
  .jl
    font-size: 16px
    font-weight: 600
    border-bottom: 1px solid #9492D6
    margin-bottom: 5px
    width: 100%
    text-indent: 10px
    .time
      background: #F2F3F7
      font-weight: 100
      font-size: 14px
      margin: 25px 0 5px
  .xwlist
    display: flex
    flex-wrap: wrap
    text-align: center


</style>

