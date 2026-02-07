# Prompt Caching: Give AI a "Memo"

> When you need to repeat a lot of background information every time, Prompt Caching can save you money.

## Overview

Imagine this scenario: you're using AI to analyze a 500-page user manual. You ask 10 questions, and each time you have to send all 500 pages to the AI.

Here's the problem—those 500 pages are the same every time, but you're paying for them 10 times. Even worse, the AI has to "read" those 500 pages again each time, like an assistant with amnesia who needs to be reintroduced at every meeting.

This clearly doesn't make sense. If only the AI could "remember" the content that doesn't change.

That's exactly the problem Prompt Caching solves.

## Learning Objectives

In real-world AI applications, you'll often encounter this pattern:

```
[Large static background information] + [User's question]
```

For example, you might need to send the user's personal profile to the AI and then ask various questions; or send a product document to the AI so users can ask questions anytime; or send an entire codebase to the AI to help developers solve problems.

In all these scenarios, the background information is fixed—only the user's question changes. If you don't understand Prompt Caching, every API call will charge you for that repeated static content. In production environments, this creates significant cost waste.

After completing this lesson, you will be able to:

1. **Understand the value of Prompt Caching** — Know what problem it solves and which scenarios are suitable for it
2. **Understand how it works** — Grasp the difference between cache write and cache read
3. **Know the cost benefits** — Understand that cache reads in AWS Bedrock can save about 75% on input token costs
4. **Implement Prompt Caching** — Use `cachePoint` in AWS Bedrock to mark cache boundaries

## Prerequisites

Before you begin, make sure you've completed the "Hello, AI!" lesson and can call the AWS Bedrock API. Your AWS credentials should be configured, and project dependencies should be installed (via `mise run inst`).

---

## Key Concepts

### 1. The Problem: Repeatedly Sending Static Content

Let's look at a typical conversation flow. Suppose you're developing a "personal assistant" app that needs to answer various questions based on a user's profile:

**First question:**
```
[User profile 1000 tokens] + "What birthday gift would you recommend?"
```

**Second question:**
```
[User profile 1000 tokens] + "Weekend activity recommendations?"
```

**Third question:**
```
[User profile 1000 tokens] + "What music suits me?"
```

See the problem? That 1000 tokens of user profile has to be sent every time, and you pay for it every time. If the user asks 10 questions, you've actually sent 10,000 tokens of user profile—but the content is exactly the same.

It's like having to repeat your ID number, address, and order history every time you call customer service. The system already has all this information—why repeat it over and over?

### 2. How Prompt Caching Works

The core idea of Prompt Caching is actually quite simple: **let the AI remember the content that doesn't change**.

How does it work exactly?

When you make your first API call (which we call **Cache Write**), you send the static content plus your question. The AI stores the static content in a cache, and you pay the normal price. This step is a necessary "investment."

Subsequent calls (which we call **Cache Read**) are different. You still send the same static content plus a new question, but the AI finds that this content is already in the cache, so it uses the cached version directly without reprocessing. At this point, you only pay about 25% of the price!

This is just like browser image caching: the first time you visit a website, you download the images; after that, the browser finds they're already stored locally and uses the cache instead of downloading again.

### 3. Under the Hood: What's Being Saved?

You might be curious: what exactly does caching save?

When you send text to an AI, the AI needs to **parse** that text. This process is called "tokenization" plus subsequent vector processing—simply put, it converts human text into an internal representation that the AI can understand.

This parsing process requires computational resources, so it costs money. The longer the text, the more computation, the higher the cost.

Prompt Caching saves this "parsing" cost. On the first call, the AI parses the static content and stores it in the cache—you pay the normal price. On subsequent calls, the AI directly uses the already-parsed result from the cache, skipping the repeated parsing computation, so it only charges you about 25% of the price.

One important note: this is primarily a **cost** savings, not a significant time improvement. Why? Because for modern AI models, the time to parse text is not the main bottleneck compared to the time to generate responses. Generating the response is the most time-consuming part. So you might not notice a significant speed improvement, but your bill will definitely get smaller.

### 4. AWS Bedrock Implementation: cachePoint

Theory covered, let's see how to write the code.

In AWS Bedrock, you use a marker called `cachePoint` to tell the AI: "From here on, please cache everything before this point."

```python
messages = [
    {
        "role": "user",
        "content": [
            # Static content (will be cached)
            {"text": static_context},

            # Cache boundary marker—this is the key!
            {"cachePoint": {"type": "default"}},

            # Dynamic content (will not be cached)
            {"text": question},
        ],
    }
]
```

The rule is simple: content **before** `cachePoint` gets cached; content **after** it doesn't.

