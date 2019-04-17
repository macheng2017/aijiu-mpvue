<template lang="pug">
.container
  p(v-if='xwList.length > 0')
    a(@click="parasXW($event,xw.name)" v-for="xw in xwList") {{xw.name}}
  p(v-else) 没有数据，换个词试试
</template>
<script>
import Xw from '@/components/xw'
import { mapState } from 'vuex'
import { get } from '@/utils'

export default {
  props: ['word'],
  data() {
    return {
      xwList: []
    }
  },
  components: {
    Xw
  },
  computed: {
    ...mapState(['imageCDN', 'defImg'])
  },
  methods: {
    parasXW(e, key) {
      // 加上了一个斜杠解决了,跳转的时候总是有前面的一坨
      // console.log('------------------------')
      // console.log(e)
      wx.navigateTo({
        url: `/pages/detail/main?name=${encodeURI(key)}`
      })
    },
    async getSearch() {
      wx.showToast({
        title: '玩命加载中--',
        icon: 'loading',
        duration: 5000
      })
      // let res
      // try {
      //   let fly = new Fly()
      //   res = await fly.get('/weapp/search', { searchKey: this.inputVal })
      // } catch (error) {
      //   console.log(error)
      // }
      let res = {}
      // 如果最终输入的是汉子则查询
      let str = this.word.replace(/[^\u4e00-\u9fa5]/gi, '').trim()
      if (str.length > 0) {
        console.log('--------true--------' + str)
        res = await get('/weapp/search', {
          searchKey: encodeURI(this.word)
        })
      }
      if (res.data.length <= 0) {
        this.msgShow = true
      }
      this.xwList = res.data
      console.log('-------------')
      console.log(this.xwList)
      wx.hideToast()
    }
  },

  mounted() {
    console.log('mounted', this.word)
    wx.setNavigationBarTitle({
      title: '选择结果页面'
    })
    // this.searchKey = this.$root.$mp.query.searchKey

    // this.getList(true)
    this.getSearch()
  },

  onLoad: function(options) {
    // 清空上次数据的缓存,避免图片与文字不匹配
    this.items = []
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
