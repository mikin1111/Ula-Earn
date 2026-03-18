#!/bin/bash
# 启动本地服务并在浏览器中打开
cd "$(dirname "$0")"
PORT=9090

# 查找可用端口
while lsof -i :$PORT >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

echo "正在启动 HTTP 服务 (端口 $PORT)..."
python3 -m http.server $PORT &
sleep 1

URL="http://localhost:$PORT/"
echo ""
echo "请在浏览器中打开: $URL"
open "$URL" 2>/dev/null || true
