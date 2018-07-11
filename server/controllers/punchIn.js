// const https = require('https')
const { mysql } = require('../qcloud')
const uuid = require('uuid/v4')

module.exports = async ctx => {
    const { openId } = ctx.request.body
    // console.log(isbn)
    console.log('*****************************')
    console.log(openId)
    try {
        const punchInfo = await mysql('punch')
            .select()
            .where('openId', openId)
            .first()
        console.log(punchInfo)

        if (!punchInfo) {
            const res = await mysql('punch').insert({
                id: uuid(),
                openId: openId,
                firstTime: new Date().getTime(),
                punchTime: new Date().getTime(),
                count: 1,
                maxCount: 1,
                flag: false
            })
            const punchInfo = await mysql('punch')
                .select()
                .where('openId', openId)
                .first()
            if (res.length) {
                ctx.state = {
                    code: 0,
                    data: Object.assign(
                        {
                            msg: '第一次打卡成功'
                        },
                        punchInfo
                    )
                }
                return
            }
        } else {
            // 如果没有超过一天则打卡无效
            const difference = new Date().getTime() - punchInfo.punchTime
            // 已经打过卡直接返回
            if (difference < 1000 * 60 * 60 * 24) {
                ctx.state = {
                    code: 0,
                    data: Object.assign(
                        {},
                        { msg: '没有超过一天,打卡无效' },
                        punchInfo
                    )
                }
                return
            }
            // 判断是否连续打卡,判断是否超过一天没有打卡
            let data = {}
            if (difference / 1000 * 60 * 60 * 24 <= 0) {
                data = {
                    punchTime: new Date().getTime(),
                    count: punchInfo.count + 1,
                    maxCount: punchInfo.maxCount + 1,
                    flag: true
                }
            } else {
                data = {
                    punchTime: new Date().getTime(),
                    count: punchInfo.count + 1,
                    flag: false
                }
            }

            const res = await mysql('punch')
                .where('openId', openId)
                .update(data)
            ctx.state = {
                code: 0,
                data: Object.assign(
                    {
                        msg: '打卡成功'
                    },
                    res
                )
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
