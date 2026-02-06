# Task Card: AI-Assisted Programming - Add Your Own UI Element

## Objective

Learn to collaborate with AI to add custom UI elements to your personal portfolio website.

This exercise teaches **AI-assisted programming skills**. You will find a design you like, describe it to AI, implement it in your codebase, and understand how it works. This is the core workflow of modern AI-assisted development.

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/07-Add-Card-Components-And-Hero-Section/)

## Actionable Items

1. **Run the application and observe existing components**
   - Execute `mise run dev`
   - Open http://localhost:3000
   - Identify the existing components: Hero, StatsSection, ContactSection

2. **Find design inspiration on Pinterest**
   - Go to https://www.pinterest.com/
   - Search "personal portfolio website"
   - Find ONE small UI element you like (button, card, icon, progress bar, etc.)
   - Screenshot and circle the specific element

3. **Describe your desired element to AI**
   - Use the prompt template from the tutorial
   - Include: project background, tech stack, target location, desired effect
   - Ask AI to explain the code in detail

4. **Apply the code and verify**
   - Follow AI's instructions to modify the code
   - Check the result in browser
   - Use `git diff` to see what changed

5. **Iterate and refine**
   - If needed, ask AI for adjustments
   - Repeat until satisfied with the result

**Estimated time:** 50-60 minutes

## Checklist

- [ ] **App running** - Can access http://localhost:3000 and see the portfolio page
- [ ] **Design found** - Have a screenshot of a small UI element you want to add
- [ ] **AI prompted** - Successfully used the prompt template to describe your needs to AI
- [ ] **Code applied** - Made changes to at least one file in the codebase
- [ ] **UI visible** - Your new element appears on the page
- [ ] **Can explain** - Can point to the code that creates your new element and explain roughly what it does

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Be ready to answer: "What did you add? Which files did you change?"

3. Say "ship it" when complete to generate RESULT.md

4. Share the RESULT.md file GitHub link with your instructor

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** This is a creative exercise. Verification is simple and flexible.

**Core verification (required):**

1. **Ask:** "What UI element did you add?"
   - Student should describe what they added (button, card, icon, etc.)
   - No wrong answers - any new element is acceptable

2. **Ask:** "Which file(s) did you modify?"
   - Student should name at least one file (likely in `app/(marketing)/_components/`)
   - AI can quickly check `git diff` to verify

3. **Ask:** "Show me the code that creates this element."
   - Student should be able to point to the relevant code
   - They don't need to explain every line, just the general structure

**Process verification (optional):**

4. **Ask:** "What was in your prompt to AI?"
   - Good answer mentions: project context, file location, desired effect
   - This checks if they learned Context Engineering

5. **Ask:** "If you wanted to change the color, what would you do?"
   - Good answer: "Ask AI" or "Find the Tailwind class and change it"
   - This checks if they understand the iteration process

**What counts as "pass":**

- Student added ANY visible UI element to the page
- Student can identify which file contains the code
- Student attempted to use the prompt template (even if imperfectly)

**What does NOT matter:**

- Whether the element looks "good" or "professional"
- Whether the student understands every line of code
- Whether there are any bugs or styling issues

**Key principle:** This exercise is about the PROCESS (find → describe → implement → iterate), not the RESULT. Any completed attempt demonstrates learning.
