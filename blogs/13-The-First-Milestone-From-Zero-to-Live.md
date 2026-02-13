# The First Milestone: From Zero to Live

---

## The Moment It Became Real

I opened that `.vercel.app` link on my phone and sent "Hello."

A few seconds later, the AI's reply appeared on screen — not the "Hello Alice" from local testing, but a real response from the cloud that anyone could see.

I turned off WiFi and tried again on 4G. Still worked.

At that moment, 13 branches, 13 blog posts, countless `mise run dev` commands — all converged into a truly living product. Not code sitting on my computer, but an AI app accessible to the entire world.

---

## What This Milestone Really Means

On the surface, this lesson was just "configuring a few environment variables." But its significance goes far beyond that.

This was my first time touching real production environment deployment.

Before, when writing code, "works" meant `localhost:3000` would open. Now I understand that's just the first step of a long journey. True "works" means the code leaves my computer and still functions correctly in a completely unfamiliar environment.

Vercel's Preview environment gave me a safe testing ground. Mess around on a preview branch all you want — break it, and it doesn't affect production. This rhythm of "validate in a safe zone first, then push to the real environment" let me experience professional development workflow for the first time.

---

## Think Big: The Hidden Thread

Looking back at these 13 branches, I found a hidden thread running through: **every step wasn't just for "working now," but for "scaling later."**

| Phase | What Was Done | How It Shows Think Big |
|-------|--------------|----------------------|
| 00-01 | Chose tools | Didn't pick familiar conda, picked professional mise + uv |
| 02-03 | Set up testing | Built feedback loop when code was just Hello World |
| 04-05 | Cut skeleton + deployed | Ensured it could go live before features were done |
| 06-09 | Frontend/backend + API | Designed according to real product protocol standards |
| 10-12 | AI integration | Considered fallback, cost control, replaceability |
| 13 | Environment variables | Let the same code run anywhere |

This wasn't summarized after the fact — it was conscious from day one.

Many people's side project mentality is "get it working first." Hardcode secrets in the code? Fine, I'm the only user anyway. Testing? Add it later. Deployment? Wait until features are done.

But this mentality accumulates into technical debt. When the project actually needs to be used by others, you discover there's too much to change, might as well rewrite.

**The essence of Think Big is: hold side projects to product standards.** Not because you need it now, but because once you're used to demanding professional standards of yourself, every future project benefits.

---

## The Code That Knows Where It Lives

One design from this lesson impressed me: `runtime.py`.

```python
class Runtime:
    def is_local(self) -> bool:
        return self.name == RuntimeEnum.LOCAL.value

    def is_vercel(self) -> bool:
        return self.name == RuntimeEnum.VERCEL.value

runtime = Runtime()
```

On the surface, isn't this just wrapping `os.environ.get("VERCEL") == "1"` in another layer? Is that necessary?

Yes, it is.

Right now there are only two environments: local and Vercel. But what if later you need to deploy to AWS Lambda? Add a staging environment? Run in CI/CD?

If `os.environ.get("VERCEL")` is scattered everywhere, changing it becomes a nightmare. But with a `Runtime` class, all environment detection logic is caged in one place. Add a new environment? Change one file.

This is that principle in practice: **one place being complicated buys simplicity everywhere else.**

---

## From "My Machine" to "Any Machine"

There's a piece of code in `boto_ses.py` that perfectly demonstrates "environment awareness":

```python
if runtime.is_vercel():
    boto_ses = boto3.Session(
        region_name="us-east-1",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
else:
    boto_ses = boto3.Session(region_name="us-east-1")
```

When running locally, boto3 automatically looks for `~/.aws/credentials`. In the cloud, that file doesn't exist, so it must read from environment variables.

Same code, decides behavior based on "where it is." This isn't a hack — this is standard practice for professional software.

I used to think "environment variables" were some advanced concept. Now I understand they're essentially a bridge — connecting code to its running environment. Code doesn't need to know what the secrets are, it just needs to know "ask the environment." How the environment provides them is a deployment-time concern.

This decoupling gives code freedom. It's no longer bound to one specific machine, but can run anywhere.

---

## The Safety Net of Preview

First time touching production, I'd be lying if I said I wasn't nervous.

What if I misconfigure environment variables? What if buggy code takes down the whole app?

Luckily Vercel has Preview environments.

Every non-main branch pushed generates an independent Preview URL. Mess around on this URL all you want — break it, production isn't affected. Only when everything looks good and you merge to main does the official environment update.

This design gave me enormous peace of mind. I can experiment boldly because I know there's room to roll back. This is also how professional teams work — no one modifies code directly in production.

---

## Reflection

The real significance of this milestone isn't "deployment succeeded" — it's "proved the entire chain is viable."

From user clicking send → frontend sending request → backend processing → calling AWS Bedrock → returning AI response → rendering to interface. This entire chain now runs in the cloud.

More importantly, this project up to now has nearly zero technical debt.

- No "write it this way for now, fix later" TODOs
- No secrets hardcoded in the code
- No "works locally but breaks when deployed" landmines
- Testing, CI/CD, environment variables were standard from the start

This isn't the finish line — it's the starting line. Whatever features get added next are being added to a healthy foundation. No worrying about "touch one thing, break three things" because the architecture was designed for extension from the start.

---

## What's Next

First milestone complete. The app has a complete skeleton: frontend, backend, AI, testing, deployment.

There's plenty more to do next:

- Make the AI smarter (prompt engineering, context management)
- Make the interface prettier (UI/UX optimization)
- Make features richer (chat history, multi-turn conversation)
- Make the project more professional (custom domain, monitoring, logging)

But no matter what I do, I know one thing:

**Finishing code isn't delivery. Having it live in the cloud, being used by people — that's true delivery.**

From the empty repo in the first blog post to the complete app now, this journey took 13 steps. Each step wasn't big, but each step moved forward.

This is the true meaning of Think Big — not having to make something earth-shattering from the start, but **using big-project standards to do small things well, step by step**.
