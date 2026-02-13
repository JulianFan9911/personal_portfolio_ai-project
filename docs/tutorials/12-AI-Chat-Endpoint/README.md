# Integrating AI into Your Application: From Scripts to Product

> You've learned to call APIs, you've learned Prompt Caching—now it's time to put that knowledge into a real product.

## Overview

In previous lessons, we've been experimenting with scripts—calling the Bedrock API, observing Prompt Cache behavior. Those scripts helped us understand the principles, but they're not production code.

What does a real product look like? Users type questions in a frontend interface, the backend receives the request, calls the AI, and returns the response to the frontend. There's a lot of "translation" work in between: the data format from the frontend doesn't match what Bedrock expects, multi-turn conversation history needs to be managed, AWS connections need to be configured...

In this lesson, we'll "assemble" everything we've learned to make the frontend app actually use AWS Bedrock's AI inference capabilities.

## Learning Objectives

After completing this lesson, you will be able to:

1. **Understand the value of encapsulation** — Know why scattered code should be organized into reusable tools
2. **Understand the necessity of data transformation** — Recognize that frontend and backend use different data formats, requiring adapters to "translate"
3. **Complete API integration** — Integrate Bedrock API calls and Prompt Caching into a FastAPI backend
4. **Experience the "decompose → build tools → assemble" engineering mindset** — This is a universal approach to solving complex problems

## Prerequisites

Before you begin, make sure you've completed the previous lessons:
- "Hello, AI!" lesson: Able to call the AWS Bedrock API
- "Prompt Caching" lesson: Understand how to use cachePoint

Your AWS credentials should be configured, and project dependencies should be installed (via `mise run inst`).

---

## Key Concepts

### 1. From Scripts to Product: The Need for Encapsulation

Remember those scripts we wrote before? They looked something like this:

```python
# Previous script style
client = boto3.Session().client("bedrock-runtime")
response = client.converse(
    modelId="...",
    messages=[...],
    system=[...]
)
# Manually parse the response dictionary...
```

This code works, but it has several problems:

**Problem 1: Repetitive code.** Every API call requires writing the same configuration code.

**Problem 2: Hard to maintain.** The API returns nested dictionaries, so accessing data requires writing `response["output"]["message"]["content"][0]["text"]`—ugly and error-prone.

**Problem 3: Lack of reusability.** If you want to call AI from multiple places, you have to copy-paste this code.

What's the solution? **Encapsulation.** Wrap common operations into functions or classes to make business code cleaner.

That's what this lesson is about—we've prepared two "tools" for you, and you need to learn how to use them and integrate them into the API endpoint.

### 2. Tool One: Data Format Adapter

Our frontend uses the Vercel AI SDK, which sends data in this format:

```json
{
  "messages": [
    {
      "role": "user",
      "parts": [{"type": "text", "text": "Hello"}]
    }
  ]
}
```

But AWS Bedrock expects this format:

```json
{
  "messages": [
    {
      "role": "user",
      "content": [{"text": "Hello"}]
    }
  ]
}
```

Notice the difference? AI SDK uses `parts`, Bedrock uses `content`. The field names are different, and the structure varies too.

We need a "translator" to do the conversion. That's what `ai_sdk_adapter.py` does:

```
learn_personal_portfolio_ai/ai_sdk_adapter.py
```

This module provides a core function `request_body_to_bedrock_converse_messages()` that takes requests from the frontend and outputs a format Bedrock can understand.

It's based on an open-source library `vercel-ai-sdk-mate`, which wraps the JSON data from the frontend into Python classes, allowing us to use `message.role` instead of `message["role"]` to access data—cleaner and less error-prone.

### 3. Tool Two: Multi-turn Conversation Manager

Remember the multi-turn conversations we learned about? Every API call needs to include the complete conversation history.

If managed manually, the code would look like this:

```python
messages = []

# Turn 1
messages.append({"role": "user", "content": [{"text": "Hello"}]})
response = client.converse(messages=messages, ...)
messages.append(response["output"]["message"])

# Turn 2
messages.append({"role": "user", "content": [{"text": "Who are you?"}]})
response = client.converse(messages=messages, ...)
messages.append(response["output"]["message"])

# Every turn requires manually maintaining this messages list...
```

This code is tedious and error-prone. So we encapsulated a `ChatSession` class:

```
learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py
```

Using it, the code becomes much cleaner:

```python
session = ChatSession(client=client, model_id="...", system=[...])
response = session.send_message([...])  # Automatically manages conversation history
```

