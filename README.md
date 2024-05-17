## XWAYOS DOCS BACKEND

### 启动

```
npm run dev
```

注：node v18.19.0

### build

```
npm run build:prod
```
构建镜像，请先执行打包npm run build:prod

```bash
docker build -t xwayos-docs-backend:v0.1 .
```

### DEPLOY

0.查看桥接网络

```bash
docker network ls
```

1.若无，先创建网络

```bash
docker network create -d bridge xwayos-net
```

2.启动容器

```bash
docker run -itd --volume /home/xway/version-files:/home/version-files --name xwayos-docs-backend --restart=always --network xwayos-net -p 9042:9040 -d xwayos-docs-backend:v0.1
```

3.进入容器

```bash
docker exec -it 4812febf5d87 /bin/bash
```