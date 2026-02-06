# Teaching Guide - Setting Up Next.js + FastAPI Full-Stack Development

## Course Overview

This course teaches **full-stack web development** by having students set up and run a complete web application with:
- **Frontend**: Next.js with React (JavaScript/TypeScript)
- **Backend**: FastAPI with Python

The key insight: **Professional web applications need both frontend (what users see) and backend (data processing). Learning to manage both together is essential.**

Students learn that:
- Frontend and backend are separate but interdependent
- They communicate through APIs (HTTP requests/responses)
- Understanding both gives you power to build complete applications
- Professional teams coordinate multiple languages and frameworks

## Target Audience

- Students who completed Python fundamentals
- Learners ready to understand how real web applications work
- Anyone wanting to build full-stack projects
- Developers preparing to work with modern frameworks

## Learning Objectives

By the end of this course, students will:

1. **Understand full-stack architecture** - Know what frontend and backend do and how they interact
2. **Set up a development environment** - Manage multiple servers (Next.js + FastAPI) simultaneously
3. **Use APIs for communication** - Understand HTTP requests/responses and JSON data
4. **Read and explore code** - Navigate a real project structure with frontend and backend
5. **Develop with modern tools** - Use `mise`, Next.js dev server, and FastAPI
6. **Build complete applications** - Create both frontend pages and backend endpoints
7. **Gain professional skills** - Work confidently in multi-language, full-stack environments

## Prerequisite Knowledge

