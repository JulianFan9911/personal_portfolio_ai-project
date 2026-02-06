# Teaching Guide: Deploying Next.js App to Vercel

## Learning Outcomes

By the end of this lesson, learners should be able to:

1. **Cognitive outcome** - Understand how CI/CD platforms like Vercel provide instant feedback on whether code deploys correctly
2. **Skill outcome** - Successfully set up a Vercel deployment pipeline and use it to verify code changes
3. **Mindset outcome** - Treat deployment verification as part of TDD—push, see if it builds, fix if needed, repeat

## Concept Sequence

Teach concepts in this order:

### Phase 1: Understanding the Platform (Before Hands-on)

1. **What is Vercel** - Start with the big picture: a cloud platform that turns GitHub repos into live websites
2. **Why deployment matters** - Connect to real-world value: code is worthless until users can access it
3. **CI/CD basics** - Just enough to understand "push code → auto deploy"

### Phase 2: Authorization and Setup

4. **GitHub App authorization** - Explain why Vercel needs access and the security implications
5. **Repository permissions** - Teach "Only select repositories" as a security best practice
6. **First import vs. subsequent deploys** - Clarify the difference between initial setup and ongoing workflow

### Phase 3: Deployment Workflow

7. **Framework detection** - How Vercel figures out what kind of project you have
8. **Build process** - What happens during deployment (install deps → build → deploy)
9. **Deployment states** - Building, Ready, Error and what they mean

### Phase 4: Operations (Optional)

10. **Manual configuration** - When auto-detection fails, how to fix Framework Preset
11. **Debugging builds** - Reading build logs to troubleshoot failures
12. **Preview vs Production** - Different branches, different purposes

## Common Struggles

**Struggle:** Student doesn't see their repo after authorization
- **Signs:** Frustrated clicking, multiple page refreshes, "it's not working"
- **Intervention:** Explain the two-step process (authorize → import). Check if they authorized the correct account. For Organizations, check admin approval status.

**Struggle:** Build fails with cryptic error
- **Signs:** Student stares at red error, doesn't know where to look
- **Intervention:** Guide them to click into the deployment and read build logs. Point out Framework Preset setting. Encourage copy-pasting errors to AI for analysis.

**Struggle:** Confusion about branches and deployments
- **Signs:** "Why do I have so many deployments?" or "Which URL is the right one?"
- **Intervention:** Explain main = Production, other branches = Preview. Each push creates a new deployment. Help them find the deployment for their specific branch.

**Struggle:** "I authorized but nothing happened"
- **Signs:** Student completed GitHub authorization but didn't return to Vercel
- **Intervention:** Explain that authorization just grants permission—they still need to click Import. Walk them back to the Vercel import page.

**Struggle:** Framework detection failure
- **Signs:** Build fails immediately, "no framework detected" or wrong build commands
- **Intervention:** Guide them to Settings > Build and Deployment > Framework Preset. Set to Next.js manually. Trigger redeploy.

## Teaching Tips

- **Use the screenshots liberally** - The tutorial has 9 annotated screenshots. Point to specific UI elements when explaining each step.

- **Let them fail once** - If their first deployment fails (common if main branch is incomplete), don't panic. Use it as a teaching moment to show how to read build logs and fix Framework Preset.

- **Emphasize the "magic moment"** - When their preview first loads on a `.vercel.app` URL, pause and celebrate. This is the moment they see their deployment pipeline working.

- **Connect to professional practice** - Mention that this is exactly how companies deploy: push to GitHub → CI/CD runs → website updates. They're learning professional workflows.

- **Don't over-explain CI/CD** - The brief concept section after Exercise 6 is enough. Deep CI/CD understanding can come later. Focus on the practical experience first.

- **Use chore.txt strategically** - Show them the technique of using a dummy file to trigger deployments. It's a useful trick for testing deployment pipelines.

## Assessment Ideas

- **Quick check after Exercise 5:** Ask student to explain what each column in the Deployments list means (Status, Branch, Commit message)

- **Verification of understanding:** Have student push a change and explain what they expect to happen before it happens

- **Practical assessment:** Student should be able to:
  - Start from scratch on a new project and deploy it
  - Diagnose why a deployment failed by reading build logs
  - Know where to find Framework Preset settings

- **Submission verification:** Student submits a screenshot of their deployed website showing:
  - The `.vercel.app` URL in the browser address bar
  - The running application in the browser window
  - This proves they successfully completed the entire flow

## Pacing Guide

- **Exercises 1-4 (Setup and First Deploy):** 15-20 minutes
  - This is the core flow. Most time spent here.
  - May be faster if student has already authorized GitHub before.

- **Exercise 5 (Viewing Deployments):** 5 minutes
  - Quick orientation to the dashboard.

- **Exercise 6 (Triggering New Deploy):** 5-10 minutes
  - Important for understanding the auto-deploy mechanism.
  - This is where CI/CD concept naturally fits.

- **Exercise 7 (Framework Settings):** Optional, 5 minutes
  - Only if student encountered framework detection issues.

**Total expected time:** 30-40 minutes

## Key Messages to Reinforce

1. **This is TDD for deployment** - Push code, see if it builds, fix if needed, repeat. The deployment pipeline gives you instant feedback.

2. **Preview != Production** - We're setting up preview deployments, not promoting to production. The goal is verification, not public release.

3. **Preview deployments are your testing ground** - Every branch gets its own URL. Use this to verify your code deploys correctly before moving forward.

4. **Errors are normal and expected** - Build failures happen. The skill is knowing how to read logs and fix issues quickly.

5. **Automation enables rapid iteration** - CI/CD handles the mechanical work so you can focus on code changes and immediately see results.
