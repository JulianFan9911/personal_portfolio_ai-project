# Task Card: Integrate Bedrock into FastAPI Backend

## Objective

Modify `api/index.py` to replace the hardcoded response with real AWS Bedrock AI inference. Learn how to use pre-built tools (adapter and session manager) to integrate AI into a production API endpoint.

Read the [Tutorial](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/12-AI-Chat-Endpoint/)

## Actionable Items

1. **Read the Tools (10 minutes)**
   - Open `learn_personal_portfolio_ai/boto_ses.py` - understand where the AWS client comes from
   - Open `learn_personal_portfolio_ai/ai_sdk_adapter.py` - understand what `request_body_to_bedrock_converse_messages()` does
   - Open `learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py` - understand what `ChatSession` provides

2. **Identify the Problem**
   - Open `api/index.py`
   - Find the hardcoded `"Hello Alice"` in the SSE generator
   - Note what's missing: no Bedrock imports, no API calls

3. **Complete the Integration**
   - Follow the 7 steps in the tutorial to modify `api/index.py`
   - Reference `api/index_example.py` for structure hints **only if stuck**
   - **Do NOT copy-paste** - write the code yourself

4. **Verify Results**
   - Run: `mise run dev`
   - Open the frontend in browser
   - Send a message and confirm you get a real AI response (not "Hello Alice")
   - Send a second message to verify multi-turn conversation works

**Estimated time:** 30-45 minutes

## Checklist

- [ ] **Understand the tools** - Can explain what each tool does
- [ ] **Added imports** - `bedrock_runtime_client`, `ChatSession`, `request_body_to_bedrock_converse_messages`, `path_enum`, `RequestBody`
- [ ] **Created ChatSession** - With correct client, model_id, and system prompt
- [ ] **Set up knowledge base** - Added to `_messages` with cachePoint
- [ ] **Converted frontend messages** - Used adapter to transform AI SDK format
- [ ] **Called Bedrock** - `chat_session.send_message([])` returns response
- [ ] **Replaced hardcoded response** - `output_text` instead of `"Hello Alice"`
- [ ] **Server runs** - `mise run dev` starts without errors
- [ ] **Real AI responds** - Frontend shows actual AI response
- [ ] **Multi-turn works** - AI remembers previous messages

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Be ready to answer:
   - "What does `request_body_to_bedrock_converse_messages()` do?"
   - "Why do we use `ChatSession` instead of calling `client.converse()` directly?"
   - "Where is the cachePoint placed and why?"
   - "Walk me through the data flow from frontend to AI response"

3. Say "ship it" when complete to generate RESULT.md

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** Code review + understanding verification. Must check for copy-paste.

**Core verification (required):**

1. **Run the server:**
   - Execute: `mise run dev`
   - Should start without import errors or crashes
   - Both Next.js and FastAPI should be running

2. **Test functionality:**
   - Open frontend in browser
   - Send a message like "What is your name?"
   - Response should be real AI output, not "Hello Alice"
   - Send a follow-up message to verify multi-turn works

3. **Code review - check for required components:**
   ```bash
   # Check imports exist in index.py
   grep -q "bedrock_runtime_client" api/index.py
   grep -q "ChatSession" api/index.py
   grep -q "request_body_to_bedrock_converse_messages" api/index.py
   grep -q "RequestBody" api/index.py
   ```

4. **Check for copy-paste (CRITICAL):**
   - Compare `api/index.py` with `api/index_example.py`
   - Look for identical code blocks, comments, variable names
   - If suspicious, ask: "Explain what this line does"

   ```bash
   # Quick similarity check
   diff api/index.py api/index_example.py | head -50
   ```

   **If code is nearly identical to example:**
   - Ask student to explain specific functions
   - If they can't explain, they must re-implement while explaining

**Understanding verification (required):**

5. **Ask:** "What does the adapter do?"
   - Good answer: "Converts Vercel AI SDK message format to AWS Bedrock format"
   - Bad answer: Can't explain or says "I don't know"

6. **Ask:** "Why don't we just call `client.converse()` directly?"
   - Good answer: "ChatSession manages conversation history automatically"
   - Bad answer: "It's in the example"

7. **Ask:** "What happens if you remove the cachePoint?"
   - Good answer: "We'd pay full price for the knowledge base every request instead of saving 75%"

8. **Ask:** "Trace a user message from frontend to response"
   - Good answer: Mentions: frontend sends → adapter converts → session adds to history → Bedrock called → response extracted → SSE returns

**What counts as "pass":**

- Server runs and returns real AI responses
- Code contains all required imports and components
- Student can explain what each major piece does
- Code shows evidence of being written, not copied (some differences from example)

**What does NOT count as pass:**

- Code works but is copied from `index_example.py` without understanding
- Cannot explain what `request_body_to_bedrock_converse_messages` does
- Cannot explain the data flow
- "Hello Alice" still appears in responses

**Key principle:** This lesson is about integration AND understanding. Working code that the student can't explain is a failure. The no-copy rule exists because understanding is more important than completion.
