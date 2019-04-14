import config from '@/config'

const tips = {
  1: '抱歉,出现了一个错误',
  1005: '授权失败',
  3000: '未知错误'
}
class Http {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.host + url,
      method,
      data,
      // header: {
      //   appkey: config.appkey
      // },
      success: res => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // console.log('res ', res.data.data)
          resolve(res.data.data)
        } else {
          reject()
          const errorCode = res.data.code
          this._showError(errorCode)
        }
      },
      fail: err => {
        reject(err)
        console.log(err)
        this._showError(1)
      }
    })
  }
  _showError(errorCode) {
    if (!errorCode) {
      errorCode = 1
    }
    const tip = tips[errorCode]
    wx.showToast({
      title: tip || tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { Http }
