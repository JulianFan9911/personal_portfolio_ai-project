# Learn Personal Portfolio AI 14 - Task Card: Config Management and Code Refactoring

## Objective

Understand the Config Management pattern and code refactoring principles — why we centralize configuration values and extract reusable code into separate modules. This makes code easier to maintain and scale.

Read the [Tutorial](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/14-Config-Management/)

## Actionable Items

1. **Read the refactored code (10 minutes)**
   - Open `api/index.py` — notice how the main function reads like English (Step 1, Step 2, Step 3...)
   - Open `learn_personal_portfolio_ai/ai_sdk_adapter.py` — find `get_last_user_message_text()` and `ai_sdk_message_generator()`
   - Think: Why are these functions in a separate module instead of `index.py`?

2. **Enable the message length limit feature (10 minutes)**
   - Find the `max_message_length` field in `learn_personal_portfolio_ai/config.py`
   - Search for "Uncomment" in `api/index.py` to find the disabled check code
   - Uncomment the code to enable the message length check
   - Test: run `mise run dev`, send a message > 1000 characters, verify you get "Message too long" error
   - Notice: The error response reuses `ai_sdk_message_generator()` — same as normal responses!

3. **Run the test (2 minutes)**
   - Run `mise run test-python`
   - Verify the config test passes

**Estimated time:** 20-25 minutes

## Checklist

- [ ] **Read index.py** — Understand how the main function reads like English
- [ ] **Read ai_sdk_adapter.py** — Found `get_last_user_message_text()` and `ai_sdk_message_generator()`
- [ ] **Understand code reuse** — Can explain why functions are extracted into separate modules
- [ ] **Found max_message_length** — Located the config field in config.py
- [ ] **Enabled message length check** — Uncommented the check code in api/index.py
- [ ] **Tested the feature** — Verified "Message too long" error appears for long messages
- [ ] **Understand Single Source of Truth** — Can explain why config values should be defined in one place
- [ ] **Test passes** — `mise run test-python` runs successfully

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your understanding

2. Be ready to answer:
   - "What is Single Source of Truth?"
   - "Why are `get_last_user_message_text()` and `ai_sdk_message_generator()` in ai_sdk_adapter.py instead of index.py?"
   - "If you want to change the message limit from 1000 to 2000, what file do you modify?"

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** Understanding verification through Q&A + hands-on demonstration.

**Core understanding (required):**

1. **Ask:** "What is Single Source of Truth?"
   - Good answer: "A value should be defined in only one place. Other places reference it instead of duplicating it."
   - Acceptable: "If you need to change something, you only change it in one place."
   - Bad answer: "I don't know" / Can't explain

2. **Ask:** "Why is the main function in index.py so short and simple?"
   - Good answer: "It only has flow control. Each step is a function call. The detailed logic is in separate modules for reuse."
   - Acceptable: "It's like reading English, step by step"
   - Bad answer: "Because that's how it was written"

3. **Ask:** "Why are `get_last_user_message_text()` and `ai_sdk_message_generator()` in ai_sdk_adapter.py?"
   - Good answer: "They're reusable. ai_sdk_message_generator is used for both normal responses and error responses. If it were inline, we'd have to write it twice."
   - Acceptable: "For reuse, so we don't repeat code"
   - Bad answer: Can't explain

4. **Ask:** "What does 'main function reads like English' mean?"
   - Good answer: "You can read the function and understand the flow: parse request, check length, call AI, return response. Each step is a function call with a clear name."
   - Bad answer: Can't explain

**Hands-on verification (required):**

5. **Ask:** "Show me where you uncommented the code in api/index.py"
   - Student should be able to navigate to the message length check code
   - Code should be uncommented and functional

6. **Ask:** "Notice how the error response uses ai_sdk_message_generator(). Why is this good design?"
   - Good answer: "It's the same function used for normal responses. If the AI SDK protocol changes, we only update one function."
   - Bad answer: "I don't know" / Can't explain the reuse benefit

7. **Ask:** "What happens if you want to change the limit from 1000 to 2000 characters?"
   - Good answer: "Change `max_message_length` in config.py, that's it"
   - Bad answer: "Change it in api/index.py" / "Change it in multiple places"

**What counts as "pass":**

- Student can explain Single Source of Truth in their own words
- Student understands why code is extracted into separate modules (for reuse)
- Student can explain "main function reads like English"
- Student successfully enabled the message length check feature
- Student can demonstrate that long messages return "Message too long" error
- Student understands the reuse of ai_sdk_message_generator()
- Test passes

**What does NOT count as pass:**

- Student cannot explain why we use a Config class
- Student cannot explain why functions are in separate modules
- Student couldn't find or enable the message length check code
- Student doesn't notice the reuse of ai_sdk_message_generator()
- Student just memorized answers without understanding the design philosophy
