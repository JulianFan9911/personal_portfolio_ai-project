# If You're Going to Learn, Learn the Best

---

## The Temptation of the Easy Path

Python's Hello World isn't exactly new territory for me.

I've written Python before. `conda create -n myenv python=3.10`, then `pip install` everything in sight, and if it runs, good enough. I could do this workflow with my eyes closed. If all I wanted was to "get the project running," I could have been done in five minutes and happily moved on.

But this time, as I typed the first letter of `conda`, I stopped.

Wait.

Didn't I say I was starting fresh? Didn't I say I wanted to learn new things? If I'm still using the same toolchain from three years ago, am I really "learning something new" or just "using old habits while pretending to learn"?

Once that thought surfaced, I couldn't push it back down.

---

## Asking the Right Question

So I did something that my past self would've considered overkill — instead of just diving in, I first asked AI a question:

> **What tools do the best Python developers in the AI space use right now?**

Notice: I didn't ask "what's convenient for Python environment management" or "which is better, conda or venv." I asked: **what do the best people use.**

The phrasing matters. Because "convenient" and "best" are often not the same thing. Convenient tools help you start fast. The best tools help you go far.

AI gave me an answer: **mise-en-place + uv**.

Honestly, I'd never heard of either.

---

## Down the Rabbit Hole

What followed was a long research session. I didn't jump straight into installing things. First, I wanted to understand: what are these tools? How are they different from what I already know? Why are they considered "the best"?

Let's start with the evolution chain most people know:

**pip → virtualenv → conda → Poetry → uv**

Most tutorials and courses stop at Poetry or uv. Knowing about uv already puts you ahead — it's written in Rust, blazingly fast, and does the job of pip, virtualenv, and pyenv combined, but better. Many people stop here and think that's enough.

But I dug one layer deeper.

And I discovered **mise-en-place** (mise for short).

---

## The Manager of Managers

What is mise? In one sentence: **it's the thing that manages uv.**

If uv is a supercharged Python toolchain manager, then mise is the higher-dimensional entity standing behind it. It doesn't just manage Python — it manages everything. Node.js, Go, Rust, Java, Terraform... any runtime or CLI tool you need for development, mise can handle it.

This might sound like "just another layer of abstraction," but once I understood its design philosophy, I was convinced.

Here's mise's core philosophy:

**The same tool gets installed only once on your machine.**

Think about it: if you have 10 Python projects — 5 using Python 3.11, 5 using Python 3.12 — the traditional approach creates a separate virtual environment for each. Your disk ends up with tons of redundancy. Mise's approach is different: Python 3.11 exists once on your system. Python 3.12 exists once. Then configuration files precisely tell each project which version to use.

When you have two or three projects, the difference isn't obvious. But what if you have 100 projects?

Think about it mathematically. The traditional approach is O(n) — more projects, more redundancy, management cost grows linearly. Mise's approach approaches O(1) — no matter how many projects you have, each tool is installed once, management cost stays nearly constant.

**Isn't that fundamentally the optimal solution?**

---

## Why This Matters

Some might say: your project just started, you've got one repo, why think that far ahead? Just get it running!

True. For the goal of "getting this project running," using conda versus mise + uv makes zero difference. Both work.

But I'm not thinking about "this project." I'm thinking about "from today onwards."

If I use conda today, feel good for five minutes, then discover a month later that mise + uv was the better choice, and have to migrate then? That's the real hassle.

Better to spend some time upfront and choose the right path.

More importantly, I realized **the process of choosing tools is itself a form of learning**. While researching mise and uv, I understood many concepts that were previously fuzzy:

- What runtime version management actually means
- Why Python's package management is such a mess (too much historical baggage)
- What lockfiles are for
- Why modern toolchains are all moving to Rust
- What "convention over configuration" really means

This knowledge won't become obsolete when tools change. Even if something better than mise comes out tomorrow, this foundational understanding remains universal.

---

## Setting It Up

Finally, the practical steps (though this post isn't meant to be a tutorial):

```bash
# Install mise
curl https://mise.run | sh

# Use mise to install uv
mise use -g uv@latest

# Use uv to create project
uv init my-ai-app
cd my-ai-app

# Run Hello World
uv run python -c "print('Hello, AI World!')"
```

Just a few lines. Clean and simple.

No massive conda environment, no wrestling between `requirements.txt` and `setup.py`, no existential crisis over "pip or pip3."

The moment `Hello, AI World!` appeared in my terminal, I knew I'd chosen the right path.

---

## Reflection

Looking back at this decision, the biggest gain wasn't learning how to use mise and uv — you can get that from documentation.

The biggest gain was realizing this:

**When you're at the starting line, choosing which tools to use matters more than rushing to take the first step.**

This isn't about endless procrastination or chasing perfection. It's about spending a bit more time researching, comparing, and understanding before you act — that time investment has the highest return. Because choices at the starting point affect the efficiency of every subsequent step.

Good tools don't make you better. But they let you spend your time on what actually matters.

And honestly — using cutting-edge tools just makes coding more enjoyable. That matters too.
