# Teaching Guide: Environment Variables and Deployment

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand that environment variables are the standard way to pass configuration across different runtime environments, and that the same code can detect and adapt to where it's running
2. **Skill outcome** - Configure environment variables on Vercel and deploy an AI-powered application that works in the cloud
3. **Mindset outcome** - Start thinking "my code runs anywhere" instead of "my code on my machine"

## Concept Sequence

Teach concepts in this order:

### Phase 1: The Problem (5 minutes)

1. **Local vs Cloud Runtime** - Your laptop has `~/.aws/credentials`, Vercel doesn't
2. **The Core Challenge** - Same code must work in completely different environments
3. **Why This Matters** - Without solving this, your app only works on your machine

This phase establishes the "aha moment" - the realization that deployment isn't just uploading code.

### Phase 2: The Solution (10 minutes)

4. **Environment Variables Concept** - Key-value pairs outside your code
5. **Three Key Insights** - Same key/different values, keys may not exist, values injected at runtime
6. **The VERCEL Variable** - How to detect where code is running
7. **Official Documentation** - Point students to Vercel docs for deeper understanding

Focus on the mental model, not memorizing APIs.

### Phase 3: Code Walkthrough (10 minutes)

8. **runtime.py Design** - Why wrap environment detection in a class
9. **The "One Place Complex" Pattern** - Encapsulate complexity, expose simplicity
10. **boto_ses.py Logic** - if/else based on runtime, different credential sources
11. **Why This Design Matters** - Maintainability at scale

Students should understand the design philosophy, not just copy the code.

### Phase 4: Hands-on (15-20 minutes)

12. **Read the Code** - Understand runtime.py and boto_ses.py
13. **Configure Vercel** - Add AWS credentials as environment variables
14. **The Redeploy Requirement** - Why changing env vars requires redeployment
15. **Deploy and Test** - Verify chat works on Preview URL

### Phase 5: Wrap-up (5 minutes)

16. **The Universal Pattern** - Detect environment, adapt behavior
17. **Real-World Applications** - Database connections, log levels, API endpoints
18. **The Developer Milestone** - Thinking globally about where code runs

## Common Struggles

**Struggle:** Student doesn't understand why local credentials don't work on Vercel
- **Signs:** "But it works on my machine!"
- **Intervention:** Ask: "Where is your `~/.aws/credentials` file? Does Vercel's server have access to your laptop's files?" Make the physical separation concrete.

**Struggle:** Student forgets to redeploy after adding environment variables
- **Signs:** Deployment shows old behavior, credentials seem ignored
- **Intervention:** "Environment variables are injected when deployment starts. You added them after the last deployment. What needs to happen?" Point to the toast message in screenshot 03.

**Struggle:** Student doesn't understand why we use a Runtime class
- **Signs:** "Why not just use os.environ.get() directly?"
- **Intervention:** Ask them to imagine writing `os.environ.get("VERCEL", "NOTHING") == "1"` in 10 different files. Then ask: "What if Vercel changes this to `VERCEL=true`? How many files do you change?" The class centralizes the logic.

**Struggle:** Student copies code without understanding
- **Signs:** Can deploy but can't explain what runtime.is_vercel() does
- **Intervention:** Ask: "What happens inside is_vercel()? What environment variable does it check? What value does it look for?" If they can't answer, have them re-read the code.

**Struggle:** Student sets environment variables for wrong environment
- **Signs:** Works in Production but not Preview, or vice versa
- **Intervention:** Check the environment scope in Vercel dashboard. Should be "All Environments" for this lesson.

## Teaching Tips

- **Start with the "why"** - Don't jump into Vercel configuration. First establish why environment variables exist at all.

- **Use the "two computers" analogy** - Your laptop is one computer, Vercel's server is another. They don't share files. Environment variables are how you tell each computer its own secrets.

- **The screenshot sequence matters** - Show screenshot 04 first (working result), then 01-03 (how to get there). End with success, not process.

- **Don't over-explain IAM** - This lesson is about environment variables, not AWS permissions. Mention least privilege briefly, move on.

- **Let them discover the redeploy requirement** - If a student's deployment doesn't work after adding env vars, ask "What does the message in the bottom right say?" before telling them to redeploy.

- **Connect to professional practice** - "Every production system you'll ever work on uses environment variables. This is industry standard."

## Assessment Ideas

- **Quick concept check:** "What's the difference between hardcoding a secret and using an environment variable?"
  - Good answer: "Hardcoding puts the secret in code (bad for security, same everywhere). Environment variables keep secrets outside code and can be different per environment."

- **Code understanding:** "What does `runtime.is_vercel()` return, and how does it know?"
  - Good answer: "Returns True or False. Checks if the VERCEL environment variable equals '1'. Vercel sets this automatically on their servers."

- **Design understanding:** "Why do we use a Runtime class instead of checking os.environ everywhere?"
  - Good answer: "Centralizes the logic in one place. If the detection method changes, we only update one file. Makes other code cleaner."

- **Deployment verification:** Student submits screenshot showing:
  - Working chat with real AI response
  - Browser URL bar showing Vercel Preview domain (not localhost)

## Pacing Guide

- **Phase 1 (The Problem):** 5 minutes
  - Establish that local != cloud
  - Create the "aha" moment

- **Phase 2 (The Solution):** 10 minutes
  - Explain environment variables conceptually
  - Introduce the VERCEL detection variable
  - Point to official docs

- **Phase 3 (Code Walkthrough):** 10 minutes
  - Walk through runtime.py design
  - Walk through boto_ses.py logic
  - Emphasize the "one place complex" pattern

- **Phase 4 (Hands-on):** 15-20 minutes
  - Exercise 1: Read code (5 min)
  - Exercise 2: Configure Vercel (5-10 min)
  - Exercise 3: Deploy and verify (5 min)

- **Phase 5 (Wrap-up):** 5 minutes
  - Connect to broader patterns
  - Reinforce the mindset shift

**Total expected time:** 45-50 minutes

## Key Messages to Reinforce

1. **Environment variables are the standard** - Not a Vercel thing, not an AWS thing. This is how all professional software handles configuration.

2. **Same code, different environments** - Your code should never assume where it's running. It should detect and adapt.

3. **One place complex, everywhere else simple** - The Runtime class exemplifies good software design. Centralize complexity, expose clean interfaces.

4. **Secrets never in code** - Environment variables solve the security problem of keeping secrets out of source control.

5. **The developer milestone** - Understanding environment variables marks the transition from "my machine" thinking to "deployed software" thinking.
