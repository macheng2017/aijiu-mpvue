import Vue from 'vue'
import App from './index'
import store from '@/store'
// 生成环境关掉提示
Vue.config.productionTip = false

// 手动挂载到页面
const app = new Vue({ store, ...App })
app.$mount()

// 配置小程序显示界面
export default {
  config: {
    navigationBarTitleText: '文章列表',
    navigationBarTextStyle: 'light',
    enablePullDownRefresh: true
  }
}
