import Vue from 'vue'
import App from './App'
import store from '@/store'
import '../static/css/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'
// 传入store
const app = new Vue({ store, ...App })
app.$mount()
