<template lang="pug">
.container
  contact-button.img-plus-style.zindex100.yc(type="default-dark" size="20" session-from="weapp")
  image.img-plus-style(src="/static/img/xk_kefu.jpg")
  image.img-plus-style1(src="/static/img/xk_tel.jpg"  @click="calling")
</template>
<script>
export default {
  props: ['xw'],
  methods: {
    calling: function() {
      wx.makePhoneCall({
        phoneNumber: '10086'
      })
    }
  },
  computed: {
    parasXW() {
      // 加上了一个斜杠解决了,跳转的时候总是有前面的一坨
      return `/pages/detail/main?name=${encodeURI(this.xw)}`
    }
  }
}
</script>
<style lang="sass" scoped>
.img-plus-style
    height: 70rpx
    width: 70rpx
    position: fixed
    bottom: 220rpx
    right: 30rpx
    opacity: 0.7
.img-plus-style1
    height: 70rpx
    width: 70rpx
    position: fixed
    bottom: 130rpx
    right: 30rpx
    opacity: 0.7
.zindex100
    z-index: 100
.yc
    opacity: 0
</style>