Students should already understand:
- Basic Python syntax and functions
- How to use a terminal/command line
- Basic understanding of the web (browsers, URLs, etc.)
- How to read code in different languages (doesn't need to be fluent)

## Key Concepts to Teach

### 1. Frontend vs. Backend: The Two Halves of a Web Application

**Frontend = User Interface**
- What users see in their browser
- Built with Next.js (React + JavaScript)
- Lives in the `app/` directory
- Examples: buttons, forms, text, images, animations

**Backend = Server Logic**
- Code that runs on a server
- Built with FastAPI (Python)
- Lives in the `api/` directory
- Examples: storing data, processing requests, validating information

**Why separate?**
- Different purposes need different tools
- Frontend needs to be fast in browsers (JavaScript)
- Backend can do heavy processing (Python)
- They can evolve independently
- Scalability (run many frontend servers, fewer backend servers)

**Teaching tip:** Use a restaurant analogy:
- Frontend = What customers see (menu, waiter, dining room)
- Backend = Kitchen (where food is prepared)
- Customer doesn't see the kitchen but depends on it
- Restaurant wouldn't work without either

### 2. Communication: How Frontend and Backend Talk

**The Request-Response Cycle**

```
1. User clicks button in frontend
2. Frontend sends HTTP request to backend: "Get data from /api/hello"
3. Backend receives request
4. Backend runs function: hello_world()
5. Backend sends response: {"message": "Hello!", "status": "success"}
6. Frontend receives response
7. Frontend updates page with data
8. User sees the result
```

**API = Contract**
- API = Agreement about what data backend provides
- Example: `/api/hello` = "This endpoint gives you a hello message"
- Frontend knows: "If I request /api/hello, I'll get back a message"
- Backend promises: "When you request /api/hello, I'll return this data"

**JSON = Data Format**
- Most APIs use JSON (JavaScript Object Notation)
- Easy to read and use in both JavaScript and Python
- Example: `{"message": "Hello", "status": "success"}`

**Teaching tip:** Use a postcard analogy:
- Frontend writes postcard: "Send me your hello message"
- Frontend addresses it: `/api/hello`
- Puts it in mailbox (sends HTTP request)
- Postman (HTTP) delivers to backend
- Backend reads request, writes response
- Postman brings response back
- Frontend reads response, updates page

### 3. Project Structure: Where Code Lives

**Key directories:**

| Directory | Purpose | Who uses it |
|-----------|---------|-------------|
| `app/` | Frontend pages and layouts | Frontend developer |
| `components/` | Reusable UI pieces | Frontend developer |
| `lib/` | Helper functions | Both (mostly frontend) |
| `api/` | Backend API endpoints | Backend developer |
| `public/` | Images, icons, static files | Frontend developer |
| `types/` | Data type definitions | Both |

**Teaching tip:** Show the structure visually:
```
Your Web Application
├── Frontend Code (app/, components/, lib/)
├── Backend Code (api/)
├── Configuration (package.json, pyproject.toml, etc.)
└── Static Files (public/)
```

### 4. mise: The Task Coordinator

**What is `mise`?**
- Tool that runs tasks (like "make" in C projects)
- Coordinates multiple servers
- Remembers which commands to run

**Key commands:**
- `mise run dev` - Start everything (frontend + backend)
- `mise run next-dev` - Start frontend only
- `mise run fastapi-dev` - Start backend only
- `mise run kill` - Stop all servers

**Why it matters:**
- Without it: "start frontend, start backend, remember 2 ports, remember 2 servers"
- With it: One command (`mise run dev`), everything starts
- Professional projects have many tasks; `mise` (or similar tools) manage them

**Teaching tip:** Compare to a conductor:
- Conductor doesn't play every instrument
- Conductor tells all musicians when to start, stop, go faster, slower
- `mise` tells frontend and backend when to start

### 5. URLs and Ports: Finding Your Application

**localhost = Your Computer**
- Browsers normally connect to websites online
- `localhost` means "connect to this computer"

**Ports = Different Services on Your Computer**
- Port 3000 = Frontend (Next.js)
- Port 8000 = Backend (FastAPI)
- Without ports, can't run multiple servers on same computer

**Full URLs:**
- `http://localhost:3000` = Frontend address
- `http://localhost:8000` = Backend address
- `http://localhost:8000/api/hello` = Specific backend endpoint

**Teaching tip:** Use apartment building analogy:
- localhost = apartment building
- port 3000 = apartment 3000 (frontend lives there)
- port 8000 = apartment 8000 (backend lives there)
- apartment 8000, room `/api/hello` = specific data

## Teaching Sequence

### Phase 1: Understanding Full-Stack Architecture (15 minutes)

**Goal:** Help students understand WHY frontend and backend exist separately

**Activities:**
1. Ask: "How does a website work?"
2. Show simple flow: User → Browser → Server → Browser → User
3. Explain: "Browser part = frontend, Server part = backend"
4. Show the project: "This app has both parts"
5. Navigate the directories: "Frontend here, backend here"
6. Show the configuration: "`mise` runs both"

**Success indicator:** Student can explain why frontend and backend are separate

### Phase 2: Setting Up the Environment (20 minutes)

**Goal:** Get both servers running

**Activities:**
1. `mise run venv-create` - Create Python environment
2. `source .venv/bin/activate` - Activate it
3. `mise run inst` - Install all dependencies
4. `mise run dev` - Start both servers

**Watch for:**
- Students might ask "Why does this take so long?" (installing packages)
- Some dependencies might fail (network issues usually)
- Make sure both server messages appear

**Success indicator:** Both servers start without errors

### Phase 3: Exploring the Code (15 minutes)

**Goal:** Get comfortable reading the code

**Activities:**
1. Open `app/(marketing)/page.tsx` - "This is the homepage"
2. Scroll through it - "Don't need to understand everything, just see it's code"
3. Open `api/index.py` - "This is the backend"
4. Find the `@app.get("/api/hello")` function
5. Explain: "This function provides data to the frontend"

**Key points to emphasize:**
- Frontend code uses JavaScript/React (different syntax from Python)
- Backend code uses Python (familiar to them)
- Both do similar things (functions, logic) just different languages
- None of this is scary—it's just code

**Success indicator:** Student can find frontend and backend files

### Phase 4: Using Your Application (10 minutes)

**Goal:** See the application actually running

**Activities:**
1. Open browser, go to `localhost:3000`
2. "This page is being served by Next.js"
3. Refresh page (see it still works)
4. Open browser console (F12)
5. Explain what they're seeing

**What to highlight:**
- "The page loaded = frontend is working"
- "No errors in console = everything is connected"
- "Next.js is watching your files = changes auto-update"

**Success indicator:** Page loads, student sees it working

### Phase 5: Understanding API Communication (15 minutes)

**Goal:** See how frontend and backend talk

**Activities:**

1. **In browser console, run:**
```javascript
fetch('http://localhost:8000/api/hello')
  .then(r => r.json())
  .then(d => console.log(d))
```

2. **Result:**
```
{message: "Hello from FastAPI!", status: "success"}
```

3. **Explain the flow:**
   - You asked: "Give me data from /api/hello"
   - Backend responded: "Here it is"
   - Frontend got the data

4. **Point out the code:**
   - Show `api/index.py` function
   - Show that it returns exactly what the console showed

**Key insight:** This is how all web apps work. Frontend requests data, backend provides it.

**Success indicator:** Student understands the request-response cycle

### Phase 6: Making a Change (10 minutes)

**Goal:** See live development workflow

**Activities:**
1. Edit `app/(marketing)/page.tsx` - Change some text
2. **Don't refresh!** Just watch the page
3. After a few seconds, page updates automatically
4. Explain: "This is hot reloading—Next.js rebuilds and updates"

**Why this matters:**
- Feedback loop is instant
- Can see changes immediately
- Makes development fast

**Success indicator:** Student sees code change reflected in browser

### Phase 7: Stopping and Restarting (5 minutes)

**Goal:** Learn to manage the servers

**Activities:**
1. In terminal: Press `Ctrl+C` to stop servers
2. "Both servers stopped"
3. Run `mise run dev` again
4. "Everything starts fresh"
5. Mention: `mise run kill` if servers get stuck

**Why important:**
- Can't have duplicate servers running
- Sometimes need clean restart
- Professional skill

**Success indicator:** Can stop and start servers at will

### Phase 8: Directory Deep-Dive (10 minutes)

**Goal:** Understand project organization

**Activities:**
1. Show `app/` - "All pages and UI"
2. Show `components/` - "Reusable UI pieces"
3. Show `api/` - "All backend endpoints"
4. Show `lib/` - "Helper functions"
5. Show `public/` - "Images and static files"

**Key insight:** Code is organized by purpose, not by language

**Success indicator:** Student can explain what each directory contains

### Phase 9: Package.json and Dependencies (10 minutes)

**Goal:** Understand what packages are installed

**Activities:**
1. Open `package.json`
2. Show dependencies - "All the packages the frontend uses"
3. Open `package.json.md` - "Explanation of each package"
4. Explain: "You don't need to memorize these, just know they exist"
5. Point out key ones: `next`, `react`, `tailwindcss`

**Teaching tip:** "It's like Python's `pyproject.toml` but for JavaScript"

**Success indicator:** Student knows where to find dependency information

### Phase 10: Building on Your Knowledge (20 minutes)

**Goal:** Have students explore independently

**Activities:**
1. "Browse the code and pick one thing you want to understand"
2. Could be:
   - A page in `app/`
   - The `/api/hello` endpoint
   - A component in `components/`
   - Configuration in `tsconfig.json`
3. Have them read it and explain what they think it does
4. Discuss as a group

**Why:** Builds confidence in reading code they didn't write

**Success indicator:** Student can read and explain some code

## Teaching Strategies

### Strategy 1: Show Both Frontend and Backend for Everything

When explaining a concept, show it in both languages:

**Example - Function:**
```python
# Backend (Python)
@app.get("/api/hello")
async def hello_world():
    return {"message": "Hello!"}
```

vs.

```javascript
// Frontend (JavaScript)
async function getHello() {
  const response = await fetch('/api/hello')
  return await response.json()
}
```

Same concept (function that does something), different syntax.

### Strategy 2: Use Analogies

- Frontend/Backend = Restaurant (waiters/kitchen)
- localhost/ports = Apartment building addresses
- API = Postcard system
- HTTP = Postal system
- JSON = Postcard format
- `mise` = Conductor

Good analogies stick better than technical explanations.

### Strategy 3: Emphasize "It's Running on YOUR Computer"

"This isn't on the internet. Both servers are running on your laptop right now. You can see them in your terminal. You can kill them with Ctrl+C. You own this completely."

This makes it feel real, not abstract.

### Strategy 4: Focus on One Thing at a Time

Don't try to teach TypeScript, React, FastAPI decorators, HTTP, JSON, and project structure all at once.

Order: Architecture → Running → Communication → Exploring code

### Strategy 5: Use the Browser as Teaching Tool

Everything students need to see is in the browser:
- Frontend runs there
- Can test APIs there
- Can see code changes live
- Developer console shows errors

### Strategy 6: Celebrate What's Already Done

"Look at this application. The CSS, the layout, the database connections, the API endpoints—someone already did all this. Your job isn't to build it from scratch. Your job is to understand how the pieces fit together and be able to modify them."

This is realistic and encouraging.

## Common Student Misconceptions

### Misconception 1: "I Need to Learn JavaScript Fully Now"

**Reality:** They need to understand enough JavaScript to read frontend code and make basic changes. Full mastery comes later.

**How to address:**
- "You already know programming. JavaScript is just another language with different syntax."
- "Look at Python function vs. JavaScript function. Same idea, different keywords."
- "You can look up syntax you don't recognize. That's what professionals do."

### Misconception 2: "This is Too Complicated"

**Reality:** It's only complicated if you try to understand everything at once. Take it piece by piece.

**How to address:**
- Break it into chunks (frontend works, backend works, communication works)
- Celebrate each small win
- "You've already understood the hard part (the architecture). Code is just details."

### Misconception 3: "Frontend and Backend are Always This Complicated"

**Reality:** This project has a lot of scaffolding and UI components. Basic frontend-backend applications are much simpler.

**How to address:**
- "This app has a lot of extra features. A minimal full-stack app is just: pages + API endpoints."
- "Once you understand this, simpler projects will be obvious."

### Misconception 4: "I Can't Change Any Code Because I Don't Understand All of It"

**Reality:** Professionals change code they don't fully understand all the time. Understanding the principle (not the details) is enough.

**How to address:**
- "Change some text in a page. You don't need to understand the whole file."
- "Add a new API endpoint. You can copy the existing one and modify it."
- "Don't be afraid to try things. The worst that happens is an error, which tells you what went wrong."

## Assessment Ideas

### Quick Checks (During Course)

**Architecture understanding:**
- Can student explain what frontend does vs. what backend does?
- Can student describe how they communicate?

**Technical skills:**
- Can student start/stop servers?
- Can student find frontend vs. backend code?
- Can student change some code and see the result?

**Exploration:**
- Can student find a specific file in the project?
- Can student read code (even if not understanding all the syntax)?
- Can student use browser developer tools?

### Challenges

**After module:**
- **Edit the homepage** - Change some text on the frontend
- **Call an API** - Use fetch in console to call the backend
- **Navigate code** - Find the `@app.get("/api/hello")` function
- **Stop and restart** - Kill servers, restart fresh

### Stretch Goals

For advanced students:
- **Add a new API endpoint** - Copy `/api/hello`, modify it, test it
- **Create a new page** - Add a new file to `app/`
- **Connect them** - Have frontend page call new backend endpoint
- **Use `package.json.md`** - Research what a specific package does
- **Modify styling** - Change colors in `globals.css`

## Common Student Errors & Solutions

### Error 1: "Port Already in Use"

**Cause:** Server already running or not cleaned up properly

**Solution:** `mise run kill` then `mise run dev`

### Error 2: "Connection Refused"

**Cause:** Forgot to start servers, or servers crashed

**Solution:** Check terminal, ensure `mise run dev` is running

### Error 3: "I Changed the Code but It Didn't Update"

**Cause:** Browser cache, or dev server didn't recompile

**Solution:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R), check terminal for errors

