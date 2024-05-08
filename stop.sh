#!/bin/bash

# 检查是否存在服务器 PID 文件
if [ -f server.pid ]; then
    # 从 PID 文件中读取服务器的进程 ID
    pid=$(<server.pid)
    # 检查服务器进程是否在运行
    if ps -p $pid > /dev/null; then
        # 发送 SIGTERM 信号给服务器进程，请求其停止
        kill $pid
        echo "Server stopped."
    else
        echo "Server is not running."
    fi
    # 删除 PID 文件
    rm server.pid
else
    echo "Server PID file not found. Server might not be running."
fi
