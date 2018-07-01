import Vue from 'vue'
import App from './index'
import store from '@/store'
const app = new Vue({ store, ...App })
// const app = new Vue(App)
app.$mount()

// 配置小程序显示界面
export default {
  config: {
    navigationBarTextStyle: 'light',
    navigationBarBackgroundColor: '#42C593'
  }
}
