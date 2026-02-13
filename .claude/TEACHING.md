# Teaching Guide: Milestone Review & Documentation

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand the difference between "decisions" (why) and "dev-guide" (how) documentation, and when each is useful
2. **Skill outcome** - Read existing documentation to review codebase structure; write a technical document capturing learned knowledge
3. **Mindset outcome** - Adopt the habit of documenting at milestones; see documentation as "saving future time" rather than "wasting current time"

## Concept Sequence

Teach concepts in this order:

### Phase 1: Why Document Now? (5 minutes)

1. **The 30% Rule callback** - At milestones, you can see the full picture but details are still fresh
2. **The forgetting problem** - In 3 months, you won't remember how you set things up
3. **Documentation as investment** - Time spent now saves more time later

This phase establishes motivation. Students often skip documentation — show them why it matters.

### Phase 2: Two Types of Documentation (10 minutes)

4. **Decisions (Why)** - Records reasoning behind choices; useful when revisiting decisions
5. **Dev Guide (How)** - Records how to work with the codebase; useful for onboarding and resuming work
6. **When to use which** - "Why did we do this?" → Decisions. "How do I do this?" → Dev Guide.

Students should understand that different questions need different documentation.

### Phase 3: Reading Documentation (15 minutes)

7. **Exercise 1: Read Dev Guide** - 4 documents covering architecture, backend, frontend, FAQ
8. **Exercise 2: Read Decisions** - 4 documents covering Vercel deployment decisions
9. **Active reading** - Ask: "Did I know this? Have I forgotten this? Is this enough for future me?"

Reading others' docs teaches structure and completeness.

### Phase 4: Writing Documentation (20 minutes)

10. **Exercise 3: Write your own** - Pick any topic from the project
11. **Use AI to help** - Describe what you want to document, let AI draft
12. **Standard structure** - Background → Solution → Key Points → References

The assignment is intentionally open-ended to encourage ownership.

### Phase 5: Wrap-up (5 minutes)

13. **Reinforce the habit** - Document at milestones, not at the end
14. **Core principle** - Documentation is a gift to future self and teammates
15. **Submission** - Share written document with mentor

## Common Struggles

**Struggle:** Student thinks "there's nothing to write"
- **Signs:** Stares at blank screen, says "I don't know what to document"
- **Intervention:** "What was confusing when you started? What would help someone new? What bug did you hit and fix?"

**Struggle:** Student writes too much or too little
- **Signs:** Either a one-liner or a 10-page essay
- **Intervention:** "Imagine you in 3 months. What's the minimum they need to know? That's your scope."

**Struggle:** Student copies documentation without reading
- **Signs:** Can't answer questions about what they read
- **Intervention:** "Tell me one thing you learned from reading. What surprised you?"

**Struggle:** Student sees documentation as busywork
- **Signs:** Rushes through, minimal effort
- **Intervention:** "Have you ever returned to old code and been confused? That's what documentation prevents."

**Struggle:** Student doesn't know standard doc structure
- **Signs:** Writes stream-of-consciousness paragraphs
- **Intervention:** Point to the suggested structure: Background → Solution → Key Points → References

## Teaching Tips

- **Start with a story** - "I once spent 3 days figuring out why a deployment failed. The answer was in a decision doc I forgot to write."

- **Show, don't tell** - Open one of the dev-guide docs together. Point out its structure. "See how it starts with overview, then details, then quick reference?"

- **Make it personal** - "What would YOU want to know if you came back in 3 months? That's what to write."

- **Celebrate any output** - Even a short doc is better than no doc. Praise the act of writing, not just the quality.

- **Connect to real work** - "In companies, documentation review is part of code review. No docs = incomplete work."

## Assessment Ideas

- **Understanding check:** "What's the difference between decisions and dev-guide docs?"
  - Good answer: "Decisions explain why we made a choice. Dev-guide explains how to work with the code."

- **Reading verification:** "What did you learn from reading the docs that you didn't know before?"
  - Good answer: Can name specific details (file locations, config options, etc.)

- **Writing submission:** Student produces a markdown document in `docs/`
  - Pass criteria: Has clear structure, covers one topic, would be useful to future reader

- **Mindset check:** "When should you write documentation?"
  - Good answer: "At milestones, while memory is fresh" (not "at the end of the project")

## Pacing Guide

- **Phase 1 (Why document now):** 5 minutes
  - Quick motivation, connect to 30% Rule

- **Phase 2 (Two types):** 10 minutes
  - Explain decisions vs dev-guide
  - Show examples from actual docs

- **Phase 3 (Reading):** 15 minutes
  - Exercise 1: Skim dev-guide docs
  - Exercise 2: Skim decision docs
  - Discuss what they noticed

- **Phase 4 (Writing):** 20 minutes
  - Exercise 3: Student writes their own doc
  - Can use AI to help draft
  - Mentor available for questions

- **Phase 5 (Wrap-up):** 5 minutes
  - Collect submissions
  - Reinforce key messages

**Total expected time:** 55-60 minutes

## Key Messages to Reinforce

1. **Document at milestones, not at the end** - Memory fades. Capture knowledge while it's fresh.

2. **Two types: Why (decisions) and How (dev-guide)** - Different questions need different docs.

3. **Documentation is a gift to future self** - The time you spend now saves more time later.

4. **Start with structure** - Background → Solution → Key Points → References

5. **Any doc is better than no doc** - Don't aim for perfect. Aim for useful.

6. **Use AI to help write** - Describe what you want, let AI draft, then review and edit.
