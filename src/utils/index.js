//  工具函数
import config from '../config'

import * as R from 'ramda'

// 错误日志记录
// const log4js = require('log4js')

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// 为了能使用 async await 把wx.request 封装下
export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data: data,
      method: method,
      url: config.host + url,
      success: function(res) {
        if (res.data.code === 0) {
          // console.log(res.data.data)
          resolve(res.data.data)
        } else {
          // 这样写到这里肯定不对,随后在调整
          showModal('添加失败', `${res.data.data.msg}`)
          reject(res.data)
        }
      }
    })
  })
}
export default {
  formatNumber,
  formatTime
}
export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

// import TWEEN from 'tween.js'
// global.regeneratorRuntime = regeneratorRuntime
// global._ = _
// global.R = R

// 封装下微信常用的方法
const asyncWrap = fn => (options = {}) =>
  new Promise((resolve, reject) => {
    let conf = {
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    }
    // console.log(options)
    wx[fn](R.merge(conf, options))
  })

export const loginAsync = asyncWrap('login')
export const getUserInfoAsync = asyncWrap('getUserInfo')
export const reqAsync = asyncWrap('request')
export const getSystemInfoAsync = asyncWrap('getSystemInfo')
export const payAsync = asyncWrap('requestPayment')
// log4js 错误信息配置
// log4js.configure({
//   appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
//   categories: { default: { appenders: ['cheese'], level: 'error' } }
// })
// export const logger = log4js.getLogger('cheese')