### Error 4: "I'm Confused About What's Frontend vs. Backend"

**Cause:** Lots of directories and files

**Solution:** Simplify: "Files in `app/` = frontend. Files in `api/` = backend. Everything else = support."

### Error 5: "The API Call in Console Didn't Work"

**Cause:** Syntax error, or backend not running

**Solution:** Check backend messages in terminal. Copy-paste the example command from TICKET.md.

## Expected Time Investment

### Total Course Time

- Phase 1 (Understanding): 15 minutes
- Phase 2 (Setup): 20 minutes
- Phase 3 (Code exploration): 15 minutes
- Phase 4 (Using the app): 10 minutes
- Phase 5 (API communication): 15 minutes
- Phase 6 (Making changes): 10 minutes
- Phase 7 (Managing servers): 5 minutes
- Phase 8 (Directory structure): 10 minutes
- Phase 9 (Dependencies): 10 minutes
- Phase 10 (Independent exploration): 20 minutes

**Total: ~130 minutes** (a little over 2 hours)

### After First Pass

- Modifying the backend: 15-30 minutes
- Creating a new frontend page: 15-30 minutes
- Understanding a specific concept deeply: variable

## Key Takeaway for Students

**"Full-stack means you understand both halves. Frontend makes it beautiful, backend makes it powerful. Together, they make a complete application. You can now build both."**

This is the moment when students realize: "I'm not just a Python developer or JavaScript developer. I'm a web application developer."

## References for Instructors

### Next.js / React / Frontend
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### FastAPI / Backend
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python async Documentation](https://docs.python.org/3/library/asyncio.html)

### Full-Stack Concepts
- [HTTP Protocol Basics](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [JSON Format](https://www.json.org/)
- [REST API Principles](https://restfulapi.net/)

### Tools
- [mise Documentation](https://mise.jdx.dev/)
- [Docker (for containerization)](https://www.docker.com/)
- [Git for version control](https://git-scm.com/)

## Closing Thoughts

This course is about more than setup. It's about realizing:

1. **Web applications have structure** - Frontend and backend are distinct, coordinated parts
2. **Communication is the key** - Everything depends on frontend-backend communication via APIs
3. **Professional development is organized** - Directories, tools (`mise`), configuration files all serve a purpose
4. **You can now build real things** - Not just scripts or toy projects, but web applications people can use

Students who complete this course understand full-stack development. They can read code in different languages, understand how they communicate, and start building applications that do real things.

That's the power of full-stack development. And that's what you're teaching.

Good luck! 🚀
