# Learn From The Giants

---

## Now What?

Code is running. Hit `mise run dev`, and a page appears in the browser. Click a button, and the API returns data.

I stared at the screen for a while, thinking: then what?

There's a navigation bar on the page, an avatar, an "About Me" section, a button. I can see all of these things, but where did they come from? Which file created them? How did they get loaded onto this page?

I had no idea.

It's a strange feeling — I'm the one who got the code running, but I know nothing about it. Like having a car key, starting the engine, but not knowing where the steering wheel is, where the gas pedal is, or how to get out of the parking lot.

---

## I Used to Read Code Like This

Honestly, when I looked at a new project before, I'd just open the file list and click through from top to bottom.

`layout.tsx`? Click, read through. See a bunch of `className` and `children`, kind of understand it, kind of don't.

`page.tsx`? Click, read again. Oh, this imports that, which imports something else...

By the fifth file, the first four were already jumbled together in my head. I had a bunch of fragments but couldn't assemble them into a complete picture.

The worst part — I had no way to verify if my understanding was correct.

I'd read some code and think "this component probably displays the avatar." But is it really? How do I confirm? Nothing tells me. I just keep guessing.

This approach is like memorizing a map with your eyes closed. You can memorize "turn left out the door, walk 100 meters, then turn right," but you never know if the route is correct until you actually walk it and hit a wall.

---

## Then I Learned Top-Down

This exercise taught me a completely different method.

Don't start from the file list. Start from what you see on the screen.

I see "Home" in the navigation bar. Okay, so I search for `"Home"` to see where that text is written.

Found it — in `Navigation.tsx`, there's an array with `{ label: "Home", href: "/" }`.

Then I ask myself: how does `Navigation.tsx` get loaded onto the page?

Following the imports upward, I find that `layout.tsx` references it. Going further up, I discover `layout.tsx` is the layout for the entire `(marketing)` folder. In other words, any page accessed under that folder will include this navigation bar.

Tracing it all the way, I suddenly understood: so this is how Next.js's file structure works.

What's the biggest difference between this process and before?

**I can verify every step.**

I guess "Home" is in `Navigation.tsx`, search for it, find it, correct. I guess this component is loaded by `layout.tsx`, check the imports, it is, correct again.

Every step has feedback. Right? Keep going. Wrong? Look back.

It feels completely different — not groping in the dark, but having a light under your feet with every step.

---

## The Moment That Blew My Mind

But what amazed me most was when I had AI help trace the complete path of a feature.

There's a button on the page that says "Test API Hello Endpoint." I was curious: what actually happens when this button is clicked?

Before, I might have done this: search for the button text, find the code, look at what's in `onClick`, then... get stuck. Because it calls a function, the function calls `fetch`, fetch requests `/api/hello`, but where's this API? There's no such file in Next.js?

That's where I used to give up.

But this time, I took a screenshot, circled that button, and asked AI: what happens when this button is clicked? What's the complete chain?

AI explained it clearly:

1. Click triggers the `handleApiCall` function
2. The function has `fetch("/api/hello")` making a request
3. This request gets intercepted by a rewrite rule in `next.config.js`
4. Forwarded to `http://127.0.0.1:8000/api/hello` — the FastAPI backend
5. FastAPI handles this request in `api/index.py`, returns JSON

From frontend button to config file to backend Python — the entire chain connected.

At that moment I thought: before, I simply couldn't do this kind of "reverse tracing" — not because my approach was wrong, but because I'd get stuck in the middle. Now with AI, all those stuck points are cleared.

---

## Why This Changes Everything

After finishing this exercise, I suddenly realized something.

GitHub has so many open source projects from brilliant developers — Vercel's source code, code from various well-known AI tools. In theory, I could learn anything I want from them.

But I rarely did before.

Why? Because opening those projects, seeing hundreds of files, I had no idea where to start. No matter how good the README, it only tells me "what this project can do," not "how this feature is implemented."

So I'd close it, thinking "I'll come back when my fundamentals are stronger."

But when would "fundamentals be stronger"? No idea. So those brilliant developers' code just sat there, and I never looked at it.

Now I know: **you don't need to read from start to finish.**

The right approach is: find the project's core feature, get it running, then reverse-trace from the UI — what effect am I seeing, and how is it implemented?

The goal isn't to understand everything. It's to understand just enough to reverse-trace.

I don't need to understand every line of code in that project. I just need to find the part I care about, see how it's done, then "steal" that knowledge and use it in my own project.

This is what it really means to "learn from the masters."

---

## Reflection

Looking back at this exercise, the biggest gain wasn't "I now know where Hero.tsx is."

It was learning a method.

A method I can use for life — no matter what project, framework, or language I encounter in the future, as long as I can get it running and see something on screen, I can use the Top-Down approach to trace back to the source code.

And not just for reading code. Think about it:

- Learning a new product? Use it first, then research interesting features when you encounter them.
- Understanding a new business? Look at the customer experience first, then trace back to the underlying processes.
- Debugging? See the symptom first, then trace all the way to the root cause.

I used to think that to learn something, you had to fill in all the foundational knowledge first. Now I've discovered a more efficient path — it's the reverse: see the result first, then deduce the process. Because with a result as an anchor, my learning has direction and feedback.

The best learning is looking at other people's projects.

And Top-Down plus AI finally makes that feasible.

---

## What's Next

Now I know which file created each element on screen. More importantly, I know how to find this information in any project.

Next up, time to fill real content into this skeleton.

But this time it's different. I'm no longer starting from zero, fumbling blindly. I can find portfolio websites I admire, study how they're built using the Top-Down method, then apply what I learn to my own project.

Standing on the shoulders of giants, seeing further.
