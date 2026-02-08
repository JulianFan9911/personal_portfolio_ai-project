# Config Management: Making Your Code Ready to Scale

> The feature works. But before adding more, let's "step back and refactor."

## Overview

In the previous lesson, we deployed our AI chat to Vercel. It works great. Is the task done?

For amateur developers, yes. But for professional developers, this is just the beginning.

In this lesson, we do two things that "seem unnecessary but are important":

1. **Config Management** — Centralize configuration values to prepare for future scaling
2. **Code Refactoring** — Make the main function read like English, extract reusable code into separate modules

## Learning Objectives

This lesson is not about "how to write code" but about **why we organize code this way**. This is a design philosophy lesson.

After completing this lesson, you will be able to:

1. **Understand Single Source of Truth** — Know why "define a value in only one place" is good design
2. **Understand Code Reuse** — Extract common logic into separate modules for reuse
3. **Read Clean Main Functions** — Reading `index.py` should be like reading English, with each step crystal clear

## Prerequisites

- Completed the previous lesson (deployment successful, AI chat working on Vercel)
- Understand the runtime detection concept

---

## Key Concepts

### 1. Why Config Management?

Imagine this situation in your codebase:

```python
# boto_ses.py
boto_ses = boto3.Session(region_name="us-east-1", ...)

# some_other_file.py
client = boto3.client("s3", region_name="us-east-1")

# yet_another_file.py
REGION = "us-east-1"
```

Now your boss says: "We're migrating to Tokyo. Change it to `ap-northeast-1`."

You need to:
1. Find every occurrence of `us-east-1`
2. Change them one by one
3. Pray you didn't miss any

This is the pain of **scattered configuration**.

**Core Principle: Single Source of Truth**

> **If a value might change, it should be defined in only one place. Everywhere else should reference it.**

The rule is simple: **If changing a string/value requires editing multiple files, that value should be abstracted into config.**

### 2. Config Pattern: dataclass + factory method

Check out our solution in [config.py](./learn_personal_portfolio_ai/config.py):

```python
@dataclasses.dataclass
class Config:
    aws_region: str | None = dataclasses.field(default=None)
    aws_access_key_id: str | None = dataclasses.field(default=None)
    aws_secret_access_key: str | None = dataclasses.field(default=None)
    max_message_length: int = dataclasses.field(default=1000)

    @classmethod
    def new(cls):
        if runtime.is_local():
            return cls.new_in_local_runtime()
        elif runtime.is_vercel():
            return cls.new_in_vercel_runtime()

config = Config.new()
```

**Using it is just one line:**

```python
from learn_personal_portfolio_ai.config import config

region = config.aws_region
max_len = config.max_message_length
```

### 3. Code Refactoring: Make the Main Function Read Like English

Check out the refactored [api/index.py](./api/index.py):

```python
@app.post("/api/chat")
async def handle_chat_data(request: Request):
    # Step 1: Log incoming request
    request_body_data = await debug_ai_sdk_request(request=request)

    # Step 2: Parse request
    request_body = RequestBody(**request_body_data)

    # Step 3: Check message length (commented out, you'll enable it!)
    # last_user_message = get_last_user_message_text(request_body)
    # if last_user_message and len(last_user_message) > config.max_message_length:
    #     ...

    # Step 4: Initialize chat session
    chat_session = ChatSession(...)

    # Step 5: Call Bedrock
    response = chat_session.send_message([])

    # Step 6: Return streaming response
    return StreamingResponse(ai_sdk_message_generator(output_text=output_text), ...)
```

**This is what good code looks like:** Reading the main function is like reading English. Step 1, Step 2, Step 3... each step is crystal clear.

**Core Ideas:**

- **Main function only has flow control** — Each step is a function call
- **Detailed logic lives in separate modules** — For reuse and testing

### 4. The Power of Reuse

Check out the functions in [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py):

```python
# This function is reused twice!
def ai_sdk_message_generator(output_text: str):
    """Generate AI SDK v5 format SSE stream"""
    message_id = str(uuid.uuid4())
    yield f'data: {json.dumps({"type": "text-start", "id": message_id})}\n\n'
    yield f'data: {json.dumps({"type": "text-delta", "id": message_id, "delta": output_text})}\n\n'
    yield f'data: {json.dumps({"type": "text-end", "id": message_id})}\n\n'
    yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
    yield "data: [DONE]\n\n"
```

