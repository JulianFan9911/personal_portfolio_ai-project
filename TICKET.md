# Task Card: Setting Up Next.js + FastAPI Full-Stack Development Environment

## Prerequisites

Ensure you have `mise` installed and your environment ready:
- `mise run venv-create` - Create Python virtual environment
- `source .venv/bin/activate` - Activate Python environment
- `mise run inst` - Install all dependencies

---

## Overview

You will set up and run a complete **full-stack web application** with:
- **Frontend**: Next.js with React (running on `localhost:3000`)
- **Backend**: FastAPI with Python (running on `localhost:8000`)

This task card guides you through understanding the full-stack architecture, starting both servers, and seeing how frontend and backend communicate.

---

## Part 1: Understanding Full-Stack Architecture (10 minutes)

### Task 1.1: Examine the Project Structure

**Objective**: Understand what frontend and backend code looks like

1. Open and read the project structure:
   - List `app/` directory (frontend code): `ls app/`
   - List `api/` directory (backend code): `ls api/`

2. Open `app/(marketing)/page.tsx` in your editor
   - This is a React/Next.js page component
   - It's the home page users will see

3. Open `api/index.py` in your editor
   - This is the FastAPI backend
   - Look for the `@app.get("/api/hello")` endpoint
   - This is the backend providing data

**What to notice:**
- Frontend code (in `app/`) uses TypeScript/React syntax
- Backend code (in `api/`) uses Python and FastAPI decorators
- They're completely separate but work together

**Checklist:**
- [ ] Located and read `app/(marketing)/page.tsx`
- [ ] Located and read `api/index.py`
- [ ] Can identify what each part does (frontend vs. backend)

### Task 1.2: Understand the Configuration

**Objective**: Know how the project is configured to run both servers

1. Open `mise.toml` and find these sections:

```toml
[tasks.next-dev]
description = "🌐 Start Next.js development server"
run = "next dev"

[tasks.fastapi-dev]
description = "⚙️ Start FastAPI development server"
run = "uv run -- python -m uvicorn api.index:app --reload --host 127.0.0.1 --port 8000"

[tasks.dev]
description = "🚀 Start all development servers (Next.js + FastAPI)"
depends = ["kill"]
run = "pnpm exec concurrently 'mise run next-dev' 'mise run fastapi-dev'"
```

2. Understand what each does:
   - `next-dev` - Starts frontend only
   - `fastapi-dev` - Starts backend only
   - `dev` - Starts both at the same time

**Key insight**: `mise` is the conductor! It runs multiple servers in parallel.

**Checklist:**
- [ ] Found all three tasks in `mise.toml`
- [ ] Understand that `dev` runs both `next-dev` and `fastapi-dev`
- [ ] Know the URLs: frontend at 3000, backend at 8000

### Task 1.3: Review package.json

**Objective**: Know what frontend dependencies are installed

1. Open `package.json` and look at dependencies
2. Don't memorize them—just see that there are many
3. Note: `package.json.md` exists with full explanations

**Understanding dependencies:**
- `next` and `react` - Framework and library for frontend
- `@radix-ui/*` - UI components library
- `tailwindcss` - Styling framework
- Many others providing specific features

**Checklist:**
- [ ] Opened `package.json`
- [ ] Saw the dependencies list
- [ ] Know that `package.json.md` explains each one

---

## Part 2: Starting the Development Environment (10 minutes)

### Task 2.1: Install Dependencies (First Time Only)

**Command:**
```bash
mise run inst
```

**What happens:**
- Installs Python packages (FastAPI, uvicorn, etc.) into `.venv/`
- Installs JavaScript packages (Next.js, React, etc.) into `node_modules/`

**Expected output:**
- No red errors at the end
- Should see messages about packages being downloaded
- May take 1-2 minutes

**Checklist:**
- [ ] Command completed without errors
- [ ] No red error messages in output

### Task 2.2: Start All Development Servers

**Command:**
```bash
mise run dev
```

