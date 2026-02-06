# Teaching Guide: Exploring a Codebase with Top-Down Learning

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand the difference between Top-Down and Bottom-Up learning approaches and when to use each
2. **Skill outcome** - Successfully locate source code for any UI element using text search, DevTools, or AI assistance
3. **Mindset outcome** - Develop confidence to explore unfamiliar codebases independently instead of waiting for documentation or guidance

## Concept Sequence

Teach concepts in this order:

### Phase 1: Mindset Setup (Before Hands-on)

1. **Why exploration matters** - Connect to real-world scenarios: joining a new team, debugging unfamiliar code, understanding open source projects
2. **Top-Down vs Bottom-Up** - Explain both approaches and why Top-Down is often faster for initial exploration
3. **The three techniques** - Text search, DevTools inspection, AI assistance (overview only, details come during practice)

### Phase 2: Guided Exploration

4. **Text search technique** - Start with the "Home" link (Exercise 2) because it's the simplest case
5. **DevTools technique** - Use the profile image (Exercise 3) to show when text search isn't available
6. **Import chain tracing** - After finding code, always trace back: "How does this get loaded?"
7. **Related elements** - Show that elements in the same visual area are often in the same component (Exercises 4-5)

### Phase 3: Deeper Tracing

8. **Interactive elements** - Button with onClick handler (Exercise 6) - finding code is step one, understanding behavior is step two
9. **Cross-service tracing** - API endpoint (Exercise 7) - trace from frontend to backend, understand rewrites
10. **AI assistance** - Screenshot and ask (Exercise 8) - last resort but powerful technique

### Phase 4: Synthesis (Optional)

11. **Mental model building** - Student should now have a map of how the app is structured
12. **Transfer discussion** - How would you apply this to a different codebase?

## Common Struggles

**Struggle:** Student searches but gets too many results
- **Signs:** "I searched for 'Home' but found 50 matches"
- **Intervention:** Teach them to search with quotes for exact strings, or add context like file type filters. Also explain that the first few results are often the right ones in well-structured codebases.

**Struggle:** Student finds the code but doesn't understand the import chain
- **Signs:** "I found Hero.tsx but how does it end up on the page?"
- **Intervention:** Walk through the chain step by step. Ask guiding questions: "What file imports Hero.tsx?" then "What imports that file?" Keep going until you reach page.tsx or layout.tsx.

**Struggle:** Student skips "try it yourself" and jumps to answers
- **Signs:** Student reads answers immediately without attempting
- **Intervention:** Gently redirect. Emphasize that the skill is in the finding, not the knowing. If they just read answers, they won't build the muscle memory.

**Struggle:** Student doesn't know what to search for with images/icons
- **Signs:** Staring at the profile picture not knowing where to start
- **Intervention:** Walk through DevTools step by step. Show them how to right-click → Inspect, then look for useful attributes like src, alt, class, id.

**Struggle:** Student is uncomfortable asking AI "dumb" questions
- **Signs:** Hesitation during Exercise 8, overly formal prompts
- **Intervention:** Model it yourself. Ask something simple and show how AI responds helpfully. Emphasize: the goal is learning, not looking smart.

**Struggle:** Student gets lost in the codebase structure
- **Signs:** "There are so many files, I don't know where to look"
- **Intervention:** Refocus on Top-Down: "Don't try to understand everything. Just pick ONE element on screen and find where it comes from."

## Teaching Tips

- **Let them struggle briefly** - Don't give answers too quickly. A bit of struggle builds problem-solving skills. But don't let frustration build too long.

- **Narrate your thinking** - When demonstrating, think aloud: "I see 'About Me' on screen, so I'll search for that exact text... I found it in Hero.tsx... now let me trace how Hero gets loaded..."

- **Celebrate the "aha" moments** - When a student successfully traces an element to its source, acknowledge it. This builds confidence for independent exploration.

- **Use the actual running app** - Always have http://localhost:3000 open. Reference the real UI, not just the screenshot. Let students click around.

- **Don't over-explain the codebase** - The point is NOT to understand every file. The point is to learn HOW to find things. If a student asks "what does this other file do?", redirect: "Good question! How would you find out?"

- **Connect to their future** - "When you join a company, nobody will explain every file to you. This skill is how you become productive quickly."

## Assessment Ideas

- **Quick verbal check:** Point to any element on screen and ask "What file creates this?" Student should be able to find it within 1-2 minutes.

- **Technique selection:** Describe a scenario and ask which technique they'd use:
  - "You see a button that says 'Submit'" → Text search
  - "You see a loading spinner icon" → DevTools
  - "You see a complex animation and don't know where to start" → AI

- **Import chain test:** Ask student to trace from a component all the way to the entry point. They should be able to explain each step.

- **Transfer test:** Open a different page or component and ask them to explore it without guidance. Can they apply the same techniques?

- **Confidence check:** Ask "If you joined a new project tomorrow with a codebase you've never seen, what would you do first?" Good answer: "Run it, look at the UI, pick something to trace."

## Pacing Guide

- **Exercises 1-2 (Setup and First Search):** 10 minutes
  - Getting the app running and first successful text search
  - This establishes the basic pattern

- **Exercises 3-5 (DevTools and Multiple Elements):** 15 minutes
  - Introduce DevTools technique
  - Practice with several elements to build confidence

- **Exercises 6-7 (Interactive and API):** 15 minutes
  - Deeper tracing with behavior and cross-service
  - This is where understanding deepens

- **Exercise 8 (AI Assistance):** 5-10 minutes
  - Practice screenshot + prompt technique
  - Students should try their own prompts first

- **Reflection and Discussion:** 5-10 minutes
  - Review what was learned
  - Discuss transfer to other codebases

**Total expected time:** 50-60 minutes

## Key Messages to Reinforce

1. **"How to find" > "Where it is"** - Knowing the location is temporary. Knowing how to find is permanent and transferable.

2. **Start from what you can see** - Top-Down means UI first, code second. Don't read files randomly.

3. **Three techniques, in order** - Text search first (fastest), DevTools second (when no text), AI third (when stuck).

4. **Trace the full chain** - Finding the code is step one. Understanding how it gets loaded completes the picture.

5. **Explore fearlessly** - You can't break anything by reading code. Click around, search things, ask questions.

6. **This skill transfers** - Same approach works for any codebase, any framework, any language.
