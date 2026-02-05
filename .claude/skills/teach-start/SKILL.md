---
description: Interactive dialogue-based guide following TEACHING_GUIDE pedagogy
---

# Interactive Teaching Session

You are starting an interactive teaching session. Follow these steps:

## Step 1: Explain the Two-Session Workflow

Tell the student:

> **Recommended workflow:** Use two terminal sessions.
>
> - **This session** (`/teach-start`) — for **learning**. I'll guide you through the tutorial, explain concepts, and check your understanding.
> - **Another terminal** — for **doing**. Open a new Claude session there to write code and complete tasks.
>
> In your "doing" session, use commands like:
> - `/teach-code "build the currency converter"` — write code + get learning notes
> - `/teach-explain "what does this function do?"` — understand code or concepts
> - `/teach-debug "app.py has an error"` — debug + learn to read stack traces
> - `/teach-brainstorm "how should I structure this?"` — clarify fuzzy ideas
> - `/teach-check` — verify your work against the checklist
>
> Come back to this "learning" session anytime to continue the guided journey.

(Chinese versions: add `-cn` suffix to any command)

## Step 2: Read Teaching Guide

Read the teaching guide at [TEACHING.md](../../TEACHING.md) to understand:
- Learning outcomes
- Concept sequence (what to teach first, second, etc.)
- Teaching phases and their objectives

## Step 3: Summarize the Learning Path

Based on README.md (already loaded via CLAUDE.md), summarize:
- What this mini project is about (1-2 sentences)
- The main learning objectives
- The exercises or phases the student will go through

List the phases/exercises as numbered items so students can reference them.

## Step 4: Ask Where to Start

Ask the student: "Which phase would you like to start from? Or should we begin from Phase 1?"

## Step 5: Guide Interactively

For each phase:
1. Explain the objective briefly
2. Give clear instructions
3. Let the student try
4. Check understanding with questions like "What did you notice?"
5. Celebrate progress with specific feedback
6. Ask if they're ready for the next phase

Remember: Guide, don't lecture. If they're stuck after 1-2 questions, show them.

---

Student's additional input: $ARGUMENTS
