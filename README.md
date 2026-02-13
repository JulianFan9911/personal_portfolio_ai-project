# Ship Your Story: Make Others See Your Value

> Code becomes outdated, but the thinking you document doesn't.

## Overview

Congratulations on making it here.

Let's look back at this project's journey: starting from an empty repo, we built a complete AI portfolio website. Next.js + FastAPI + AWS Bedrock, frontend-backend separation, streaming responses, Vercel deployment, testing framework, documentation system — this isn't a "toy project," it's an **enterprise-grade, production-quality** AI application.

More importantly, this architecture is an **extensible foundation**. Any AI application you want to build in the future — RAG systems, AI Agents, multimodal assistants — can be built on top of this skeleton.

**But here's the problem: how does anyone else know you did all this?**

Your code sits on GitHub — thousands of lines, dozens of files. HR won't read it. Interviewers don't have time to go through it line by line. They'll spend 30 seconds scanning your resume, then decide whether to give you a chance.

If you want this project to truly become your **career asset**, you need to learn one thing: **tell your story in words**.

That's what this final lesson is about.

---

## Learning Objectives

In this lesson, you'll learn:

1. **Internal docs vs external docs** — Last lesson's dev-guide/decisions are for yourself and team; blogs are for the outside world
2. **Understand Ship Your Story** — Publicly documenting your learning isn't showing off, it's a career strategy
3. **Connect blogs to Leadership Principles** — Each blog reflects a professional competency
4. **Write your own blog** — Practice turning learning into output

---

## Prerequisites

- Completed all previous lessons
- Read last lesson's documentation (dev-guide and decisions)

---

## Key Concepts

### Internal Docs vs External Docs

Last lesson we wrote two types of documentation:

| Type | Location | Audience | Purpose |
|------|----------|----------|---------|
| Dev Guide | `docs/dev-guide/` | Self, team | How to run it, how to modify code |
| Decisions | `docs/decisions/` | Self, team | Why we made certain choices |

These are **internal docs** — for yourself and your team, helping understand and maintain the code.

But there's another type: **external docs** — for the outside world.

| Type | Location | Audience | Purpose |
|------|----------|----------|---------|
| Blogs | `blogs/` | HR, interviewers, peers, yourself | Showcase thinking process and professionalism |

Blogs aren't technical documentation — they're **your learning diary**. They record: what problem you encountered, how you thought about it, how you solved it.

### Why Ship Your Story?

"Ship Your Story" is a career development strategy:

1. **Interview material** — When interviewers ask "what projects have you done," you have not just code, but complete records of your thinking
2. **Reflection tool** — Writing blogs forces you to organize your thoughts, deepening understanding
3. **Career credibility** — Public learning records are more convincing than a few lines on a resume
4. **Future assets** — Years later, these records can become talks, tutorials, even books

The key is: **don't wait until you've "learned it" to write — write as you learn**.

### The Leadership Principle Behind Each Blog

Look at this project's 16 blogs. Each one isn't just a "tech note" — it demonstrates a professional competency:

| Blog | Title | Competency Demonstrated |
|------|-------|------------------------|
| 00 | The Beginning of Everything | **Bias for Action** — Act first, don't wait for everything to be perfect |
| 01 | If You're Going to Learn, Learn the Best | **Learn and Be Curious** — Learn the best, research top solutions |
| 02 | Before You Run, Learn How to Not Fall | **Insist on High Standards** — Set up testing framework from day one |
| 03 | Same Idea, Different Skin | **Learn and Be Curious** — Understand underlying principles, apply across domains |
| 04 | Cut It Down, Make It Run | **Deliver Results** — Cut to minimum viable, get results first |
| 05 | From Localhost to the World | **Deliver Results** — Running locally isn't done, deployment is |
| 06 | Learn From The Giants | **Learn and Be Curious** — Learn from the masters |
| 07 | Steal Like an Artist | **Invent and Simplify** — Imitate first, then innovate |
| 08 | The Fake Teaches You The Real | **Invent and Simplify** — Validate architecture with fake data |
| 09 | The Power of Protocol | **Think Big** — Understand protocols, design scalable systems |
| 10 | Always Have a Plan B | **Think Big** — Redundancy design, professional thinking |
| 11 | The First Rule of Business | **Frugality** — Understand costs, save where it matters |
| 12 | The Toolmaker's Mindset | **Dive Deep** — Understand what tools do, not just how to use them |
| 13 | The First Milestone | **Deliver Results** — Zero tech debt milestone |
| 14 | The Art of Going Back | **Ownership** — Go back and organize, own your code to the end |
| 15 | The 30% Rule | **Have Backbone** — Know when to make global decisions |

