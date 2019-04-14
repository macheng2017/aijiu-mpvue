import { Http } from '@/models/http-p.js'

class KeywordModel extends Http {
  key = 'q'
  maxSize = 10

  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHotHistory() {}

  addHistory(keyword) {
    const words = this.getHistory()
    let flag = words.includes(keyword)
    if (!flag) {
      const size = words.length
      // 删除数组末尾值
      if (size > 10) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }

  getHotSearchKeyword() {
    return this.request({ url: '/book/hot_keyword' })
  }
}

export default KeywordModel
