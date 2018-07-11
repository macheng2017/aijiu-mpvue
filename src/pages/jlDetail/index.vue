 <template lang='pug'>
.container
  .preview
    img(:src="imgSrc" @error="binderrorimg" mode="aspectFill"  @click.stop="preview")
    .right
      .xw 经络名称: {{info.name}}
      .jl 当令时辰: xxxx
      .bm 国际编码: {{info.guojidaima}}
  .summary
    .title -- 经络运行 --
    .jlrun
      .title 经络运行
      .content {{info.jmCircly}}

  .binghou
    .title -- 病候主治 --
    .main
      .title 主要病候
      .content {{info.binghou}}
    .point
      .title 主治要点
      .content {{info.zhiliao}}

  .operation
    .title -- 操作要点 --
    .aijiu
      .title 操作
      .content {{info.caozuo}}
  .runImg
    .title --循行图--
    img(:src="imgSrc2" mode="aspectFill")


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
      name: '',
      jlId: ''
    }
  },
  computed: {
    ...mapState(['imageCDN']),
    imgSrc() {
      if (this.info.zongtu) {
        return this.imageCDN + this.info.zongtu
      }
    },
    videoSrc() {
      if (this.info.video_url) {
        return this.imageCDN + this.info.video_url
      }
    },
    imgSrc2() {
      if (this.info.xunxing) {
        return this.imageCDN + this.info.xunxing
      }
    }
  },
  components: {},
  methods: {
    async getDetail() {
      const info = await get('/weapp/jlInfo', {
        jlId: this.jlId
      })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: info.name || '经络详情'
      })
      this.info = info
      // // 查询经络
      // const jlInfo = await get('/weapp/jlInfo', { jlId: info.jingluo })
      // this.jlInfo = jlInfo
      // // console.log(jlInfo)
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
    this.jlId = this.$root.$mp.query.id
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
  .summary
    margin-top: 10px
    background: #fff
    padding-top: 5px
    .title
      text-align: center
      font-size: 16px
      color: #5C5C5C
    .jlrun ,.binghou
      text-indent: 10px
      .title
        text-align: left
        font-weight: 700
        font-size: 16px
        margin: 10px 0
      .content
        margin: 10px 10px
        color: #5C5C5C
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
  .binghou
    margin-top: 10px
    background: #fff
    padding-top: 5px
    .title
      text-align: center
      font-size: 16px
      color: #5C5C5C
    .main ,.point
      text-indent: 10px
      .title
        text-align: left
        font-weight: 700
        font-size: 16px
        margin: 10px 0
      .content
        margin: 10px 10px
        color: #5C5C5C
  .runImg
    margin: 10px 0
    background: #fff
    padding-top: 5px
    .title
      text-align: center
      font-size: 16px
      color: #5C5C5C
    img
      width: 100%
      margin-top: 10px


</style>
