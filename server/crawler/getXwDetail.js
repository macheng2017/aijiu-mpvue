const rp = require('request-promise')
const R = require('ramda')
const fs = require('fs')
const path = require('path')
const getXwDetail = async (id) => {
    const options = {
        uri: 'http://api.jiudaifu.com/v2/data/xuewei/application',
        qs: {
            target_id: id,
            target_type: 'xw'
        },
        json: true
    }
    let res
    try {
        const getCurrentData = R.compose(
          // R.path(['notes', 'comments']),
          // R.omit(['notes']),
          // 删除指定路径下的属性以及值
          // R.dissocPath(['notes', 'comments']),
          R.dissocPath(['notes', 'fav_users']),
          R.prop('data')
          )
        res = await rp(options)
        return getCurrentData(res)
    } catch (error) {
        console.log(error)
    }
}
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
// console.log(res)
const xwList = async () => {
    let arrRes = []
    try {
        for (let i = 1; i < 426; i++) {
            try {
                await sleep(1000)
                let res = await getXwDetail(i)
                console.log('----------------------------------第 ' + i + ' 个----------------------------------')
                // res = JSON.stringify(res)
                // console.log(res)
                arrRes.push(res)
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
    fs.writeFileSync(path.resolve(__dirname, '../database/json/xwDetail.json'), JSON.stringify(arrRes, null, 2), 'utf8')
}
// xwList()

// 爬取详情中的图片

// 1.获取到穴位的数组,
// 2.根据数组查询到相应穴位的图片与视频连接,
// 3.并将其保存到json文件当中
const getXwImg = async () => {
    const xwDetail = require(path.resolve(__dirname, '../database/json/xwDetail.json'))
    // console.log(xwDetail)
    const imgs = R.map(v => {
        return v.name
    }
  )
    const xwNames = imgs(xwDetail)
    const getRes = async (name) => {
        await sleep(1000)
        const uri = `http://api.jiudaifu.com/v2/data/jlxw/extra?xwname=${encodeURI(name)}`
        return await rp(uri)
    }
    const imgUrl = R.compose(
      R.omit(['video_etag', 'thumb_etag']),
      R.pick(['data']),
      R.map(getRes)
    )
    console.log(imgUrl(xwNames[0]))
}
getXwImg()
