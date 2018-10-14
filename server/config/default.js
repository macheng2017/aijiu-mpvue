module.exports = {
    port: 5757,
    mysql: {
        host: '127.0.0.1', // mysql数据库host
        port: 3306, // 端口
        user: 'root',
        db: 'aijiu', // 数据库名称
        pass: '123456',
        char: 'utf8mb4'
    },
    qiniu: {
        // 七牛云相关配置
        AK: 'xxxxxx',
        SK: 'xxxxx'
    },
    mina: {
        // 小程序相关配置
        appid: 'xxxx0',
        secret: 'xxxxxxx9'
    }
}
// 使用的时候,填写完整并复制这个文件更名为index.js即可
