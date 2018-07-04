// const https = require('https')
const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { xwName, openId } = ctx.request.body
    console.log('----------------------')
    console.log(xwName, openId)
    try {
        const mysqlSelect = mysql('comments')
            .select('comments.*', 'cSessionInfo.user_info as userInfo')
            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
        let comments
        if (xwName) {
            // 图书详情评论列表
            comments = await mysqlSelect.where('xwName', xwName)
        } else if (openId) {
            // 根据个人openid筛选
            comments = await mysqlSelect.where('openid', openId)
        }

        // console.log('--------------------')
        // console.log(comments)
        if (comments.length) {
            ctx.state = {
                code: 0,
                data: {
                    list: comments.map(v => {
                        const info = JSON.parse(v.userInfo)
                        return Object.assign({}, v, {
                            title: info.nickName,
                            image: info.avatarUrl
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
