# Environment Variables: From Local to Cloud

> Your app works locally—but how does the cloud know your AWS credentials?

![Deployed chat working on Vercel](./img/13-Env-Vars-and-Deployment/04-env-var-and-deployment.png)

## Overview

In the previous lesson, we integrated AWS Bedrock into our FastAPI backend. It runs perfectly on your laptop. But here's the thing—your laptop has the `~/.aws/credentials` file, Vercel's servers don't.

When you deploy code to the cloud, the runtime environment is completely different. Your local files? Not there. The environment you carefully configured? Also not there.

This is where **Environment Variables** come in. They're the standard way to pass configuration—especially secrets—to applications running in different environments.

## Learning Objectives

You've already got things working locally. Now it's time to make it available to the world. But deploying isn't just clicking a button—you need to understand how code adapts to different runtime environments.

After completing this lesson, you will be able to:

1. **Understand Environment Variables** — Know what they are and why they're the standard way to configure applications across environments
2. **Deploy to Vercel** — Configure AWS credentials as environment variables and get your AI app running in the cloud
3. **Write environment-aware code** — Use runtime detection to make your code behave differently in local vs cloud environments

## Prerequisites

- Completed the previous lesson (AI chat endpoint working locally)
- A Vercel account (free tier is fine)
- Your project connected to GitHub and linked to Vercel

---

## Key Concepts

### 1. The Problem: Local Runtime vs Cloud Runtime

When you run code locally, your machine has:
- Your AWS credentials stored in `~/.aws/credentials`
- Various environments you've spent time configuring
- Files and configurations accumulated over time

When your code runs on Vercel, it has:
- A fresh, empty container
- No access to your local files whatsoever
- No idea who you are or which AWS account to use

This is the core challenge: **the same code needs to run in completely different environments**.

### 2. The Solution: Environment Variables

Environment Variables are key-value pairs that exist outside your code. Think of them as a configuration layer that sits between your application and the runtime environment.

The key insights are:

- **Same key, different values** — `AWS_ACCESS_KEY_ID` can exist both locally and on Vercel, but the values inside can be different
- **Keys may not exist** — Your local machine might not have a `VERCEL` variable, but Vercel's servers do
- **Values are injected at runtime** — Your code doesn't hardcode secrets; it reads them from the environment

This is how professional applications handle configuration. Never hardcode secrets. Always read from environment variables.

