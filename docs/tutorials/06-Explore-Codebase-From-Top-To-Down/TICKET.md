# Learn Personal Portfolio AI 06 - Task Card: Explore Codebase with Top-Down Learning

## Objective

Learn to navigate unfamiliar code by starting from what you can see (UI) and tracing back to the source code.

This exercise teaches **exploration skills**, not coding skills. You won't write any code. Instead, you'll build the ability to find code for any UI element you see—a skill that transfers to any codebase, any framework, any language.

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/06-Explore-Codebase-From-Top-To-Down/)

## Actionable Items

1. **Run the application locally**
   - Execute `mise run dev`
   - Open http://localhost:3000 in your browser

2. **Learn the three exploration techniques**
   - Text search: Search for visible strings in the codebase
   - DevTools: Inspect elements to find searchable attributes
   - AI assistance: Screenshot and ask when other methods fail

3. **Find the source code for each UI element**
   - "Home" navigation link
   - Profile picture (avatar)
   - "John Doe" name and "AI Engineer" title
   - "About Me" heading and Lorem Ipsum text
   - "Test API Hello Endpoint" button
   - API endpoint that returns the response

4. **Trace the import chain**
   - For each element, understand HOW it gets loaded onto the page
   - Follow imports from component → parent → page entry point

**Estimated time:** 50-60 minutes

## Checklist

- [ ] **"Home" link located** - Know which file defines the navigation and how it's loaded
- [ ] **Profile image located** - Know which file contains the `<Image>` component and the import chain
- [ ] **Name and title located** - Know where "John Doe" and "AI Engineer" are defined
- [ ] **About Me section located** - Know which component contains the heading and Lorem Ipsum text
- [ ] **API button located** - Know which file has the button AND the `handleApiCall` function
- [ ] **API endpoint located** - Know where the FastAPI `/api/hello` endpoint is defined AND how Next.js routes to it
- [ ] **Import chain understood** - Can explain how Hero.tsx gets rendered on the page (the full chain)

---

## Submission & Verification

When you're done:

1. Run `/teach-check` to verify your work against the checklist

2. The instructor will ask you to find specific elements to verify your exploration skills

3. Say "ship it" when complete to generate RESULT.md

4. Share the RESULT.md file GitHub link with your instructor

---

## Grading Rubric

> **For instructors and /teach-check assistant** — Students may skip this section.

**Assessment method:** Ask the student questions. They should be able to answer within 1-2 minutes by searching/finding.

- **"Home" navigation link:**
  - Q: "Which file defines the 'Home' link?"
  - A: `app/_components/layouts/Navigation.tsx` - the `DEFAULT_NAV_ITEMS` array

- **Profile image:**
  - Q: "Which file contains the profile picture? How did you find it?"
  - A: `app/(marketing)/_components/Hero.tsx` - found via DevTools (src="/images/profile.png") or searching "profile.png"

- **Name and title:**
  - Q: "Where is 'John Doe' defined?"
  - A: `app/(marketing)/_components/Hero.tsx` - found via text search

- **About Me section:**
  - Q: "Which component has the About Me heading?"
  - A: `app/(marketing)/_components/Hero.tsx` - it contains both left (profile) and right (about) columns

- **API button:**
  - Q: "What function is called when you click the Test API button? What endpoint does it call?"
  - A: `handleApiCall` function in `Hero.tsx`, calls `/api/hello`

- **API endpoint:**
  - Q: "Where is the /api/hello endpoint defined? How does Next.js know to forward it to FastAPI?"
  - A: `api/index.py` defines the endpoint. `next.config.js` has rewrites that forward `/api/*` to FastAPI on port 8000

- **Import chain:**
  - Q: "Trace how Hero.tsx ends up on the page."
  - A: `Hero.tsx` → imported by `HomePageContent.tsx` → imported by `page.tsx` in `(marketing)` → wrapped by `layout.tsx` which adds Navigation → rendered when visiting `/`

**Technique verification:**
- Ask: "If you saw a loading spinner with no text, how would you find its code?"
- Expected: "Use DevTools to inspect and find class names or other attributes to search for"

**Mindset verification:**
- Ask: "If you joined a new project tomorrow, what would you do first?"
- Expected: Something like "Run it, look at the UI, pick an element and trace it to the code"
