#!/bin/bash
echo "start bash: 启动服务"
nohup NODE_ENV=production node index.js
echo $! > server.pid
echo "start bash: 服务已启动"