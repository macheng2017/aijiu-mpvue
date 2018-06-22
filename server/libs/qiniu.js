import qiniu from 'qiniu'
import config from '../config'
import {
  exec
} from 'shelljs'

// qiniu.config.ACCESS_KEY = config.qiniu.AK
// qiniu.config.SECRET_KEY = config.qiniu.SK

// 存储空间名称
const bucket = 'aijiu'
// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
// const accessKey = config.qiniu.AK
// const secretKey = config.qiniu.SK
const accessKey = 'rvMb2GJrTE5b74_F1TZyNrAbcTG1XQnAaLJZXyJ-'
const secretKey = 'j9fh9KCdCMW9_e5q032VnQgbt2RcWAx5kZV5AZFz'
// https://developer.qiniu.com/kodo/sdk/1289/nodejs#5
// 资源管理相关的操作首先要构建BucketManager对象：
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

// 构建覆盖文件上传凭证
export const uptoken = (key) => {
    const options = {
        scope: bucket + ':' + key
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(mac)
}

export const fetchImage = async (url, key) => {
  // const client = new qiniu.rs.Client()
  // promise 封装下
    return new Promise((resolve, reject) => {
    // client.fetch(url, bucket, key, (err, ret) => {
    //   if (err) reject(err)
    //   else resolve(ret)
    // })
    // 使用七牛的shell 脚本
        const bash = `qshell fetch ${url} ${bucket} ${key}`
    // execute shell
        const child = exec(bash, {
            async: true
        })

        child.stdout.on('data', data => {
            console.log(data)
            resolve(data)
        })
    })
}
// 需要把shell安装到全局
// npm i qshell -g

// export class Uploader {
//   constructor(localFile, uploadToken) {
//     this.uploadToken = uploadToken
//     this.localFile = localFile
//     this.config = new qiniu.conf.Config()
//     // config.useHttpsDomain = true
//     // 华东地区的空间qiniu.zone.Zone_z0
//     config.zone = qiniu.zone.Zone_z0
//     // const bucketManager = new qiniu.rs.BucketManager(mac, config)
//     this.resumeUploader = new qiniu.resume_up.ResumeUploader(this.config)
//     this.putExtra = new qiniu.resume_up.PutExtra()
//   }

//   async upload() {

//     // 扩展参数
//     // this.putExtra.params = {
//     //   'x:name': '',
//     //   'x:age': 27,
//     // }
//     this.putExtra.fname = 'testfile.mp4'
//     // 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
//     this.putExtra.resumeRecordFile = 'progress.log'
//     let key = null
//     // 文件分片上传
//     this.resumeUploader.putFile(this.uploadToken.token, this.uploadToken.key, this.localFile, this.putExtra, function (respErr,
//       respBody, respInfo) {
//       if (respErr) {
//         throw respErr
//       }
//       if (respInfo.statusCode == 200) {
//         console.log(respBody)
//       } else {
//         console.log(respInfo.statusCode)
//         console.log(respBody)
//       }
//     })
//   }
// }
