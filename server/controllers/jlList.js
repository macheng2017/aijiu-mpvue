const { mysql } = require('../qcloud')
module.exports = async ctx => {
    try {
        const jlInfo = await mysql('jingluo').select('jingluo.*')
        const data = jlInfo.map(v => {
            let xwName = v.xwName.split(',')
            return Object.assign({}, v, {
                xwName: xwName
            })
        })
        ctx.state = {
            code: 0,
            data: {
                list: data
            }
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '失败 ' + e.sqlMessage
            }
        }
    }
    // console.log(jlInfo)
}
