# Before You Run, Learn How to Not Fall

---

## The Urge to Keep Going

Python's Hello World is running. `uv run python -c "print('Hello, AI World!')"` dutifully printed that line in my terminal.

Following the typical script, the next step should be: start building features! Add an API! Connect a database! Get some AI stuff in there!

I really wanted to do that. The excitement of "finally getting the project moving" makes you want to charge full speed ahead.

But I didn't.

I stopped and asked myself a question: **I plan to work on this project for a long time. What's going to stop it from becoming an unmaintainable mess by week three?**

---

## The Long Game Problem

This question might seem like overthinking — your code is barely a few lines long, and you're already worried about it becoming a mess?

But the more I thought about it, the more I realized this is exactly when I should be thinking about it.

Here's an analogy: you're running a marathon. At the start, you feel invincible. Your stride gets longer, your pace gets faster. But if you don't check your pace in the first 5 kilometers, don't control your rhythm, you'll probably crash in the remaining 37.

What do experienced runners do? **They check their watch every kilometer — sometimes every few hundred meters.** Not because they lack confidence, but because they know: running long distances isn't about raw enthusiasm. It's about continuous, frequent self-correction.

Writing code is the same.

If I write 500 lines of code before discovering a logic error somewhere, I might spend half a day hunting it down. But if there's a mechanism that tells me "these 10 lines are correct" after every 10 lines I write, bugs can't get far.

That "mechanism" is **TDD (Test-Driven Development)**.

---

## What TDD Really Is

Most people have heard TDD's workflow: write tests first, then code, run tests, refactor, repeat. Red light → green light → refactor.

But I think if that's all you understand, you've only scratched the surface.

While researching TDD, I kept asking myself: **Why does TDD work? What problem is it actually solving?**

After thinking about it for a while, here's my understanding:

TDD isn't really about "testing." It's about **feedback loops**. Extremely short feedback loops.

You change one line of code, run a test, and within fractions of a second you know if you got it right. The delay between "taking action" and "getting results" is compressed to nearly zero.

Why does this matter?

Because **how long people stick with something is directly tied to how fast they get feedback.**

Why are video games so addictive? Because every action gives you instant feedback — swing a sword, see damage numbers; fire a shot, hear a hit marker. You don't need to finish the entire game to know if you're doing well.

Why is fitness so hard to maintain? Because feedback is too slow — you do 100 push-ups today, look in the mirror, look exactly the same as yesterday. You need three months of consistency before seeing any change.

Coding without tests is like fitness — you code all afternoon, hit run, get some cryptic error, and have no idea where the problem is. That experience crushes motivation.

TDD turns coding into a video game — every small change gets a red or green light telling you: correct, keep going! Or: something's wrong here, think again.

**Fast feedback = fast correction = sustained confidence = going the distance.**

That's what TDD is really doing.

---

## Why Now, Not Later

But here's the question: my project right now is just a Hello World. What's there to test?

True. The "practical value" of writing tests right now is close to zero. Why would you test `print("Hello, AI World!")`?

But I decided to set up the testing infrastructure anyway. Two reasons:

**First, habits are easiest to build when stakes are low.**

Right now the project is simple. Setting up a test framework takes minutes. But if I wait until the project is complex, with lots of code, and try to add tests then? That becomes "paying off technical debt" — a completely different level of pain. It's like tidying your room — when you have few things, it's easy. When stuff is piled everywhere, you want to die.

**Second, infrastructure should exist from day one.**

If the test framework is there from the first day of the project, then "writing tests" is just part of the development workflow, as natural as "writing code." But if tests are added a month into the project, they become psychologically positioned as "extra burden" — something you "should do but always want to skip."

It's like brushing your teeth — a habit formed since childhood doesn't feel like a burden. But if someone starts brushing their teeth at age 25... yeah, every time probably involves a mental battle.

---

## Setting Up the Foundation

So here's what I did:

```bash
# Add pytest to pyproject.toml
uv add --dev pytest

# Create test directory
mkdir tests
touch tests/__init__.py

# Write the first test (yes, it tests something stupid)
```

```python
# tests/test_hello.py
def test_hello():
    assert 1 + 1 == 2  # Yes, this stupid, but the light is green
```

```bash
# Run it
uv run pytest

# ✅ 1 passed in 0.01s
```

Zero point zero one seconds. One green "passed."

It's such a dumb test, but the moment I saw that green light, I felt a strange sense of security.

It's like — oh, there's a guardian in this project now. It can't protect anything yet, but it's there. Every time I add a feature, I'll add another lock. And when this project eventually becomes complex, those locks will be my greatest confidence.

---

## Reflection

Some things look completely unnecessary when you do them, but over the long term their ROI is frighteningly high. Setting up a test framework is exactly that kind of thing.

Not everything important is urgent.

Many people (including my past self) are always pushed around by urgent things: quickly add features, quickly make a demo, quickly make it work. The "important but not urgent" stuff — writing tests, writing docs, thinking through architecture — gets pushed off again and again, until it never gets done.

This time I'm flipping the script. While it's not urgent yet, I'm doing the important stuff first.

A project with just a Hello World already has a complete testing framework set up. It seems a bit ridiculous. But I'm betting this decision will prove right in a month, three months, six months.

**It's never too early to do things that have long-term value.**

---

## What's Next

Tests are in place. Python's foundation is solid. Next up: finally touching the frontend.

Next.js... honestly, I'm a bit nervous. This is a world I've never touched before.

But nervous or not, it's time to dive in.
