import Vue from 'vue'
import App from './App'
import store from '@/store'
import '../static/css/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'
// 传入store
const app = new Vue({ store, ...App })
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/article/main',
      'pages/me/main',
      'pages/comments/main',
      'pages/articleDetail/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#42C593',
      navigationBarTitleText: '郭林艾灸',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#4ADB97',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '主页',
          iconPath: 'static/img/icon_home_nor.png',
          selectedIconPath: 'static/img/icon_home_sel.png'
        },
        {
          pagePath: 'pages/article/main',
          text: '文章',
          iconPath: 'static/img/icon_learn_nor.png',
          selectedIconPath: 'static/img/icon_learn_sel.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/icon_learn_nor.png',
          selectedIconPath: 'static/img/icon_learn_sel.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我的信息',
          iconPath: 'static/img/icon_my_nor.png',
          selectedIconPath: 'static/img/icon_my_sel.png'
        }
      ]
    }
  }
}
