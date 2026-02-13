# Personal Branding: Make Your Portfolio Stand Out

> The features are done, but it looks like everyone else's. Time to make it truly "yours."

## Overview

In the previous lessons, we built a complete AI portfolio website: a static landing page and an AI chatbot that can introduce your experience to HR and hiring managers. Functionally, it works great.

But open any portfolio template on the market, and you'll notice they all look the same — same layouts, same color schemes, same generic feel.

In this lesson, we're doing one thing: **making this website truly yours**.

This isn't just about changing colors. Personal branding is part of your professional identity. When an HR person opens your portfolio, their first impression determines whether they'll keep scrolling.

**See the transformation:**

| Landing Page | Chat Page |
|--------------|-----------|
| ![Landing Page](./img/15-UI-Personization/new-design-01.png) | ![Chat Page](./img/15-UI-Personization/new-design-02.png) |

This is what we created with AI — bold black & white color scheme, striking typography, unique layout. Your result after completing this lesson will look completely different based on your personal style.

## Learning Objectives

Why does this matter?

Imagine: you've spent months learning tech, building projects, preparing for interviews. But when you send your portfolio link to HR, they're reviewing dozens of resumes daily. If your page looks like everyone else's, why would they spend extra seconds on yours?

**Personal branding isn't optional — it's essential.**

In this lesson, you're not just learning "how to change UI." More importantly, you're learning a **problem-solving mindset for open-ended challenges**:

1. **Think First** — Face vague requirements like "make it look better" by having AI brainstorm options for you
2. **Then Do** — Pick a direction, let AI execute
3. **Debug** — Find small issues, describe them in plain language, let AI fix them
4. **Learn** — Ask AI to explain what it changed, so you understand how it works

This "Think → Do → Debug → Learn" cycle applies to any open-ended problem. Whether it's designing UI, writing copy, or planning architecture — this is a powerful mental model.

## Prerequisites

- Completed previous lessons (website deployed, AI chat working)
- Basic experience with Claude Code

---

## Key Concepts

### 1. What is an Agent Skill?

In Claude Code, you can load additional "skills" for the AI. It's like installing a specialized plugin.

When you type `/ui-ux-pro-max` as a slash command, AI loads a specialized set of knowledge and workflows for UI/UX design. It transforms from a generalist who "knows a bit of everything" into a specialist expert in UI design.

**Why does this matter?**

A general AI might give you generic advice. But with the UI/UX skill loaded, it thinks like a professional designer — considering color theory, typography principles, and user experience details.

This is the value of Agent Skills: **making AI more expert in specific domains**.

### 2. Think Before You Do: Solving Open-Ended Problems

"Make this website look better" — this is a very open requirement. You could go countless directions:

- Switch to a dark theme?
- Add animations?
- Go minimalist?
- Use bolder colors?

If you just ask AI to "make it look better," the result might not match what you want at all.

**The right approach: have AI think first, give you options, then you choose.**

The flow is:

1. Tell AI your requirements and context
2. Explicitly say "don't code yet, give me options"
3. AI analyzes and presents several directions
4. You pick one, then have AI execute

This way, you stay in control of direction while AI handles execution.

### 3. Debug with Natural Language

After execution, you open the page and might find small issues. Maybe a button's hover color is wrong, or some text is hard to read.

You don't need to dig through code or search CSS. **Just describe the problem in plain language**:

> "When I hover over this button, the whole thing turns blue and the gray subtitle becomes hard to see. I think just the border should turn blue."

AI understands your intent, finds the relevant code, and fixes it.

This is debugging in the AI era: **describe problems in plain language, let AI change the code**.

### 4. Why Do Personalization "Now"?

This is worth thinking about: why not do personalization at the very beginning?

**The Art of Trade-offs:**

If you personalize at the start:
- Pro: All subsequent features follow this style
- Con: Without seeing the framework, it's hard to imagine the final result. You might have to redo work.

