<template>
  <div class="container tag-class" @click="onTap">
    <div class="text">{{text}}</div>
    <div v-if="count">+{{count}}</div>
  </div>
</template>

<script>
export default {
  props: ['text', 'count'],
  methods: {
    onTap(event) {
      this.$emit('onTapping', { text: this.text })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 4rpx 12rpx;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 2rpx;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 240rpx;
}
</style>
