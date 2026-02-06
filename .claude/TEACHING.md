# Teaching Guide: AI-Assisted Programming with Card Components

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand what Context Engineering is and why it's the most important skill when working with AI
2. **Skill outcome** - Successfully describe a UI design to AI and implement it in the codebase with AI's help
3. **Mindset outcome** - Develop confidence to create things with AI assistance, embracing "do first, understand later"

## Concept Sequence

Teach concepts in this order:

### Phase 1: Quick Context (5 minutes)

1. **Brief intro to the tech stack** - Mention React components and Tailwind CSS exist, but explicitly say "we'll learn by doing first"
2. **What is Context Engineering** - One sentence: giving AI enough background information so it understands your needs

### Phase 2: Hands-on Practice (Main focus)

3. **Run and observe** - Exercise 1: Start the app, observe existing components
4. **Find inspiration** - Exercise 2: Go to Pinterest, find a small UI element you like
5. **Describe to AI** - Exercise 3: Use the prompt template to describe what you want
6. **Apply and understand** - Exercise 4: Apply AI's code, use git diff to see changes
7. **Iterate** - Exercise 5: Adjust based on results, ask AI for tweaks

### Phase 3: Concept Deepening (After hands-on)

8. **Context Engineering deep dive** - Now that they've experienced it, explain in detail
9. **React components explained** - What they are, how to identify them, the "LEGO" analogy
10. **Tailwind CSS explained** - Utility-first approach, common classes
11. **Framework for learning any new component** - Categorize → Visualize → Practice

### Phase 4: Reflection

12. **What did you create?** - Let student share what they built
13. **What did you learn?** - Focus on the process, not the specific code

## Common Struggles

**Struggle:** Student's prompt is too vague
- **Signs:** "Help me make this look better" or "Add something cool"
- **Intervention:** Guide them through the prompt template. Ask: "What specifically do you want? Shape? Color? Position? Interaction?"

**Struggle:** Student copies code without reading AI's explanation
- **Signs:** Immediately pastes code, then confused when asked what it does
- **Intervention:** Before they paste, ask: "What file are you modifying? What will this code do?" Make them read the explanation first.

**Struggle:** Student can't find what to modify
- **Signs:** "AI told me to add this but I don't know where"
- **Intervention:** Use the Top-Down skills from the previous lesson. "What component does this belong to? Let's trace from the UI."

**Struggle:** Code doesn't work after pasting
- **Signs:** Error in browser, white screen
- **Intervention:** Don't panic. Check browser console. Ask AI to help debug by sharing the error message. This is a learning opportunity about iteration.

**Struggle:** Student picks too complex a design element
- **Signs:** Chooses an entire page layout or complex animation
- **Intervention:** Redirect to smaller scope. "Let's start with just that button/icon/card. We can add more later."

**Struggle:** Student doesn't understand why the code works
- **Signs:** "It works but I have no idea why"
- **Intervention:** This is okay for now! Emphasize that understanding comes gradually. Ask them to identify just ONE thing they understand about the code.

## Teaching Tips

- **Embrace "do first, understand later"** - This is the core philosophy. Don't feel compelled to explain everything before they try.

- **Let them pick their own design** - Student motivation increases dramatically when they're building something they chose.

- **Model the AI interaction** - Show how YOU would prompt an AI. Think aloud: "I want this button... it's in Hero.tsx... I want blue with hover effect..."

- **Celebrate rough implementations** - First version doesn't need to be perfect. "It shows up? Great! Now let's iterate."

- **Use git diff as a teaching tool** - After they apply code, walk through the diff together. "See? We only changed these 10 lines to get that effect."

- **Connect to real work** - "In professional development, you'll often copy patterns from other sites. This skill of translating visual → code is exactly that."

- **Normalize not understanding everything** - "React and Tailwind take months to master. Today you just need to understand WHAT they are, not HOW they work in depth."

## Assessment Ideas

- **Simple check:** Ask student: "What did you add? Show me the UI and show me the code that creates it."

- **Context Engineering check:** Ask: "If your code didn't work, what extra information would you give AI to help debug?"
  - Good answer: error message, file path, what you expected vs what happened

- **Understanding check:** Point to any Tailwind class in their code and ask: "What does this class do?"
  - They don't need to know ALL classes, but should be able to guess or look up one.

- **Process check:** "If you wanted to add another element tomorrow, what would you do?"
  - Good answer: Find inspiration → describe to AI with context → apply → iterate

## Pacing Guide

- **Exercise 1 (Start app, observe):** 5 minutes
  - Quick run and identify components

- **Exercise 2 (Find inspiration):** 10 minutes
  - Browse Pinterest, pick ONE small element
  - Don't let them spend too long browsing

- **Exercise 3 (Prompt AI):** 10 minutes
  - Fill in the template
  - Send to AI, read the response

- **Exercise 4 (Apply code):** 10 minutes
  - Apply the code
  - Check browser, use git diff

- **Exercise 5 (Iterate):** 10 minutes
  - Make adjustments
  - Ask AI for tweaks

- **Concept deep dive (if time):** 10-15 minutes
  - Explain Context Engineering, React, Tailwind in detail
  - Only after hands-on is complete

- **Reflection:** 5 minutes
  - What did you build?
  - What was the most useful thing you learned?

**Total expected time:** 50-60 minutes

## Key Messages to Reinforce

1. **Context is everything** - The quality of AI's output depends on the quality of your input. Be specific about project, location, current state, goal.

2. **Do first, understand later** - You don't need to master React and Tailwind before using them. Learn by doing, deepen understanding over time.

3. **Iterate, don't perfect** - First version won't be perfect. That's normal. Adjust, ask AI again, refine.

4. **Small scope wins** - Pick small, specific UI elements. "This one button" beats "redesign the whole page."

5. **AI explains, you verify** - Always ask AI to explain what the code does. Then verify by reading and testing.

6. **These skills compound** - Each time you do this, you get faster and understand more. Day 1 is the hardest day.
