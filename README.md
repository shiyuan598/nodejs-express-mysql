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
docker run -itd --volume /home/xway/version-files:/home/version-files --name xwayos-docs-backend --restart=always --network xwayos-net -p 9042:9040 -d xwayos-docs-backend:v0.1
```

3.进入容器

```bash
docker exec -it 4812febf5d87 /bin/bash
```
