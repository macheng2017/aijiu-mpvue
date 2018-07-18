<template lang="pug">
.container 个人中心
  button(v-if="!userInfo.openId" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin") 点击登录
  div(v-if="userInfo.openId")
    .userInfo
      img(:src="userInfo.avatarUrl")
      p {{userInfo.nickName}}
    .punch-in()
      button(v-if='!punch' class='btn' lang="zh_CN" @click="punchIn") 打卡
      .msg(v-else) 你已经成功打卡 {{punchData.count}} 天<br/> 连续打卡{{punchData.maxCount}} 天

</template>
<script>
// import qcloud from 'wafer2-client-sdk'
import { showSuccess, post } from '@/utils'
// import config from '@/config'
export default {
  data() {
    return {
      userInfo: {},
      punch: false,
      punchData: {}
    }
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo.openId) {
      this.userInfo = userInfo
    }
  },
  methods: {
    doLogin: function(e) {
      wx.login({
        success: async function(res) {
          if (res.code) {
            // 拿到code ,发起请求
            // wx.request({
            //   url: '',
            //   data:{
            //     code: res.code
            //   }
            // })
            const data = await post('/weapp/login', { code: res.code })
            console.log('-----login-------')
            console.log(data)
          } else {
            console.log('登录失败!' + res.errMsg)
          }
        }
      })
    }
  },
  async punchIn() {
    const res = await post('/weapp/punchIn', { openId: this.userInfo.openId })
    this.punchData = res
    const difference = new Date().getTime() - res.punchTime
    if (difference < 1000 * 60 * 60 * 24) {
      showSuccess('明天再来吧!')
      this.punch = true
    }
  }
}
</script>
<style lang="sass" scoped>
.container
  padding: 0 30px
  .userInfo
    margin-top: 100rpx
    text-align: center
    img
      width: 150rpx
      height: 150rpx
      margin: 20rpx
      border-radius: 50%
  .msg
    margin-top: 100rpx
    text-align: center

</style>
