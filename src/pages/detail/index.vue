<template lang='pug'>
.container {{name}}
</template>

<script>
import { get } from '@/utils'
export default {
  data() {
    return {
      info: {},
      name: ''
    }
  },
  components: {},
  methods: {
    async getDetail() {
      const info = await get('/weapp/xwDeatil', { name: this.name })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: info.name
      })
      this.info = info
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
