# Learn Personal Portfolio AI 09 - Task Card: Deep Dive into AI SDK and Stream Protocol

## Objective

Develop code reading skills by understanding how a ChatGPT-like chat application works under the hood—without writing any code.

This exercise focuses on **reading and understanding** rather than implementation. You'll trace data flow from frontend to backend, understand what AI SDK does for you, and master the Stream Protocol that powers real-time AI responses.

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/09-AI-SDK-And-Stream-Protocol/)

## Actionable Items

1. **Observe Stream Protocol with DevTools**
   - Open http://localhost:3000/chat
   - Open DevTools (F12), go to Network tab
   - Send a message and find the `chat` request
   - Examine the Response tab to see Stream Protocol format
   - Identify `text-start`, `text-delta`, and `text-end` messages

2. **Trace the Import Chain**
   - Open `components/chat/chat.tsx`
   - Find the import: `import { PreviewMessage } from "./message"`
   - Navigate to the source file `message.tsx`
   - Locate how `PreviewMessage` renders AI messages

3. **Understand the Role of yield**
   - Open `api/index.py`
   - Find the `ai_sdk_v5_message_generator()` function
   - Understand why `yield` is used instead of `return`
   - Explain: what would happen if we used `return` instead?

4. **Modify Delta Content (Hands-on Verification)**
   - In `api/index.py`, find the `text-delta` yield statement
   - Change it to send two separate deltas: "Hello " and "World"
   - Save, refresh, and send a message
   - Verify the frontend displays "Hello World" (deltas concatenated)
   - Check DevTools to see two `text-delta` events

**Estimated time:** 30-40 minutes

## Checklist

- [ ] **DevTools observation** - Can see Stream Protocol messages in Network tab Response
- [ ] **Import tracing** - Found `message.tsx` from the import statement in `chat.tsx`
- [ ] **yield understanding** - Can explain why `yield` is used for streaming (vs `return`)
- [ ] **Delta modification** - Successfully modified backend to send two deltas, verified concatenation

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Be ready to answer:
   - "What are the three core message types in Stream Protocol?"
   - "Why does AI SDK use `yield` instead of `return`?"
   - "What happens when frontend receives a `text-delta` message?"

3. Say "ship it" when complete to generate RESULT.md

4. Share the RESULT.md file GitHub link with your instructor

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** This is a code-reading exercise. Verification is conversation-based—ask if students completed each task.

**Core verification (required):**

1. **Ask:** "Did you observe the Stream Protocol in DevTools?"
   - Student should confirm they saw `text-start`, `text-delta`, `text-end` in the Response tab
   - No need to verify screenshot—verbal confirmation is sufficient

2. **Ask:** "Did you trace the import chain from chat.tsx to message.tsx?"
   - Student should confirm they found the `PreviewMessage` component in `message.tsx`
   - Can ask follow-up: "What directory is message.tsx in?"

3. **Ask:** "Can you explain the difference between yield and return?"
   - Good answer: `return` ends function immediately; `yield` sends one piece and continues
   - This is conceptual understanding, not code verification

4. **Ask:** "Did you modify the delta to send two parts?"
   - Student should confirm they changed the backend and saw "Hello World" in the UI
   - Can ask: "Did you see two text-delta events in DevTools?"

**Understanding verification (optional):**

5. **Ask:** "What are the three core message types in Stream Protocol?"
   - Expected: `text-start`, `text-delta`, `text-end`

6. **Ask:** "Why is the field called 'delta' instead of 'content'?"
   - Good answer: Because it's incremental—only the new part is sent each time

7. **Ask:** "Why do we need an ID in each message?"
   - Good answer: To track which deltas belong to which text segment (when AI generates multiple segments)

**What counts as "pass":**

- Student verbally confirms completing all 4 exercises
- Student can answer basic questions about Stream Protocol
- Student understands the yield vs return difference

**What does NOT matter:**

- Whether the code modification is still in place
- Perfect technical terminology
- Deep understanding of SSE internals

**Key principle:** This exercise is about building mental models for code reading and protocol understanding. The goal is comprehension, not implementation. Ask questions, listen to understanding, not deliverables.
