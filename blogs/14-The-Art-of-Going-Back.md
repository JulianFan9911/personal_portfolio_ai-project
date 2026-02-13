# The Art of Going Back

---

## The Temptation to Keep Moving

The feature works. AI chat is functioning on Vercel, users send messages and get replies.

Logically, the next step should be adding new features: chat history, multi-turn conversation, better UI...

But the mentor said: pause, let's go back and clean things up.

Honestly, my first reaction was confusion. Doesn't the code work? Why "clean up"? Clean up what?

Then I opened `boto_ses.py` and saw `region_name="us-east-1"` hardcoded inside. Then I saw the same string in another file. Then another...

Oh.

---

## The Hidden Cost of "It Works"

"Working" and "maintainable" are two different things.

Imagine this scenario: the boss says we need to migrate the service to Tokyo, change region to `ap-northeast-1`.

If `us-east-1` is scattered across 5 files, you need to:
1. Global search for this string
2. Change them one by one
3. Pray you didn't miss any
4. Pray again you didn't change any incorrectly

This is the cost of **scattered configuration**. With only 3 files right now, it feels manageable. But when the project grows to 30 files, 300 files, this "technical debt" becomes crushing.

**Single Source of Truth** solves this problem: a value is defined in one place only, everywhere else references it. Change once, takes effect everywhere.

---

## Why This Matters More in the AI Era

This lesson got me thinking about a bigger issue: in the AI era, "going back to clean up" has become more important than ever.

Before, when writing code, every line was typed by yourself, so you naturally knew where the logic was and why it was written that way.

Now it's different.

AI can generate 200 lines of code in 30 seconds. The feature works, tests pass. But the question is: **do you actually understand what those 200 lines are doing?**

If you don't, you've become a "code courier" instead of a "code owner." AI writes something, you use it. Bug appears, you don't know where to look. Need to add a feature, you don't know where to add it.

**Going back to clean up is the process of turning "AI's code" into "your code."**

- Read through it, understand what each line does
- Extract functions where needed, extract configs where needed
- Make sure you can explain it to someone else

This isn't wasting time — it's **taking back control**.

---

## What We Actually Did

What this lesson did was actually quite simple:

**1. Config Management**

Centralized scattered config values into `config.py`:

```python
@dataclasses.dataclass
class Config:
    aws_region: str | None = dataclasses.field(default=None)
    max_message_length: int = dataclasses.field(default=1000)

config = Config.new()
```

Need to change region later? Modify `config.py`, one file only.

**2. Main Function Reads Like English**

Look at the refactored `index.py`:

```python
# Step 1: Log incoming request
request_body_data = await debug_ai_sdk_request(request=request)

# Step 2: Parse request
request_body = RequestBody(**request_body_data)

# Step 3: Check message length
# ...

# Step 4: Initialize chat session
# ...

# Step 5: Return streaming response
# ...
```

What each step does is crystal clear. How exactly? Click into the function to see. The main function only "directs," doesn't "do the work."

**3. The Power of Reuse**

The `ai_sdk_message_generator()` function gets used twice: once for returning normal AI responses, once for returning "Message too long" errors.

If this logic were written twice in `index.py`, when the AI SDK protocol changes, you'd need to modify two places. Extract it into a function, and changing once is enough.

---

## The Question That Reveals Code Quality

The mentor taught me a great question for judging code quality:

> "If requirements change, how many files do I need to modify?"

If the answer is "one," your design is good.

If the answer is "three or more," you might need to pause and clean up.

This question is almost brutally simple, but extremely practical. After finishing every feature, ask yourself this question, and you'll discover many hidden design issues.

---

## Reflection

The biggest takeaway from this lesson wasn't learning dataclass or factory methods.

It was understanding **when to stop**.

Many people (including my past self) have a coding rhythm of: charge charge charge, add features, charge charge charge again, add more features. Until one day discovering the code is a tangled mess, changing one thing breaks three things, then regretting not cleaning up earlier.

Professional developers have a different rhythm: charge for a while, stop to clean up, charge again, clean up again.

**After a milestone is the best time to clean up.** The feature just started working, the logic is still fresh in your mind — this is when cleanup cost is lowest. Come back three months later, and you'll feel like you're reading someone else's code.

The previous blog post said "the first milestone is the starting line." This post wants to say: **before you start running, tie your shoelaces first.**

---

## What's Next

Code is cleaned up, architecture is clear, time to safely add new features.

But more importantly, I learned a habit:

**After AI helps me write code, spend 10 minutes going back to clean up, making sure I can handle it.**

Those 10 minutes are the crucial step from "using AI" to "mastering AI."
