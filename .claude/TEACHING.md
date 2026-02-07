# Teaching Guide: Prompt Caching

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand why Prompt Caching exists (repeated static content = wasted money) and how it works (cache write vs cache read)
2. **Skill outcome** - Read and interpret cache metrics from API responses, and understand where to place `cachePoint` in code
3. **Mindset outcome** - Develop cost-consciousness when building AI applications, appreciating that understanding pricing models is an engineering skill

## Concept Sequence

Teach concepts in this order:

### Phase 1: The Problem (5 minutes)

1. **The repeated content pattern** - Show the "user profile + question" scenario
2. **Why this is expensive** - Same 1000 tokens sent 10 times = paying for 10,000 tokens
3. **The customer service analogy** - Repeating your ID number every call

This phase establishes the "why" before introducing the solution. Learners should feel the pain before seeing the cure.

### Phase 2: The Solution (10 minutes)

4. **Cache Write vs Cache Read** - First call writes to cache (normal price), subsequent calls read from cache (75% cheaper)
5. **Browser caching analogy** - First visit downloads images, subsequent visits use cache
6. **What's actually being saved** - The "parsing" cost, not time. Clarify this is primarily about money, not speed

This phase introduces the core mechanism. Use the browser caching analogy—most learners understand that immediately.

### Phase 3: AWS Implementation (10 minutes)

7. **The cachePoint marker** - Show the code structure with static content, cachePoint, dynamic question
8. **Placement rule** - Content BEFORE cachePoint gets cached; content AFTER doesn't
9. **The 1024 token minimum** - Silent failure if too short (this is a common trap)

Focus on the "before/after" rule. This is the most practical knowledge they need.

### Phase 4: Cost Calculation (5 minutes)

10. **75% savings on cache reads** - AWS Bedrock specific, other providers may differ
11. **Break-even analysis** - First call is investment, ROI grows with call count
12. **The 67.5% to 74.3% curve** - More calls = closer to maximum 75% savings

Keep the math simple. The key insight is "invest upfront, profit later."

### Phase 5: Hands-on Exercises (15-20 minutes)

13. **Exercise 1: Run and observe** - See cache write vs read in actual output
14. **Exercise 2: Calculate savings** - Fill in the blanks with real numbers
15. **Exercise 3: Understand cachePoint** - Find it in code, understand why it's placed there

The exercises reinforce through observation, not creation. This is intentional—understanding before building.

### Phase 6: Reflection (5 minutes)

16. **When to use caching** - "Large static content + multiple questions" pattern
17. **Cost-conscious engineering** - Reading pricing docs is a real skill
18. **Transferable knowledge** - Same concept applies to other providers

## Common Struggles

**Struggle:** Student doesn't understand why this matters
- **Signs:** "Tokens are cheap, why bother?"
- **Intervention:** "Let's calculate. If you have 1000 users, each asking 100 questions per day, with 2000 tokens of static content... that's 200 million tokens daily. At $0.01 per 1K tokens, that's $2000/day. With caching, it's $500/day. $1500 saved daily, $45,000 monthly. Still think it doesn't matter?"

**Struggle:** Student confuses the cachePoint placement
- **Signs:** Puts dynamic content before cachePoint
- **Intervention:** "What gets cached is what comes BEFORE the marker. Ask yourself: what content is the same every time? That goes first. What changes? That goes after the marker."

**Struggle:** Student thinks caching makes things faster
- **Signs:** "I expected faster responses"
- **Intervention:** "Good observation! Caching saves money, not time. The AI still needs to generate the response, which is the slow part. Parsing text is fast; generating text is slow. We save on parsing cost, not generation time."

**Struggle:** Student's cache isn't working
- **Signs:** `write > 0` on every call, `read = 0` always
- **Intervention:** Check two things: 1) Is static content at least 1024 tokens? 2) Is the static content EXACTLY the same each call (no timestamps, no random IDs)?

