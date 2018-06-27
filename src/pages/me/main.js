import Vue from 'vue'
import App from './index'

// 手动挂载到页面
const app = new Vue(App)
app.$mount()

// 配置小程序显示界面
export default {
  config: {
    navigationBarTitleText: '我的信息',
    navigationBarTextStyle: 'light',
    navigationBarBackgroundColor: '#42C593'
  }
}
