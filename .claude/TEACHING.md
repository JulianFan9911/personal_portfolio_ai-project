# Teaching Guide: AI SDK and Stream Protocol Deep Dive

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand how Stream Protocol works (`text-start`, `text-delta`, `text-end`) and why protocols matter more than libraries
2. **Skill outcome** - Successfully trace data flow from UI to backend by following import chains and reading code
3. **Mindset outcome** - Appreciate that reading code is as important as writing code, and that understanding protocols gives you transferable knowledge

## Concept Sequence

Teach concepts in this order:

### Phase 1: Import Statement Mastery (10 minutes)

1. **The three forms of import** - npm packages, relative paths, alias paths
2. **Practice tracing** - Follow `./message` to find `message.tsx`
3. **When to read docs vs code** - npm packages → docs; project files → code

### Phase 2: AI SDK Value Proposition (10 minutes)

4. **What you'd build without AI SDK** - Show the 100+ lines they'd need to write
5. **What useChat gives you** - `messages`, `sendMessage`, `status`, `stop`
6. **Convention over configuration** - Default `/api/chat` endpoint

### Phase 3: Data Flow Tracing (15 minutes)

7. **Step-by-step walkthrough** - User click → handleSubmit → sendMessage → POST → backend
8. **Backend processing** - `@app.post("/api/chat")` decorator, parsing messages
9. **Generator pattern** - Why `yield` creates streaming responses

### Phase 4: Stream Protocol Deep Dive (15 minutes)

10. **Protocol vs Library** - The HTTP analogy: same protocol, different implementations
11. **Three core message types** - `text-start`, `text-delta`, `text-end`
12. **SSE format** - `data: {...}\n\n` structure
13. **Why IDs matter** - Tracking multiple concurrent text segments

### Phase 5: Hands-on Exercises (15-20 minutes)

14. **DevTools observation** - See the protocol in action
15. **Import chain practice** - Find PreviewMessage definition
16. **yield understanding** - Conceptual exercise
17. **Delta modification** - Practical verification

### Phase 6: Reflection (5 minutes)

18. **Key takeaways** - What did you learn about reading code?
19. **Protocol thinking** - How does this help when switching AI providers?

## Common Struggles

**Struggle:** Student is confused about why we're not writing code
- **Signs:** "When do we actually build something?"
- **Intervention:** Explain: "In real work, you spend 70% of time reading code. Today we're building that skill. Once you can read code well, writing becomes much easier."

**Struggle:** Student gets lost in import chains
- **Signs:** Can't find where a component is defined
- **Intervention:** Review the three import forms. Ask: "Does this path start with `.`, `@/`, or neither?" Then guide them to the right location.

**Struggle:** Student doesn't understand why yield matters
- **Signs:** "Can't we just use return?"
- **Intervention:** Draw it out: "return = send everything at once, then stop. yield = send piece, pause, send piece, pause. Which gives better user experience?"

**Struggle:** Student can't see Stream Protocol in DevTools
- **Signs:** Looking at wrong tab or wrong request
- **Intervention:** Make sure they: 1) Filter for "chat" in Network tab, 2) Click the request, 3) Look at Response tab (not Preview)

**Struggle:** Student is overwhelmed by the code complexity
- **Signs:** Trying to understand every line of React or Python
- **Intervention:** "You don't need to understand everything. Focus on the data flow: where does data enter? where does it exit? That's what matters today."

**Struggle:** Student modifies wrong file for delta exercise
- **Signs:** Changed frontend instead of backend
- **Intervention:** "Stream Protocol is about what the backend SENDS. The frontend just receives. Find `api/index.py` and look for `text-delta`."

## Teaching Tips

- **Start with the "why read code"** - Many students feel guilty not writing code. Validate that reading is a real skill. "Professionals spend most time reading."

- **Use DevTools as proof** - When explaining Stream Protocol, immediately show it in DevTools. Seeing is believing. Theory alone doesn't stick.

- **The HTTP analogy works well** - "HTTP lets any browser talk to any server. Stream Protocol lets any AI SDK frontend talk to any compliant backend." This clicks for most people.

- **Don't get stuck on SSE details** - SSE is just the transport. The protocol messages (`text-start`, etc.) are what matters. If students ask about SSE internals, say "That's how we send the data. What matters is what we send."

- **Celebrate the "aha" moment** - When students see two `text-delta` events concatenate into "Hello World," that's the key insight. Pause and reinforce: "This is how ChatGPT works!"

- **Connect to future lessons** - "Now you understand the protocol. Next lesson, we just replace the hardcoded response with a real AI call. Frontend stays the same."

- **Use the "protocol vs library" framing** - This is a powerful mental model. Libraries come and go, protocols persist. Understanding protocols makes you adaptable.

## Assessment Ideas

- **Import chain quiz:** "If you see `import { X } from './foo'`, where do you look?"
  - Good answer: "foo.tsx or foo/index.tsx in the same directory"

- **Protocol understanding:** "What are the three core message types?"
  - Expected: `text-start`, `text-delta`, `text-end`

- **yield vs return:** "Why does the backend use yield?"
  - Good answer: "To send data piece by piece instead of all at once"

- **Protocol value:** "If you wanted to switch from Python backend to Go backend, what would need to stay the same?"
  - Good answer: "The Stream Protocol format - the same message types and SSE structure"

- **Quick check:** Ask student to trace the data flow from button click to displayed message
  - Good answer hits: handleSubmit → sendMessage → POST /api/chat → yield → StreamingResponse → useChat parsing → messages array → render

## Pacing Guide

- **Import statement mastery:** 10 minutes
  - Three forms explanation
  - Quick practice finding a file

- **AI SDK value:** 10 minutes
  - Show what you'd build without it
  - Show how simple useChat is

- **Data flow tracing:** 15 minutes
  - Walk through each step
  - Show the code at each step
  - Can use DevTools to show request/response

- **Stream Protocol deep dive:** 15 minutes
  - Protocol vs Library concept
  - Three message types with examples
  - SSE format overview

- **Hands-on exercises:** 15-20 minutes
  - Exercise 1: DevTools observation (5 min)
  - Exercise 2: Import tracing (3 min)
  - Exercise 3: yield understanding (3 min)
  - Exercise 4: Delta modification (5-7 min)

- **Reflection:** 5 minutes
  - What did you learn?
  - How does this help you?

**Total expected time:** 55-70 minutes

## Key Messages to Reinforce

1. **Reading code is a fundamental skill** - 70% of professional work is reading, not writing. Today we're building that skill.

2. **Protocols > Libraries** - A library is one implementation. A protocol is an agreement that enables many implementations. HTTP, HTML, Stream Protocol—understanding protocols gives you transferable knowledge.

3. **Stream Protocol in three parts** - `text-start` (begin), `text-delta` (content), `text-end` (finish). That's the core. Everything else is details.

4. **yield enables streaming** - Instead of waiting for all data, we send piece by piece. Better UX, feels like AI is "thinking."

5. **Import statements have patterns** - npm packages (no `.`), relative paths (`./`), alias paths (`@/`). Know the pattern, find the code.

6. **DevTools reveals truth** - When in doubt, check the Network tab. See what's actually being sent and received.

7. **Architecture enables change** - Understanding the protocol means you can swap backends, change AI providers, or modify the frontend—independently. That's good architecture.
