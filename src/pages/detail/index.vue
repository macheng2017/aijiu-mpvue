<template lang='pug'>
.container
  .preview
    img(:src="imgSrc" @error="binderrorimg" mode="aspectFill"  @click.stop="preview")
    .right
      .xw 穴位名称: {{info.name}}
      .jl 所属经络: {{jlInfo.name}}
      .bm 国际编码: {{info.guojidaima}}
  .xwVideo
    video(:src="videoSrc")
    .dw
      .title 定位
      .content {{info.dingwei}}
    .qx
      .title 取穴
      .content {{info.quxue}}
    img(:src="imgSrc2" mode="aspectFill")
  .summary
    .title -- 概述 --
    .disease
      .title 主治病症
      .content {{info.zhuzhibingzheng}}
      .tags()
        .badge(v-for="tag in info.disease_treat" :key="info.id") {{tag}}
    .experience
      .title 经验应用
      .content {{info.jingyanyingyong}}
      .tags()
        .badge( v-for="tag in info.experience_treat" :key="info.id") {{tag}}
  .operation
    .title -- 操作 --
    .aijiu
      .title 艾灸
      .content {{info.aijiucanshu}}
    .anmo
      .title 按摩
      .content {{info.massage}}
    .zhenci
      .title 针刺
      .content {{info.acupuncture}}
    CommentList(:comments="comments" )
    .comment(v-if="showAdd")
      textarea( v-model="comment" class="textarea" :maxlength="100" placeholder='请输入内容...')
      .location 地理位置:
        switch(color="#42C593" @change="getGeo" :checked='location')
        span {{location}}
      .phone 手机型号:
        switch(color="#42C593" @change="getPhone" :checked='phone')
        span {{phone}}
      button(class="btn" @click="addComments") 评论
    .text-footer(v-else) 未登录或者已经评论过了
    button(open-type="share" class='btn') 转发给好友
</template>

