<template lang="pug">
.container
  .doc-title.zan-hairline--bottom
    p(v-if='items.length > 0')
      a(@longpress="setClip(item)", v-for="item in items" :key="item.id" @click="arcitleDetail(item)")
        NewsCard( :item='item' :imageCDN='imageCDN' :articleUrl='articleUrl' :defImg='defImg')
    p(v-else) 没有文章数据
    p.text-footer(v-if='!more') 没有更多数据
</template>
<script>
// import { get } from '@/utils'
import NewsCard from '@/components/NewsCard'
import { mapState } from 'vuex'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// import * as R from 'ramda'
// 35条数据
// 每次加载10条
// 0页   0-10
// 1     10-20
// 2     20-30（5）
// page 当前第几页

// 没有更多数据
// 1. page=0 不能显示这条提醒
// 2. page>0 数据长度<10 停止触底加载
export default {
  data() {
    return {
      userInfo: {},
      items: [],
      shoesData: {
        sex: '',
        style: '',
        size: '',
        searchKey: ''
      },
      page: 0,
      more: true
    }
  },
  components: {
    NewsCard
  },
  computed: {
    ...mapState(['imageCDN', 'defImg', 'articleUrl'])
  },
  methods: {
    // 获取经络数据
    async getList(init) {
      if (init) {
        this.page = 1
        this.more = true
      }
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '玩命加载中'
      })
      try {
        // const items = await get('/mina/product/list', {
        //   shoesData: this.shoesData,
        //   page: this.page // 分页
        // })
        let items = await fly.get(`${this.articleUrl}/api/content/getList`, {
          current: this.page,
          typeId: 'NkGSLLZF'
        })
        items = items.data.data.docs
        console.log('-items.data----------------')
        console.log(items)
        // 查询出来的数据太大了一次传递不到下个页面,先存到本地
        wx.setStorageSync('articleList', items)

        // 设置显示更多的状态
        if (items.length < 10 && this.page > 0) {
          this.more = false
          console.log(this.more)
        }
        if (init) {
          this.items = items
          wx.stopPullDownRefresh()
        } else {
          // 下拉刷新，不能直接覆盖文章 而是累加
          this.items = this.items.concat(items)
        }
        console.log('--------------------')
        console.log(this.items)
      } catch (error) {
        console.log(error)
      }

      wx.hideNavigationBarLoading()
      wx.hideLoading()
    },
    async arcitleDetail(data) {
      // console.log('---arcitleDetail------------')
      // console.log(data.id)
      wx.navigateTo({
        url: `/pages/articleDetail/main?articleId=${data.id}`
      })
    },
    // 向剪贴板中写入信息
    async setClip(data) {
      let str = `款号: ${data.styleNumber} 价格: ${data.taobaoPrice} 尺码: ${
        data.size
      } 库存: ${data.count}`
      wx.setClipboardData({
        data: str
      })
      // 震动下表示完成
      wx.vibrateShort()
    }
  },
  onPullDownRefresh() {
    this.getList(true)
  },
  onReachBottom() {
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page + 1
    this.getList()
  },
  onShow() {
    console.log('onShow----------')
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: '文章列表页面'
    })
    // this.shoesData = R.merge(
    //   this.shoesData,
    //   JSON.parse(this.$root.$mp.query.shoesData)
    // )
    // console.log('shoesData----------------------------------')
    // console.log(this.shoesData)
    this.getList(true)
  },

  onLoad: function(options) {
    console.log('onLoad-------')
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
