<template lang="pug">
.comment-list
  .page-title(v-if="comments.length") 评论
  .comment(v-for="comment in comments" :key="comment.id" @click="handleClick(comment)")
    .user
      .inline {{comment.title}}
        img(:src="comment.image" class="avatar" mode="aspectFit")
        .right {{comment.location || '未知地点'}}
        span --
        div {{comment.phone || '未知型号'}}
      .content {{comment.comment}}
</template>
<script>
export default {
  props: ['comments', 'type'],
  methods: {
    handleClick(comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: `/pages/detail/main?name=${comment.xwName}`
        })
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.comment-list
  background: #eee
  font-size: 14px
  .page-title
  .comment
    background:#fff
    margin-bottom: 10px
    padding: 5px 20px
    .user
      vertical-align: center
      .inline
        .right,div,span
          display: inline-block
          float: right
        .avatar
          width: 20px
          height: 20px
          border-radius: 50%
      .content
        margin: 10px 0

</style>
