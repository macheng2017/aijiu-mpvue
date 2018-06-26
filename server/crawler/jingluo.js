import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import fs from 'fs'
import {
  resolve
} from 'path'

const getBody = async () => {
    const option = {
        uri: 'http://jlxw.jiudaifu.com',
        transform: body => cheerio.load(body)
    }

    const $ = await rp(option)
    let names = []
    $('.main').find('li[class="menu center"]').each(function () {
        const liDom = $(this)
        let xws = []
        $(this).find('li[class="menu_s center"]').each(function () {
            const xwDom = $(this)
            let str = xwDom.find('a').attr('href')
            xws.push({
                xid: R.split('/')(str)[1],
                // 剔除/r /n /t 这些符号
                name: xwDom.text().replace(/(\r\n)|(\n)|(\t)/g, ''),
                url: str
            })
            // console.log($(this).text())
        })
        let str = liDom.find('a').attr('href')

        names.push({
            jl: {
                jlId: R.split('/')(str)[1],
                name: liDom.find('.menuname').text(),
                url: str
            },
            xw: xws
        })
    })
    fs.writeFileSync(resolve(__dirname, '../database/json/jingluo.json'), JSON.stringify(names, null, 2), 'utf8')
}
// getBody()
// 由于app 上的经络 穴位与 网页版的对不上所以重新爬一遍 网页版的
// 以后在处理错误,现在无论错对,只要有数据可以填上即可,或者通过名称查找穴位这样就可以了

const getInfo = async (id = 1, names) => {
    const option = {
        uri: `http://jlxw.jiudaifu.com/info/${id}`,
        transform: body => cheerio.load(body)
    }
    const $ = await rp(option)
    // console.log(names)
    const liDom = $('.main').find('li')
    names.push({
        jlid: id,
        name: $('h1.center').text(),
        guojidaima: liDom.eq(0).find('div').text(),
        jmCircly: liDom.eq(1).find('div').text(),
        binghou: liDom.eq(2).find('div').text(),
        zhiliao: liDom.eq(3).find('div').text(),
        caozuo: liDom.eq(4).find('div').text(),
        xunxing: liDom.eq(5).find('img').attr('src'),
        zongtu: liDom.eq(6).find('img').attr('src')

    })
}
const fetchInfo = async () => {
    let names = []
    for (let i = 1; i < 16; i++) {
        await (500)
        await getInfo(i, names)
    }
    fs.writeFileSync(resolve(__dirname, '../database/json/jlInfo.json'), JSON.stringify(names, null, 2), 'utf8')
}
// fetchInfo()
// 由于存入数据库的时候必须保证经络下面的穴位id是正确的,
// 如果name可以作为关联字段就可以不用在乎xwid的对错
// 经络下面包含的穴位id 与之前app中获取的 穴位id 不一致,现在匹配下通过名称匹配,然后修改xid
// const matchJson = async () => {
//     const jl = require(resolve(__dirname, '../database/json/jingluo.json'))
//     const xw = require(resolve(__dirname, '../database/json/completeXwDetail.json'))
//     jl.map(v => {
//         v.xw.map(v => {
//             console.log(v.name)
//         })
//     })
// }

// matchJson()

// 重新获取网页版的穴位详情
const xwInfo = async (id = 1, names) => {
    const option = {
        uri: `http://jlxw.jiudaifu.com/xinfo/${id}`,
        transform: body => cheerio.load(body)
    }
    const $ = await rp(option)
  // console.log(names)
    const liDom = $('.main').find('li')
    const str = $('h1.center').text().split('(')
    names.push({
        xid: id,
        name: str[0],
        pinyin: str[1].split(')')[0],
        suoshujingluo: liDom.eq(0).find('div').text().replace(/(\r\n)|(\n)|(\t)/g, ''),
        guojidaima: liDom.eq(1).find('div').text(),
        tedingxue: liDom.eq(2).find('div').text(),
        bieming: liDom.eq(3).find('div').text(),
        dingwei: liDom.eq(4).find('div').text(),
        quxue: liDom.eq(5).find('div').text(),
        disease: liDom.eq(6).find('div').text(),
        aijiucanshu: liDom.eq(7).find('div').text(),
        experience: liDom.eq(8).find('div').text(),
        xueweitu: liDom.eq(9).find('img').attr('src')

    })
}
const fetchXwInfo = async () => {
    let names = []
    for (let i = 1; i < 426; i++) {
        console.log('---------------第' + i + '个----------------')
        await (500)
        await xwInfo(i, names)
    }
    fs.writeFileSync(resolve(__dirname, '../database/json/xwInfo.json'), JSON.stringify(names, null, 2), 'utf8')
}
// fetchXwInfo()
