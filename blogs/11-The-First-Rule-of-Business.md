# The First Rule of Business

---

## The Water Bill

I used to call AI APIs like using tap water.

Turn on the faucet, water comes out. How much am I using? No idea. How much does it cost? Don't care. Free tier, educational discount, just use it for now.

Until one day, I started seriously reading the bill.

Here's what happened: I was building a "personal assistant" feature that needed to send the user's profile to the AI, then let users ask various questions. The user profile was about 1000 tokens, and users might ask 10 questions.

I figured, 10 questions, each question around 50 tokens, that's only 500 tokens total. The whole conversation shouldn't exceed 2000 tokens. Piece of cake.

Then I calculated the actual token consumption: 1000 + 1000 + 1000 + 1000 + 1000 + 1000 + 1000 + 1000 + 1000 + 1000 + 500 = **10,500 tokens**.

Wait, what?

---

## The Amnesiac Assistant

The problem was in a place I'd never thought about: **AI is "amnesiac" with every call.**

It doesn't remember the previous conversation. So every time the user asks a new question, I have to re-send the user profile. Like calling customer service every time and having to re-state your ID number, address, and order history.

The system clearly has all this information — why repeat it over and over?

What's worse, all this repeated content costs money every time.

I suddenly realized: **I don't understand the cost model of the tools I'm using.**

I only knew "the API works," but not "how the API charges." I only cared about "the feature runs," but not "what's the cost of running it." That's fine during learning, but if one day I actually launch a product...

The bill will teach me a lesson.

---

## Reading the Price Tag

So I did something I'd never done before: **actually read the pricing documentation.**

Not the "skim it, roughly know the price" kind of reading. Line by line, understanding what each billing item means.

Then I discovered something called Prompt Caching.

The principle is simple: since the user profile is the same every time, why make the AI re-process it each time? Can we have the AI "remember" this content and use cache next time?

AWS Bedrock implements it like this: you use a marker called `cachePoint` to tell the AI "please cache everything before this marker." On the first call, AI stores the static content in cache, you pay normal price. On subsequent calls, AI uses the cache directly, you only pay 25%.

**75% savings.**

Back to that example: 10 questions, each time sending 1000 tokens of user profile.

Without cache: 10 × 1000 = 10,000 tokens, full price.

With cache: First time 1000 tokens full price, next 9 times each 1000 × 25% = 250 tokens. Total equivalent cost: 1000 + 2250 = 3250 tokens.

Saved 67.5%.

The more questions asked, the more you save. With 100 questions, you save 74%.

---

## Frugality

This reminded me of an Amazon Leadership Principle: **Frugality**.

> Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention.

Do more with fewer resources. Constraints breed creativity.

I used to think this LP was for the finance department, nothing to do with engineers. But now I understand: **saving money is a fundamental engineering skill.**

Not about being cheap, but about understanding the cost structure of every tool you use. Knowing where optimization is worthwhile and where it isn't. Knowing when to spend money for efficiency and when to save for profit margins.

Good engineers don't just aim for "works well enough" — they aim for "works efficiently and effectively."

In the real world where resources are limited, achieving the same results with lower costs is a competitive advantage.

---

## Reflection

Looking back at this process, the biggest gain wasn't learning Prompt Caching as a technique — that's just reading documentation.

It was developing a habit: **reading pricing documentation.**

Many developers only read feature docs, not pricing docs. Feature docs tell you "what you can do," pricing docs tell you "what it costs." Combine both, and you can make truly smart technical decisions.

I've now set a rule for myself: every time I use a new API or service, beyond the Quick Start, I also look at Pricing. Not to save those few cents, but to understand the cost model of this service.

Because one day, those few cents will become hundreds, thousands, tens of thousands. By then, you'd better already know how to optimize.

---

## What's Next

Prompt Caching is a small knowledge point, but the thinking behind it matters: **understand the cost model of your tools.**

This thinking applies beyond AI APIs. Cloud servers, databases, CDNs, third-party services... each has its own billing logic. Figure them out, and you can make smarter architectural decisions.

Next time you open a new service's documentation, don't rush to the Quick Start.

Check the Pricing first.
