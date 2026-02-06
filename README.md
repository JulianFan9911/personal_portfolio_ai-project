# Setting Up Next.js + Python FastAPI Development Environment

## Your Project Has Evolved!

Remember when you were working on a simple backend? Things are now more exciting—**your project now has both frontend and backend code**—a full-stack application!

Here's why this matters: Real-world companies don't separate frontend and backend teams arbitrarily. They build integrated applications where frontend (what users see) and backend (the server logic) work together seamlessly. Learning to develop in this full-stack environment is a critical professional skill.

This tutorial will guide you through setting up your Next.js frontend and FastAPI backend development environment, and getting a complete web application running locally.

---

## What You Should Already Know

You've completed the Python fundamentals course, so you understand:
- How to write Python code
- How to manage dependencies
- How to work with project configuration files

Now the question is: **How does a web application actually work?**

The simple answer: **A frontend (what you see) talks to a backend (what processes data), and they communicate through APIs.**

---

## Step 1: Understanding Your New Project Structure

### Before: Backend Only

```
project/
├── api/                         ← Python FastAPI backend
├── tests_python/                ← Python tests
├── pyproject.toml               ← Python config
└── mise.toml                    ← Task config
```

Simple—just backend logic.

### Now: Full-Stack (Frontend + Backend)

```
project/
├── app/                         ← NEW: Next.js frontend code
│   ├── (marketing)/               (pages and layouts)
│   ├── _components/               (reusable UI components)
│   ├── layout.tsx                 (main page structure)
│   └── globals.css                (styling)
│
├── components/                  ← Additional UI component library
├── lib/                         ← Utility functions
├── public/                      ← Static files (images, icons)
├── styles/                      ← Additional styling
├── types/                       ← TypeScript type definitions
│
├── api/                         ← Python FastAPI backend (unchanged)
│   └── index.py                   (main backend code)
│
├── tests_python/                ← Python tests
│
├── package.json                 ← NEW: Frontend dependencies
├── next.config.js               ← Next.js configuration
├── tsconfig.json                ← TypeScript configuration
├── tailwind.config.ts           ← CSS framework configuration
├── postcss.config.mjs           ← CSS processor configuration
│
├── pyproject.toml               ← Python config
├── mise.toml                    ← Updated: runs frontend + backend
│
└── requirements.txt             ← Python dependencies (auto-generated)
```

**What's different:**

1. **New `app/` directory** - This is the Next.js frontend code. Every page, component, and style for the user-facing website lives here.

2. **Configuration files for frontend** - `package.json`, `tsconfig.json`, `tailwind.config.ts`, etc. These help the frontend build and style correctly.

3. **Static files in `public/`** - Images, icons, and other files the frontend needs to display.

4. **Backend stays in `api/`** - Your Python FastAPI code is here, unchanged.

---

## Step 2: What Are Next.js and FastAPI?

### Next.js: Modern Frontend Framework

Next.js is a framework for building web pages using React and JavaScript. Think of it as:
- **Frontend = what users see in their browser**
- **Next.js = tools to build that frontend quickly**

**What Next.js does:**
- Lets you create web pages with modern JavaScript/React
- Handles routing (which page shows at which URL)
- Manages styling (makes your website look good)
- Connects to backend APIs (gets data from your server)

### FastAPI: Python Backend Framework

FastAPI is a framework for building server applications with Python. Think of it as:
- **Backend = logic that processes requests and returns data**
- **FastAPI = tools to build that backend quickly**

**What FastAPI does:**
- Receives requests from your frontend
- Processes the request (finds data, does calculations, etc.)
- Sends back responses (usually as JSON data)
- Automatically documents your API endpoints

### How They Work Together

```
User opens browser (localhost:3000)
          ↓
Next.js frontend loads and displays a page
          ↓
User clicks a button or submits a form
          ↓
Frontend sends a request to backend (http://localhost:8000/api/hello)
          ↓
FastAPI backend receives and processes the request
          ↓
Backend sends back response: {"message": "Hello!", "status": "success"}
          ↓
Frontend receives data and updates what's shown on the page
```

This request-response cycle is how modern web applications work.

---

## Step 3: Your New Commands

You now have both frontend and backend servers running. `mise` helps you manage both.

### Important New Commands

#### 🚀 `mise run dev` - Start Everything

```toml
[tasks.dev]
description = "🚀 Start all development servers (Next.js + FastAPI)"
depends = ["kill"]
run = "pnpm exec concurrently 'mise run next-dev' 'mise run fastapi-dev'"
```

