# The 30% Rule

---

## The Portfolio That Looks Like Everyone Else's

All the features are there. Landing page is done, AI chatbot can chat, deployed to Vercel, link works for anyone in the world.

But I opened the browser and looked at it, something felt off.

This website... looks exactly like every portfolio template out there. Same layout, same color scheme, same "cookie-cutter" feel.

If I were an HR person, reviewing dozens of resumes a day, opening this page — would I linger even one extra second?

No.

---

## The Instinct to "Do It Right from the Start"

My first reaction was: I should have done the design right from the beginning.

This is most people's instinct — things like "style," "color scheme," "brand" — these global things, shouldn't they be decided before the project starts? Design mockups first, then write code — that's the "professional" approach, right?

But I thought back on this project's journey and realized that instinct is wrong.

If I'd started wrestling with "what color scheme to use," "should there be dark mode," "how many pixels of border radius on buttons" on day one — I'd probably still be drawing wireframes in Figma with zero lines of code.

More importantly, I had no idea what this website would ultimately look like. Back then I didn't even understand what Next.js's `layout.tsx` did — how could I possibly make good design decisions?

---

## The 30% Rule

I started wondering: if not at the beginning, when is the right time to make these "global" decisions?

Thinking about this project's progress, I came up with my own guideline: **around 30%.**

Later I searched and found this idea was already articulated by others, even has a name: "30% Rule." The core meaning is similar:

> **Decisions that seem like they should be "set from the start" often have their optimal timing not at the start, but at 30%.**

Why 30%?

- **0%** — You know nothing. What the project looks like, how the tech stack fits together, what gotchas the features have — all unknown. Design decisions made here will probably need rework.
- **30%** — The skeleton exists, core features work, you can see the full picture. But the project is still early, changes aren't expensive. This is the best window for reassessment.
- **70%** — Too late. Lots of code already written, style scattered across dozens of files, unifying means major refactoring. Can't change anymore.

This project right now is exactly at the 30% mark: landing page is there, chat feature works, deployment is done. But there's still a lot to add later.

Doing personalization now means I can see what needs changing, and there's still time for the new style to permeate subsequent development.

Not too early, not too late. Just right.

---

## Think, Then Do

Once I decided "now is the right time," the next question was: how to do it?

"Make this website look better" — that's a very vague requirement. I could switch to a dark theme, add animations, go minimalist, use bolder colors... too many directions.

If I just told AI "help me make it look better," the result probably wouldn't be what I want. AI doesn't know what style I like, doesn't know what I'm trying to express.

So I switched strategies: **have AI think first, give me options, I'll choose.**

I used the `/ui-ux-pro-max` Agent Skill and explicitly told it:

```
help me redesign my personal portfolio website - suggest 2-3 complete design directions,
brainstorm options first and don't code yet
```

Keywords: **brainstorm** and **don't code yet**.

AI gave me three directions, each with complete layout suggestions, color schemes, font pairings. I looked them over and picked Option B.

Then one sentence: `I like Option B, please execute it.`

AI started modifying code. A dozen files, hundreds of lines of changes, done in two minutes.

---

## Debug with Plain Language

After the changes, I refreshed the page. Overall effect was good, but I noticed a small issue: on the chat page, the shortcut buttons ("About Me," "Work Experience") turned entirely blue on hover, making the gray subtitle hard to see.

Before, encountering this kind of problem, I'd dig through the code, find the corresponding CSS, study Tailwind class names, then carefully make changes.

Now? Just describe it in plain language:

```
on the chat page there are some shortcut buttons, when I hover,
the whole button turns blue and the gray subtitle is hard to see,
I think just the border should turn blue
```

AI understood my intent, found `multimodal-input.tsx`, changed a few Tailwind classes, problem solved.

I didn't touch the code the whole time — just described the problem and desired outcome.

This is debugging in the AI era: **describe the problem in plain language, let AI change the code.**

---

## Let AI Teach You

But I didn't want to just "use and leave." If next time I face a similar problem I still need AI, what did I learn?

So after the fix, I asked one more thing:

```
I'm satisfied with the result. Now tell me what you changed and why.
Explain each file you modified, so I can learn how to do this myself next time.
```

AI listed the changed files and explained the reasoning behind each change: why this color scheme, why this font combination, why hover effects work this way.

This is the right approach to AI-assisted learning: **have AI do it for you, then have AI teach you how to do it.**

---

## Reflection

Looking back at this process, what struck me most wasn't "the website looks better now," but the thinking about timing.

We always have this urge: important decisions should be made early, the earlier the better, so we don't have to change later.

But reality is, many decisions simply can't be made correctly at the start, because you don't yet see the full picture.

**The 30% rule gives me a framework:**

- At the start, just get it running — rough is fine
- At 30%, pause, reassess those "global" decisions
- By then you see the full picture but still have room to adjust
- Past 70%, don't bother — too late to change

This framework applies beyond UI design. Architecture decisions, technology choices, product direction — many things that "seem like they should be decided early" are actually better reassessed at 30%.

Not because you made the wrong choice at the start, but because **at the start you simply didn't have enough information to make the right choice**.

---

## What's Next

The website finally has a bit of "me" in it.

But personal branding isn't a one-time thing. Every new feature added later will follow this style going forward.

The 30% mark is both a looking back and a starting point.
