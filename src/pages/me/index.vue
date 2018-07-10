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
import qcloud from 'wafer2-client-sdk'
import { showSuccess, post } from '@/utils'
import config from '@/config'
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
      console.log(e)
      if (!this.userInfo.openId) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          // 解决不能成功刷新登录后的信息问题:
          // 1. 使用=>函数
          // 2. 使用 const self = this  this.userInfo = userInfo
          success: userInfo => {
            console.log('登录成功', userInfo)
            showSuccess('登录成功')
            // 存在浏览器中
            wx.setStorageSync('userInfo', userInfo)
            this.userInfo = userInfo
            // 为了解决上个sdk中返回值没有带openId 当然现在'wafer2-client-sdk'已经解决了这个问题
            // 利用openId来判断是否放权
            // 自己调用server目录下的
            // qcloud.request({
            //   url: config.userUrl,
            //   login: true,
            //   success: userReq => {
            //     wx.setStorageSync('userInfo', userReq.data.data)
            //     this.userInfo = userReq.data.data
            //   }
            // })
          },
          fail: function(err) {
            console.log('登录失败', err)
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