This function is used twice in `index.py`:
1. When returning normal AI responses
2. When returning "Message too long" errors

If this logic were written twice in `index.py`, when the AI SDK protocol changes, you'd have to update two places. Extracted as a function, you only update one place.

**This is the power of reuse: change once, effective everywhere.**

### 5. Module Responsibility Breakdown

- [api/index.py](./api/index.py) — Main function, only flow control
- [config.py](./learn_personal_portfolio_ai/config.py) — Configuration management
- [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py) — AI SDK format conversion, debugging, SSE generation
- [boto_ses.py](./learn_personal_portfolio_ai/boto_ses.py) — AWS client initialization
- [utils.py](./learn_personal_portfolio_ai/utils.py) — General utility functions

Each module does one thing, and does it well.

---

## Exercises

### Exercise 1: Read the Refactored Code

**Goal:** Understand the code organization.

1. Open [api/index.py](./api/index.py), read through the `handle_chat_data` function
   - Notice how it reads like English? What does each step do?
   - Find the commented-out "Check message length" section

2. Open [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py), find these two functions:
   - `get_last_user_message_text()` — Extracts the last user message
   - `ai_sdk_message_generator()` — Generates SSE stream

3. Think: Why are these functions in `ai_sdk_adapter.py` instead of `index.py`?

### Exercise 2: Enable Message Length Limit

**Goal:** Enable a config feature hands-on, experience the power of reuse.

We added `max_message_length = 1000` in config to limit user message length. The check logic is already written but commented out.

**Your task:**

1. Open [config.py](./learn_personal_portfolio_ai/config.py), find the `max_message_length` field

2. Open [api/index.py](./api/index.py), find this commented code:
   ```python
   # --- Check message length ---
   # Uncomment below to enable max message length check
   # last_user_message = get_last_user_message_text(request_body)
   # if last_user_message and len(last_user_message) > config.max_message_length:
   #     error_msg = f"Message too long..."
   #     response = StreamingResponse(
   #         ai_sdk_message_generator(output_text=error_msg),  # Reuse!
   #         ...
   #     )
   #     return response
   ```

3. Uncomment that code

4. Start the dev server and test:
   ```bash
   mise run dev
   ```
   - Send a normal message → Should work normally
   - Send a message over 1000 characters → Should return "Message too long" error

**Notice:** The error response uses `ai_sdk_message_generator()` — the same function as normal responses! That's reuse.

### Exercise 3: Run Tests

```bash
mise run test-python
```

The test code is in [tests_python/test_config.py](./tests_python/test_config.py). It verifies that `Config.new()` can successfully create an instance.

---

## Reflection

In this lesson, we did two things:

1. **Config Management** — Centralized configuration values in one place
2. **Code Refactoring** — Extracted reusable logic into separate modules

These changes seem small, but they make the code **ready to scale**:

- Need a new config? Edit `config.py`, one file
- AI SDK protocol changes? Edit `ai_sdk_adapter.py`, one file
- New teammate needs to understand the code? Read the `index.py` main function, that's enough

When your project grows from 3 files to 30, from 1 developer to 10, you'll thank yourself for doing these "seemingly unnecessary" things today.

---

## Mentor's Note

**Why this exercise matters:**

Today's changes seem small, but I want you to understand two design philosophies:

**1. Single Source of Truth**

A value is defined in only one place. Everywhere else is a reference.

**2. Main Function Reads Like English**

Good code, the main function should let people understand the flow at a glance:
- Step 1: Parse request
- Step 2: Check length
- Step 3: Call AI
- Step 4: Return response

How exactly to "parse request"? How to "call AI"? Those details go in separate modules. The main function only "directs," it doesn't "do the work."

**Judging Code Quality:**

> "If requirements change, how many files do I need to modify?"

If the answer is "one," your design is good.

---

## Quick Reference

**Key files:**
- [config.py](./learn_personal_portfolio_ai/config.py) — Configuration management
- [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py) — AI SDK adapter
- [api/index.py](./api/index.py) — Main function entry point

**Using Config:**
```python
from learn_personal_portfolio_ai.config import config

region = config.aws_region
max_len = config.max_message_length
```

**Run tests:**
```bash
mise run test-python
```