This class is based on an open-source library `boto3-dataclass`, which converts the dictionaries returned by boto3 into typed dataclass objects. This means you can access data with `response.output.message.content[0].text`, and your IDE will provide autocomplete and type checking.

### 4. Infrastructure: AWS Connection Configuration

Before calling any AWS service, we need a configured client. This configuration lives in:

```
learn_personal_portfolio_ai/boto_ses.py
```

The code is simple:

```python
import boto3

boto_ses = boto3.Session(region_name="us-east-1")
bedrock_runtime_client = boto_ses.client("bedrock-runtime")
```

Why put it in a separate file? So we can import the same client instance from multiple places, avoiding repeated connection creation.

### 5. Dependency Management

The open-source libraries we use are declared in `pyproject.toml`:

```toml
dependencies = [
    "boto3>=1.42.0,<2.0.0",         # AWS SDK
    "boto3-dataclass[bedrock-runtime]>=1.40.0,<2.0.0", # Typed responses
    "vercel-ai-sdk-mate>=5.0.1,<6.0.0", # AI SDK adapter
    # ...
]
```

If you've run `mise run inst` before, these dependencies should already be installed.

### 6. Final Integration: API Endpoint

All tools are ready. The last step is to assemble them into the API endpoint. That's the job of `api/index.py`.

Currently, the code is "hardcoded"—no matter what the user asks, it returns a fixed response. Your task is to modify it to actually call Bedrock.

The code structure is divided into several logical blocks:

**Block 1: Import tools**
```python
from learn_personal_portfolio_ai.boto_ses import bedrock_runtime_client
from learn_personal_portfolio_ai.ai_sdk_adapter import request_body_to_bedrock_converse_messages
from learn_personal_portfolio_ai.multi_round_bedrock_runtime_chat_manager import ChatSession
```

**Block 2: Read request data**
```python
request_body_data = await request.json()
request_body = RequestBody(**request_body_data)
```

**Block 3: Initialize ChatSession and send message**
```python
chat_session = ChatSession(
    client=bedrock_runtime_client,
    model_id="us.amazon.nova-micro-v1:0",
    system=[...],
)
# Set up conversation history...
response = chat_session.send_message([])
```

**Block 4: Return AI response to frontend**
```python
output_text = response.output.message.content[0].text
# Return via SSE streaming...
```

---

## Exercises

### Exercise 1: Read Existing Code

**Goal:** Understand what each tool does.

Before modifying any code, spend 10 minutes reading these files:

1. `learn_personal_portfolio_ai/boto_ses.py` — Where is the AWS client created?
2. `learn_personal_portfolio_ai/ai_sdk_adapter.py` — What's the main conversion function?
3. `learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py` — What methods does the `ChatSession` class provide?

Answer these questions:

- [ ] What type of object is `bedrock_runtime_client`?
- [ ] What does `request_body_to_bedrock_converse_messages()` take as input and return?
- [ ] How do you get the AI's response text from the response object returned by `ChatSession.send_message()`?

### Exercise 2: Understand the Current Code's Problems

**Goal:** Find what needs to be modified in `api/index.py`.

Open `api/index.py` and find the `handle_chat_data` function. You'll notice:

1. It doesn't import our tools (no `ChatSession`, no `bedrock_runtime_client`)
2. It doesn't call the Bedrock API
3. It returns a hardcoded `"Hello Alice"`

```python
# Current code (hardcoded)
yield f'data: {json.dumps({"type": "text-delta", "id": message_id, "delta": "Hello Alice"})}\n\n'
```

Your task is to replace this hardcoded value with a real AI response.

### Exercise 3: Complete the Integration

**Goal:** Modify `api/index.py` to actually call Bedrock.

We've prepared a reference implementation `api/index_example.py` that you can look at for structure. However—

> **Warning: No copying allowed!**
>
> Copying and pasting directly won't help you learn. Understand what each block of code does, then write it yourself.

Complete in this order:

**Step 1: Add imports**

Add the necessary import statements at the top of the file. You need to import:
- `bedrock_runtime_client` (from `boto_ses` module)
- `request_body_to_bedrock_converse_messages` (from `ai_sdk_adapter` module)
- `ChatSession` (from `multi_round_bedrock_runtime_chat_manager` module)
- `path_enum` (from `paths` module, for getting the system prompt)

**Step 2: Parse request data**

