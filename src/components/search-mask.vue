<template>
  <div class="container">
    <div class="header">
      <div class="search-container">
        <img class="icon" src="/static/img/component/search/search.png" alt>
        <input
          @confirm="onConfirm"
          placeholder-class="in-bar"
          placeholder="型号,鞋型,款号,尺码"
          class="bar"
          focus
          type="text"
          v-model="word"
        >
        <img @click="onDelete" class="cancel-img" src="/static/img/component/search/cancel.png" alt>
      </div>
      <div class="cancel" @click="onTap">取消</div>
    </div>
    <div v-if="!searching">
      <div class="history">
        <div class="title">
          <div class="chunk"></div>
          <div>历史搜索</div>
        </div>
        <div class="tags">
          <div class="tag" v-for="(item, index) in keywords" :key="index">
            <Tag :text="item" @onTapping="onTag"></Tag>
          </div>
        </div>
      </div>
      <div class="history hot-search">
        <div class="title">
          <div class="chunk"></div>
          <div>热门搜索</div>
        </div>
        <div class="tags">
          <div class="tag" v-for="(item, index) in hotKeywords" :key="index">
            <Tag :text="item" @onTapping="onTag"></Tag>
          </div>
        </div>
      </div>
    </div>
    <div class="search-result" v-if="searching">
      搜索结果
      <SearchResult :word="word"></SearchResult>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/tag'
import SearchResult from '@/components/searchResult'
import KeywordModel from './models/keyword'
// import ProductModel from '@/models/product'
// const productModel = new ProductModel()
const keywordModel = new KeywordModel()
export default {
  props: ['text', 'count'],
  data() {
    return { keywords: [], hotKeywords: [], searching: false, word: '' }
  },
  components: { Tag, SearchResult },
  methods: {
    onTap(event) {
      this.$emit('onCancel', { flag: false })
    },
    async onConfirm(event) {
      this.searching = true
      this.word = event.target.value
      console.log('onConfirm', this.word)
      // if () {

      // }

      // const res = await productModel.search(0, word)
      // console.log(res)
      keywordModel.addHistory(this.word)
    },
    onTag(event) {
      this.searching = true
      this.word = event.text
    },
    async getHotSearchKeyword() {
      this.hotKeywords = (await keywordModel.getHotSearchKeyword()).hot
    },
    onDelete() {
      this.word = ''
      this.searching = false
    }
  },
  created() {
    this.keywords = keywordModel.getHistory()
    this.getHotSearchKeyword()
    // console.log('mounted', this.keywords)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header {
  background-color: #ffffff;
  position: fixed;
  height: 100rpx;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  width: 750rpx;
  align-items: center;
  z-index: 99;
}

.search-container {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 50px;
  margin-left: 20rpx;
}

.in-bar {
  color: #999;
}

.bar {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: inline-block;
  height: 68rpx;
  width: 1000rpx;
  font-size: 28rpx;
}

.icon {
  width: 28rpx;
  height: 28rpx;
  margin-left: 24rpx;
  margin-right: 16rpx;
}

.cancel {
  line-height: 68rpx;
  width: 120rpx;
  text-align: center;
  display: inline-block;
  border: none;
}

.cancel-img {
  width: 28rpx;
  height: 28rpx;
  margin-right: 20rpx;
}

.history {
  width: 690rpx;
  margin: 40rpx 0 20rpx 0;
  display: flex;
  font-size: 28rpx;
  margin-top: 160rpx;
  flex-direction: column;
}

.hot-search {
  margin-top: 70rpx;
}

.title {
  line-height: 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.books-container v-book {
  margin-bottom: 25rpx;
}

.books-container {
  width: 570rpx;
  margin-top: 100rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 90rpx 0 90rpx;
  justify-content: space-between;
}

.loading {
  margin: 50rpx 0 50rpx 0;
}

.loading-center {
  position: absolute;
  top: 50%;
  left: 50%;
}

.empty-tip {
  display: inline-block;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
}

.chunk {
  height: 30rpx;
  width: 10rpx;
  background-color: #000;
  display: inline-block;
  margin-right: 20rpx;
}

.tags {
  /* padding-left:15px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24rpx;
  padding-left: 30rpx;
  width: 630rpx;
}

.tags .tag {
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.bar {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: inline-block;
  height: 68rpx;
  width: 500rpx;
  font-size: 28rpx;
}
.search-result {
  margin-top: 55rpx;
}
</style>
