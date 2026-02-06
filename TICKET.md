# Task Card: Deploy Your Next.js App to Vercel

## Objective

Set up Vercel deployment for your Next.js application so you can instantly verify if your code changes deploy successfully—a key part of your development workflow.

This is a **preview deployment** (not production). The goal is to establish the deployment pipeline so that every time you push code, you can immediately see if it builds and deploys correctly. Think of it as TDD for deployment: push → see result → fix if needed → repeat.

Read the tutorial: [Deploying Next.js App to Vercel](https://github.com/sanhehu/learn_personal_portfolio_ai-project/tree/05-Deploy-Hello-World-NextJs-App-to-Vercel)

## Actionable Items

1. **Create a Vercel account** (if you don't have one) at [vercel.com](https://vercel.com)

2. **Authorize Vercel to access your GitHub**
   - Add your GitHub account in Vercel
   - Grant access to the repository you want to deploy
   - Use "Only select repositories" for security best practice

3. **Import and deploy your project**
   - Click "Import" on your repository
   - Configure project settings (most defaults are fine)
   - Click "Deploy" and wait for build to complete

4. **Verify deployment success**
   - Check that deployment status shows green "Ready"
   - Click "Visit" to open your deployed website
   - Confirm your application loads correctly

5. **Trigger a new deployment** (to verify CI/CD works)
   - Modify `chore.txt` file
   - Push to GitHub
   - Watch Vercel automatically deploy

**Estimated time:** 30-40 minutes

## Checklist

- [ ] **Vercel account created** - You have a Vercel account and can log in
- [ ] **GitHub authorized** - Vercel can access your repository
- [ ] **First deployment successful** - Status shows "Ready" (green)
- [ ] **Preview accessible** - You can click "Visit" and see your app in the preview deployment
- [ ] **Auto-deploy verified** - Pushing code triggers automatic deployment

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. **Take a screenshot of your deployed website:**
   - Open your deployed site by clicking "Visit" in Vercel
   - The screenshot MUST show the browser's URL bar with your Vercel URL (e.g., `https://your-project-abc123-username.vercel.app`)
   - The screenshot MUST show your application running in the browser

3. Say "ship it" when complete to generate RESULT.md

4. Share the RESULT.md file GitHub link AND your deployment screenshot with your instructor

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

- **Vercel account setup:** Student can log into Vercel dashboard (Just ask student)
- **GitHub authorization:** Repository appears in Vercel's import list (Just ask student)
- **Successful deployment:** At least one deployment shows "Ready" status (Just ask student)
- **Preview accessibility:** The preview deployment URL loads without errors (Just ask student)
- **Screenshot requirements:**
  - Browser URL bar is visible showing `.vercel.app` domain
  - The deployed application is visible and functional
  - URL format should match: `https://[project]-[hash]-[username].vercel.app` or similar Vercel URL pattern
- **CI/CD understanding:** Student can explain what happens when they push code (auto-deploy)
- **Troubleshooting ability:** If deployment failed, student knows to check build logs and Framework Preset settings