For deeper understanding, read the official documentation:
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [System Environment Variables](https://vercel.com/docs/environment-variables/system-environment-variables) — Vercel automatically sets variables like `VERCEL` that your code can use to detect where it's running

### 3. Detecting the Runtime Environment

How does your code know if it's running locally or on Vercel? Check the `VERCEL` environment variable:

```python
import os

if os.environ.get("VERCEL") == "1":
    print("Running on Vercel")
else:
    print("Running locally")
```

Vercel automatically sets `VERCEL=1` on their servers. Your local machine doesn't have this variable (unless you set it yourself). This simple check lets your code adjust its behavior based on the environment.

Let's look at how we implemented this in `learn_personal_portfolio_ai/runtime.py`:

```python
class Runtime:
    @cached_property
    def name(self) -> str:
        if os.environ.get("VERCEL", "NOTHING") == "1":
            return RuntimeEnum.VERCEL.value
        else:
            return RuntimeEnum.LOCAL.value

    def is_local(self) -> bool:
        return self.name == RuntimeEnum.LOCAL.value

    def is_vercel(self) -> bool:
        return self.name == RuntimeEnum.VERCEL.value

runtime = Runtime()
```

**Why this design?** This `Runtime` class might look redundant at first glance—why not just use `os.environ.get()` directly? The answer is: it's more comfortable to use. With this design, anywhere in your codebase you can write:

```python
from learn_personal_portfolio_ai.runtime import runtime

if runtime.is_local():
    # local-specific logic
```

One import, one object, and your IDE autocompletes all methods. The complex logic is encapsulated in one file; everywhere else stays clean. This is a common pattern: **one place complex, everywhere else simple**.

### 4. Environment-Aware AWS Configuration

Now look at `learn_personal_portfolio_ai/boto_ses.py`:

```python
from .runtime import runtime

if runtime.is_vercel():
    boto_ses = boto3.Session(
        region_name="us-east-1",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
else:
    boto_ses = boto3.Session(region_name="us-east-1")
```

**What's happening here?**

- **On Vercel:** There's no `~/.aws/credentials` file. We must explicitly pass credentials from environment variables.
- **Locally:** boto3's default credential chain automatically finds your `~/.aws/credentials`. No need to specify anything.

This is environment-aware code. Same file, same logic, but it automatically adjusts based on the runtime environment.

### 5. Vercel Environments: Production vs Preview

Vercel has multiple environments:

- **Production** — Your main deployment, typically from the `main` branch
- **Preview** — Deployments from other branches (like `13-Env-Vars-and-Deployment`)

When you push a branch, Vercel creates a Preview deployment with a unique URL. This is perfect for testing before merging to production.

Environment variables can be scoped to specific environments. In this lesson, we'll set them to "All Environments" so both Production and Preview can use them.

### 6. A Note on IAM Permissions

You're probably using an IAM User created in earlier lessons. That's fine for learning. In a real production environment, you should follow the principle of least privilege—only grant the permissions your application actually needs (in our case, just `bedrock:InvokeModel`).

We won't go deep into IAM best practices here, but keep this in mind when building real applications.

---

## Exercises

### Exercise 1: Understand the Runtime Detection Code

**Goal:** Understand how our code detects the runtime environment.

Read these two files:
1. `learn_personal_portfolio_ai/runtime.py`
2. `learn_personal_portfolio_ai/boto_ses.py`

Answer these questions:
- [ ] What value does `os.environ.get("VERCEL")` return on Vercel's servers?
- [ ] Why does `boto_ses.py` need to explicitly pass credentials on Vercel but not locally?
- [ ] What's the benefit of the `Runtime` class pattern vs using `os.environ.get()` directly everywhere?

### Exercise 2: Configure Environment Variables on Vercel

**Goal:** Set up AWS credentials in Vercel's dashboard.

**Step 1:** Go to your project's Settings in Vercel

![Vercel Settings - Environment Variables](./img/13-Env-Vars-and-Deployment/01-env-var-and-deployment.png)

Navigate to **Settings** → **Environment Variables**. If this is your first time, you'll see an empty list.

**Step 2:** Add your AWS credentials

Click "Add Environment Variable" and add two variables:

![Adding environment variables](./img/13-Env-Vars-and-Deployment/02-env-var-and-deployment.png)

- `AWS_ACCESS_KEY_ID` — Your IAM user's access key
- `AWS_SECRET_ACCESS_KEY` — Your IAM user's secret key

Set the scope to "All Environments" so both Production and Preview can access them.

**Step 3:** Save and note the redeploy message

![Environment variables added](./img/13-Env-Vars-and-Deployment/03-env-var-and-deployment.png)

After saving, you'll see the variable list. Notice the message in the bottom right: **"A new deployment is needed for changes to take effect."**

> **Why redeploy?** Environment variables are injected when a deployment starts. If you only changed environment variables (no code changes), Vercel won't automatically redeploy. You need to click "Redeploy" or push a new commit to pick up the new values.

### Exercise 3: Deploy and Verify

**Goal:** Confirm your AI chat works on Vercel.

1. Push your code to GitHub (if you haven't already)
2. Vercel will automatically create a Preview deployment for your branch
3. Wait for the deployment to complete
4. Open the Preview URL (something like `your-project-git-branch-name.vercel.app`)
5. Test the chat—send a message and verify you receive a real AI response

**What to submit:**

Take a screenshot of your chat working on the Preview deployment. The screenshot should include:
- The chat interface showing a real AI response (not "Hello Alice")
- The browser URL bar showing your Vercel Preview domain

This proves your deployment is working with cloud credentials.

---

## Reflection

What we learned today looks simple: set a few environment variables, deploy, done.

But the underlying concept is foundational to professional software development:

**Your code should never assume where it's running.** Local machine, staging server, production cloud—the same code should work everywhere. Environment variables are the bridge that makes this possible.

The pattern we used—detect the environment, then adjust behavior—appears everywhere in real-world applications:
- Different database connections for dev/staging/prod
- Different log levels for different environments
- Different API endpoints for testing vs production

Master this pattern, and you can deploy your code anywhere.

---

## Mentor's Note

**Why this exercise matters:**

Today's lesson might feel like "just configuration." But understanding environment variables is a rite of passage for developers. From this moment on, you stop thinking "my code on my machine" and start thinking "my code running anywhere."

Every professional codebase uses environment variables. Every CI/CD pipeline injects them. Every cloud platform manages them. This isn't just a Vercel thing—this is how software works.

**The deeper lesson:**

Notice how we organized the code. The `runtime.py` file contains all the complex environment detection logic. The `boto_ses.py` file uses it with a simple `if runtime.is_vercel()`. This is intentional design.

When building software, always ask: "Where should this complexity live?" The answer is usually: "In one place, so everywhere else stays simple."

One file handles the messy environment detection logic. Every other file just asks `runtime.is_vercel()` and gets a clean boolean answer. This is how you keep large codebases maintainable.

---

## Quick Reference

**Key files:**
- `learn_personal_portfolio_ai/runtime.py` — Runtime environment detection
- `learn_personal_portfolio_ai/boto_ses.py` — Environment-aware AWS configuration

**Check if running on Vercel:**
```python
from learn_personal_portfolio_ai.runtime import runtime

if runtime.is_vercel():
    # cloud-specific code
```

**Vercel documentation:**
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [System Environment Variables](https://vercel.com/docs/environment-variables/system-environment-variables)

**Required environment variables on Vercel:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
