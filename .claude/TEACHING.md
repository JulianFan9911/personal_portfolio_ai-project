# Teaching Guide: Config Management and Code Refactoring

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand Single Source of Truth: why configuration values should be defined in one place, and why main functions should read like English with logic extracted into reusable modules
2. **Skill outcome** - Enable a feature by uncommenting config-driven code, demonstrating understanding of how config values flow through the codebase
3. **Mindset outcome** - Start thinking "ready to scale" instead of "it works" — the habit of refactoring after features are complete

## Concept Sequence

Teach concepts in this order:

### Phase 1: The "Why Refactor?" Motivation (5 minutes)

1. **Feature is Done, But...** - The app works on Vercel. Why do more work?
2. **Amateur vs Professional** - Amateur: "it works." Professional: "ready to scale"
3. **The Pain of Scattered Config** - Imagine changing `us-east-1` to `ap-northeast-1` across 5 files

This phase establishes the "aha moment" - refactoring isn't extra work, it's professional practice.

### Phase 2: Single Source of Truth (10 minutes)

4. **The Core Principle** - A value should be defined in only one place
5. **The Judgment Rule** - If changing a value requires editing multiple files, abstract it to config
6. **Config Pattern** - dataclass + factory method + singleton
7. **Using Config** - One import, one object: `config.aws_region`

Focus on the design philosophy, not memorizing the pattern.

### Phase 3: Main Function Reads Like English (10 minutes)

8. **The Goal** - Reading `index.py` should tell you the flow: Step 1, Step 2, Step 3...
9. **Flow Control Only** - Main function only "directs," doesn't "do the work"
10. **Extract to Modules** - Detailed logic lives in separate modules
11. **The Power of Reuse** - `ai_sdk_message_generator()` used for both normal and error responses

Students should understand why clean main functions matter for maintainability.

### Phase 4: Hands-on (15-20 minutes)

12. **Read the Code** - Understand index.py flow and ai_sdk_adapter.py functions
13. **Enable Message Length Check** - Find config field, uncomment code, test
14. **Notice the Reuse** - Error response uses same generator as normal response
15. **Run Tests** - Verify config works

### Phase 5: Wrap-up (5 minutes)

16. **Two Design Philosophies** - Single Source of Truth + Main Function Reads Like English
17. **The Quality Question** - "If requirements change, how many files do I modify?"
18. **Ready to Scale** - When 3 files become 30, you'll thank yourself

## Common Struggles

**Struggle:** Student doesn't understand why we refactor working code
- **Signs:** "But it already works!"
- **Intervention:** Ask: "If your boss says change the region, how many files do you touch?" or "If a new teammate joins, how do they understand the flow?"

**Struggle:** Student doesn't see the benefit of extracting functions to modules
- **Signs:** "Why not just write it inline?"
- **Intervention:** Point to `ai_sdk_message_generator()`: "This is used twice — for normal responses and error responses. If it were inline, you'd write it twice. If the protocol changes, you'd update it twice. Which is better?"

**Struggle:** Student finds the config pattern over-engineered
- **Signs:** "This is just a few values, why a whole class?"
- **Intervention:** "Right now it's 3 values. In 6 months it might be 15. The pattern scales. And factory methods let different environments have different values without if/else everywhere."

**Struggle:** Student can't find the commented code
- **Signs:** Takes too long searching
- **Intervention:** "Search for 'Uncomment' in index.py"

**Struggle:** Student doesn't notice the reuse of ai_sdk_message_generator
- **Signs:** Completes the task but misses the teaching point
- **Intervention:** "Look at the error response code you just uncommented. What function does it use? Now look at the normal response at the bottom. Same function, right?"

## Teaching Tips

- **Start with the pain** - Don't jump into config patterns. First make them feel the pain of scattered configuration.

- **Use the "6 months from now" frame** - "Imagine in 6 months, 10 files have region hardcoded. Someone needs to change it. How do they know which files?"

- **Walk through index.py like reading** - Literally read it aloud: "First, we log the request. Then, we parse it. Then, we check the length..." This demonstrates the "reads like English" principle.

- **Highlight the reuse moment** - When they uncomment the message length check, pause: "See that `ai_sdk_message_generator`? Same function as the normal response. That's reuse."

- **Connect to professional practice** - "Every production codebase I've worked on has a config module. This is industry standard."

- **The quality question** - Ask repeatedly: "If requirements change, how many files?" This becomes a mental habit.

## Assessment Ideas

- **Quick concept check:** "What is Single Source of Truth?"
  - Good answer: "A value is defined in one place. Everywhere else references it."

- **Code organization understanding:** "Why is the main function in index.py so short?"
  - Good answer: "It only has flow control. Each step is a function call. Details are in separate modules."

- **Reuse understanding:** "Why is ai_sdk_message_generator in a separate module?"
  - Good answer: "It's used twice — for normal and error responses. If it were inline, we'd duplicate code."

- **Hands-on verification:** Student can:
  - Navigate to the uncommented message length check
  - Demonstrate that long messages return errors
  - Point out where ai_sdk_message_generator is called twice

## Pacing Guide

- **Phase 1 (Motivation):** 5 minutes
  - Establish why refactoring matters
  - Create the "pain of scattered config" realization

- **Phase 2 (Single Source of Truth):** 10 minutes
  - Explain the principle
  - Walk through config.py
  - Show how boto_ses.py uses it

- **Phase 3 (Main Function Reads Like English):** 10 minutes
  - Walk through index.py
  - Point out the function calls
  - Highlight ai_sdk_message_generator reuse

- **Phase 4 (Hands-on):** 15-20 minutes
  - Exercise 1: Read code (5 min)
  - Exercise 2: Enable message length check (10 min)
  - Exercise 3: Run tests (2 min)

- **Phase 5 (Wrap-up):** 5 minutes
  - Reinforce the two design philosophies
  - The quality question
  - Connect to "ready to scale" mindset

**Total expected time:** 45-50 minutes

## Key Messages to Reinforce

1. **Single Source of Truth** - A value is defined in one place. Everywhere else references it. If you need to change it, you change one file.

2. **Main function reads like English** - Good code, you can read the main function and understand the flow. Details are in separate modules.

3. **Extract for reuse** - If you write the same code twice, extract it to a function. Change once, effective everywhere.

4. **The quality question** - "If requirements change, how many files do I modify?" If the answer is "one," your design is good.

5. **Ready to scale mindset** - "It works" is the beginning. "Ready to scale" is the end. This is what separates amateurs from professionals.
