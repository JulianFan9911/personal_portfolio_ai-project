# Teaching Guide: Integrating AI into Your Application

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand why encapsulation matters (cleaner code, reusability, maintainability) and how data format transformation works between frontend and backend
2. **Skill outcome** - Integrate pre-built tools into a FastAPI endpoint to connect frontend chat UI with AWS Bedrock
3. **Mindset outcome** - Develop the "decompose → build tools → assemble" engineering mindset for solving complex problems

## Concept Sequence

Teach concepts in this order:

### Phase 1: The Problem (5 minutes)

1. **Scripts vs Production Code** - Scripts we wrote before are for understanding, not for products
2. **The Translation Challenge** - Frontend (Vercel AI SDK) and backend (Bedrock) speak different "languages"
3. **What's Missing** - Current `index.py` is hardcoded, doesn't call real AI

This phase establishes why we need more than just knowing how to call an API.

### Phase 2: The Tools We Built (15 minutes)

4. **Tool 1: Data Format Adapter** - `ai_sdk_adapter.py` translates AI SDK format to Bedrock format
5. **Tool 2: Chat Session Manager** - `multi_round_bedrock_runtime_chat_manager.py` manages conversation history
6. **Infrastructure: AWS Client** - `boto_ses.py` provides the pre-configured Bedrock client
7. **Open Source Dependencies** - `vercel-ai-sdk-mate` and `boto3-dataclass` handle low-level details

Focus on WHAT each tool does, not HOW it's implemented. Students should understand the purpose, not memorize the code.

### Phase 3: The Integration (10 minutes)

8. **Four Logical Blocks** - Import, parse request, call Bedrock, return response
9. **Where to Look** - `index.py` (to modify) vs `index_example.py` (reference only)
10. **The No-Copy Rule** - Understanding > copying. Reference is for structure, not for copy-paste

### Phase 4: Hands-on Exercise (20-30 minutes)

11. **Exercise 1: Read the Tools** - Spend 10 minutes understanding what each file does
12. **Exercise 2: Identify the Problem** - Find the hardcoded "Hello Alice" in `index.py`
13. **Exercise 3: Complete the Integration** - Follow the 7-step guide to implement
14. **Exercise 4: Verify** - Run `mise run dev` and test with the frontend

### Phase 5: Reflection (5 minutes)

15. **The Engineering Pattern** - Decompose → Build tools → Assemble
16. **Connection to Previous Lessons** - Lesson 1 (API) + Lesson 2 (Caching) = Today's Product
17. **Transferable Skills** - This decomposition approach works for any complex problem

## Common Struggles

**Struggle:** Student copies code directly from `index_example.py`
- **Signs:** Code works but student can't explain what each part does
- **Intervention:** Ask: "What does `request_body_to_bedrock_converse_messages` do? Why do we need it?" If they can't answer, have them re-read the tools and explain in their own words before continuing.

**Struggle:** Student doesn't understand the data format difference
- **Signs:** Confusion about why we need the adapter
- **Intervention:** Show the two JSON formats side by side. "See how AI SDK uses `parts` but Bedrock uses `content`? That's why we need a translator."

**Struggle:** Import errors or module not found
- **Signs:** `ModuleNotFoundError` when running
- **Intervention:** Check if `mise run inst` was run. Check if imports are from correct paths (`learn_personal_portfolio_ai.xxx`).

**Struggle:** Student doesn't know where to add code
- **Signs:** Adds code in wrong place, or doesn't know where to start
- **Intervention:** Walk through the existing `index.py` structure: "See this debug section? After that is where you add the Bedrock logic. Before the SSE generator."

**Struggle:** Hardcoded "Hello Alice" still appears
- **Signs:** Forgot to replace the delta value in the generator
- **Intervention:** "Look at line with `text-delta`. What's the `delta` value? It should be `output_text`, not `"Hello Alice"`."

**Struggle:** Multi-turn conversation doesn't work
- **Signs:** AI doesn't remember previous messages
- **Intervention:** Check if `chat_session._messages.extend(messages)` is called. The converted frontend messages must be appended to the session history.

## Teaching Tips

