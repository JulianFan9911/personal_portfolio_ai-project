# The Fake Teaches You The Real

---

## The Stunt Double

Ever watched behind-the-scenes footage from a movie?

Those dangerous action scenes — the protagonist leaping off a rooftop, sprinting through explosions, getting hit by a car — often it's not the lead actor standing there, but a stunt double.

The stunt double's job isn't to "pretend to be the star." It's to **help the crew work out all the technical details first**: Is the lighting angle right? Is the camera position good? Is the wire safe? Is the explosion timing accurate? Once everything's set, the star steps into position, someone calls "Action," and they nail it in one take.

What I did today was hire a "stunt double" for my AI chat feature.

---

## Why Fake First

This tutorial's goal is to give the personal website an AI chat feature that can converse with visitors. Sounds cool, right?

But to implement this feature, I need to figure out a bunch of things simultaneously:

- How do frontend and backend separate?
- How do API requests work?
- What the heck is streaming response?
- How do you configure AWS Bedrock?
- How do you use the AI SDK?

If I connected real AI from the start and encountered a bug, I'd have no idea where the problem was — is the frontend sending the wrong request format? Is the backend processing logic broken? Are the AWS credentials misconfigured? Or is there something wrong with the AI model itself?

Five layers of complexity stacked together, and any layer failing brings down the whole system. Debugging would be like groping in the dark — extremely inefficient.

So I chose an approach that might seem "dumb": **run through the entire flow with fake AI first.**

```python
hardcoded_reply = f"Hello! I received your message: '{user_message}'"
```

Just this one line. Whatever message the backend receives, it echoes back with "received."

Fake as can be. But this "fake" actually taught me what's "real."

---

## What I Actually Learned

With the AI part hardcoded, I could finally focus on **the architecture itself**.

For the first time, I truly understood what frontend-backend separation means. I'd heard people say "frontend handles display, backend handles logic" before and thought, isn't that obvious? But when I personally changed one line of backend code, refreshed the browser, and saw the chat response change immediately, that's when I really felt it:

**The frontend has no idea the backend is fake.**

The `useChat` hook sends requests, receives responses, updates the UI — the entire flow is identical to connecting real AI. There's nothing in the frontend code that says "this is hardcoded." It just cares: you give me data, I render it.

What does this mean? It means **if the interface is designed right, the implementation can be swapped anytime.**

Today the backend is an `if-else`, tomorrow switch to AWS Bedrock, the day after switch to OpenAI — the frontend doesn't need to change a single line of code.

This is the real power of "separating data and logic" — not just a slogan, but actual decoupling capability.

---

## The Layered Learning

Looking back, this exercise was really teaching a learning strategy: **learn one layer at a time.**

- **This step**: Learn architecture — how frontend and backend communicate, how data flows, what streaming response looks like
- **Next step**: Learn Stream Protocol details — what those `text-start`, `text-delta`, `text-end` things actually mean
- **Step after that**: Learn AWS Bedrock — how to configure it, how to call it, how to handle real AI responses

If everything came at once from the start, I'd be bombarded by three layers of complexity simultaneously and wouldn't learn any of them well.

Hardcoding's purpose is to **isolate complexity**. It lets me add layers one at a time, knowing what I'm doing at each step.

It's like learning to drive — training cars have a passenger-side brake. Not because the instructor doesn't trust you, but to let you focus on learning the steering wheel and gas pedal without simultaneously worrying about crashing. Once you're proficient with steering and gas, remove the passenger brake, and you won't panic.

---

## Bias for Action

This process also taught me something: **don't wait for all conditions to be perfect before starting.**

I could have waited until the AWS account was approved, Bedrock permissions were configured, and credentials were in hand before writing code. But then I might wait several days, learning nothing during the wait.

Instead, I started now. Used fake AI to run through the architecture, connected frontend and backend, got streaming response working. When AWS is ready, I just need to swap that one `hardcoded_reply` line with the real AI call.

**Action itself produces information.** In the process of doing, I discovered many things that "waiting until ready" would never reveal: streaming response needs a specific format, the frontend AI SDK automatically handles state management, DevTools can show every piece of streaming data...

These are all things you only learn by doing.

---

## Reflection

This exercise gave me a new understanding of the word "fake."

In everyday life, "fake" is negative — fake goods, fake words, fake pretenses. But in engineering, "fake" is neutral or even positive:

- Mock data is "fake," but it lets the frontend develop independently without the backend
- Stubs in unit tests are "fake," but they let you test individual functions in isolation
- Stunt doubles are "fake," but they let the crew prepare everything before the star arrives

**Fake isn't laziness, it's professionalism.**

It's deliberate simplification, letting you focus on the layer that matters most right now instead of being overwhelmed by all complexity at once.

Next time you face a system that seems complex, ask yourself: **is there any part that could be fake first?** Get the skeleton running first, the real stuff can be filled in later.

---

## What's Next

The stunt double has blocked out the moves, adjusted the lighting, set the camera positions.

Next step, time for the real star to take the stage — connecting AWS Bedrock to let the AI actually answer questions.

But I'm not nervous at all. Because the architecture has been validated, the interfaces are defined. Swapping in real AI should just be changing a few lines of code.

That's the confidence that comes from running through the "fake" first.
