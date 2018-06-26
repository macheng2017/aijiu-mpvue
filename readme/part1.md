### 顺序查找穴位 总共 425 个

api.jiudaifu.com/v2/data/xuewei/application?target_type=xw&target_id=425

### 获取经络

http://data.jiudafu.com/jingluo/jmfilelist.json

# 获取图片视频

api.jiudaifu.com/v2/data/jlxw/extra?xwname=%E8%BF%8E%E9%A6%99

```json
{
  "error": 0,
  "msg": "",
  "data": {
    "id": 369,
    "name": "迎香",
    "video_url": "http://video.jiudafu.com/jlxw/迎香.mp4",
    "video_etag": "5CE6A23AFB166B3FF1E5E244DFEFA135",
    "thumb_url": "http://video.jiudafu.com/jlxw/迎香.jpg",
    "thumb_etag": "718403A10313AF519554B74AF0F7E71D",
    "code": 200
  }
}
```

## 视频

http://video.jiudafu.com/jlxw/%e9%98%b4%e9%99%b5%e6%b3%89.mp4

## 图片

http://video.jiudafu.com/jlxw/%E8%BF%8E%E9%A6%99.jpg

data.jiudafu.com/jingluo/images0/%E5%BC%BA%E9%97%B4%E5%90%8E%E9%A1%B6%E7%99%BE%E4%BC%9A_opt.jpeg

"root_url": "http://data.jiudafu.com/jingluo/",
"img_url": "http://data.jiudafu.com/jingluo/images/",
"img_ext": ".jpic",

将数据入库 放入 mysql 数据库

1.  分两张表 xwDetail xwUrl
2.  查询的时候需要联表查询
3.  json 存入数据库是将其分字段存入

## 初始化数据库

## 修改 server 下面的 config 文件

## 添加测试页面测试是否搭建完成

### 添加 pug 包 sass-loader

npm i pug sass-loader node-sass --save-dev
