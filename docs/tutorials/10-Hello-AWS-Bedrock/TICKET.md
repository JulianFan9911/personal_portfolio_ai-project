# Learn Personal Portfolio AI 10 - Task Card: Hello, AI! - Your First AI API Call

## Objective

Complete your first AI API call using Python code. You'll call AWS Bedrock and at least one alternative AI service (Google Gemini or Zhipu GLM).

Read the [Tutorial](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/10-Hello-AWS-Bedrock/)

## Actionable Items

1. **Run AWS Bedrock Script (Required)**
   - Open `scripts/test_ai_aws_bedrock.py`
   - Understand each line of code
   - Run: `python scripts/test_ai_aws_bedrock.py`
   - Verify AI responds with something like "I'm an AI assistant..."

2. **Complete One Alternative AI Service (Choose One)**

   **Option A: Google Gemini**
   - Get API Key from [Google AI Studio](https://aistudio.google.com/)
   - Set environment variable: `export GOOGLE_API_KEY="your-key"`
   - Install: `pip install google-genai`
   - Complete `scripts/test_ai_google_gemini.py` (read official docs, don't copy answers!)
   - Run and verify it works

   **Option B: Zhipu GLM**
   - Get API Key from [Zhipu AI Platform](https://open.bigmodel.cn/)
   - Set environment variable: `export ZHIPU_API_KEY="your-key"`
   - Install: `pip install zhipuai`
   - Complete `scripts/test_ai_glm.py` (read official docs, don't copy answers!)
   - Run and verify it works

**Estimated time:** 20-30 minutes

## Checklist

- [ ] **Bedrock script runs** - `scripts/test_ai_aws_bedrock.py` executes successfully
- [ ] **Understand the code** - Can explain what `bedrock.converse()` does
- [ ] **Alternative service works** - Either Gemini or GLM script runs successfully
- [ ] **Wrote code independently** - Completed the script by reading docs, not copying answers

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Be ready to answer:
   - "Which alternative AI service did you choose?"
   - "Can you run the script and show it works?"
   - "What does `bedrock.converse()` return?"

3. Say "ship it" when complete to generate RESULT.md

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** Script verification - check that scripts exist and run successfully.

**Core verification (required):**

1. **Ask:** "Did you run the Bedrock script successfully?"
   - Verify by running: `.venv/bin/python scripts/test_ai_aws_bedrock.py`
   - Should print "AI response: ..." without errors

2. **Ask:** "Which alternative service did you complete - Gemini or GLM?"
   - Note their answer for step 3

3. **Verify the alternative script:**
   - If Gemini: Check `scripts/test_ai_google_gemini.py` has code (not just placeholder)
   - If GLM: Check `scripts/test_ai_glm.py` has code (not just placeholder)
   - Try running: `.venv/bin/python scripts/test_ai_google_gemini.py` or `.venv/bin/python scripts/test_ai_glm.py`
   - Note: This may fail if API key not set in current environment - that's OK, just verify the code exists

4. **Code quality check:**
   - Open the script they completed
   - Verify it's not just a copy-paste from the reference answer
   - Ask: "Can you explain what this line does?" (point to a key line)

**Understanding verification (optional):**

5. **Ask:** "What's the difference between `messages` and `system` in the Bedrock API?"
   - Good answer: `messages` is the conversation history, `system` is the AI's persona/instructions

6. **Ask:** "Why do we use the cheapest model for testing?"
   - Good answer: To save money during development, can switch to better models later

**What counts as "pass":**

- Bedrock script runs without errors
- One alternative script has code (even if API key prevents running)
- Student can explain basic code concepts

**What does NOT matter:**

- Which alternative they chose (Gemini or GLM)
- Whether the alternative script runs (API key may not be set)
- Perfect code style

**Key principle:** This is about getting hands-on experience with AI APIs. The focus is on running code and understanding the basics, not perfection.
