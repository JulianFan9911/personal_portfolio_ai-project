# -*- coding: utf-8 -*-
"""
FastAPI backend entry point.

This module defines API endpoints for the portfolio application.
"""

import os
import sys

from fastapi import FastAPI
from fastapi.responses import JSONResponse

# Add project root to sys.path so we can import learn_personal_portfolio_ai
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

app = FastAPI()


def debug(s: str):
    """Print debug message to stderr (visible in server logs)."""
    print(s, file=sys.stderr)


@app.get("/api/hello")
async def hello_world():
    """Hello World endpoint for testing FastAPI integration."""
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )