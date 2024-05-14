# XWAYOS DOCS

### 启动

```
node app.js
```

注：node v14.20.0

### 构建

```
ncc build app.js -m -o dist
```

需要@vercel/ncc 包

```
npm install -g @vercel/ncc
```

### DEPLOY

0.查看桥接网络

```bash
docker network ls
```

若无，先创建网络

```bash
docker network create -d bridge xwayos-net
```

1.构建镜像

```bash
docker build -t xwayos-docs-backend:v0.1 .
```

2.启动容器

```bash
docker run -itd --volume /home/xway/version-files:/home/version-files --name xwayos-docs-backend --network xwayos-net -p 9042:9040 -d xwayos-docs-backend:v0.1
```

3.进入容器

```bash
docker exec -it 4812febf5d87 /bin/bash
```

接口说明：

| 访问地址                                                             | 请求类型 | 参数                                                                  | 示例参数                                                                                                                                                  | 结果示例                                                                                                                                                                                                                                                                                                                                                                                                                         | 接口作用                           |
| -------------------------------------------------------------------- | -------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| /api/feedback/issue/list?version=1.1&start=2024-01-01&end=2024-12-31 | GET      | version, 可选, start, 可选, end, 可选                                 | version=1.1, start=2024-01-01, end=2024-12-31                                                                                                             | { "code": 0, "data": [ { "issueId": 2, "issueVersion": "1.1", "issueTitle": "Test Issue 2", "issueContent": "Content of Test Issue 2", "issueAttachment": "attachment2.pdf", "issueCreatetime": "2024-05-12T18:28:57.000Z", "issueUpdatetime": "2024-05-12T18:28:57.000Z", "issueState": 1, "replyId": 2, "replyIssueId": 2, "replyContent": "Reply to Issue 2", "replyAttachment": "reply_attachment2.pdf" } ], "msg": "成功" } | 获取符合条件的问题列表             |
| /api/feedback/issue/:id                                              | GET      | 无                                                                    | 无                                                                                                                                                        | { "code": 0, "data": "成功" }                                                                                                                                                                                                                                                                                                                                                                                                    | 根据问题 ID 获取特定问题的详细信息 |
| /api/feedback/issue/add                                              | POST     | version, 必需, title, 必需, content, 必需, attachment, 可选           | { "version": "1.1", "title": "Test Issue", "content": "This is a test issue content.", "attachment": "attachment.pdf" }                                   | { "code": 0, "data": "Issue added successfully", "msg": "成功" }                                                                                                                                                                                                                                                                                                                                                                 | 添加新问题                         |
| /api/feedback/issue/update                                           | POST     | id, 必需, version, 必需, title, 必需, content, 必需, attachment, 可选 | { "id": 1, "version": "1.1", "title": "Updated Test Issue", "content": "This is an updated test issue content.", "attachment": "updated_attachment.pdf" } | { "code": 0, "data": "Issue updated successfully", "msg": "成功" }                                                                                                                                                                                                                                                                                                                                                               | 更新问题的信息                     |
| /api/feedback/issue/delete                                           | POST     | id, 必需                                                              | { "id": 1 }                                                                                                                                               | { "code": 0, "data": "Issue deleted successfully", "msg": "成功" }                                                                                                                                                                                                                                                                                                                                                               | 删除指定的问题                     |
| /api/feedback/reply/add                                              | POST     | issueId, 必需, content, 必需, attachment, 可选                        | { "issueId": 1, "content": "Reply to Issue 1", "attachment": "reply_attachment.pdf" }                                                                     | { "code": 0, "data": "Reply added successfully", "msg": "成功" }                                                                                                                                                                                                                                                                                                                                                                 | 添加针对特定问题的回复             |
| /api/feedback/reply/update                                           | POST     | id, 必需, content, 必需, attachment, 可选                             | { "id": 1, "content": "Updated reply content", "attachment": "updated_reply_attachment.pdf" }                                                             | { "code": 0, "data": "Reply updated successfully", "msg": "成功" }                                                                                                                                                                                                                                                                                                                                                               | 更新回复的信息                     |
| /api/feedback/reply/delete                                           | POST     | id, 必需                                                              | { "id": 1 }                                                                                                                                               | { "code": 0, "data": "Reply deleted successfully", "msg": "成功" }                                                                                                                                                                                                                                                                                                                                                               | 删除指定的回复                     |
