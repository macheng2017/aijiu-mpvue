<template>
  <div class="container">
    <div class="zan-panel">
      <div class="zan-card">
        <div class="zan-card__thumb">
          <image class="zan-card__img"
                 :src="imgSrc"
                 mode="aspectFit">
          </image>
        </div>
        <div class="zan-card__detail">
          <div class="zan-card__detail-row">
            <!-- <div class="zan-card__right-col">¥ {{item.taobaoPrice}}</div> -->
            <div class="zan-card__left-col zan-ellipsis--l2">
              {{item.title}}{{item.styleNumber}}
            </div>
          </div>

          <!-- <div class="zan-card__detail-row zan-c-gray-darker">
            <button class="zan-card__right-col zan-btn zan-btn--mini zan-btn--primary zan-btn--plain" @click="setClip(item)">复制到淘宝备注</button>

            <div class="zan-card__left-col">
            <div class="zan-text-deleted zan-font-12 zan-font-bold">吊牌价 {{item.cardPrice}}</div>

            </div>
          </div> -->

          <div class="zan-card__detail-row zan-c-gray-darker">
            <div class="zan-card__left-col zan-c-red">{{item.stitle}}</div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  props: ['item', 'imageCDN', 'defImg', 'articleUrl'],
  computed: {
    imgSrc() {
      // return this.item.img === undefined
      //   ? this.imageCDN + '/img/' + this.defImg
      //   : this.item.sImg
      return this.item.sImg
    }
  },
  methods: {
    // 向剪贴板中写入信息
    async setClip(data) {
      let str = `款号: ${data.styleNumber} 价格: ${data.taobaoPrice} 尺码: ${
        data.size
      } 库存: ${data.count}`
      wx.setClipboardData({
        data: str
      })
      // 震动下表示完成
      wx.vibrateShort()
    }
  }
}
</script>
<style >
</style>
<style  scoped>
</style>
