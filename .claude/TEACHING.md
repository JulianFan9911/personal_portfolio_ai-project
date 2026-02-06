# Teaching Guide: Hardcoded AI Chat Interaction

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand frontend-backend separation as "data vs logic separation" and why this architectural pattern matters
2. **Skill outcome** - Successfully implement a hardcoded API response and trace the data flow from user input to displayed output
3. **Mindset outcome** - Appreciate that good architecture enables easy future changes (hardcoded today, real AI tomorrow)

## Concept Sequence

Teach concepts in this order:

### Phase 1: Conceptual Foundation (10-15 minutes)

1. **What is frontend-backend separation?** - Not just "different folders" but the deeper idea of separating data from logic
2. **Data vs Logic analogy** - Use the project card example: data is the JSON, logic is how to render it
3. **Why separation matters** - The four problems of mixing data and logic (from README-cn.md)
4. **API as the contract** - How frontend and backend agree on communication format

### Phase 2: Hands-on Exploration (Main focus)

5. **Run and observe** - Exercise 1: Start the app, see the chat interface
6. **Locate key files** - Exercise 2: Find the frontend components and backend API
7. **Understand the backend** - Exercise 3: Look at `api/index.py`, understand the endpoint
8. **Implement hardcoded response** - Exercise 4: Modify the response to echo user's message
9. **Test and verify** - Exercise 5: Use DevTools to observe the network request

### Phase 3: Concept Reinforcement (After hands-on)

10. **Stream Protocol high-level** - Just enough to understand why responses appear "one character at a time"
11. **The power of separation** - Discuss: "What would we change to add real AI?" Answer: Just the backend.
12. **Trace the full flow** - Draw the path from user input to displayed response

### Phase 4: Reflection

13. **What did you implement?** - Let student describe what they did
14. **What did you learn about architecture?** - Focus on the separation concept, not the code details

## Common Struggles

**Struggle:** Student doesn't understand why we need a "fake" AI first
- **Signs:** "Why don't we just connect to the real AI?"
- **Intervention:** Explain the learning approach: "We want to understand the architecture first. Once you see the data flow clearly, adding real AI is just changing one piece."

**Struggle:** Student is confused by Stream Protocol format
- **Signs:** Looking at the `yield` statements and `data:` format with confusion
- **Intervention:** Say "Don't worry about the exact format now. Just know that it sends data in pieces so the UI can show text appearing gradually. We'll dive deep into this in the next lesson."

**Struggle:** Student can't find the right file to modify
- **Signs:** Looking in `app/` folder for backend code
- **Intervention:** Remind them: "Frontend code is in `app/` and `components/`. Backend code is in `api/`. The chat endpoint is in `api/index.py`."

**Struggle:** Changes don't appear after saving
- **Signs:** Modified code but chat still shows old response
- **Intervention:** Check if the dev server restarted. Sometimes need to save the file again or restart `mise run dev`.

**Struggle:** Student copies code without understanding the data flow
- **Signs:** "It works but I don't know how"
- **Intervention:** Ask them to trace it step by step: "Where does the user type? Where does it send? Where does it receive? Where does it display?" Use DevTools Network tab as proof.

**Struggle:** Student gets lost in frontend code complexity
- **Signs:** Trying to understand every line of the React components
- **Intervention:** "You don't need to understand React deeply today. Just know that `useChat` sends messages and `messages` array contains the conversation. Focus on the backend - that's what you're changing."

## Teaching Tips

- **Start with the "why"** - Spend time on the conceptual foundation. The data/logic separation idea is more valuable than the implementation details.

- **Use the analogy** - The project card example (JSON data vs rendering logic) is concrete and relatable. Refer back to it when explaining the chat flow.

- **DevTools is your friend** - Show students how to use the Network tab. It makes the invisible visible. Seeing the actual request/response is much more convincing than theoretical explanation.

- **Keep Stream Protocol light** - Don't get bogged down in SSE details. Say "we'll cover this in the next lesson" and move on. Today is about architecture, not protocol.

- **Celebrate the echo** - When their hardcoded response works, celebrate it! "See? The backend changed, but the frontend didn't. That's the power of separation."

- **Connect to real work** - "In production systems, we often prototype with hardcoded data first, then add real logic. This is how professionals work too."

- **The "Doer to Thinker" message** - Use the mentor's note theme: today is about understanding WHY, not just WHAT. Frame the learning as becoming an architect, not just a coder.

## Assessment Ideas

- **Data flow check:** Ask student to trace a message from typing to display
  - Good answer names: input field → sendMessage → POST /api/chat → backend handler → StreamingResponse → useChat → messages array → message component

- **Architecture understanding:** Ask "If we wanted to add real AI, what would we change?"
  - Good answer: "Just the backend - replace the hardcoded response with an AI API call"
  - This demonstrates they understand the separation

- **File location check:** Ask "Which files are frontend? Which are backend?"
  - Frontend: `app/`, `components/`
  - Backend: `api/`

- **Quick verification:** Send a message, see if response includes the original message
  - Pass: Response shows "I received: [their message]" or similar
  - Fail: No response, or response doesn't include their message

## Pacing Guide

- **Conceptual foundation:** 10-15 minutes
  - Data vs logic explanation with project card example
  - Why separation matters (the four problems)
  - API as contract concept

- **Exercise 1 (Run and observe):** 5 minutes
  - Start the app
  - Navigate to /chat
  - Try sending a message (observe current behavior)

- **Exercise 2-3 (Locate and understand):** 10 minutes
  - Find the key files
  - Look at `api/index.py` structure
  - Identify where to make changes

- **Exercise 4 (Implement):** 10 minutes
  - Modify the hardcoded response
  - Include user's message in response
  - Save and test

- **Exercise 5 (DevTools):** 5 minutes
  - Open Network tab
  - Send a message
  - Observe request/response

- **Concept reinforcement:** 5-10 minutes
  - Quick Stream Protocol overview
  - Discuss future changes (real AI)

- **Reflection:** 5 minutes
  - What did you implement?
  - What's the key takeaway about architecture?

**Total expected time:** 50-60 minutes

## Key Messages to Reinforce

1. **Separation is the core principle** - Frontend handles UI, backend handles logic. They communicate through APIs. This pattern is everywhere in modern software.

2. **Data vs Logic** - Data tells you "what", logic tells you "how". Keep them separate for flexibility.

3. **Architecture enables change** - Good architecture (like frontend-backend separation) makes future changes easy. Today: hardcoded. Tomorrow: real AI. Frontend stays the same.

4. **Run first, understand later** - You don't need to understand every line. Get it working, then deepen understanding over time.

5. **DevTools reveals truth** - When in doubt, check the Network tab. Seeing actual data is more valuable than theoretical understanding.

6. **This is professional practice** - Prototyping with hardcoded data before adding real logic is how production systems are built. You're learning real workflow.
