# -*- coding: utf-8 -*-

import os
import sys
import uuid

from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse, StreamingResponse

# 添加项目根目录到 sys.path，以便导入 esc_ai_immer_personal_portfolio
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

app = FastAPI()


def debug(s: str):
    print(s, file=sys.stderr)


@app.get("/api/hello")
async def hello_world():
    """
    Hello World API endpoint - 用于测试 FastAPI 集成
    """
    return JSONResponse(content={"message": "Hello from FastAPI!", "status": "success"})


@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    """
    AI SDK v5 使用 SSE (Server-Sent Events) 格式的 Data Stream Protocol
    文档: https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
    """
    import json
    import sys

    # 调试：打印原始请求
    debug("====== Incoming request")
    debug("------ Request Headers")
    for key, value in request.headers.items():
        debug(f"{key}: {value}")
    debug("------ Request Body")
    request_body_data = await request.json()
    request_body_formatted = json.dumps(request_body_data, indent=2, ensure_ascii=False)
    debug(request_body_formatted)

    sys.stderr.flush()

    # AI SDK v5 使用 SSE 格式，每行以 "data: " 开头
    # 文本使用 start/delta/end 三阶段模式
    def ai_sdk_v5_message_generator():
        id = str(uuid.uuid4())
        # 文本开始
        yield f'data: {json.dumps({"type": "text-start", "id": id})}\n\n'

        # 文本内容（可以分多次发送）
        yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": "Hello Alice"})}\n\n'
        # 文本结束
        yield f'data: {json.dumps({"type": "text-end", "id": id})}\n\n'
        # 消息完成标记
        yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
        # SSE 结束标记
        yield "data: [DONE]\n\n"

    # StreamingResponse 返回 SSE 格式的流
    # v5 使用 x-vercel-ai-ui-message-stream 头而不是 x-vercel-ai-data-stream
    response = StreamingResponse(
        ai_sdk_v5_message_generator(),
        media_type="text/event-stream",  # SSE 的 MIME 类型
    )
    response.headers["x-vercel-ai-ui-message-stream"] = "v1"
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Connection"] = "keep-alive"
    return response
