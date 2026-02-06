# Integrate Hardcoded AI Chat Interaction

> Learn the core concept of frontend-backend separation and implement a simplified AI chat feature.

## Overview

Congratulations on making it this far! If the previous lessons were about building foundations and getting familiar with tools, today we're entering the most exciting part of this project—making your portfolio website "come alive" by enabling conversations with visitors.

On the surface, today's lesson is about adding a chat interface. But underneath, you'll encounter an extremely important architectural concept—**frontend-backend separation**. This concept may seem simple, but the philosophy of "separating data from logic" behind it runs through the entire tech industry. Once you understand this, your perspective on any complex system will fundamentally change.

## Learning Objectives

When you join a new team or start working on a new project, you'll find that modern web applications almost universally adopt frontend-backend separation architecture. Understanding this architecture not only helps you onboard faster to new projects, but more importantly, the "data vs logic separation" thinking behind it is a universal system design capability that will benefit you no matter what direction you take in your career.

By the end of this exercise, you will:

1. **Deeply understand the essence of frontend-backend separation**—not just the division of responsibilities between frontend and backend, but mastering the universally applicable mindset of "separating data from logic"
2. **Locate and understand key chat interface code**—learn to quickly find the components and functions you need in a complex project
3. **Practice modifying and testing hardcoded conversations**—experience the complete frontend-backend communication flow; although the AI is "fake" for now, the data flow is real
4. **Get a high-level understanding of AI SDK's Stream Protocol**—understand how frontend and backend agree on interfaces for communication (we'll dive deep in the next tutorial)

## Prerequisites

- You have completed the previous tutorials and can successfully run `mise run dev`
- You have a browser and can access http://localhost:3000
- You have an AI assistant available (Claude, ChatGPT, etc.)

## What You'll Build

You will integrate a chat interface into the existing portfolio project. Although this version's AI responses are hardcoded, the entire frontend-backend communication flow is real:

- User enters a message in the frontend
- Frontend sends a request to the backend via API
- Backend processes the request and returns a streaming response
- Frontend receives and displays the response

This lays the foundation for integrating real AI models (like AWS Bedrock) in the next step.

---

## Key Concepts

### Frontend-Backend Separation: More Than Just Technology Choice

You've probably heard the term "frontend-backend separation" countless times. Search online and you'll see various technical implementations: some say use Node.js for backend, others say use React for frontend, and still others say full-stack frameworks like Next.js have "merged" frontend and backend again... These discussions can make you lose sight of the most fundamental question: **Why do we need frontend-backend separation?**

The answer is actually very simple, yet extremely profound: **Data and logic should be separated.**

### What is Data? What is Logic?

Let's start with the simplest example to understand this concept.

Imagine you want to display your project experience on your portfolio. Your project **data** might look like this:

```json
{
  "title": "AI Portfolio Project",
  "description": "A personal portfolio built with Next.js and AWS Bedrock",
  "tech_stack": ["Next.js", "Python", "AWS Bedrock"]
}
```

This is **data**—pure information, with no logic about "how to display" it.

What is **logic** then? Logic is: "How do I turn this data into the beautiful card the user sees?" This process includes:

- Parsing JSON data
- Extracting title, description, tech_stack fields
- Adding different colors for each tech tag
- Assembling this information into HTML elements
- Applying CSS styles to make the card look good

You see, data itself is static and objective, while logic is dynamic and variable. **Data tells you "what it is", logic tells you "how to do it"**.

### Why Separate?

Now here's the key question: Why not mix data and logic together?

Imagine what happens if we don't separate them: you hardcode project data directly in HTML:

```html
<div class="project-card">
  <h3>AI Portfolio Project</h3>
  <p>A personal portfolio built with Next.js and AWS Bedrock</p>
  <span class="tag-nextjs">Next.js</span>
  <span class="tag-python">Python</span>
  <span class="tag-aws">AWS Bedrock</span>
</div>
```

Looks fine, right? But problems arise:

- **Problem 1**: If you want to add a new project, you need to copy-paste the entire HTML and change the text one by one
- **Problem 2**: If you want to change the card style, you need to find all card HTMLs and modify each one
- **Problem 3**: If you want project data to come from a database or API, it's simply impossible because data is hardcoded
- **Problem 4**: If you want different styles on mobile, you need to maintain two completely different sets of HTML

This is the pain of mixing things together.

Now let's separate them:

**Data Layer (Backend):**

