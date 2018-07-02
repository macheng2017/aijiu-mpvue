<template lang='pug'>
.container
  Search()
  TopSwiper(:tops="tops")
  Card( v-for="item in items" :item='item' :key="item.id")
</template>

<script>
import { get } from '@/utils'
import Search from '@/components/Search'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  data() {
    return {
      userInfo: {},
      items: []
    }
  },
  components: {
    Search,
    TopSwiper,
    Card
  },
  methods: {
    // 获取经络数据
    async getList() {
      wx.showNavigationBarLoading()
      const items = await get('/weapp/jlList')
      this.items = items.list
      // console.log('--------------------')
      // console.log(this.items)
      wx.hideNavigationBarLoading()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="sass" scoped>



</style>