**What happens:**
- Automatically runs `mise run kill` (stops any old servers)
- Starts Next.js frontend on `localhost:3000`
- Starts FastAPI backend on `localhost:8000`
- Both run simultaneously

**Expected output:**
```
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

**Important:**
- The terminal will keep running (it doesn't return to prompt)
- This is normal! Both servers are running
- Leave this terminal open

**Checklist:**
- [ ] Both server messages appear (Next.js and Uvicorn)
- [ ] No error messages
- [ ] Terminal is still running (showing active servers)

### Task 2.3: Open Browser and View Your Application

**In a NEW terminal window** (keep the dev server running):

1. Open your web browser (Chrome, Firefox, Safari, etc.)

2. Go to:
```
http://localhost:3000
```

3. You should see a web page loaded!

**What you're seeing:**
- A complete web application running on your computer
- The page is served by Next.js frontend (port 3000)
- The page can call the FastAPI backend (port 8000) for data

**Compare to the example:**
![Example Web App](img/01-example-hello-world-web-app.png)

**Checklist:**
- [ ] Opened browser to `localhost:3000`
- [ ] Web page loaded successfully
- [ ] No connection errors
- [ ] Page displays (doesn't matter what it looks like—it's running!)

---

## Part 3: Understanding Frontend-Backend Communication (10 minutes)

### Task 3.1: Examine the API Endpoint

**File:** `api/index.py`

**Find and read:**
```python
@app.get("/api/hello")
async def hello_world():
    """
    Hello World API endpoint - 用于测试 FastAPI 集成
    """
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )
```

**What this means:**
- `@app.get("/api/hello")` - Creates an endpoint at `/api/hello`
- The function returns JSON: a message and status
- When anyone visits `http://localhost:8000/api/hello`, this function runs

**Test it:**
1. Open new browser tab
2. Go to: `http://localhost:8000/api/hello`
3. You should see JSON response:
```json
{
  "message": "Hello from FastAPI!",
  "status": "success"
}
```

**Checklist:**
- [ ] Read the `@app.get("/api/hello")` function
- [ ] Understand it returns JSON data
- [ ] Tested the endpoint in browser (saw JSON response)

### Task 3.2: Understand How Frontend Calls Backend

**Concept:**
The frontend can make requests to the backend using the API endpoint.

**Example code** (you might see this in `app/` files):
```javascript
// Fetch data from backend API
const response = await fetch('http://localhost:8000/api/hello')
const data = await response.json()
console.log(data.message)  // "Hello from FastAPI!"
```

**Request-Response Flow:**
```
Frontend (localhost:3000)
       ↓ (request)
Backend receives: "Give me /api/hello"
       ↓ (backend processes)
Backend runs: hello_world() function
       ↓ (response)
Frontend receives: {"message": "Hello from FastAPI!", "status": "success"}
       ↓
Frontend updates the page with the data
```

**Key understanding:**
- Frontend asks backend for data using HTTP requests
- Backend processes and returns JSON
- Frontend displays the data to users

**Checklist:**
- [ ] Understand the request-response cycle
- [ ] Know that `/api/hello` is an endpoint for data
- [ ] Recognize that frontend and backend are separate but communicate

### Task 3.3: Look at Frontend Code

**Optional:** Look at one of the frontend files in `app/` directory

- You'll see TypeScript/React syntax (different from Python)
- You might see `fetch()` calls to the backend
- This is the user-facing code

**Don't worry about understanding all the syntax**—just see that:
- Frontend code looks different from backend code
- They're in separate places (`app/` vs `api/`)
- They communicate via APIs

**Checklist:**
- [ ] Opened at least one file in `app/` directory
- [ ] Recognized it's different from backend code

---

## Part 4: Explore and Experiment (15 minutes)

### Task 4.1: Change Frontend Code and See Live Update

**Objective:** See how Next.js development server auto-updates

1. Open `app/(marketing)/page.tsx` in your editor