```python
projects = [
  {
    "title": "AI Portfolio Project",
    "description": "A personal portfolio built with Next.js and AWS Bedrock",
    "tech_stack": ["Next.js", "Python", "AWS Bedrock"]
  },
  {
    "title": "Data Analytics Platform",
    "description": "A real-time TB-scale data analytics system",
    "tech_stack": ["Spark", "Kafka", "PostgreSQL"]
  }
]
```

**Logic Layer (Frontend):**

```tsx
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.tech_stack.map(tech => (
        <span className={`tag-${tech}`}>{tech}</span>
      ))}
    </div>
  )
}

// Usage: iterate through all project data
projects.map(project => <ProjectCard project={project} />)
```

The benefits of separation are immediately apparent:

- **Adding new projects**: Just add an object to the data array, UI updates automatically
- **Changing styles**: Just modify the ProjectCard component once, all project cards change
- **Flexible data sources**: projects can come from database, API, local files—logic code doesn't need to change
- **Responsive design**: Logic can adjust styles based on screen size, data stays unchanged

### API: The "SOP" for Frontend-Backend Communication

API (Application Programming Interface) is essentially the simplest SOP (Standard Operating Procedure): it defines:

- **Input data format** (request parameters)
- **Processing logic** (what the backend should do)
- **Output data format** (returned results)

In our chat application, data flows like this:

