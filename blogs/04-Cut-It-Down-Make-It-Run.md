# Cut It Down, Make It Run

---

## Hitting the Wall

I opened the Next.js website with confidence.

After all, Node.js and pnpm were already installed. The last post even had me feeling like "ammunition loaded." I figured initializing a Next.js project would be similar to `uv init`, right? A few commands, done and done.

Then I clicked into the official tutorial's "real project" example.

When the file list appeared, my brain froze.

Dozens of files. `middleware.ts`, `next.config.mjs`, `tailwind.config.ts`, various `layout.tsx`, `loading.tsx`, `error.tsx`... I recognized each English word individually, but combined together? No idea what any of it meant.

It felt like — you just learned the 26 letters of the alphabet, and someone slaps an English novel in front of you and says "go ahead, read it."

---

## Two Roads

For about ten minutes, I was torn. Two paths were fighting in my head:

**Path A: Go back and learn the fundamentals.** Start from "what is React," work through the Next.js docs, understand every concept, then start building. This path is steady, safe, "correct." But the problem is — I don't know how long it would take before I'm "ready." A week? A month? And honestly, learning concepts in isolation without a project? I'd probably last three days before reaching for my phone.

**Path B: Just do it.** Not blindly, but carve out a minimal version I can understand from that "incomprehensible complex project" and get it running. Ignore those dozens of files for now. I just need to figure out: **what's the bare minimum this project needs to stay alive?**

I chose B.

Not because I'm brave, but because I knew: if I chose A right now, this project would probably become yet another "abandoned halfway" side project.

---

## Surgery

What followed felt like performing surgery.

I opened the official example's source code and, with AI's help, read through it file by file. Not trying to understand everything — just asking one question: **If I delete this file, will the project still run?**

Still runs? Cut it.

Doesn't run? Keep it.

Not sure? Cut it first, run it, see if it errors. If it errors, add it back. If not, it wasn't essential.

After one round of cutting, dozens of files became:

```
my-ai-app/
├── api/                  # FastAPI backend
│   └── index.py          # One endpoint, returns {"message": "Hello World"}
├── app/                  # Next.js frontend
│   ├── layout.tsx        # The outermost shell
│   └── page.tsx          # Homepage, just one line of text
├── pyproject.toml        # Python dependency management
├── package.json          # Node.js dependency management
└── .mise.toml            # mise task configuration
```

That's it. Clean and clear, and I know exactly what each file does.

Honestly, **cutting is harder than adding**. Adding just requires copy-paste, but cutting requires understanding each thing's role — you have to know what it is before you can say it's not needed. This process actually forced me to understand a lot: what `layout.tsx` does, how `page.tsx` relates to routing, how frontend and backend connect.

Interestingly, I learned by "deleting code," not by "reading tutorials."

---

## The Dev Loop

Skeleton in place, the next step was to actually run it — and run it "comfortably."

Remember the TDD and fast feedback loop from the third post? I wanted to apply the same thinking to the development experience. Ideal state: change one line of code → refresh the browser → instantly see the change. Minimize friction in between.

So I configured two tasks in `.mise.toml`:

```toml
[tasks.dev]
description = "Start frontend and backend dev servers"
run = ["pnpm dev & uv run uvicorn api.index:app --reload"]

[tasks.kill]
description = "Kill all occupied local ports"
run = ["lsof -ti:3000,8000 | xargs kill -9 2>/dev/null || true"]
```

The workflow became:

```bash
mise run kill  # Clean up first
mise run dev   # One command to start both frontend and backend
```

Open the browser to `localhost:3000`, page appears. Click the API button, `{"message": "Hello World"}` comes back.

Change one line of frontend text, save, browser auto-refreshes, new content appears instantly.

Change the backend's return value, save, make another request, new data comes back instantly.

The entire feedback loop takes two to three seconds. That "video game" feeling again — every action has immediate feedback.

---

## Reflection

Looking back at this process, I think the most crucial decision wasn't "which technology to choose," but **when facing something completely incomprehensible, choosing to act instead of retreat**.

But I want to emphasize: "acting" here isn't blindly charging ahead.

When facing a complex project far beyond your ability, the truly useful action isn't forcing yourself to read from line 1 to the last line, nor is it closing your eyes and running `npm install` while praying. It's asking yourself:

> **What's the minimum runnable version of this thing?**

Then go straight for that minimal version.

Cut down to just the skeleton, get it running. The moment it runs, you have a "living" thing you can interact with, experiment with, make mistakes with. From that point on, every file or feature you add back is your active choice, not passive acceptance.

**You don't need to understand everything to start. You just need to find that minimal starting point, then let action itself tell you what to do next.**

Those files I cut — `middleware.ts`, `loading.tsx`, `error.tsx` — I'll definitely add them back one by one later. But when I do, it'll be because "I need it," not because "the tutorial had it." The depth of understanding between those two is completely different.

---

## What's Next

The minimal frontend-backend skeleton is running. I can see a page in the browser, and the API returns data.

It's ugly as an unfinished shell right now, but — it's **my** unfinished shell.

Time to start filling it in.