**Struggle:** Student can't find cachePoint in code
- **Signs:** Looking in wrong function or file
- **Intervention:** "Look for `send_message_with_cache`. Find the `messages` list. See the three items: text, cachePoint, text. That structure is the key."

## Teaching Tips

- **Start with money, not technology** - Engineers respond to cost savings. Lead with "save 75% on AI costs" rather than "let me explain caching semantics."

- **The customer service analogy resonates** - Everyone has experienced repeating their information to customer service. This frustration translates directly to understanding why caching matters.

- **Don't oversell performance gains** - Be honest that caching primarily saves money, not time. Students appreciate honesty, and it prevents disappointment.

- **Show the silent failure trap** - Demonstrate what happens when content is too short. This "gotcha" knowledge prevents future debugging headaches.

- **Connect to production thinking** - "In learning, cost doesn't matter. In production, it's everything. Today we're learning production thinking."

- **Use the terminal output as proof** - The `Cache: write=XXX, read=0` vs `Cache: write=0, read=XXX` output is the "aha" moment. Let students see it themselves.

- **Mention other providers briefly** - "AWS does 75% discount. Anthropic has similar caching. OpenAI too. The concept transfers; only implementation differs."

## Assessment Ideas

- **Quick concept check:** "What's the difference between cache write and cache read?"
  - Good answer: "Cache write is the first call where content is stored; cache read is subsequent calls where we use stored content and pay less"

- **Placement understanding:** "If I have a document and a question, where do I put cachePoint?"
  - Good answer: "After the document, before the question. Document gets cached; question doesn't."

- **Cost calculation:** "1000 tokens static, 5 questions. How much do you save vs no caching?"
  - Good answer: "Without caching: 5000 tokens full price. With caching: 1000 + 4×250 = 2000 equivalent. Save 60%."

- **Failure mode:** "Why might caching silently fail?"
  - Good answer: "Static content less than 1024 tokens, or content changes between calls"

- **Real-world application:** "Give an example where Prompt Caching would be valuable"
  - Good answer: Anything with repeated static context—document analysis, personalized assistants, code review with same codebase, etc.

## Pacing Guide

- **Phase 1 (The Problem):** 5 minutes
  - Show the pattern
  - Calculate the waste
  - Use the analogy

- **Phase 2 (The Solution):** 10 minutes
  - Cache Write vs Read
  - Browser caching parallel
  - What's actually saved

- **Phase 3 (AWS Implementation):** 10 minutes
  - Show the code
  - Explain placement rule
  - Warn about 1024 minimum

- **Phase 4 (Cost Calculation):** 5 minutes
  - 75% savings number
  - Break-even concept
  - More calls = more savings

- **Phase 5 (Exercises):** 15-20 minutes
  - Exercise 1: Run script (5 min)
  - Exercise 2: Calculate (5 min)
  - Exercise 3: Code understanding (5-10 min)

- **Phase 6 (Reflection):** 5 minutes
  - When to use
  - Cost consciousness
  - Next steps

**Total expected time:** 40-55 minutes

## Key Messages to Reinforce

1. **Prompt Caching is about money, not speed** - Don't oversell. Be clear about what it actually saves.

2. **The pattern: static content + multiple questions** - This is when caching pays off. Recognize this pattern in production apps.

3. **cachePoint placement matters** - Before = cached, After = not cached. Simple rule, critical to get right.

4. **Silent failure is a trap** - Less than 1024 tokens, content changes—caching fails without error. Know the gotchas.

5. **Cost consciousness is an engineering skill** - Reading pricing docs, calculating ROI, optimizing spend—these are professional skills, not distractions from "real" engineering.

6. **First call is investment, subsequent calls are returns** - The mental model of "invest upfront, profit later" helps understand the economics.

7. **The concept transfers across providers** - AWS, Anthropic, OpenAI—all have similar caching. Learn the concept once, apply everywhere.
