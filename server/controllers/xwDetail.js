const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const { name } = ctx.request.query

    const detail = await mysql('xwDetail')
        .select('xwDetail.*', 'xwUrl.video_url', 'xwUrl.thumb_url')
        .join('xwUrl', 'xwDetail.name', 'xwUrl.name')
        .where('xwDetail.name', decodeURI(name))
        .first()
    // 由于查询出来是一个只有一个元素的[]可以使用.first()
    // 直接使用联表查询由于是mysql数据库,存储的json 都是字符串
    // 而且 里面的数据太多了需要筛选一部分
    // const info = JSON.parse(detail.user_info)
    console.log(detail)
    ctx.state.data = Object.assign({}, detail, {
        disease_treat: detail.disease_treat.split(','),
        experience_treat: detail.experience_treat.split(',')
    })

    // ctx.state.data = Object.assign({}, detail, {
    //     // 将标签根据逗号切开,简介根据换行符切开
    //     tags: detail.tags.split(','),
    //     summary: detail.summary.split('\n'),
    //     user_info: {
    //         name: info.nickName,
    //         image: info.avatarUrl
    //     }
    // })
    // await mysql('xwDetail')
    //     .where('id', id)
    //     .increment('count', 1)
}