2. Find some text in the file (like a heading or paragraph)

3. Change the text to something different

4. **Don't refresh!** Just look at your browser

5. The page should update automatically in a few seconds

**What's happening:**
- Next.js watches your files for changes
- When you save, it rebuilds the page
- Browser automatically reloads
- This is "hot module reloading" (HMR)—super useful for development!

**Checklist:**
- [ ] Changed some text in a frontend file
- [ ] Saved the file
- [ ] Saw the change appear in browser without manual refresh

### Task 4.2: Test the Full Stack Communication

**Objective:** Understand that frontend and backend are working together

1. In your browser, open Developer Tools (F12)

2. Go to Console tab

3. Run this command in the console:
```javascript
fetch('http://localhost:8000/api/hello')
  .then(r => r.json())
  .then(d => console.log(d))
```

4. You should see the JSON response printed:
```javascript
{message: 'Hello from FastAPI!', status: 'success'}
```

**What happened:**
- You called the backend API from the frontend console
- Backend processed the request
- Returned JSON data
- Frontend received and displayed it

**This proves frontend-backend communication works!**

**Checklist:**
- [ ] Opened Developer Tools (F12)
- [ ] Ran fetch command in console
- [ ] Saw JSON response from backend
- [ ] Confirmed communication is working

### Task 4.3: Examine the Directory Structure

**Objective:** Get familiar with where code lives

1. In your editor, explore these directories:
   - `app/` - All frontend pages and components
   - `api/` - Backend API endpoints (just `index.py`)
   - `components/` - Reusable UI components
   - `lib/` - Utility functions
   - `public/` - Static files (images, icons)

2. You don't need to read everything—just see what's there

3. Understand the organization:
   - Frontend code is in `app/` and `components/`
   - Backend code is in `api/`
   - Support files in `lib/`, `public/`, etc.

**Checklist:**
- [ ] Explored at least 3 directories
- [ ] Understand separation of frontend vs. backend code
- [ ] Know where to find things in the future

---

## Part 5: Stopping and Restarting (5 minutes)

### Task 5.1: Stop the Development Servers

**In the terminal running `mise run dev`:**

Press: `Ctrl+C`

**What happens:**
- Both servers (Next.js and FastAPI) stop
- Terminal returns to prompt
- Your browser might show "connection refused" when you try to reload

**Checklist:**
- [ ] Pressed Ctrl+C to stop servers
- [ ] Terminal returned to normal prompt

### Task 5.2: Restart Everything Fresh

**Command:**
```bash
mise run dev
```

**This will:**
1. Run `mise run kill` (extra cleanup)
2. Start both servers again
3. Frontend on `localhost:3000`
4. Backend on `localhost:8000`

**Checklist:**
- [ ] Both servers started successfully
- [ ] Can access `localhost:3000` in browser again

### Task 5.3: Know the Emergency Stop

**If servers get stuck:**

Open a new terminal and run:
```bash
mise run kill
```

**This cleanly stops everything.** Then restart with:
```bash
mise run dev
```

**Checklist:**
- [ ] Know how to use `mise run kill` if needed

---

## Part 6: Verification - It All Works! (5 minutes)

### Task 6.1: Final Checklist

Verify everything is working:

- [ ] `mise run dev` starts both servers without errors
- [ ] `localhost:3000` loads the frontend in browser
- [ ] `localhost:8000/api/hello` shows JSON response
- [ ] Frontend can call backend API (`fetch` in console)
- [ ] Changing frontend code auto-updates in browser
- [ ] `Ctrl+C` stops both servers
- [ ] `mise run dev` can restart everything

---

## Success Criteria

You've completed this task when:

- ✅ Both Next.js and FastAPI servers run successfully with `mise run dev`
- ✅ Frontend (localhost:3000) displays a web page
- ✅ Backend (localhost:8000/api/hello) returns JSON data
- ✅ You understand the project structure (frontend vs. backend)
- ✅ You understand how frontend and backend communicate via APIs
- ✅ You can start, stop, and restart the development environment

