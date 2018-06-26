
create database gl_aijiu character set utf8 collate utf8_general_ci;

DROP TABLE IF EXISTS `xwDetail`;
create table xwDetail (
id int not null auto_increment primary key,
name varchar(100) not null,
jingluo  varchar(100),
pinyin  varchar(100),
py  varchar(100),
guojidaima  varchar(100),
tedingxue  varchar(500),
bieming  varchar(500),
dingwei  varchar(1000),
quxue  varchar(1000),
zhuzhibingzheng varchar(1000),
aijiucanshu  varchar(1000),
jingyanyingyong varchar(1000),
xueweitu  varchar(200),
xid  varchar(100),
disease  varchar(1000),
disease_treat  varchar(1000),
experience  varchar(1000),
experience_treat varchar(1000),
moxa  varchar(1000),
massage  varchar(1000),
massage_video  varchar(100),
massage_cover  varchar(100),
acupuncture varchar(1000),
acupuncture_video  varchar(100),
acupuncture_cover varchar(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table xwUrl(
    id int not null auto_increment primary key,
    xid int not null,
    name varchar(100) not null,
    video_url varchar(200),
    thumb_url varchar(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table jingluo (
  id int not null auto_increment primary key,
  jlId int not null,
  name varchar(100) not null,
  xwName varchar(1000)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `jlInfo`;
create table jlInfo(
 id int not null auto_increment primary key,
 jlId int not null,
 name varchar(100),
 guojidaima varchar(100),
 jmCircly varchar(1000),
 binghou varchar(1000),
 zhiliao varchar(1000),
 caozuo varchar(1000),
 xunxing varchar(100),
 zongtu varchar(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
