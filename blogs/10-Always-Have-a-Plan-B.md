# Always Have a Plan B

---

## Why Learn Two APIs

Today's tutorial taught me how to call AWS Bedrock.

But the tutorial also required learning a backup service — Gemini or GLM.

At first I didn't quite understand: isn't Bedrock stable enough? Why learn another one? Isn't this a waste of time?

After finishing, I thought about it and realized I got it.

---

## Redundancy Is Not Waste

In system design, this principle is called **Redundancy**.

- Databases have primary-replica backups — primary goes down, replica takes over
- Servers deploy across multiple availability zones — one data center loses power, others keep running
- Networks have multiple routes — one fiber gets cut, traffic automatically switches
- Hard drives use RAID — one disk fails, data isn't lost

At first glance, all of this is "waste" — if one is enough, why have two?

But real engineers know: **redundancy isn't waste, it's insurance.**

You wouldn't say the seatbelt was a waste just because you didn't get in an accident today. You also shouldn't think the backup API is unnecessary just because AWS didn't go down today.

---

## My Plan B for AI

Today's tutorial taught me how to call AWS Bedrock. But it also required mastering a backup service — Gemini or GLM.

At first I thought: isn't this overkill? Bedrock is pretty stable, right?

Then I thought about some scenarios:

- What if a certain AWS region has an outage? ([The 2017 S3 outage](https://aws.amazon.com/message/41926/) took down half the internet)
- What if a certain Bedrock model gets deprecated?
- What if users are in China and AWS latency is too high?
- What if a model's output quality suddenly degrades?

These aren't hypotheticals. They've all happened.

So I didn't just learn Bedrock — I also learned Gemini. Now my AI calling logic can be:

```python
try:
    response = call_bedrock(prompt)
except BedrockError:
    response = call_gemini(prompt)  # Plan B
```

Primary service goes down? No problem, backup service takes over. Users won't even notice.

This is **Graceful Degradation**.

---

## The Mental Model

After completing this tutorial, I gained a new mental model:

**Every time I depend on an external service, ask myself: what if it goes down?**

- Using OpenAI? Learn how to call Claude
- Using AWS S3? Learn about Cloudflare R2
- Using some open source library? Know if there are alternatives

This isn't about implementing everything twice. It's about **knowing where your backup options are**.

When problems actually happen, "I know there's another way" versus "I have no idea what to do" — that's a world of difference.

---

## Reflection

I used to think Plan B was a form of pessimism — like saying "I think Plan A will fail."

Now I understand: **Plan B isn't about not trusting Plan A, it's about letting Plan A be bolder.**

Because I know there's a backup API, I dare to put the AI feature live.
Because I know there's an exit if things go wrong, I don't have to wait for "foolproof" before acting.

People with an exit strategy actually go further.

---

## What's Next

Bedrock: learned. Gemini: also learned.

Next step: integrate AI into the chat interface, let real users talk to AI.

If Bedrock goes down? No problem. I've got Plan B.
