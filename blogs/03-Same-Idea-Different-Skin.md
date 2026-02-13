# Same Idea, Different Skin

---

## A Familiar Feeling

Today's task was simple: install Node.js and pnpm to prepare for the Next.js frontend.

In the past, every tutorial I found taught nvm + npm. But after going through the mise + uv experience in the last post, I didn't even search for tutorials. I just typed:

```bash
mise use -g node@lts
mise use -g pnpm@latest
```

Two lines. Done.

Then I casually browsed through pnpm's documentation to understand how it differs from npm.

The more I read, the more familiar it felt.

---

## Déjà Vu

What's pnpm's core selling point? **All packages are stored only once on disk, and projects reference them via hardlinks.**

Wait. Haven't I seen this idea somewhere before?

uv — Python's dependency manager. Same core logic. No redundant storage; shared through links.

mise — runtime version manager. Same core logic again. Python 3.12 gets installed once, and every project that needs it shares that installation.

Three tools, three different language ecosystems, solving problems at three different levels. But peel back the surface, and they're all running on **the same engine**:

> **Store identical things once, reference them when needed.**

In computer science, this isn't even a new concept. Isn't this just "normalization" in databases? Isn't this "shared libraries" in operating systems? Isn't this "reference vs. copy" from everyone's first data structures class?

Turns out truly great design principles are this simple. So simple they transcend languages, tools, and eras — everyone eventually arrives at the same answer.

---

## The Payoff of Going Deep

But what made me happiest wasn't the discovery itself. It was something else:

**I barely spent any time learning pnpm.**

Because I already understood uv's design logic, when I read pnpm's documentation, my brain automatically mapped everything over. Content-addressable store? Oh, that's like uv's global cache. Hardlink? Oh, that's a variation of mise's shims directory. Lockfile? Same thing, pinning exact versions.

In the last post, I said that time spent understanding underlying principles doesn't become obsolete when tools change.

I didn't expect that to be validated so quickly. Just one blog post later.

When you understand *why* something is designed a certain way, not just *how* to use it, learning similar tools costs almost nothing. Because you're not learning a new tool — you're just recognizing a familiar face.

---

## What's Next

Alright, Node.js and pnpm are ready. Ammunition loaded.

Next step is the part that actually makes me nervous — initializing the frontend project with Next.js.

This will be my first time writing real frontend code. Wish me luck.
