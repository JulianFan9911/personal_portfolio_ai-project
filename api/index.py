# -*- coding: utf-8 -*-

"""
FastAPI backend for AI chat powered by AWS Bedrock.

This module provides the API endpoints that connect the frontend chat UI
to AWS Bedrock's Nova model. It implements the Vercel AI SDK v5 Data Stream
Protocol using Server-Sent Events (SSE) for real-time streaming responses.

Key components:
- /api/hello: Health check endpoint
- /api/chat: Main chat endpoint that processes messages and streams AI responses
"""

import os
import sys
import uuid

# fmt: off
from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse, StreamingResponse
# fmt: on

# Add project root to sys.path for module imports
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

app = FastAPI()


def debug(s: str):
    """Print debug message to stderr (visible in server logs, not in response)."""
    print(s, file=sys.stderr)


@app.get("/api/hello")
async def hello_world():
    """
    Health check endpoint for testing FastAPI integration.

    Returns a simple JSON response to verify the API is running.
    """
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success",
        },
    )


@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    """
    Main chat endpoint that processes user messages and returns AI responses.

    This endpoint implements the Vercel AI SDK v5 Data Stream Protocol using
    Server-Sent Events (SSE). The frontend sends chat messages, and we stream
    back the AI's response in real-time.

    Protocol docs: https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol

    Args:
        request: The incoming HTTP request containing chat messages
        protocol: Stream protocol version (default: "data" for AI SDK v5)
    """
    import json
    import sys

    # --- Debug: Log incoming request for troubleshooting ---
    debug("====== Incoming request")
    debug("------ Request Headers")
    for key, value in request.headers.items():
        debug(f"{key}: {value}")
    debug("------ Request Body")
    request_body_data = await request.json()
    request_body_formatted = json.dumps(request_body_data, indent=2, ensure_ascii=False)
    debug(request_body_formatted)

    sys.stderr.flush()

    # --- Stream response using AI SDK v5 Data Stream Protocol ---
    # SSE format: each line starts with "data: " followed by JSON payload.
    # Text streaming uses a three-phase pattern: start -> delta(s) -> end
    def ai_sdk_message_generator():
        message_id = str(uuid.uuid4())  # Unique ID for this text block

        # Phase 1: Signal that a new text block is starting
        yield f'data: {json.dumps({"type": "text-start", "id": message_id})}\n\n'

        # Phase 2: Send the actual text content (can be split into multiple deltas)
        yield f'data: {json.dumps({"type": "text-delta", "id": message_id, "delta": "Hello Alice"})}\n\n'

        # Phase 3: Signal that the text block is complete
        yield f'data: {json.dumps({"type": "text-end", "id": message_id})}\n\n'

        # Signal that the entire message generation is finished
        yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'

        # SSE stream termination marker
        yield "data: [DONE]\n\n"

    # --- Return SSE streaming response ---
    # AI SDK v5 uses "x-vercel-ai-ui-message-stream" header (not "x-vercel-ai-data-stream")
    response = StreamingResponse(
        ai_sdk_message_generator(),
        media_type="text/event-stream",  # Standard MIME type for Server-Sent Events
    )
    response.headers["x-vercel-ai-ui-message-stream"] = "v1"  # Required for AI SDK v5
    response.headers["Cache-Control"] = "no-cache"  # Disable caching for real-time streaming
    response.headers["Connection"] = "keep-alive"  # Keep connection open for SSE
    return response