So you need to put the unchanging content (like user profiles, document content) before `cachePoint`, and the content that changes every time (like the user's question) after it. This way, static content only needs to be parsed once, and all subsequent calls enjoy the price discount from caching.

### 5. Important Limitation: Minimum Token Requirement

Before you excitedly start using this feature, there's an important limitation to understand: **static content must be at least 1024 tokens**.

Why this limitation? Because caching itself has costs—storage, management, and lookup all require resources. If the content is too short, the benefit from caching doesn't outweigh the caching overhead, making it counterproductive. So AWS sets a minimum threshold.

More importantly, if your static content is too short, caching will **silently fail**—no error, the code runs normally, but there's no caching effect at all. You might think you're saving money when you're actually not. This is an easy trap to fall into.

Different models have slightly different minimum requirements: Nova Micro/Lite/Pro needs 1024 tokens, Claude models need 1024 to 4096 tokens depending on the model. Check the official documentation for specific numbers.

### 6. Cost Benefits

Let's do some math so you have an intuitive understanding of the benefits.

Using AWS Bedrock as an example, Cache Write (writing to cache) charges the normal price, while Cache Read (reading from cache) only charges about 25% of the price—equivalent to **saving about 75%**.

Suppose your static content is 1000 tokens and the user asks 10 questions.

Without caching, you pay for those 1000 tokens every call. 10 calls × 1000 tokens = 10,000 tokens, all charged at normal price.

With caching? The first call pays normal price for 1000 tokens (while writing to cache), and the subsequent 9 calls each only pay 1000 × 25% = 250 tokens equivalent price. Total: 1000 + 250 × 9 = 3250 tokens equivalent cost.

How much did you save? (10000 - 3250) / 10000 = **67.5%**.

And the more questions asked, the closer the savings get to 75%. If the user asks 100 questions, the savings rate is (100000 - 1000 - 99 × 250) / 100000 ≈ **74.3%**.

Of course, different AI providers have different pricing strategies. The 75% savings is AWS Bedrock data—other providers (like OpenAI, Anthropic direct API) may differ. Always check each platform's official pricing documentation.

---

## Exercises

Theory done, now let's get hands-on and see Prompt Caching in action.

### Exercise 1: Run the Script and Observe Caching

**Goal:** See the difference between cache write and cache read with your own eyes.

Before you start, spend two minutes browsing the script file `scripts/test_ai_aws_bedrock_with_cached_prompt.py` to get a general sense of the code structure. You don't need to understand every line—just know what it does: sends a user profile (static content), then asks three different questions.

Ready? Run the script:

```bash
python scripts/test_ai_aws_bedrock_with_cached_prompt.py
```

After it runs, carefully observe the output. You'll see something like this:

```
TURN 1
Q: Based on my profile, what birthday gift would you recommend?
A: [AI's response]
Tokens: input=XX, output=XX, total=XX
Cache:  write=XXX, read=0  <-- Writing to cache

TURN 2
Q: What weekend activity would suit me?
A: [AI's response]
Tokens: input=XX, output=XX, total=XX
Cache:  write=0, read=XXX  <-- Cache hit (75% cheaper!)

TURN 3
Q: What music playlist matches my personality?
A: [AI's response]
Tokens: input=XX, output=XX, total=XX
Cache:  write=0, read=XXX  <-- Cache hit (75% cheaper!)
```

Focus on the `Cache:` line. In Turn 1, the `write` value is greater than 0 while `read` is 0—this means the static content is being written to the cache. By Turn 2 and Turn 3, it's reversed—`write` becomes 0 and `read` becomes greater than 0. That's a cache hit! The AI read directly from the previously stored cache, and you only pay 25% of the price.

> **Key insight:** The first call is an "investment," subsequent calls are the "return." The more questions asked, the higher the ROI. This is why Prompt Caching is especially suited for "set up once, ask many times" scenarios.

---

### Exercise 2: Calculate Your Savings

**Goal:** Understand cost savings through actual numbers.

Just looking at output isn't intuitive enough—let's do some calculations. Based on the output you saw in Exercise 1, fill in the following:

1. Tokens written to cache in Turn 1 (the `write` value): ______
2. Tokens read from cache in Turn 2 (the `read` value): ______
3. Tokens read from cache in Turn 3 (the `read` value): ______

Now calculate the actual savings:

4. Total tokens read from cache = Turn 2 + Turn 3 = ______
5. These tokens would cost full price without caching; with caching you only pay 25%, so you save 75%
6. Equivalent tokens saved = result from step 4 × 75% = ______

If the script's profile is about 900 tokens and 2 out of 3 calls use the cache, you saved approximately 900 × 2 × 75% = 1350 tokens equivalent cost. This is just 3 calls. Imagine in a production environment, if users ask 100 questions per day, how much would you save over a month?

> **Key insight:** Prompt Caching is a classic "invest upfront, reap returns later" model. Looking at just the first call, there's no savings; but as call count increases, cumulative savings become considerable. That's why it's especially valuable in high-frequency production environments.

---

### Exercise 3: Understand cachePoint Placement

**Goal:** Understand the role of `cachePoint` in the code and why it's placed where it is.

Now open `scripts/test_ai_aws_bedrock_with_cached_prompt.py` and find the `send_message_with_cache` function. Around lines 95-122, you'll see the code that builds `messages`.

Carefully observe the structure of this code, then answer these questions:

1. What content is placed before `cachePoint`?
2. What content is placed after `cachePoint`?
3. Why is it arranged this way? What would happen if the order were reversed?

Got your answers? Here's the reference:

Before `cachePoint` is `static_context`, which is the user's profile—the content that doesn't change. After `cachePoint` is `question`, which is different every time.

Why this arrangement? Because the value of caching is avoiding repeated processing of the same content. The user profile is the same every time, so it's worth caching; the question is different every time, so caching it makes no sense. If you reversed the order—putting the question first, then the profile—the question would get cached and the profile wouldn't. Next time you ask a different question, the cache would miss, completely defeating the purpose.

> **Key insight:** The position of `cachePoint` determines what gets cached. Remember this principle: put unchanging content before `cachePoint`, put changing content after. This order cannot be reversed.

---

## Reflection

Let's review what we learned in this lesson.

Prompt Caching solves a very practical problem: when you need to repeatedly send the same background information, how do you avoid paying multiple times for that repeated content? Its mechanism is intuitive—the first call writes static content to cache at normal price; subsequent calls read from cache at about 25% price. Under the hood, it saves the computational cost of AI parsing text.

In AWS Bedrock, usage is simple: use `cachePoint` to mark the cache boundary, put static content before it and dynamic questions after. But watch out for the minimum 1024 token requirement, otherwise caching silently fails.

What scenarios suit Prompt Caching? Any "large background information + multiple questions" pattern. For example: analyzing a long document and asking multiple questions, personalized conversations based on user profiles, tasks that repeatedly reference the same background material.

---

## Mentor's Note

**Why this exercise matters:**

In my view, the value of learning Prompt Caching goes far beyond "mastering an API feature." It embodies a more important engineering principle: **understand the cost model of your tools**.

I've seen many people use AI APIs like tap water—just turn on the faucet, don't worry about metering. That's fine during learning, but in production environments, this attitude will make your bills spiral out of control. I once saw a team spending several thousand extra dollars per month because they didn't understand the token billing mechanism.

When you understand how tokens are billed and how caching works, you can make smarter architectural decisions. You'll start asking yourself: should this content be cached? Where should static information be placed in the prompt? What's the expected calling pattern? These questions all require understanding the underlying cost model to answer.

**Key insights:**

Saving money is a fundamental skill for engineers. Good engineers don't just aim for "it works"—they aim for "it works efficiently and economically." In a resource-limited real world, achieving the same results with less cost is a competitive advantage.

Also remember that context determines technology. Prompt Caching isn't a silver bullet—it only has value in "repeated static content + multiple calls" scenarios. If your application has completely different content each call, or has low call frequency, the benefits from caching might not justify the extra complexity. Technology selection should always be based on specific context.

Additionally, I recommend forming this habit: when reading API documentation, don't skip the pricing section. That's where many optimization opportunities hide. Many developers only read feature docs, not pricing docs, and miss out on money-saving techniques.

**Next steps:**

Next time you develop an AI application, ask yourself these three questions:

1. How much of my prompt content is the same every time?
2. How many questions will users ask? What's the call frequency?
3. Is the ROI of enabling caching worth it? How many calls to break even?

This cost-consciousness will make you stand out in your team. After all, in an era where AI applications are becoming increasingly common, engineers who can control costs are more valuable than engineers who can only call APIs.

---

## Quick Reference

**Run the script:**

```bash
python scripts/test_ai_aws_bedrock_with_cached_prompt.py
```

**cachePoint usage:**

```python
messages = [
    {
        "role": "user",
        "content": [
            {"text": static_context},           # Will be cached
            {"cachePoint": {"type": "default"}}, # Cache boundary
            {"text": question},                  # Will not be cached
        ],
    }
]
```

**Cache metrics in response:**

```python
usage = response.get("usage", {})
cache_write = usage.get("cacheWriteInputTokens", 0)  # Tokens written to cache
cache_read = usage.get("cacheReadInputTokens", 0)    # Tokens read from cache
```

**Key files:**
- `scripts/test_ai_aws_bedrock_with_cached_prompt.py` — Complete Prompt Caching example

**Documentation:**
- [AWS Bedrock Prompt Caching](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html)
