# Learn Personal Portfolio AI 11 - Task Card: Prompt Caching - Save Money on AI API Calls

## Objective

Learn how Prompt Caching works and understand how it can save up to 75% on input token costs when you have repeated static content across multiple API calls.

Read the [Tutorial](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/11-Cached-Prompt/)

## Actionable Items

1. **Run the Prompt Caching Script**
   - Open `scripts/test_ai_aws_bedrock_with_cached_prompt.py`
   - Spend 2 minutes browsing the code structure
   - Run: `python scripts/test_ai_aws_bedrock_with_cached_prompt.py`
   - Observe the output for all 3 turns

2. **Observe Cache Behavior**
   - Look at the `Cache:` line in each turn's output
   - Turn 1: Should show `write > 0, read = 0` (writing to cache)
   - Turn 2-3: Should show `write = 0, read > 0` (reading from cache)

3. **Calculate Your Savings**
   - Record the `write` value from Turn 1
   - Record the `read` values from Turn 2 and Turn 3
   - Calculate: Total cached reads × 75% = equivalent tokens saved

4. **Understand cachePoint Placement**
   - Find the `send_message_with_cache` function in the script
   - Locate where `cachePoint` is placed in the `messages` structure
   - Understand why static content comes before `cachePoint` and dynamic questions come after

**Estimated time:** 20-30 minutes

## Checklist

- [ ] **Script runs successfully** - All 3 turns complete without errors
- [ ] **Observe cache write** - Turn 1 shows `write > 0, read = 0`
- [ ] **Observe cache read** - Turn 2-3 show `write = 0, read > 0`
- [ ] **Understand savings** - Can calculate how much was saved across the 3 calls
- [ ] **Understand cachePoint** - Can explain why static content goes before the marker

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Be ready to answer:
   - "What's the difference between cache write and cache read?"
   - "How much did you save in equivalent tokens across the 3 calls?"
   - "Why is the static content placed before cachePoint?"

3. Say "ship it" when complete to generate RESULT.md

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** Observation-based verification - check understanding through output interpretation and code reading.

**Core verification (required):**

1. **Run the script:**
   - Execute: `.venv/bin/python scripts/test_ai_aws_bedrock_with_cached_prompt.py`
   - Should complete all 3 turns without errors
   - Should show cache metrics in output

2. **Verify cache behavior understanding:**
   - Ask: "Looking at the output, which turn wrote to the cache?"
   - Good answer: "Turn 1 - it shows write > 0 and read = 0"
   - Ask: "Which turns read from the cache?"
   - Good answer: "Turn 2 and Turn 3 - they show write = 0 and read > 0"

3. **Verify cost understanding:**
   - Ask: "How much money does cache reading save compared to normal pricing?"
   - Good answer: "About 75% - you only pay 25% of the normal price"
   - Ask: "If the profile is 900 tokens and 2 calls use cache, how many equivalent tokens did you save?"
   - Good answer: "900 × 2 × 75% = 1350 tokens" (approximate calculation is fine)

4. **Verify cachePoint understanding:**
   - Ask: "Open the script and show me where cachePoint is placed"
   - Student should navigate to `send_message_with_cache` function
   - Ask: "Why is the user profile placed before cachePoint?"
   - Good answer: "Because it's static content that doesn't change between calls, so it should be cached"

**Understanding verification (optional):**

5. **Ask:** "What happens if your static content is only 500 tokens?"
   - Good answer: "Caching silently fails - it needs at least 1024 tokens"

6. **Ask:** "Does Prompt Caching make API calls faster?"
   - Good answer: "Not really - it mainly saves money, not time. The AI still needs to generate the response."

7. **Ask:** "In what scenario would Prompt Caching be most valuable?"
   - Good answer: Anything involving repeated static context with multiple questions - document analysis, personalized chat, code review, etc.

**What counts as "pass":**

- Script runs and shows correct cache behavior (write on Turn 1, read on Turn 2-3)
- Student can identify cache write vs cache read in the output
- Student understands the basic cost savings (75% on cached reads)
- Student can locate cachePoint in code and explain its purpose

**What does NOT matter:**

- Exact token numbers (approximate understanding is sufficient)
- Memorizing the exact minimum token requirement
- Deep understanding of SSE or internal implementation

**Key principle:** This lesson is about understanding the concept and observing it in action. The focus is on interpreting output and understanding "why," not on writing code.
