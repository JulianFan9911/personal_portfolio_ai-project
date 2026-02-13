# Learn Personal Portfolio AI 13 - Task Card: Deploy to Vercel with Environment Variables

## Objective

Deploy your AI chat application to Vercel by configuring AWS credentials as environment variables. Learn how code adapts to different runtime environments.

Read the [Tutorial](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/13-Env-Vars-and-Deployment/)

## Actionable Items

1. **Read the runtime detection code (5 minutes)**
   - Open `learn_personal_portfolio_ai/runtime.py` - understand how we detect Vercel vs local
   - Open `learn_personal_portfolio_ai/boto_ses.py` - understand how credentials are handled differently

2. **Configure environment variables on Vercel (5-10 minutes)**
   - Go to your Vercel project → Settings → Environment Variables
   - Add `AWS_ACCESS_KEY_ID` with your IAM user's access key
   - Add `AWS_SECRET_ACCESS_KEY` with your IAM user's secret key
   - Set scope to "All Environments"

3. **Deploy and verify (5 minutes)**
   - Push your code to GitHub (triggers automatic deployment)
   - Wait for Preview deployment to complete
   - Open the Preview URL and test the chat
   - Take a screenshot showing working chat with the Vercel domain visible

**Estimated time:** 20-30 minutes

## Checklist

- [ ] **Read runtime.py** - Understand what `runtime.is_vercel()` checks
- [ ] **Read boto_ses.py** - Understand why credentials are passed differently on Vercel
- [ ] **Added AWS_ACCESS_KEY_ID** - Environment variable configured in Vercel
- [ ] **Added AWS_SECRET_ACCESS_KEY** - Environment variable configured in Vercel
- [ ] **Scope set correctly** - Environment variables available to "All Environments"
- [ ] **Deployment succeeded** - Preview deployment completed without errors
- [ ] **Chat works** - AI responds with real answers (not "Hello Alice")
- [ ] **Screenshot taken** - Shows chat working with Vercel Preview URL in browser

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. Take a screenshot and send it to your instructor. The screenshot must show:
   - The chat interface with a real AI response
   - The browser URL bar showing your Vercel Preview domain (e.g., `your-project-xxx.vercel.app`)

3. Be ready to answer:
   - "What value does the VERCEL environment variable have on Vercel's servers?"
   - "Why does boto_ses.py need to explicitly pass credentials on Vercel but not locally?"
   - "What's the benefit of the Runtime class pattern?"

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** Screenshot verification + understanding check.

**Core verification (required):**

1. **Screenshot shows working deployment:**
   - Chat interface visible with AI response
   - Browser URL shows Vercel domain (not localhost)
   - Response is real AI output, not hardcoded "Hello Alice"

2. **Environment variables configured:**
   - Student can describe what variables they added
   - Variables are scoped to "All Environments" (or at least Preview)

**Understanding verification (required):**

3. **Ask:** "What does `os.environ.get('VERCEL')` return on Vercel's servers?"
   - Good answer: "1" or "The string '1'"
   - Bad answer: "True" / "I don't know"

4. **Ask:** "Why does boto_ses.py check `runtime.is_vercel()` before creating the session?"
   - Good answer: "On Vercel there's no ~/.aws/credentials file, so we need to explicitly pass credentials from environment variables. Locally, boto3 finds credentials automatically."
   - Bad answer: "Because the tutorial said so"

5. **Ask:** "Why do we use a Runtime class instead of checking os.environ directly everywhere?"
   - Good answer: "Centralizes the logic in one place. If detection method changes, only one file needs updating. Makes other code cleaner."
   - Acceptable: "One place complex, everywhere else simple"

**What counts as "pass":**

- Screenshot shows working chat on Vercel Preview URL
- Student can explain what environment variables they configured
- Student can explain the basic logic of runtime detection (checks VERCEL env var)

**What does NOT count as pass:**

- Screenshot shows localhost instead of Vercel domain
- Student configured env vars but deployment still fails
- Student cannot explain what runtime.is_vercel() does
- Screenshot shows "Hello Alice" instead of real AI response
