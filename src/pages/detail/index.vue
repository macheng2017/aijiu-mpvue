<template lang='pug'>
.container
  .preview
    img(:src="imgSrc" mode="aspectFill"  @click.stop="preview")
    .right
      .xw 穴位名称: {{info.name}}
      .jl 所属经络: {{jlInfo.name}}
      .bm 国际编码: {{info.guojidaima}}
  .xwVideo
    video(:src="videoSrc")
    .dw
      .title 定位
      .context {{info.dingwei}}
    .qx
      .title 取穴
      .context {{info.quxue}}
    img(:src="imgSrc2" mode="aspectFill")
  .summary
    .title 概述
    .context {{info.gaishu}}


</template>

<script>
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
        title: info.name + `( ${info.pinyin} )`
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
    }
  },
  mounted() {
    this.name = this.$root.$mp.query.name
    this.getDetail()
  }
}
</script>

<style lang="sass" scoped>
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
      .context
        margin: 10px 10px
    img
      width: 100%


</style>
