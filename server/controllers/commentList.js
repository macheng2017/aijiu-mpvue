// const https = require('https')
import mysql from '../database/mysql'
module.exports = async ctx => {
    const { xwName, openId } = ctx.request.body
    console.log('----------------------')
    console.log(xwName, openId)
    try {
        const mysqlSelect = mysql('comments')
            .select('comments.*', 'users.nickName', 'users.avatarUrl')
            .join('users', 'comments.openid', 'users.openid')
        let comments
        if (xwName) {
            // 图书详情评论列表
            comments = await mysqlSelect.where('xwName', xwName)
        } else if (openId) {
            // 根据个人openid筛选
            comments = await mysqlSelect.where('comments.openid', openId)
        }

        // console.log('--------------------')
        // console.log(comments)
        if (comments.length) {
            ctx.state = {
                code: 0,
                data: {
                    list: comments.map(v => {
                        // const info = JSON.parse(v.userv)
                        return Object.assign({}, v, {
                            title: v.nickName,
                            image: v.avatarUrl
                        })
                    }),
                    msg: 'success'
                }
            }
            return
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '失败 ' + e.sqlMessage
            }
        }
    }
}
