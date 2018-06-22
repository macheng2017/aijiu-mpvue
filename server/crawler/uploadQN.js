import { fetchImage } from '../libs/qiniu'
import {resolve} from 'path'
import randomToken from 'random-token'
import R from 'ramda'
import fs from 'fs'
export const fetchImageFromIMDb = async () => {
    let resUrl = require(resolve(__dirname, '../database/json/fileUrl.json'))
    // console.log(resUrl)
  // 测试 先使用一个对象测试下代码
  // resUrl = [resUrl[0]]
  // 过滤出不能用的
    // resUrl = R.reject(R.propEq('id', '404'))(resUrl)
    // resUrl = JSON.parse(resUrl)
    resUrl = R.reject(R.propEq('"code"', 404))(resUrl)
    console.log(resUrl)
  // // 遍历
  //   resUrl = R.map(
  //   async item => {
  //       try {
  //           let key = `${item.name}/${randomToken(32)}`
  //       // fetch avatar
  //           await fetchImage(item.video_url, key)
  //           console.log(item.video_url)
  //           console.log(key)
  //           console.log('upload done!')
  //       // replace url of qiniu server with in item.profile
  //           item.profile = key
  //       // upload stage photo on the qiniu server
  //       // 长度改为2 比较快的加载到图片
  //       // for (let i = 0; i < 2; i++) {
  //           let _key = `${item.name}/${randomToken(32)}`
  //           await fetchImage(item.thumb_url, _key)
  //           console.log(item.thumb_url)
  //           console.log(_key)
  //         // waiting for 100 ms
  //           await (100)
  //         // replace url of qiniu server created with in item.images
  //           item.thumb_url = _key
  //           // }
  //       } catch (e) {
  //           console.log(e)
  //       }
  //       return item
  //   }
  // )(resUrl)

  //   resUrl = await Promise.all(resUrl)

  // // write the file into the local hardDisk

  //   fs.writeFileSync(resolve(__dirname, '../database/json/complateFileUrl.json'), JSON.stringify(resUrl, null, 2), 'utf8')
}
fetchImageFromIMDb()
