# Milestone Review: Document Your Codebase

> The project is stable. While the memory is fresh, write down what you learned.

## Overview

Through the previous lessons, you've built a complete AI portfolio website: Landing Page, AI Chatbot, Vercel deployment. Everything works.

Now is a good time — **stop, review, and turn your knowledge into documentation**.

Why now? Remember the 30% Rule: at 30% completion, you can see the full picture and still have energy to organize. Push further, and details start fading. Come back three months later to modify the code, and you might not even remember how you set things up.

This lesson's goal is simple: **read the documentation your mentor wrote, then write one yourself**.

---

## Learning Objectives

In this lesson, you will:

1. **Understand two types of documentation** — What decisions and dev-guide documents are for
2. **Review the codebase structure** — Quickly recap project architecture by reading docs
3. **Practice writing technical docs** — Write one yourself, building the skill of "writing knowledge down"

---

## Prerequisites

- Completed previous lessons (website deployed, AI Chat working)
- Basic familiarity with the codebase

---

## Key Concepts

### Two Types of Documentation

Your mentor has organized two types of documentation with different purposes:

| Type | Location | Purpose |
|------|----------|---------|
| **Decisions** | `docs/decisions/` | Records "why we made this decision" |
| **Dev Guide** | `docs/dev-guide/` | Records "how to work with this codebase" |

**Decisions** answer "Why":
- Why use pnpm instead of npm?
- Why generate requirements.txt?
- How does Vercel billing work?

**Dev Guide** answers "How":
- What's the directory structure?
- What are the key files in frontend/backend?
- Where should I look to modify a feature?

### Why Write Documentation?

These documents are practical — they're meant to be useful later:

- **You come back three months later** to modify code, forgot how it was configured → Read Dev Guide
- **Want to know why** a decision was made → Read Decisions
- **New teammate joins** the project → Send them the doc links

Writing documentation isn't wasting time — it's **saving time for your future self and teammates**.

---

## Exercises

### Exercise 1: Read the Dev Guide

**Goal:** Review codebase structure by reading documentation.

**What to do:**

1. Open and read these four dev guide documents:
   - [01-overview.md](./docs/dev-guide/01-overview.md) — Project architecture overview
   - [02-backend-walkthrough.md](./docs/dev-guide/02-backend-walkthrough.md) — Backend code walkthrough
   - [03-frontend-walkthrough.md](./docs/dev-guide/03-frontend-walkthrough.md) — Frontend code walkthrough
   - [04-faq.md](./docs/dev-guide/04-faq.md) — FAQ & Cookbook

2. While reading, ask yourself:
   - Did I learn this before?
   - Are there details I've already forgotten?
   - If I come back in three months, will this document be enough?

**Why this matters:**

Reading others' documentation is the first step to learning "how to write good docs." Notice the structure: overview first, then details, finally a quick reference.

---

### Exercise 2: Read the Decisions

**Goal:** Understand key project decisions and the reasoning behind them.

**What to do:**

1. Open and read these four decision records:
   - [vercel-active-cpu-billing.md](./docs/decisions/vercel-active-cpu-billing.md) — Vercel billing model
   - [vercel-framework-detection.md](./docs/decisions/vercel-framework-detection.md) — Framework detection issue
   - [vercel-pnpm-package-manager.md](./docs/decisions/vercel-pnpm-package-manager.md) — Why pnpm
   - [vercel-python-uv-requirements.md](./docs/decisions/vercel-python-uv-requirements.md) — Python dependency management

2. Notice each document's structure:
   - **Background** — What problem did we encounter?
   - **Why** — Why solve it this way?
   - **How** — Specific steps

**Why this matters:**

Decision documents aren't tutorials — they're "archaeological records." They help you understand: **what was the context when this decision was made**. This is especially useful when you need to change a decision — knowing why it was originally made helps you judge whether it needs changing now.

---

### Exercise 3: Write Your Own Document

**Goal:** Write a technical document yourself, practicing "writing knowledge down."

**What to do:**

1. Pick something you learned in this project, such as:
   - A bug you encountered (how you found it, how you fixed it)
   - A concept that impressed you
   - An operation you want to record for future reference

2. Create a new markdown file in the `docs/` directory

3. You can use AI to help you write:
   ```
   Help me write a technical document about [xxx], recording [background, problem, solution]
   ```

4. After writing, share it with your mentor as this lesson's assignment

**Suggested document structure:**

```markdown
# Title

## Background
What problem did you encounter? What's the context?

## Solution
How did you solve it?

## Key Points
What should you pay attention to?

## References
Related links or commands
```

---

## Reflection

This lesson is simple: **read docs, write docs**.

But behind this is an important habit: **at milestones, stop and organize**.

Many people think writing docs wastes time, rushing to the next feature. Three months later, they stare at their own code confused.

**Good engineers don't just write code — they write documentation**. Documentation is a gift to your future self and teammates.

---

## Mentor's Note

**Why this lesson exists:**

Students often think "the feature is done, I'm done." But in real work, code is only half — **documentation, reviews, knowledge capture** is the other half.

I've seen too many projects with great code but no documentation. When someone new takes over, they spend a week just understanding the architecture. That week could have been saved.

**The real purpose of this lesson:**

1. **Build the habit of writing docs** — Not at the end, but as you go
2. **Know what to document** — Not everything, but "information that will be useful later"
3. **Review through reading** — After reading, the project structure becomes clearer

**About "write one yourself":**

This assignment is intentionally open-ended. Students can write anything — bugs they hit, concepts they learned, operation guides.

The point isn't writing well — it's **starting to write**.

Many students feel "there's nothing to write" at first. But once they start, they discover "I learned so much."

**That's the power of review.**

---

## Quick Reference

**Documentation locations:**
- Dev Guide: `docs/dev-guide/`
- Decisions: `docs/decisions/`

**Writing documentation:**
```bash
# Let AI help you write docs
# Just describe what you want to record in Claude Code
```

**Submitting your assignment:**

After writing a document, tell your mentor what you wrote and share your thoughts.

---

*Writing documentation seems like "extra work," but it's one of the core skills of effective engineers. Build the habit now — you'll thank yourself later.*
