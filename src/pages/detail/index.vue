<template lang='pug'>
.container {{name}}
  .preview {{imageCND}}
    img(:src="imageCDN + jlInfo.zhongtu")
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
    ...mapState(['imageCND'])
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
      console.log(jlInfo)
    }
  },
  mounted() {
    this.name = this.$root.$mp.query.name
    this.getDetail()
  }
}
</script>

<style lang="sass" scoped>

</style>
