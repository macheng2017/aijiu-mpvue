import { fetchImage } from '../libs/qiniu'
import {resolve} from 'path'
import randomToken from 'random-token'
import R from 'ramda'
import fs from 'fs'

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
// const dataType = (obj) => {
//     if (obj === null) return 'Null'
//     if (obj === undefined) return 'Undefined'
//     return Object.prototype.toString.call(obj).slice(8, -1)
// }
// /**
// * 处理对象参数值，排除对象参数值为”“、null、undefined，并返回一个新对象
// **/
// const dealObjectValue = (obj) => {
//     var param = {}
//     if (obj === null || obj === undefined || obj === '') return param
//     for (var key in obj) {
//         if (dataType(obj[key]) === 'Object') {
//             param[key] = dealObjectValue(obj[key])
//         } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
//             param[key] = obj[key]
//         }
//     }
//     return param
// }

// 最终没有使用 网上找的,这里要的是一个数组,上面返回的是一个对象不合适,可以拆开分别传入,稍麻烦
export const fetchImageFromIMDb = async () => {
    let resUrl = require(resolve(__dirname, '../database/json/xwInfo.json'))
    // console.log(resUrl)
  // 测试 先使用一个对象测试下代码
  // resUrl = [resUrl[0]]
  // 过滤出不能用的
    // resUrl = R.reject(R.propEq('id', '404'))(resUrl)
    // resUrl = JSON.parse(resUrl)
    // resUrl = dealObjectValue(resUrl)
    // console.log(resUrl)
    // resUrl = R.reject(R.propEq('code', 404))(resUrl)
  // 遍历
    resUrl = R.map(
    async item => {
        try {
            let key = `xw_ad${item.xid}/${randomToken(32)}`
        // fetch avatar
            await fetchImage(encodeURI(item.xueweitu), key)
            console.log(item.xueweitu)
            console.log(key)
            console.log('upload done!')
            await (1000)
        // replace url of qiniu server with in item.profile
            item.xueweitu = key
        // upload stage photo on the qiniu server
        // 长度改为2 比较快的加载到图片
        // for (let i = 0; i < 2; i++) {
            // let _key = `jl${item.jlid}/${randomToken(32)}`
            // await fetchImage(encodeURI(item.zongtu), _key)
            // console.log(item.zongtu)
            // console.log(_key)
          // waiting for 100 ms
          // replace url of qiniu server created with in item.images
            // item.zongtu = _key
            // }
        } catch (e) {
            console.log(e)
        }
        return item
    }
  )(resUrl)

    resUrl = await Promise.all(resUrl)

  // write the file into the local hardDisk

    fs.writeFileSync(resolve(__dirname, '../database/json/complateXwInfo.json'), JSON.stringify(resUrl, null, 2), 'utf8')
}
// fetchImageFromIMDb()