- **Don't let them copy first** - Have students read and explain each tool before writing any code. Understanding must come before implementation.

- **Use the "translator" analogy** - The adapter is like a human translator between two people speaking different languages. Makes the concept intuitive.

- **Connect to previous lessons explicitly** - "Remember when we called `client.converse()` directly? That's wrapped in `ChatSession` now." This reinforces learning continuity.

- **Let them struggle a bit** - If they get stuck, don't immediately give the answer. Ask guiding questions: "What data does the frontend send? What does Bedrock need?"

- **Verify understanding, not just working code** - A student who copied working code but can't explain it hasn't learned. Ask questions like "Why do we cache the knowledge base?"

- **Reference implementation is a safety net, not a cheat sheet** - Tell students: "If you're completely stuck for 10+ minutes, peek at `index_example.py` for structure hints. But don't copy. Close it and write yourself."

## Assessment Ideas

- **Quick concept check:** "What are the two tools we built, and what does each one do?"
  - Good answer: "The adapter converts AI SDK format to Bedrock format. The ChatSession manages conversation history automatically."

- **Data flow understanding:** "Trace the journey of a user message from frontend to AI response."
  - Good answer: "Frontend sends AI SDK format → adapter converts to Bedrock format → ChatSession adds to history → Bedrock API called → response extracted → SSE streams back to frontend"

- **Engineering mindset:** "Why did we create these two tools instead of writing everything in `index.py`?"
  - Good answer: "Encapsulation makes code cleaner and reusable. We can use these tools in other projects. Changes to format conversion don't affect the main API logic."

- **Connection to previous lessons:** "How does this lesson use what we learned about Prompt Caching?"
  - Good answer: "We use cachePoint in the system prompt and knowledge base to reduce costs on repeated calls."

## Pacing Guide

- **Phase 1 (The Problem):** 5 minutes
  - Explain why scripts aren't production code
  - Show the hardcoded "Hello Alice" problem

- **Phase 2 (The Tools):** 15 minutes
  - Walk through each tool's purpose (not implementation)
  - Emphasize open-source dependencies

- **Phase 3 (The Integration):** 10 minutes
  - Explain the 4 logical blocks
  - Set expectations for the no-copy rule

- **Phase 4 (Exercises):** 20-30 minutes
  - Exercise 1: Code reading (10 min)
  - Exercise 2: Problem identification (2 min)
  - Exercise 3: Implementation (15-20 min)
  - Exercise 4: Verification (3 min)

- **Phase 5 (Reflection):** 5 minutes
  - Connect to engineering principles
  - Highlight transferable skills

**Total expected time:** 55-65 minutes

## Key Messages to Reinforce

1. **Decompose → Build tools → Assemble** - This is how engineers solve complex problems. Not by writing everything at once.

2. **Encapsulation is not optional** - Production code requires clean, reusable, maintainable structure. Scripts are for learning, not for products.

3. **Understanding > Copying** - A working program you don't understand is worthless. Take time to understand each piece.

4. **Stand on giants' shoulders** - Use open-source libraries for low-level details. Focus your energy on business logic.

5. **Previous lessons were preparation** - Lesson 1 (API) + Lesson 2 (Caching) + Today (Integration) = Complete product. This is intentional learning design.

6. **The pattern transfers** - This decomposition approach isn't just for AI. Use it for any complex engineering problem.

## Checking for Copy-Paste

When grading, compare `api/index.py` with `api/index_example.py`:

**Signs of legitimate work:**
- Different variable names (not identical to example)
- Different comment styles or placement
- Minor structural differences (order of operations, etc.)
- Ability to explain every line when asked

**Signs of copy-paste:**
- Identical code blocks, including comments
- Same variable names throughout
- Identical whitespace/formatting
- Cannot explain what a specific function does
- Immediate confusion when asked to modify one part

**What to do if copy-paste detected:**
1. Don't accuse directly. Ask questions: "Walk me through this block. What does `request_body_to_bedrock_converse_messages` do?"
2. If they can't explain, say: "I think you may have relied too heavily on the example. Let's work through this together so you understand it."
3. Have them delete their code and re-implement while explaining each step out loud.