This command:
1. Stops any old servers (the `kill` task)
2. Starts Next.js frontend on `localhost:3000`
3. Starts FastAPI backend on `localhost:8000`
4. Runs both simultaneously

#### 🛑 `mise run kill` - Stop All Servers

```toml
[tasks.kill]
description = "🛑 Kill all development servers (Next.js + FastAPI)"
run = "uv run -- python kill-dev-servers.py"
```

Sometimes a server "hangs" in the background. This cleanly stops everything so you can restart fresh.

---

## Step 4: Understanding `package.json` Dependencies

Open `package.json` and you'll see many dependencies:

```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "^18",
    "react-dom": "^18",
    "@radix-ui/react-*": "...",
    "tailwindcss": "^3.4.17",
    "ai": "^6.0.72",
    ...more...
  }
}
```

**What these packages do:**
- `next` - The Next.js framework itself
- `react` and `react-dom` - Library for building interactive UIs
- `@radix-ui/*` - Pre-built, accessible UI components
- `tailwindcss` - Utility-first CSS framework for styling
- `ai` - Vercel AI SDK for AI integrations
- Many others...

**Do you need to understand each one?** Not yet! These are dependencies—your application uses them, but you don't need to master each one immediately.

> 💡 **Want to understand each dependency?**
>
> See `package.json.md` for detailed explanations of what each package does. If something is confusing, you can ask AI to help explain it!

---

## Step 5: Setting Up Your Development Environment

Follow these steps in order:

### 1️⃣ Create Python Virtual Environment

```bash
mise run venv-create
```

This creates a `.venv/` folder—an isolated environment where Python installs packages without affecting other projects on your computer.

### 2️⃣ Activate Python Virtual Environment

```bash
source .venv/bin/activate
```

This tells your terminal: "Use the Python from `.venv/` from now on."

You'll see `(.venv)` appear in your terminal prompt:

```
(.venv) your-computer:project $
```

### 3️⃣ Install All Dependencies

```bash
mise run inst
```

This installs:
- All Python packages (FastAPI, uvicorn, etc.) into `.venv/`
- All JavaScript/Node.js packages (Next.js, React, etc.) into `node_modules/`

This may take 1-2 minutes. Be patient!

### 4️⃣ Start the Development Servers

```bash
mise run dev
```

You'll see output like:

```
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Both servers are now running! 🎉

### 5️⃣ Open Your Browser

Open your browser and go to:

```
http://localhost:3000
```

You should see your web application running!

See the example screenshot:

![Example Web App](img/01-example-hello-world-web-app.png)

---

## Step 6: How Frontend and Backend Communicate

Now that both are running, let's understand how they talk to each other.

### Backend: FastAPI API Endpoint

In `api/index.py`:

```python
@app.get("/api/hello")
async def hello_world():
    """
    Hello World API endpoint for testing FastAPI integration
    """
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )
```

This creates an API endpoint:
- **URL:** `http://localhost:8000/api/hello`
- **What it does:** Returns a JSON response with a message

### Frontend: Calling the API

In your Next.js frontend code, you might see something like:

```javascript
// Call the backend API
const response = await fetch('http://localhost:8000/api/hello')
const data = await response.json()
console.log(data.message)  // Output: "Hello from FastAPI!"
```

**The flow:**
1. Frontend makes a request: "Give me data from `/api/hello`"
2. Backend receives it, runs the function
3. Backend sends back: `{"message": "Hello from FastAPI!", "status": "success"}`
4. Frontend gets the data and can display it on the page

This is a **complete request-response cycle**—the foundation of web applications!

---

## Step 7: Project Directory Explained

### `app/` - Frontend Pages and Components

```
app/
├── (marketing)/          ← Pages for the marketing site
│   ├── page.tsx          ← Home page
│   ├── layout.tsx        ← Layout for marketing pages
│   └── ...
├── _components/          ← Reusable components
├── layout.tsx            ← Main page layout
└── globals.css           ← Global styles
```

Every page users see comes from code in `app/`.

### `api/` - Backend Logic

```
api/
└── index.py              ← FastAPI main file
```

All your backend API endpoints are in `api/index.py`. When the frontend calls an API, it's calling functions here.

### `components/` - UI Component Library

Reusable UI components like buttons, dialogs, forms, etc. You use these in `app/` to build pages.

### `lib/` - Utility Functions