---

## Key Concepts You've Learned

### Frontend
- **What it is**: Code that runs in the browser and shows to users (HTML, CSS, JavaScript)
- **Where it lives**: `app/` directory
- **Framework**: Next.js with React
- **How to start**: `mise run next-dev` or `mise run dev`
- **URL**: `localhost:3000`

### Backend
- **What it is**: Server code that processes data and provides APIs
- **Where it lives**: `api/` directory
- **Framework**: FastAPI with Python
- **How to start**: `mise run fastapi-dev` or `mise run dev`
- **URL**: `localhost:8000`

### API
- **What it is**: Contract between frontend and backend ("Here's what data I provide")
- **Example**: `/api/hello` endpoint returns JSON
- **How it works**: Frontend sends HTTP request → Backend processes → Returns response

### Full-Stack Development
- **What it means**: Building both frontend and backend together
- **Why it matters**: You can create complete applications
- **How to manage**: Use `mise` to coordinate multiple servers

---

## Understanding the Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
│                  (localhost:3000)                         │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │          NEXT.JS FRONTEND (React)              │    │
│  │  ┌──────────────────────────────────────────┐   │    │
│  │  │ Pages (in app/)                          │   │    │
│  │  │ Components (in components/)              │   │    │
│  │  │ - Displays content to user                │   │    │
│  │  │ - Handles user interactions              │   │    │
│  │  │ - Calls backend API when needed          │   │    │
│  │  └──────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                         ↕ (HTTP)                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │       FASTAPI BACKEND (Python) (port 8000)     │    │
│  │  ┌──────────────────────────────────────────┐   │    │
│  │  │ API Endpoints (in api/index.py)          │   │    │
│  │  │ @app.get("/api/hello")                   │   │    │
│  │  │ - Receives requests from frontend        │   │    │
│  │  │ - Processes data                         │   │    │
│  │  │ - Returns JSON responses                 │   │    │
│  │  └──────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

Communication Flow:
1. User interacts with frontend
2. Frontend makes HTTP request: GET /api/hello
3. Backend receives request
4. Backend function (hello_world()) runs
5. Backend sends response: {"message": "...", "status": "..."}
6. Frontend receives data
7. Frontend displays data to user
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Connection refused" at localhost:3000 | Run `mise run dev` in terminal and wait for startup |
| Backend not responding | Ensure `mise run dev` is running, check for port 8000 message |
| Changes don't appear | Refresh browser (Ctrl+R). Next.js may still be compiling. |
| ".venv doesn't exist" | Run `mise run venv-create` |
| "node_modules doesn't exist" | Run `mise run inst` |
| "Port already in use" | Run `mise run kill`, then `mise run dev` |
| Servers won't stop | Force stop: Open new terminal, run `mise run kill` |

---

## Next Challenges

Once you've completed this:

1. **Modify the API**
   - Add a new endpoint in `api/index.py`
   - Test it in the browser
   - Call it from frontend code

2. **Create a New Frontend Page**
   - Add a new file in `app/`
   - Make it display something
   - Have it call the backend API

3. **Connect Frontend to Backend**
   - Call `/api/hello` from frontend code
   - Display the response on the page
   - Make it interactive

4. **Understand the Stack**
   - Read `package.json.md` to learn about dependencies
   - Explore how Next.js routing works
   - Learn how FastAPI decorators work

---

## Key Takeaway

**You've set up a professional full-stack development environment:**
- Frontend and backend running separately but together
- Hot-reloading for fast development
- Clear separation of concerns (frontend code vs. backend code)
- Communication via HTTP/JSON APIs

This is exactly how companies build web applications. You're now equipped to build complete applications from user interface to server logic!

---

## Need Help?

- Check the troubleshooting section above
- Look at `README.md` for detailed explanations
- Review `package.json.md` for dependency information
- Look at existing code in `app/` and `api/` for examples

Great job! You're now a full-stack developer! 🚀
