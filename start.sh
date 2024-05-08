#!/bin/bash
echo "start bash: 启动服务"
nohup node ./server/index.js &

echo $! > server.pid

echo "start bash: 服务已启动"