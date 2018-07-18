// const configs = require('../../config/index')
import configs from '../../config/index'
// 将knex 简单封装下,将config中的数据库配置,带入其中
// 这样在其他地方调用就不用频繁输入数据库连接信息
export default require('knex')({
    client: 'mysql',
    connection: {
        host: configs.mysql.host,
        port: configs.mysql.port,
        user: configs.mysql.user,
        password: configs.mysql.pass,
        database: configs.mysql.db,
        charset: configs.mysql.char
    }
})
