<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" placeholder="请用关键词描述病症或者穴位名称" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
          <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label>
        </div>
        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      </div>
      <div class="weui-cells searchbar-result" v-if="xwList.length > 0" :hidden="!inputShowed"   >
        <!-- <a v-for=" item in xwList" :key="item.id" :url="parasXW" :xw-name="item.name" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>{{item.name}}</div>
          </div>
        </a> -->
         <Xw :xw="xw.name" v-for="xw in xwList" :key="xw.id"></Xw>
      </div>
      <div class="msg" v-if="msgShow">抱歉!没有相关信息!换个词试试吧</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
// import Fly from 'flyio/dist/npm/wx'
import Xw from '@/components/Xw.vue'
import { get } from '@/utils'
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: '',
      xwList: [],
      msgShow: false
    }
  },
  computed: {},
  methods: {
    showInput() {
      this.inputShowed = true
    },
    hideInput() {
      this.inputVal = ''
      this.xwList = []
      this.inputShowed = false
    },
    clearInput() {
      this.inputVal = ''
      this.xwList = []
    },
    inputTyping(e) {
      console.log(e)
      this.inputVal = e.mp.detail.value
    },
    parasXW(e) {
      // 加上了一个斜杠解决了,跳转的时候总是有前面的一坨
      console.log('------------------------')
      console.log(e)
      return `/pages/detail/main?name=${encodeURI(e.mp.detail.value)}`
    },
    async getSearch() {
      wx.showToast({
        title: '玩命加载中--',
        icon: 'loading',
        duration: 5000
      })
      // let res
      // try {
      //   let fly = new Fly()
      //   res = await fly.get('/weapp/search', { searchKey: this.inputVal })
      // } catch (error) {
      //   console.log(error)
      // }
      let res = {}
      // 如果最终输入的是汉子则查询
      let str = this.inputVal.replace(/[^\u4e00-\u9fa5]/gi, '').trim()
      if (str.length > 0) {
        console.log('--------true--------' + str)
        res = await get('/weapp/search', {
          searchKey: encodeURI(this.inputVal)
        })
      }
      if (res.data.length <= 0) {
        this.msgShow = true
      }
      this.xwList = res.data
      console.log('-------------')
      console.log(this.xwList)
      wx.hideToast()
    }
  },
  watch: {
    inputVal(news, olds) {
      console.log('change....' + news)
      if (news.trim().length > 0) {
        this.debounceGetSearch()
        this.msgShow = false
      } else if (news.trim().length <= 0) {
        this.xwList = []
      }
      if (news.trim().length === 0) {
        this.msgShow = false
      }
    }
  },
  created() {
    this.debounceGetSearch = _.debounce(this.getSearch, 1000)
  },
  components: {
    Xw
  }
}
</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.msg {
  font-size: 16px;
}
</style>
