# wsq.cool backend

1. 总体是一个通用的博客系统,  可少许定制.  完成后会夹杂一些私货在上面.
2. 将默认带一套GUI,  API全开放, 可以基于这个自己做新的界面.

## 架构

Typescript + [GraphQL Yoga](https://github.com/prismagraphql/graphql-yoga)  + [TypeORM](http://typeorm.io) .  摸索了很久, 算是现阶段比较理想的组合.  

详细架构说明转到: https://github.com/myWsq/grpahql-server-startkit.

使用 [Gun](https://github.com/amark/gun) 缓存消息队列.  JavaScript编写的键值对内存数据库, 比Redis更加轻量.

默认GUI将使用Vue编写并由express提供静态文件.

## 进度

- [x] 鉴权系统(登录, 重置)
- [x] 文章获取(全文搜索, 排序, 分页)
- [ ] 文章点赞
- [ ] 文章CRUD
- [ ] 评论CRUD
- [x] 防爆破