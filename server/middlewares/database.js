import R from 'ramda'
import fs from 'fs'
import {resolve} from 'path'
import knex from 'knex'

let xwDetail = require(resolve(__dirname, '../database/json/completeXwDetail.json'))
let xwUrl = require(resolve(__dirname, '../database/json/complateFileUrl.json'))

const mysql = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'gl_aijiu'
    }
})
//  去掉id
// xwDetail = R.map(v => {
//     return R.omit(['id'])(v)
// })(xwDetail)
// xwDetail = [xwDetail[0]]
// console.log(xwDetail)
// console.log(xwDetail)
const iniMysql = async () => {
    xwDetail.map(async v => {
        try {
            await mysql('xwDetail').insert({
                name: v.name,
                jingluo: v.jingluo,
                pinyin: v.pinyin,
                py: v.py,
                guojidaima: v.guojidaima,
                tedingxue: v.tedingxue,
                bieming: v.bieming,
                dingwei: v.dingwei,
                quxue: v.quxue,
                zhuzhibingzheng: v.zhuzhibingzheng,
                aijiucanshu: v.aijiucanshu,
                jingyanyingyong: v.jingyanyingyong,
                xueweitu: v.xueweitu,
                xid: v.xid,
                disease: v.disease,
                disease_treat: v.disease_treat,
                experience: v.experience,
                experience_treat: v.experience_treat,
                moxa: v.moxa,
                massage: v.massage,
                massage_video: v.massage_video,
                massage_cover: v.massage_cover,
                acupuncture: v.acupuncture,
                acupuncture_video: v.acupuncture_video,
                acupuncture_cover: v.acupuncture_cover

            })
        } catch (error) {
            console.log(error)
        }
    })

    xwUrl.map(async v => {
        try {
            await mysql('xwUrl').insert({
                xid: v.id,
                name: v.name,
                video_url: v.video_url,
                thumb_url: v.thumb_url
            })
        } catch (error) {
            console.log(error)
        }
    })
}
iniMysql()