Helper functions that don't fit elsewhere. Examples:
- Format dates
- Generate SEO metadata
- Common utilities

### `public/` - Static Files

Images, icons, fonts, and other files the frontend needs.

### `types/` - TypeScript Types

TypeScript definitions that describe data structure. Makes your code safer by catching errors.

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Frontend dependencies and scripts (like Python's `pyproject.toml`) |
| `tsconfig.json` | TypeScript configuration (ensures type safety) |
| `tailwind.config.ts` | Tailwind CSS configuration (for styling) |
| `next.config.js` | Next.js configuration |
| `postcss.config.mjs` | CSS processing configuration |
| `pnpm-lock.yaml` | Locks exact versions of dependencies (don't edit manually) |

---

## Step 8: Troubleshooting

| Problem | Solution |
|---------|----------|
| `command not found: mise` | Install mise: `curl https://mise.jdx.dev \| sh` |
| Browser shows "Connection refused" at localhost:3000 | Ensure `mise run dev` is still running. Check terminal for errors. |
| Backend reports "Port already in use" | Run `mise run kill` to stop old servers, then `mise run dev` again |
| Browser shows page but nothing loads | Check browser console (F12) for errors. Check terminal for backend errors. |
| `Cannot find module` or import errors | Run `mise run inst` again to install missing dependencies |
| `.venv` folder doesn't exist | Run `mise run venv-create` |
| `node_modules` folder doesn't exist | Run `mise run inst` |
| Changed code but changes don't appear | Refresh browser (Ctrl+R or Cmd+R). Check if dev server restarted. |

---

## Step 9: Next Steps

Now that you have a running full-stack application:

1. **Explore the Code**
   - Look at `app/` to see how pages are built
   - Look at `api/index.py` to see how backend works
   - Try changing some text or colors and see the live update

2. **Create New API Endpoints**
   - Add new `@app.get()` or `@app.post()` functions in `api/index.py`
   - Build new backend features

3. **Create New Pages**
   - Add new files to `app/`
   - Call backend APIs to fetch data
   - Display the data on your pages

4. **Learn More**
   - Deep-dive into React and Next.js concepts
   - Learn advanced FastAPI features
   - Connect to databases, add authentication, etc.

---

## Quick Reference: Common Commands

```bash
# Install dependencies (first time)
mise run inst

# Start frontend + backend
mise run dev

# Stop all servers
mise run kill

# Run only frontend
mise run next-dev

# Run only backend
mise run fastapi-dev

# Stop and start fresh
mise run kill && mise run dev
```

---

## Key Concepts

- ✅ **Frontend** = What users see in their browser (Next.js)
- ✅ **Backend** = Server logic that processes requests (FastAPI)
- ✅ **API** = Contract between frontend and backend ("Here's what data I can give you")
- ✅ **localhost:3000** = Your frontend server
- ✅ **localhost:8000** = Your backend server
- ✅ **Request-Response** = Frontend asks backend for data, backend sends it back
- ✅ **Full-Stack** = Having both frontend and backend in one project

---

## Congratulations! 🎉

You've now:

- ✅ Understood full-stack web application architecture
- ✅ Set up a Next.js frontend development environment
- ✅ Set up a FastAPI backend development environment
- ✅ Started both servers simultaneously
- ✅ Seen a complete web application running locally
- ✅ Learned how frontend and backend communicate

You're now a **full-stack developer**! You can build complete web applications with frontend and backend code.

---

## Summary

A modern web application has two parts:
- **Frontend** (Next.js) - Shows the user interface
- **Backend** (FastAPI) - Provides data and logic

They communicate through APIs:
- Frontend makes requests: "I need this data"
- Backend responds: "Here's the data"

`mise` coordinates running both so you can develop the entire application seamlessly. When you run `mise run dev`, both servers start, and you have a complete working application.

This is how professional web applications are built.

Welcome to full-stack development! 🚀

---

## Troubleshooting Guide

**If something isn't working:**

1. **Check the error message** - Read the terminal output carefully
2. **Verify both servers are running** - Look for "localhost:3000" and "localhost:8000" messages
3. **Restart everything** - Run `mise run kill` then `mise run dev`
4. **Reinstall if needed** - Run `mise run inst` to ensure all packages are installed
5. **Check the browser console** - Open Developer Tools (F12) and look at Console tab

Most issues are solved by one of these steps!

---

Ready to build something amazing? Let's go! 💪
