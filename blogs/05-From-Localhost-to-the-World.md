# From Localhost to the World

---

## The Half-Finished State

Local `mise run dev` works. Frontend and backend can communicate, tests are green.

By all accounts, I should feel accomplished. But honestly, this state is still far from "usable" — the code only exists on my computer. I'm the only person in the world who can access `localhost:3000`. Close the terminal, everything disappears.

This reminded me of something I wrote in the first blog post: **Code only has value when it's running and being used.**

When I wrote that, I thought "running" meant `mise run dev` starts successfully. Now I realize that's just the minimum bar. True "running" means deployed to the cloud, accessible by anyone, anytime, anywhere.

---

## Deployment Used to Be Hard

Deployment always seemed complicated to me.

Buy a server, configure a domain, deal with SSL certificates, mess with Nginx, set up firewalls, configure environment variables, handle process supervision... just listing it out gives me a headache. I've seen plenty of people's side projects die at this step — code was done, but deployment was too much hassle, so it just sat gathering dust locally.

But Vercel handles all of that.

The logic is simple: put your code on GitHub, and it turns it into a living website. Connect your account, select the repo, click Deploy, and it takes care of the rest. No need to buy a server, no need to configure Nginx, not even manual triggers needed — every time you push code, it automatically redeploys.

This is why I chose Vercel in the first post: **it reduces the deployment barrier to nearly zero.**

---

## The Three-Minute Wait

After clicking the Deploy button, the page starts scrolling through build logs.

Saying I wasn't nervous would be a lie. Sure, everything works locally, but who knows what could go wrong in the cloud? Different environment, different dependency versions, different configs... any small issue could fail the build.

Logs scroll line by line. Installing dependencies... Building application... Generating static pages...

Three minutes later, the status turns green: **Ready**.

I click the `.vercel.app` link. The page loads — not `localhost:3000`, but a real URL with a domain that anyone can access.

I pull out my phone, disconnect from WiFi, open the same link on 4G.

Page loads just the same.

---

## What "Deliver" Really Means

That's when I truly understood something.

Before this, no matter how elegantly the code was written, how well the architecture was designed, how thoroughly the tests covered things — as long as it was still sitting locally, it was just a half-finished product. **Writing code isn't delivery. Making it usable by others — that's delivery.**

This is also the moment when "Build in Public" truly landed.

In the first blog post, I said I wanted to "learn by doing and share the process publicly." But back then, the repo only had documentation, nothing that actually ran. Now it's different — there's a real URL, anyone who clicks it can see what I built. No matter how basic it is right now, at least it's alive.

From "I'm learning" to "I'm building" to "what I built is usable by others" — these are three completely different stages. Deployment is the door from stage two to stage three.

---

## The Feedback Loop Closes

There was an unexpected bonus: after deployment, the entire development feedback loop became more complete.

Before, the loop was: change code → test locally → see the result.

Now, the loop is: change code → push → Vercel auto-deploys → see the result in a real environment.

This means I can verify at any time whether "this change works in production." No waiting until the last moment to discover problems — every step is validated in the real environment. This is the value of CI/CD — it turns "deployment" from a big event into a routine operation.

Change one line of code, push, wait two minutes, new version is live. This rhythm makes development feel more under control.

---

## Reflection

Looking back at these five blog posts, there's a hidden thread:

- Post 1: Decided to start, but had nothing
- Post 2: Chose tools — the best ones, not the most familiar
- Post 3: Set up testing — established feedback loop when there was only Hello World
- Post 4: Cut code — carved out minimal runnable skeleton from a complex project
- Post 5: Deployed — made the code truly live in the cloud

The essence of this thread is: **the shortest path from idea to deliverable result.**

Not learning everything before starting, but learning by doing. Not perfecting features before deploying, but getting it online first, then iterating. Every step shrinks the distance between "idea" and "result."

Now this project finally has a URL anyone can access. It's basic — just a Hello World. But it's alive, it's in the cloud, it's a real starting point.

---

## What's Next

Successful deployment is just the beginning. There's still a lot to do:

- Add real functionality to this skeleton
- Learn how to configure environment variables (essential for real applications)
- Explore Vercel's Analytics and Logs
- Maybe bind a custom domain

But most importantly: every line of code I write from now on, I know it will eventually run in the cloud, seen by real users.

That feeling is completely different from playing around locally.
