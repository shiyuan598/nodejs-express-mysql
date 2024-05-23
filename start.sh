#!/bin/bash
echo "start bash: 启动服务"
NODE_ENV=production nohup node index.js
echo $! > server.pid
echo "start bash: 服务已启动"