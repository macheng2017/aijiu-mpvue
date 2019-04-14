<template lang='pug'>
.container
  FloatMenu
  .header(@click="onSearch" v-if="!searching")
    .box
        img(src="/static/img/icon/search.png")
        div 搜索数据
  SearchMask(v-if="searching" @onCancel="onCancel")
  .sub-container(v-if="!searching")
    TopSwiper(:tops="tops")
    Card( v-for="item in items" :item='item' :key="item.id")

</template>

<script>
import { get } from '@/utils'
import SearchMask from '@/components/search-mask.vue'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
import FloatMenu from '@/components/FloatMenu'
export default {
  data() {
    return {
      userInfo: {},
      items: [],
      searching: false
    }
  },
  components: {
    SearchMask,
    TopSwiper,
    Card,
    FloatMenu
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
    },
    onSearch() {
      this.searching = true
    },
    onCancel(event) {
      this.searching = event.flag
    }
  },
  async mounted() {
    wx.showToast({
      title: '玩命加载中',
      icon: 'loading',
      duration: 5000
    })
    await this.getList()
    wx.hideToast()
  },

  // 增加了分享出去后,先到首页,然后自动切换到详情页
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

<style  scoped>
.header {
  /* position: fixed; */
  background-color: #ccc;
  height: 100rpx;
  width: 100%;
  border-top: 1px solid #f5f5f51e;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 3px 0 #e3e3e3;
  z-index: 99;
}
.box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: #f5f5f5;
  height: 68rpx;
  width: 700rpx;
  color: #999;
}
.head-img {
  width: 106rpx;
  height: 34rpx;
  margin-top: 40rpx;
}
.box img {
  margin-right: 10px;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;
}
</style>
