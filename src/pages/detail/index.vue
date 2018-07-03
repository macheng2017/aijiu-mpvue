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
</template>

<script>
import defaultImg from '../../../static/img/default.jpg'
import { get } from '@/utils'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      info: {},
      jlInfo: {},
      name: ''
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
    }
  },
  components: {},
  methods: {
    async getDetail() {
      const info = await get('/weapp/xwDeatil', { name: this.name })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: info.name + `( ${info.pinyin} )` || '穴位详情'
      })
      this.info = info
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
    }
  },
  mounted() {
    this.name = this.$root.$mp.query.name
    this.getDetail()
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



</style>
