<template>
  <div>
    <wxParse :content="article" @preview="preview" @navigate="navigate" />
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  data() {
    return {
      item: {},
      article: '<div>我是HTML代码</div>'
    }
  },
  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    }
  },
  mounted() {
    // this.item = JSON.parse(this.$root.$mp.query.item)
    const item = this.$root.$mp.query.item
    console.log(JSON.parse(item))
    this.article = this.item.comments
  }
}
</script>

<style>
@import url('~mpvue-wxparse/src/wxParse.css');
</style>
