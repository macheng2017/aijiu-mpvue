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
  },
  onLoad: function(options) {
    if (options.name) {
      // 这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '/pages/detail/main?name=' + options.name
      })
    }
  }
}
</script>

<style lang="sass" scoped>



</style>
