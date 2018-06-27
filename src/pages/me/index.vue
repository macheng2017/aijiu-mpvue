<template lang="pug">
.container 个人中心
  button(v-if="!userInfo.openId" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin") 点击登录
  div(v-if="userInfo.openId")
    .userInfo
      img(:src="userInfo.avatarUrl")
      p {{userInfo.nickName}}
    .punch-in()
      button(v-if='!punch' class='btn' lang="zh_CN" @click="punchIn") 打卡
      .msg(v-else) 你已经成功打卡9999天了!

</template>
<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess } from '@/utils'
import config from '@/config'
export default {
  data() {
    return {
      userInfo: {},
      punch: false
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
    punchIn() {
      this.punch = true
      showSuccess('打卡成功')
      console.log('打卡成功')
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
