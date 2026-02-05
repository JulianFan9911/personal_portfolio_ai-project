# -*- coding: utf-8 -*-

import os
import sys

from fastapi import FastAPI
from fastapi.responses import JSONResponse

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
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )