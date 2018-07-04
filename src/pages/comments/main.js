import Vue from 'vue'
import App from './index'

// 生成环境关掉提示
Vue.config.productionTip = false

// 手动挂载到页面
const app = new Vue(App)
app.$mount()

// 配置小程序显示界面
export default {
  config: {
    navigationBarTitleText: '评论列表',
    navigationBarTextStyle: 'light',
    enablePullDownRefresh: true
  }
}