If you wait until now:
- Pro: Core features are complete, you can clearly see what the site looks like, changes are more targeted
- Con: Might need to adjust some existing code

**We choose "now" because:**

1. The website's core functionality is complete — you can see the full picture
2. We'll keep adding features, so defining the style now guides future development
3. This is the "just right" moment — not too early (avoiding rework), not too late (style can be consistent going forward)

This is the trade-off in software development — there's no perfect timing, only "the best choice for now."

---

## Exercises

### Exercise 1: Have AI Think First

**Goal:** Learn to use Agent Skills for requirements analysis and design options.

**What to do:**

1. In Claude Code, enter this prompt:

```
/ui-ux-pro-max help me redesign my personal portfolio website - I need both layout AND visual design recommendations for the landing page (currently has hero, stats grid, contact sections arranged top-to-bottom), suggest 2-3 complete design directions where each option includes: a unique layout structure (like bento grid, asymmetric cards, sidebar profile, split-screen, or other modern patterns), color palette, typography pairing, and overall visual style - I want something that stands out from typical portfolio templates and makes a strong first impression on HR and hiring managers, brainstorm options first and don't code yet
```

2. **Key point:** This prompt asks AI to consider both **layout** and **visual design**. You explicitly say "brainstorm options first and don't code yet" — this puts AI in "analysis mode" to give you complete design options.

3. AI will present several design directions. Read each option carefully and consider which best matches the personal style you want to express.

**What you'll notice:**

AI doesn't give random advice — it analyzes based on your specific situation (personal portfolio, for HR viewing, has a chatbot). This is the effect of loading the UI/UX skill — it thinks like a professional designer.

### Exercise 2: Pick a Direction and Execute

**Goal:** Have AI execute your chosen design.

**What to do:**

1. From the previous step's options, pick one you like (say you like Option B)

2. Tell AI to execute:

```
I like Option B, please execute it.
```

3. AI will start modifying code. When done, run the dev server to see the results:

```bash
mise run dev
```

4. Open your browser and check the changes.

**What you'll notice:**

AI modifies multiple files — CSS, component code, config files. You don't need to know every file's details — just check if the final result matches expectations.

### Exercise 3: Find Issues and Fix Them

**Goal:** Describe problems in natural language, have AI fix them.

**What to do:**

Say you find an issue: on the chat page, the shortcut buttons ("About Me", "Work Experience", etc.) turn completely blue on hover, making the gray subtitle hard to read.

1. Describe the problem in natural language:

```
one minor problem, on the chat page there are some shortcut button like "About Me", "Work Experience" when I move mouse to it, button becomes blue and gray subtitle is very hard to see, how me improve it
```

2. AI might suggest several solutions. If you have a specific preference, tell it:

```
I think just the border should turn blue on hover, not the whole button
```

3. AI modifies the relevant code. Refresh the page to confirm the fix.

**What you'll notice:**

You didn't touch any code — you just described the problem and your expectation in plain language. AI found `multimodal-input.tsx` on its own, understood the Tailwind CSS classes, and made precise changes.

**This is the complete "Think → Do → Debug" cycle.**

### Exercise 4: Have AI Teach You What It Did

**Goal:** Don't just let AI change code — understand what it changed and why.

**What to do:**

After the changes are done, ask AI this question:

```
I'm satisfied with the result. Now tell me what you changed and why. Please explain each file you modified, one by one, so I can learn how to do this myself next time.
```

**Why this step matters:**

If you just let AI finish and walk away, you won't know how to handle similar problems next time. But if you have AI explain:
- Which files were changed
- What was changed in each file
- Why those changes were made

You learn real knowledge. Next time, you might even do it yourself.

**This is the right way to learn with AI: let AI do it for you, then have AI teach you how it's done.**

---

## Reflection

In this lesson, we did something seemingly simple: changed some UI.

But what really matters is the methodology behind it:

1. **Agent Skills** — Make AI more expert in specific domains
2. **Think Before Doing** — Face open-ended problems by having AI give options, you choose
3. **Natural Language Debugging** — Describe problems in plain language, let AI change code
4. **Learn from AI** — After AI does the work, have it explain so you learn

This "Think → Do → Debug → Learn" cycle doesn't just apply to UI design. Any open-ended problem — writing copy, designing architecture, planning features — can use this pattern.

**Core idea: You control direction, AI handles execution.**

---

## Mentor's Note

**Why this lesson matters:**

Many students think personal branding is "fancy stuff" — better to learn more technical skills.

But I want to tell you: in the real job market, first impressions are crucial. HR reviews dozens of resumes daily. If your portfolio looks like everyone else's, it might not even get opened.

**Personal branding isn't vanity — it's part of your competitive edge.**

But what this lesson really wants to teach isn't "how to make a website look good" — it's a **problem-solving mindset for open-ended challenges**:

1. Face vague requirements by having AI analyze and give options
2. You make choices and set direction
3. Let AI execute
4. Find problems, describe in natural language, let AI fix
5. Have AI explain what it did, so you learn

I use this pattern every day at work. Whether designing system architecture, writing technical specs, or making product decisions — "Think → Do → Debug → Learn" is the most efficient approach.

**On Timing:**

You might ask: why not do personalization at the very beginning?

The answer is: software development is an art of trade-offs.

Do it too early, you don't know what the website will look like, and changes might need rework. Do it too late, and style becomes hard to unify. We chose "now" — core features complete but still adding more — as a deliberate decision.

Remember: there's no perfect timing, only "the best choice for now." Learning to make these trade-offs is part of becoming a senior engineer.

---

## Quick Reference

**Start dev server:**
```bash
mise run dev
```

**"Think → Do → Debug → Learn" cycle:**
1. Use `/ui-ux-pro-max` to have AI analyze requirements and give options
2. Pick an option, have AI execute
3. Find problems, describe in natural language, have AI fix
4. Have AI explain what it changed, learn how it works

---

### Files Changed Summary

This UI makeover involves the following files. Understanding their roles helps you understand the website's structure:

**Global Styles & Config:**
- `app/globals.css` — Global CSS variables, color system (black & white theme + electric blue accent), font definitions, utility classes (bold-card, bold-button, bold-nav), dark mode
- `app/layout.tsx` — Root layout, imports fonts (Bebas Neue for headings, Source Sans 3 for body)
- `tailwind.config.ts` — Tailwind config, defines color tokens, fonts, border radius, animations

**Landing Page Components:**
- `app/(marketing)/HomePageContent.tsx` — Homepage main content organization, added Footer
- `app/(marketing)/_components/Hero.tsx` — Hero section (split-screen layout, large typography, bold-bordered buttons)
- `app/(marketing)/_components/StatsSection.tsx` — Stats display area (full-width bordered sections)
- `app/(marketing)/_components/ContactSection.tsx` — Contact info section (full-width bordered layout)

**Navigation:**
- `app/_components/layouts/Navigation.tsx` — Top navbar (simplified design, bold borders, Chat entry)

**Chat Page:**
- `app/chat/layout.tsx` — Chat page layout structure, padding adjustments
- `components/chat/chat.tsx` — Main chat component (message list, border styles)
- `components/chat/message.tsx` — Single message styling (avatar, bubble, border effect)
- `components/chat/multimodal-input.tsx` — Input box and shortcut buttons (bold borders, hover invert effect)
- `components/chat/overview.tsx` — Chat page welcome screen (context banner)

---

## Homework

**Screenshot your result:**

After completing the exercises above, take screenshots of your website (both landing page and chat page).

This is part of your personal brand. Every time you revisit this project, you'll see the unique design you created yourself.

---

*Since it's personal branding, it must be very, very personalized. This lesson teaches you the method — real personalization requires you to explore, experiment, and refine on your own.*
