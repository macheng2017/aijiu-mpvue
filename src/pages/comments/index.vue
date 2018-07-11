<template lang="pug">
.container
  // 增加点击事件的标识 type="user"
  div(v-if="userInfo.openId")
    CommentList(v-if="comments.length > 0" :comments="comments" type="user")
    // .page-title 我的穴位收藏
    // // Card(v-for="book in books" :key="book.id" :book='book')
    // // Card( v-for="item in items" :item='item' :key="item.id")
    // div(v-if="!books.length") 收藏穴位暂时还没有
    div(v-else) 您还没有评论过
  div(v-else) 你还没有登录,请到我的信息登录,<br/>还有一次打卡机会哦!
</template>
<script>
import { post } from '@/utils'
import CommentList from '@/components/commentList'
// import Card from '@/components/card'
export default {
  data() {
    return {
      comments: [],
      userInfo: {},
      books: [],
      items: []
    }
  },
  components: {
    CommentList
    // Card
  },
  methods: {
    async getComments() {
      const comments = await post('/weapp/commentList', {
        openId: this.userInfo.openId
      })
      this.comments = comments.list
    },
    // async getBooks() {
    //   const books = await get('/weapp/bookList', {
    //     openId: this.userInfo.openId
    //   })
    //   this.books = books.list
    // },

    init() {
      wx.showNavigationBarLoading()
      this.getComments()
      // this.getBooks()
      wx.hideNavigationBarLoading()
    }
  },
  onPullDownRefresh() {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow() {
    if (!this.userInfo.opneId) {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  }
}
</script>
<style>
</style>
