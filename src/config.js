// 配置项
const host = 'http://localhost:5757'
// 从本地切换为线上开发环境域名
// const host = 'https://922753770.guolinaijiu.com'

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  articleUrl: 'http://www.guolinaijiu.com',
  imageCDN: 'http://mini.guolinaijiu.com/'
}
export default config
