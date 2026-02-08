# Learn Personal Portolio AI 08 - Task Card: Integrate Hardcoded AI Chat Interaction

## Objective

Learn frontend-backend separation by implementing a hardcoded AI chat response in your portfolio website.

This exercise teaches the **core architectural pattern** of modern web applications: frontend handles UI, backend handles logic, and they communicate through APIs. You'll implement a simple hardcoded response that echoes back the user's message, laying the foundation for integrating real AI later.

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/08-Add-Hardcoded-AI-Interaction/)

## Actionable Items

1. **Switch to the tutorial branch and run the application**
   - Execute `git checkout 08-Add-Hardcoded-AI-Interaction`
   - Run `mise run inst` then `mise run dev`
   - Open http://localhost:3000/chat to see the chat interface

2. **Locate the key files in the codebase**
   - Find `app/chat/page.tsx` (chat page entry)
   - Find `components/chat/chat.tsx` (core chat logic with `useChat` hook)
   - Find `api/index.py` (backend API handler)

3. **Implement the hardcoded response in `api/index.py`**
   - Find the `@app.post("/api/chat")` endpoint
   - Modify the response to echo back: `I received: "{user_message}"`
   - The response should include the original user message

4. **Test the chat interaction**
   - Send a message in the chat interface
   - Verify the AI responds with your hardcoded message
   - Use browser DevTools (Network tab) to observe the request/response

5. **Observe the data flow**
   - Understand how the message travels: Frontend → API → Backend → Response → Frontend
   - Notice that the frontend code doesn't change when you modify the backend

**Estimated time:** 30-40 minutes

## Checklist

- [ ] **App running** - Can access http://localhost:3000/chat and see the chat interface
- [ ] **Files located** - Can identify where `api/index.py` handles chat requests
- [ ] **Response implemented** - Modified `api/index.py` to return `I received: "{user_message}"`
- [ ] **Chat working** - Sending a message shows the hardcoded response in the UI
- [ ] **DevTools checked** - Observed the network request in browser DevTools
- [ ] **Can explain** - Can describe the data flow from user input to displayed response

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Be ready to answer: "What happens when you send a message? Trace the data flow."

3. Say "ship it" when complete to generate RESULT.md

4. Share the RESULT.md file GitHub link with your instructor

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** This is a guided implementation exercise. Verification focuses on understanding the data flow.

**Core verification (required):**

1. **Check:** Does the chat respond with a message that includes the user's input?
   - Send any message in the chat
   - Response should contain the original message (e.g., "I received: hello" when user sends "hello")
   - Exact wording doesn't matter, but user's message must be echoed

2. **Check:** Can student locate the backend code?
   - Ask: "Which file did you modify?"
   - Expected: `api/index.py`
   - Can verify with `git diff api/index.py`

3. **Check:** Does student understand the data flow?
   - Ask: "When you type a message and press send, what happens step by step?"
   - Good answer mentions: frontend sends to `/api/chat`, backend processes, returns response, frontend displays
   - Don't need perfect technical terms, just understanding of the flow

**Understanding verification (optional):**

4. **Ask:** "Why don't we need to change the frontend code when we change the backend response?"
   - Good answer: Because they're separated - frontend just displays whatever the backend returns
   - This checks understanding of frontend-backend separation

5. **Ask:** "What would you need to change to make the AI actually intelligent?"
   - Good answer: Replace the hardcoded response with a real AI API call (like AWS Bedrock)
   - This checks understanding that the architecture supports future changes

**What counts as "pass":**

- Chat interface shows a response that includes the user's original message
- Student can point to `api/index.py` as the file they modified
- Student can roughly describe the request/response flow

**What does NOT matter:**

- Exact wording of the hardcoded response
- Whether student understands every line of the Stream Protocol code
- Whether student can explain React hooks or Python async

**Key principle:** This exercise is about understanding the ARCHITECTURE (frontend-backend separation, API communication), not the implementation details. The hardcoded response is intentionally simple so students can focus on the bigger picture.