<script>
import defaultImg from '../../../static/img/default.jpg'
import { get, post, showModal, showSuccess } from '@/utils'
import { mapState } from 'vuex'
import CommentList from '@/components/commentList'
export default {
  data() {
    return {
      info: {},
      jlInfo: {},
      name: '',
      comment: '',
      comments: [],
      location: '',
      phone: '',
      userInfo: {},
      xwName: ''
    }
  },
  computed: {
    ...mapState(['imageCDN']),
    imgSrc() {
      if (this.jlInfo.zongtu) {
        return this.imageCDN + this.jlInfo.zongtu
      }
    },
    videoSrc() {
      if (this.info.video_url) {
        return this.imageCDN + this.info.video_url
      }
    },
    imgSrc2() {
      if (this.info.thumb_url) {
        return this.imageCDN + this.info.thumb_url
      }
    },
    showAdd() {
      // 没登录
      if (!this.userInfo) {
        return false
      }
      // 在评论也查到有自己的openid
      if (this.comments.filter(v => v.openid === this.userInfo.openId).length) {
        return false
      }
      return true
    }
  },
  components: {
    CommentList
  },
  methods: {
    async getDetail() {
      const info = await get('/weapp/xwDeatil', { name: this.name })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: info.name + `( ${info.pinyin} )` || '穴位详情'
      })
      this.info = info
      this.xwName = info.id
      // 查询经络
      const jlInfo = await get('/weapp/jlInfo', { jlId: info.jingluo })
      this.jlInfo = jlInfo
      // console.log(jlInfo)
    },
    // 预览大图
    preview() {
      wx.previewImage({
        current: this.imgSrc,
        urls: [this.imgSrc]
      })
    },
    binderrorimg(e) {
      // console.log('-----------')
      // var errorImgIndex = e.target.dataset.errorimg // 获取循环的下标
      // var imgObject = 'carlistData[' + errorImgIndex + '].img' // carlistData为数据源，对象数组
      // var errorImg = {}
      // errorImg[imgObject] =
      //   'https://w.chesudi.com/Public/web/img/onerrorcar.png' // 我们构建一个对象
      // this.setData(errorImg) // 修改数据源对应的数据
      console.log('-----------------')
      console.log(e)
      this.imgSrc = defaultImg
      console.log(this.imgSrc)
      console.log(defaultImg)
    },
    getGeo(e) {
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          // FgAwGxsSSYuD96qXuHXfpqk7dGnwVMab 百度地图token
          // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
          success: geo => {
            wx.request({
              url,
              data: {
                location: `${geo.latitude}, ${geo.longitude}`,
                output: 'json',
                ak: 'FgAwGxsSSYuD96qXuHXfpqk7dGnwVMab'
              },
              success: res => {
                // console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    // mpvue 对获取信息的属性有有修改 e.detail.value => e.target.value
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    //  comment method
    async addComments() {
      // 评论内容, 手机型号, 地理位置, 图书id 用户openid
      if (!this.comment) {
        return
      }
      if (!this.userInfo.openId) {
        showModal('未登录', '请在我的信息页面登录!')
        return
      }
      const data = {
        openId: this.userInfo.openId,
        xwName: this.name,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      // console.log(data)
      try {
        const res = await post('/weapp/addcomments', data)
        this.comment = ''
        // console.log(res)
        if (res.msg === 'success') {
          this.getComments()
          showModal('评论', '成功')
        }
      } catch (e) {
        showModal('添加评论失败', e.msg)
      }
    },
    // 获取评论列表
    async getComments() {
      const comments = await post('/weapp/commentList', { xwName: this.name })
      this.comments = comments.list || []
    }
  },
  // 这是一个生命周期函数
  onShareAppMessage: function res() {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    // const that = this.info

    return {
      title:
        '郭林艾灸-穴位名:' + this.info.name + `( ${this.info.pinyin} )` ||
        '穴位详情',
      path: '/pages/index/main?name=' + this.name,
      success: function(res) {
        showSuccess('转发成功!')
      },
      fail: function(res) {
        showModal('转发', '转发失败')
      }
    }
  },
  async mounted() {
    this.name = this.$root.$mp.query.name
    // this.xwName = this.$root.$mp.query.id
    await this.getDetail()
    await this.getComments()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
    // 开启分享
    wx.showShareMenu()
  }
}
</script>

<style lang="sass" scoped>
@import "static/sass/base"
.container
  background: #F3F4F8
  padding-top: 5px
  font-size: 14px
  .preview
    font-size: 16px
    display: flex
    padding: 10px 0 0 10px
    margin: 10px 0
    align-items: center
    background: #fff
    img
      width: 100px
      height: 120px
      margin-bottom: 20px
    .right
      margin-left: 20px
    .xw,.jl,.bm
      margin-bottom: 20px
      font-weight: 700
  .xwVideo
    padding-top: 5px
    video
      width: 100%
      margin-bottom: 10px
    .dw, .qx
      text-indent: 10px
      .title
        font-size: 16px
        font-weight: 700
      .content
        margin: 10px 10px
        color: #5C5C5C
    img
      width: 100%
  .summary
    margin-top: 10px
    background: #fff
    padding-top: 5px
    .title
      text-align: center
      font-size: 16px
      color: #5C5C5C
    .disease ,.experience
      text-indent: 10px
      .title
        text-align: left
        font-weight: 700
        font-size: 16px
        margin: 10px 0
      .content
        margin: 10px 10px
        color: #5C5C5C
      .tags
        .badge
          display: inline-block
          margin: 5px
          padding: 5px
          border-radius: 30px
          border: 1px $green solid
          background: $green
          color: #fff
          text-align: center
          text-indent: 0
  .operation
    margin-top: 10px
    background: #fff
    padding-top: 5px
    .title
      text-align: center
      font-size: 16px
      color: #5C5C5C
    .aijiu ,.anmo,.zhenci
      text-indent: 10px
      .title
        text-align: left
        font-weight: 700
        font-size: 16px
        margin: 10px 0
      .content
        margin: 10px 10px
        color: #5C5C5C
  .comment
    margin-top: 10px
    .textarea
      width: 730rpx
      height: 200rpx
      background: #eee
      padding: 10rpx
    .location,.phone
      margin-top: 10px
      padding: 5px 10px


</style>