1. User enters a question in the chat interface: "What are your project experiences?"
2. Frontend collects input data (user's question text, chat history)
3. Frontend sends request to backend API: `POST /api/chat`
4. Backend receives and processes the request (currently returns hardcoded response, will call AI model later)
5. Backend returns response data
6. Frontend receives and displays response

Throughout the flow:
- **Data**: User question, history, AI response
- **Logic**: Frontend's UI rendering, backend's AI call

They are clearly separated through the API.

### Stream Protocol: High-Level Understanding of Streaming Responses

Our chat application has a special feature: AI responses aren't returned all at once, but streamed character by character, just like ChatGPT.

**Traditional API (One-time return):**

```
User sends message → Wait 10 seconds → Display complete response at once
```

User experience: During those 10 seconds, the interface has no feedback, user thinks the system froze.

**Streaming API (Stream Protocol):**

```
User sends message → Show "H" after 0.5s → Show "He" after 0.5s → Show "Hello!" after 0.5s → ...
```

User experience: Immediate feedback, feels like AI is "thinking" and "typing", similar to chatting with a real person.

In our project, we use **AI SDK's Stream Protocol**. For now, you just need to know:

- Backend sends data piece by piece in a specific format
- Frontend's AI SDK automatically parses this data and updates the UI
- We'll dive deep into Stream Protocol details in the next tutorial

> **Key understanding**: Today we'll get the whole flow running first, understanding how data flows from frontend to backend and back. The specific format and workings of Stream Protocol—we'll learn that in depth in the next tutorial.

---

## Exercises

### Exercise 1: Start the Project and Switch Branches

**Goal:** Prepare your development environment and ensure the project runs correctly.

**What to do:**

1. In Codespaces, switch to the branch containing chat functionality:

   ```bash
   git checkout 08-Add-Hardcoded-AI-Interaction
   ```

2. Install dependencies and start the development server:

   ```bash
   mise run inst
   mise run dev
   ```

3. In your browser, visit http://localhost:3000, click the "Chat" link in the navigation bar (or directly visit http://localhost:3000/chat). You should see a chat interface.

**What you'll notice:**

The chat interface already has a complete UI: input box, send button, message display area. But sending a message won't get a real AI response yet—that's exactly what we're going to implement.

> **Key insight:** We're implementing a "fake AI" (hardcoded response), but the entire frontend-backend communication flow is real. This lets us focus on understanding the architecture, not the details of AI calls.

---

### Exercise 2: Locate Key Chat Interface Components

**Goal:** Learn to find the key files for the chat interface in the project code and understand the component structure.

**What to do:**

1. Open VS Code and find these key files:

   - `app/chat/page.tsx` - Chat page entry
   - `components/chat/chat.tsx` - Core chat functionality component
   - `components/chat/multimodal-input.tsx` - Input box and send button
   - `components/chat/message.tsx` - Single message rendering

2. In `components/chat/chat.tsx`, find the `useChat` hook:

   ```tsx
   const {
     messages,       // Message array
     sendMessage,    // Function to send messages
     status,         // Current status
     stop,           // Function to stop AI response
   } = useChat({
     // Config...
   });
   ```

3. Find the `handleSubmit` function and understand what happens when the user clicks send:

   ```tsx
   const handleSubmit = () => {
     if (input.trim()) {
       sendMessage({ text: input });  // Call AI SDK's send function
       setInput("");                   // Clear input box
     }
   };
   ```

**What you'll notice:**

- `useChat` is a hook provided by AI SDK that encapsulates message state management, API requests, and other complex logic
- Frontend developers don't need to manually write fetch requests—AI SDK handles it
- The `messages` array contains all chat history; React automatically re-renders when it updates

> **Key insight:** AI SDK encapsulates a lot of complex logic for us. We just need to call `sendMessage`, and the SDK automatically sends POST requests to `/api/chat` and handles responses.

---

### Exercise 3: Find the Backend API Code

**Goal:** Understand how the backend handles chat requests.

**What to do:**

1. Open `api/index.py` and find the function that handles chat requests:

   ```python
   @app.post("/api/chat")
   async def handle_chat_data(request: Request):
       # Parse request
       request_body_data = await request.json()
       messages = request_body_data.get('messages', [])
       user_message = messages[-1]['parts'][0]['text'] if messages else ""

       # Generate response (currently hardcoded)
       hardcoded_reply = f"Hello! I received your message: \"{user_message}\""

       # Return streaming response
       return StreamingResponse(...)
   ```

2. Notice the use of `StreamingResponse`—this is the key to making AI responses appear "character by character".

3. Find the code that generates Stream Protocol format:

   ```python
   def ai_sdk_v5_message_generator():
       id = str(uuid.uuid4())
       yield f'data: {json.dumps({"type": "text-start", "id": id})}\n\n'
       yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": hardcoded_reply})}\n\n'
       yield f'data: {json.dumps({"type": "text-end", "id": id})}\n\n'
       yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
       yield "data: [DONE]\n\n"
   ```

**What you'll notice:**

- Backend uses Python's generator (`yield`) to send data step by step
- Each line of data starts with `data: `—this is the standard SSE (Server-Sent Events) format
- AI SDK automatically parses this data on the frontend

> **Key insight:** Although the Stream Protocol format looks a bit complex, for now you just need to know: every piece of data the backend sends, the frontend can receive in real-time. We'll learn the format details in depth in the next tutorial.

---

### Exercise 4: Modify the Hardcoded Response

**Goal:** Hands-on code modification to verify the entire frontend-backend communication flow.

**What to do:**

1. Open `api/index.py` and find the `hardcoded_reply` line

2. Modify the response content, for example:

   ```python
   hardcoded_reply = f"""Hello! I received your message: "{user_message}"

   I'm a hardcoded AI response. I'm still under development, but soon I'll be able to really answer your questions!

   You can ask me about:
   - My skills and project experience
   - My learning background
   - How to contact me
   """
   ```

3. Save the file, the backend will restart automatically

4. In the browser, send a message like "hello" and observe the AI's response

**What you'll notice:**

Your modifications take effect immediately! This shows:
- Frontend correctly sent request to backend
- Backend correctly processed request and returned your hardcoded response
- Frontend correctly displayed the content returned by backend

> **Key insight:** Although the AI is "fake", the entire data flow is real. When we later replace it with real AI calls, the frontend code barely needs to change—that's the power of separation!

---

### Exercise 5: Observe Network Requests in Browser DevTools

**Goal:** See frontend-backend communication data with your own eyes.

**What to do:**

1. Open browser developer tools (F12)

2. Switch to the "Network" tab

3. Send a message in the chat interface

4. In the Network tab, find the `chat` request and click it

5. Check:
   - **Headers**: Request header information
   - **Payload**: Data sent by frontend (your message)
   - **Response**: Streaming data returned by backend

**What you'll notice:**

In Response, you'll see content like this:

```
data: {"type":"text-start","id":"..."}
data: {"type":"text-delta","id":"...","delta":"Hello! I received..."}
data: {"type":"text-end","id":"..."}
data: {"type":"finish-message","finishReason":"stop"}
data: [DONE]
```

This is Stream Protocol! Each line starts with `data: ` followed by a JSON object.

> **Key insight:** DevTools is your "X-ray vision". By observing network requests, you can clearly see what frontend sent and what backend returned. This is an important skill for debugging problems.

---

### Exercise 6: Return Different Responses Based on Keywords (Extended)

**Goal:** Make the hardcoded AI a bit more "intelligent".

**What to do:**

1. Modify the response logic in `api/index.py`:

   ```python
   user_message = messages[-1]['parts'][0]['text'] if messages else ""

   if "project" in user_message.lower():
       reply = """I have three main projects:

   1. **AI Portfolio** - Built with Next.js + AWS Bedrock
   2. **Data Analytics Platform** - Real-time TB-scale data processing
   3. **ML Model Deployment** - MLOps best practices

   Which project would you like to know more about?"""

   elif "skill" in user_message.lower():
       reply = """My skills include:

   - **Programming Languages**: Python, JavaScript, TypeScript
   - **Frameworks**: React, Next.js, FastAPI
   - **Cloud Services**: AWS (Bedrock, Lambda, S3)
   - **AI/ML**: TensorFlow, PyTorch, LangChain"""

   elif "contact" in user_message.lower():
       reply = "You can reach me at: your@email.com"

   else:
       reply = f"I received your message: \"{user_message}\"\n\nAsk me about my **projects**, **skills**, or **contact info**!"
   ```

2. Save and test with different questions

**What you'll notice:**

Now your AI returns different responses based on keywords! Although this isn't real AI, it demonstrates an important pattern: **backend can execute different logic based on input data**.

> **Key insight:** This exercise demonstrates the "data-driven logic" concept. When we integrate real AI later, we just need to replace the `if-else` logic with AI calls—the overall architecture stays the same.

---

## Reflection: What Did We Learn?

After completing these exercises, you've learned:

**The essence of frontend-backend separation**
- Data and logic separation is the core concept
- Frontend handles UI display and user interaction
- Backend handles data processing and business logic
- They communicate through APIs

**Chat application architecture**
- `useChat` hook encapsulates message state management
- Frontend sends POST requests to `/api/chat`
- Backend uses StreamingResponse to return streaming data
- AI SDK automatically handles parsing and displaying streaming responses

**Key file locations**
- `app/chat/page.tsx` - Chat page entry
- `components/chat/chat.tsx` - Core chat logic
- `components/chat/multimodal-input.tsx` - Input component
- `components/chat/message.tsx` - Message rendering component
- `api/index.py` - Backend API handling

**Most importantly**
- Understanding "why it's designed this way" is more valuable than remembering "where the code is"
- Hardcoded responses are "fake", but the architecture is real
- When we replace with real AI, frontend barely needs to change

---

## Mentor's Note

**Why this exercise matters:**

Today's content is information-dense, and you might feel a bit tired. But I want to congratulate you—because you've crossed an important threshold.

Most beginners learning programming only focus on "What does this line of code mean?" or "How do I change this feature?" They are **Doers**—executors who follow tutorials step by step.

But today, you not only learned "how to do it", more importantly you understood "why it's done this way". You started thinking:
- Why do we need frontend-backend separation?
- Why do we need APIs?
- Why use streaming responses?

You're becoming a **Thinker**—someone who understands the principles and design philosophy behind things.

**Key insights:**

- **Frameworks become obsolete, thinking patterns don't**. Angular was popular 5 years ago, React is popular now, something else might be popular in 5 years. But the "data and logic separation" thinking will never become obsolete.

- **The power of separation**. When you design a system well, future extensions become very simple. Today we use hardcoded responses, tomorrow we switch to AWS Bedrock, frontend code barely changes.

- **Run first, understand later**. You might not fully understand every detail of Stream Protocol—that's completely fine. We'll learn it in depth in the next tutorial. Today's goal is understanding the overall architecture and seeing how data flows.

**Next steps:**

1. Next tutorial: Deep dive into how Stream Protocol works
2. Then: Configure AWS Bedrock and integrate real AI
3. Finally: Build a personal knowledge base so AI becomes your personal assistant

You've built the architectural foundation. The learning ahead will only get more interesting!

---

## Quick Reference

**Start the development server:**

```bash
mise run dev
```

**Switch to this tutorial's branch:**

```bash
git checkout 08-Add-Hardcoded-AI-Interaction
```

**Key files:**

- `app/chat/page.tsx` - Chat page entry
- `components/chat/chat.tsx` - Core chat component with `useChat` hook
- `components/chat/multimodal-input.tsx` - Input box and send button
- `components/chat/message.tsx` - Single message rendering logic
- `api/index.py` - Backend API handling `/api/chat` requests

**Data flow path:**

1. User enters message in `multimodal-input.tsx`
2. `chat.tsx`'s `handleSubmit` calls `sendMessage`
3. AI SDK automatically sends POST request to `/api/chat`
4. `api/index.py` processes request, returns StreamingResponse
5. AI SDK parses streaming response, updates `messages` state
6. `message.tsx` renders each message

---

## Reference Implementation

This tutorial corresponds to branch `08-Add-Hardcoded-AI-Interaction`.

Verify your environment is correct:

```bash
git checkout 08-Add-Hardcoded-AI-Interaction
mise run inst
mise run dev
```

Then open http://localhost:3000/chat and follow the exercises above.
