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
import {
  showSuccess,
  post,
  showModal,
  loginAsync,
  getUserInfoAsync
  // logger
} from '@/utils'
// import '../../vendor'
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
    async doLogin(e) {
      try {
        console.log('================')
        // 获取 code
        const { code } = await loginAsync()
        console.log(code)
        // 获取加密的userInfo信息
        const { userInfo } = await getUserInfoAsync({
          withCredentials: true,
          lang: 'zh_CN'
        })
        const data = { code, userInfo }
        console.log(data)
        const res = await post('/weapp/login', data)
        console.log('-----login-------')
        this.userInfo = res
        wx.setStorageSync('userInfo', res)
      } catch (err) {
        console.log(err)
        showModal('授权失败', `权cai可以打卡哦!`)
        // logger.error('Cheese is too ripe!')
      }
    },
    async punchIn() {
      console.log('daka')
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