These weren't forced connections after the fact — **the process of writing blogs itself cultivates these competencies**.

### Blog Structure

Each blog doesn't need to be long, but needs structure:

```markdown
# Title (compelling, not "Study Notes #1")

## What Happened
Describe the scenario and problem

## How I Thought About It
Your thinking process

## What I Did
The specific solution

## What I Learned
Distilled principles or insights
```

The key is: **don't just record "what you did," record "why you did it"**.

---

## Exercises

### Exercise 1: Read the Blog Catalog

**Goal:** Understand the entire project's learning journey.

**What to do:**

1. Open the blog catalog: [00-Blog-Catalog-CN.md](./blogs/00-Blog-Catalog-CN.md)
2. Quickly browse the titles and summaries of 16 blogs
3. Ask yourself:
   - Which titles attract you most?
   - Can you guess what each is about from the title?
   - Are these blogs technical tutorials, or thinking records?

**Why this matters:**

Good blog titles aren't "React Study Notes 01" — they're curiosity-provoking questions or viewpoints. Notice how these blogs are named.

---

### Exercise 2: Deep Read 2-3 Blogs

**Goal:** Learn blog writing style.

**What to do:**

1. Pick 2-3 blogs you're interested in, read them completely
2. Recommended starting points:
   - [00-The-Beginning-of-Everything-CN.md](./blogs/00-The-Beginning-of-Everything-CN.md) — The beginning
   - [04-Cut-It-Down-Make-It-Run-CN.md](./blogs/04-Cut-It-Down-Make-It-Run-CN.md) — Deliver Results
   - [13-The-First-Milestone-From-Zero-to-Live-CN.md](./blogs/13-The-First-Milestone-From-Zero-to-Live-CN.md) — Milestone
3. While reading, ask yourself:
   - What problem does this blog address?
   - How did the author think?
   - What would I do if I faced a similar problem?

**Why this matters:**

Reading others' blogs is the fastest way to learn blog writing. Notice: these blogs aren't teaching technology — they're sharing thinking processes.

---

### Exercise 3: Write Your Own Blog

**Goal:** Turn what you learned in this project into a blog post.

**What to do:**

1. Recall the most memorable thing from this project:
   - A bug that stuck you for a long time?
   - A concept that gave you an "aha" moment?
   - A moment that changed how you think?

2. Write a blog using this structure:

```markdown
# [A compelling title]

## What Happened
Describe the scenario

## How I Thought About It
Your thinking process

## What I Did
Specific approach

## What I Learned
Distilled wisdom
```

3. Save the blog to `blogs/` directory, name it `my-first-blog.md`

4. You can use AI to help polish:
```
Help me make this blog read more smoothly, but keep my thinking process
```

**Why this matters:**

Writing blogs isn't for others first — it's for yourself. The writing process forces you to organize thoughts, turning vague "feels like I learned" into clear "actually understand."

---

### Exercise 4: Identify the Leadership Principle in Your Blog

**Goal:** Connect blogs to professional competencies.

**What to do:**

1. Re-read the blog you wrote
2. Ask yourself: what Leadership Principle does this blog demonstrate?
   - Bias for Action?
   - Learn and Be Curious?
   - Deliver Results?
   - Ownership?
   - Others?

3. Add a line at the end of your blog:
```markdown
---
*This blog demonstrates [XXX] — [one sentence explaining why]*
```

**Why this matters:**

In interviews, interviewers won't ask "tell me about your blog." They'll ask "tell me about a challenge you faced." If you've already connected your blogs to Leadership Principles, answering these questions becomes natural.

---

## Summary

This project concludes here.

Let's review what you accomplished:

**Technical level:**
- Built a full-stack Next.js + FastAPI application from scratch
- Implemented AI Chat functionality, integrated with AWS Bedrock
- Used Vercel AI SDK for streaming responses
- Deployed to Vercel, globally accessible
- Set up testing framework and documentation system