After reading the JSON, parse the request with the `RequestBody` class:
```python
request_body = RequestBody(**request_body_data)
```

Remember to import `RequestBody` first (from `vercel_ai_sdk_mate.api`).

**Step 3: Create ChatSession**

Create a `ChatSession` instance, configuring:
- `client`: Use the imported `bedrock_runtime_client`
- `model_id`: Use `"us.amazon.nova-micro-v1:0"`
- `system`: Include system prompt and cachePoint

**Step 4: Set up conversation context**

Set up initial conversation history, including knowledge base content and cachePoint. You can reference the structure in `index_example.py` for this part.

**Step 5: Convert and append frontend messages**

Use `request_body_to_bedrock_converse_messages()` to convert frontend messages to Bedrock format, then append to conversation history.

**Step 6: Send message and get response**

Call `chat_session.send_message([])` to get the AI's response, and extract the text content.

**Step 7: Return real response**

Replace the hardcoded `"Hello Alice"` with the AI's real response `output_text`.

### Exercise 4: Verify Results

**Goal:** Confirm the integration works.

1. Start the development server:
   ```bash
   mise run dev
   ```

2. Open a browser and visit the frontend interface

3. Send a message and observe:
   - Does the terminal show Bedrock API call logs?
   - Does the frontend receive a real AI response (not "Hello Alice")?

4. Send a second message to verify multi-turn conversation works

---

## Reflection

Let's review what we learned in this lesson.

What we did is actually simple: convert data from the frontend into a format Bedrock understands, call the API, and return the result to the frontend.

But to make this process clear and maintainable, we did two important things:

**First, we built tools.** `ai_sdk_adapter.py` handles data format conversion, `multi_round_bedrock_runtime_chat_manager.py` manages conversation state. These two "tools" encapsulate complex logic, making the API endpoint code clean.

**Second, we used open-source libraries.** `vercel-ai-sdk-mate` and `boto3-dataclass` handle many low-level details for us. Standing on the shoulders of giants, we can focus on business logic.

These two points are actually core software engineering thinking: **decompose problems, then find or create appropriate tools for each sub-problem**.

---

## Mentor's Note

**Why this exercise matters:**

If you think back carefully, you'll realize we've been preparing for today throughout the previous lessons.

- Lesson one, we learned to call the Bedrock API—the "atomic operation"
- Lesson two, we learned Prompt Caching—the "optimization technique"
- This lesson, we assembled them into a real usable product

This is how engineers solve complex problems: **decompose into small problems, tackle each one, then assemble**.

Many beginners make this mistake: faced with a complex task, they try to write all the code in one go. The result is long, messy code, and when something goes wrong, they don't know where to look.

The correct approach is:

1. **Analyze the problem** — What sub-problems does this task involve?
2. **Solve each one** — Can each sub-problem be solved with existing tools? Do we need to build our own?
3. **Verify each step** — Before assembling, ensure each tool works independently
4. **Assemble and integrate** — Combine the tools to implement complete functionality

The two "tools" in this lesson—the adapter and session manager—are products of this thinking. They're not advanced technology, but they embody engineering thinking: **make complex things simple, make repetitive things one-time**.

**Advice for students:**

When facing a complex task, don't rush to write code. First ask yourself:

- What steps can this task be divided into?
- What input does each step need, and what output does it produce?
- Are there existing tools we can use?
- Which logic will be reused and is worth encapsulating into a tool?

Learning this way of thinking is more important than learning any specific API. Because APIs change, but the ability to decompose problems is eternal.

---

## Quick Reference

**Start development server:**
```bash
mise run dev
```

**Key files:**
- `api/index.py` — The API endpoint to modify
- `api/index_example.py` — Reference implementation (don't copy!)
- `learn_personal_portfolio_ai/ai_sdk_adapter.py` — Data format adapter
- `learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py` — Conversation manager
- `learn_personal_portfolio_ai/boto_ses.py` — AWS client configuration

**Core imports:**
```python
from vercel_ai_sdk_mate.api import RequestBody
from learn_personal_portfolio_ai.paths import path_enum
from learn_personal_portfolio_ai.boto_ses import bedrock_runtime_client
from learn_personal_portfolio_ai.ai_sdk_adapter import request_body_to_bedrock_converse_messages
from learn_personal_portfolio_ai.multi_round_bedrock_runtime_chat_manager import ChatSession
```

**Get AI response text:**
```python
response = chat_session.send_message([])
output_text = response.output.message.content[0].text
```