**Mindset level:**
- Learned "get it running first, optimize later" Bias for Action
- Understood the 30% Rule — when to make global decisions
- Mastered the Think → Do → Debug → Learn cycle
- Developed habits of writing documentation and blogs

**Career level:**
- Have a portfolio project to showcase
- Have a complete set of learning records (blogs)
- Can confidently talk about your thinking process in interviews

This isn't the end — it's the beginning.

This architecture can continue to expand — add RAG, add Agents, add multimodal — any AI feature can be built on this skeleton.

And the thinking you've documented will become long-term assets in your career.

**Ship Your Story isn't showing off — it's investing in your future self.**

---

## Mentor's Note

**Why end with "Ship Your Story":**

Many students think "writing blogs" is extra burden — better to learn another technology.

But here's what I want to say: technology becomes outdated, tools get updated, but **your thinking ability and expression ability** don't become outdated.

I've seen too many candidates with good technical skills who can't clearly explain what they did or why during interviews. Meanwhile, other candidates with perhaps weaker technical skills can clearly articulate their thinking process — the latter are often preferred.

**Blogs are your "thinking records."**

- Before interviews, you can re-read your blogs, recall your journey
- Years later, these records can become talks, tutorials, even books
- Most importantly, the writing process itself deepens your understanding

**About Leadership Principles:**

I deliberately embedded these connections throughout the course. Not to teach you "how to interview," but to make you realize:

**True professional competencies aren't memorized before interviews — they're naturally formed through practice.**

Every step of this project — act first, cut to minimum, deploy promptly, go back to organize — cultivates these competencies. Blogs just make them explicit.

**Final advice for students:**

1. **Keep writing blogs** — Don't need to write daily, but write one after each milestone
2. **Publish publicly** — Post to Medium, Dev.to, or your own blog site
3. **Put blog links on your resume** — This is more convincing than "familiar with XXX tech stack"
4. **Re-read periodically** — You'll be amazed how "ignorant" you were three months ago — that's evidence of growth

**The true value of this project:**

It's not these thousands of lines of code — it's that you learned **how to build a complete AI application from scratch**, and **documented the process**.

Code becomes outdated, but thinking doesn't.

---

## Quick Reference

**Blog location:**
```
blogs/
├── 00-Blog-Catalog-CN.md          # Catalog
├── 00-The-Beginning-of-Everything-CN.md
├── 01-If-You-re-Going-to-Learn-Learn-the-Best-CN.md
├── ...
└── 15-The-30-Percent-Rule-CN.md
```

**Blog structure:**
```markdown
# Compelling title

## What Happened
## How I Thought About It
## What I Did
## What I Learned
```

**Leadership Principles quick reference:**
- Bias for Action — Act first
- Learn and Be Curious — Curiosity
- Deliver Results — Deliver outcomes
- Ownership — Own it
- Insist on High Standards — High standards
- Think Big — Big picture
- Dive Deep — Go deep
- Frugality — Be frugal

**Writing blogs:**
```bash
# Let AI help polish
# Describe what you want to write in Claude Code
```

---

## Assignment

**Write your own blog:**

1. Pick something from this project that impressed you most
2. Write it using: What Happened → How I Thought → What I Did → What I Learned
3. Save to `blogs/my-first-blog.md`
4. Identify which Leadership Principle it demonstrates

This is your first Ship Your Story record.

Your future self will thank the you who started writing today.

---

## Important Reminder: These Blogs Aren't Yours

**Note: The 16 blogs in the `blogs/` directory are examples written by the mentor, not your own work.**

The purpose of these blogs is to:
- Help you understand **how to connect scattered learning experiences into a complete story**
- Show you that **every small story can become interview talking points**
- Give you a **reference for blog structure and writing style**

**If you want to use blogs for job hunting or personal branding, you must:**

1. **Rewrite them yourself in English** — Don't ask AI to "translate this for me" — that's not your voice
2. **Use your own experiences** — Your pitfalls, your thinking, your aha moments
3. **Use your own language** — Interviewers will ask about your blog content, you need to speak naturally about it

AI can help polish your grammar, but **the content must be yours**.

Because in interviews, interviewers might ask: "You mentioned XXX in your blog, can you elaborate?" If that's not something you actually experienced, you'll freeze.

**The value of these example blogs is showing you "what to write" and "how to write." The real asset — you have to create it yourself.**

---

*Code is what you did. Blogs are how you thought. Together, they're the complete you.*
