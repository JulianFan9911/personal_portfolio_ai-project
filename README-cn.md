# 集成 Hardcoded AI 对话界面

> 学习前后端分离的核心理念，并实现一个简化版的 AI 聊天功能。

## Overview

恭喜你走到了这一步！如果说前面的学习都是在打基础、熟悉工具，那么从今天开始，我们就要进入这个项目最核心、最激动人心的部分了——让你的个人主页"活"起来，能够与访客对话。

今天的学习，表面上看是在添加一个聊天界面，但实际上你将接触到一个极其重要的架构思维——**前后端分离**。这个概念看似简单，但它背后蕴含的"数据与逻辑分离"的哲学，几乎贯穿了整个科技行业。理解了这一点，你看待任何复杂系统的方式都会发生根本性的改变。

## Learning Objectives

当你加入一个新团队或开始一个新项目时，你会发现现代 Web 应用几乎都采用前后端分离的架构。理解这种架构不仅能帮助你更快地上手新项目，更重要的是，它背后的"数据与逻辑分离"思想是一种通用的系统设计能力，无论你将来做什么方向，这种思维方式都会让你受益匪浅。

通过今天的学习，你将：

1. **深刻理解前后端分离的本质**——不仅仅是前端和后端的职责划分，更重要的是掌握"数据与逻辑分离"这个放之四海而皆准的思维方式
2. **定位并理解聊天界面的关键代码**——学会在复杂项目中快速找到你需要的组件和功能
3. **实践修改和测试 hardcoded 对话**——体验前后端通信的完整流程，虽然暂时是"假的 AI"，但数据流动是真实的
4. **初步了解 AI SDK 的 Stream Protocol**——理解前后端如何约定接口进行通信（下一个教程会深入讲解）

## Prerequisites

- 你已经完成了前面的教程，能够成功运行 `mise run dev`
- 你有一个浏览器，可以访问 http://localhost:3000
- 你有一个 AI assistant 可用（Claude, ChatGPT 等）

## What You'll Build

你将在现有的个人主页项目中集成一个聊天界面。虽然这个版本的 AI 回复是 hardcoded（写死的），但整个前后端通信流程是真实的：

- 用户在前端输入消息
- 前端通过 API 发送请求到后端
- 后端处理请求并返回流式响应
- 前端接收并显示响应

这为下一步接入真正的 AI 模型（如 AWS Bedrock）奠定了基础。

---

## Key Concepts

### 前后端分离：不仅仅是技术选型

你可能已经听说过"前后端分离"这个词无数次了。在网上搜索，你会看到各种技术实现：有人说要用 Node.js 做后端，有人说要用 React 做前端，还有人说现在流行全栈框架如 Next.js 又把前后端"合并"了... 这些讨论容易让人迷失在技术细节中，忘记了最根本的问题：**我们为什么需要前后端分离？**

答案其实非常简单，但又极其深刻：**数据和逻辑应该分离**。

### 什么是数据？什么是逻辑？

让我们从最简单的例子开始理解这个概念。

想象你要在个人主页上展示你的项目经历。你的项目**数据**可能是这样的：

```json
{
  "title": "AI 个人主页项目",
  "description": "使用 Next.js 和 AWS Bedrock 构建的个人主页",
  "tech_stack": ["Next.js", "Python", "AWS Bedrock"]
}
```

这就是**数据**——纯粹的信息，没有任何关于"如何展示"的逻辑。

而**逻辑**是什么呢？逻辑是："如何把这个数据变成用户看到的精美卡片？"这个过程包括：

- 解析 JSON 数据
- 提取 title, description, tech_stack 字段
- 为每个技术标签添加不同的颜色
- 将这些信息组装成 HTML 元素
- 应用 CSS 样式让卡片好看

你看，数据本身是静态的、客观的，而逻辑是动态的、可变的。**数据告诉你"是什么"，逻辑告诉你"怎么做"**。

### 为什么要分离？

现在关键问题来了：为什么不把数据和逻辑混在一起？

想象如果我们不分离会怎样：你把项目数据直接写死在 HTML 代码里：

```html
<div class="project-card">
  <h3>AI 个人主页项目</h3>
  <p>使用 Next.js 和 AWS Bedrock 构建的个人主页</p>
  <span class="tag-nextjs">Next.js</span>
  <span class="tag-python">Python</span>
  <span class="tag-aws">AWS Bedrock</span>
</div>
```

看起来挺好的对吧？但问题来了：

- **问题 1**：如果你要添加一个新项目，你需要复制粘贴整个 HTML，然后一个一个改里面的文字
- **问题 2**：如果你想改变卡片的样式，你需要找到所有的卡片 HTML 并逐个修改
- **问题 3**：如果你想让项目数据来自数据库或 API，现在根本做不到，因为数据是写死的
- **问题 4**：如果你想在手机上显示不同的样式，你需要维护两套完全不同的 HTML

这就是混在一起的痛苦。

现在我们分离一下：

**数据层（后端）：**

```python
projects = [
  {
    "title": "AI 个人主页项目",
    "description": "使用 Next.js 和 AWS Bedrock 构建的个人主页",
    "tech_stack": ["Next.js", "Python", "AWS Bedrock"]
  },
  {
    "title": "数据分析平台",
    "description": "实时处理 TB 级数据的分析系统",
    "tech_stack": ["Spark", "Kafka", "PostgreSQL"]
  }
]
```

**逻辑层（前端）：**

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

// 使用：遍历所有项目数据
projects.map(project => <ProjectCard project={project} />)
```

分离后的好处立刻显现：

- **添加新项目**：只需在数据数组中添加一个对象，界面自动更新
- **修改样式**：只需修改 ProjectCard 组件一次，所有项目卡片都会改变
- **数据来源灵活**：projects 可以来自数据库、API、本地文件，逻辑代码不需要改变
- **响应式设计**：逻辑可以根据屏幕大小调整样式，数据保持不变

### API：前后端通信的"SOP"

API（Application Programming Interface）本质上就是一个最简单的 SOP（标准作业程序）：它定义了：

- **输入数据的格式**（请求的参数）
- **处理的逻辑**（后端要做什么）
- **输出数据的格式**（返回的结果）

在我们的聊天应用中，数据流动是这样的：

1. 用户在聊天界面输入一个问题："你的项目经验有哪些？"
2. 前端收集输入数据（用户的问题文本、历史聊天记录）
3. 前端发送请求到后端 API：`POST /api/chat`
4. 后端接收请求并处理（现在是返回 hardcoded 回复，将来是调用 AI 模型）
5. 后端返回回复数据
6. 前端接收回复并显示

整个流程中：
- **数据**：用户问题、历史记录、AI 回复
- **逻辑**：前端的界面渲染、后端的 AI 调用

它们通过 API 清晰地分离开来。

### Stream Protocol：流式响应的高层理解

我们的聊天应用有个特殊之处：AI 的回复不是一次性返回的，而是一个字一个字地流式输出，就像 ChatGPT 那样。

**传统 API（一次性返回）：**

```
用户发送消息 → 等待 10 秒 → 一次性显示完整回复
```

用户体验：在这 10 秒里，界面没有任何反馈，用户会以为系统卡住了。

**流式 API（Stream Protocol）：**

```
用户发送消息 → 0.5秒后显示"你" → 0.5秒后显示"你好" → 0.5秒后显示"你好！" → ...
```

用户体验：立刻就有反馈，感觉 AI 在"思考"和"打字"，体验类似和真人聊天。

在我们的项目中，我们使用的是 **AI SDK 的 Stream Protocol**。你现在只需要知道：

- 后端会按照特定格式一段一段发送数据
- 前端的 AI SDK 会自动解析这些数据并更新界面
- 下一个教程我们会深入讲解 Stream Protocol 的细节

> **关键理解**：今天我们先跑通整个流程，理解数据如何从前端到后端再回到前端。Stream Protocol 的具体格式和工作原理，我们下一个教程再深入学习。

---

## Exercises

### Exercise 1: 启动项目并切换分支

**Goal:** 准备好开发环境，确保项目可以正常运行。

**What to do:**

1. 在 Codespaces 中切换到包含聊天功能的分支：

   ```bash
   git checkout 08-Add-Hardcoded-AI-Interaction
   ```

2. 安装依赖并启动开发服务器：

   ```bash
   mise run inst
   mise run dev
   ```

3. 在浏览器中访问 http://localhost:3000，点击导航栏的 "Chat" 链接（或直接访问 http://localhost:3000/chat），你应该能看到一个聊天界面。

**What you'll notice:**

聊天界面已经有了完整的 UI：输入框、发送按钮、消息显示区域。但现在发送消息还不会有真正的 AI 回复——这正是我们要实现的。

> **Key insight:** 我们要实现的是"假的 AI"（hardcoded 回复），但整个前后端通信流程是真实的。这让我们可以先专注于理解架构，而不是 AI 调用的细节。

---

### Exercise 2: 定位聊天界面的关键组件

**Goal:** 学会在项目代码中找到聊天界面的关键文件，理解组件结构。

**What to do:**

1. 打开 VS Code，找到以下关键文件：

   - `app/chat/page.tsx` - 聊天页面的入口
   - `components/chat/chat.tsx` - 聊天功能的核心组件
   - `components/chat/multimodal-input.tsx` - 输入框和发送按钮
   - `components/chat/message.tsx` - 单条消息的渲染

2. 在 `components/chat/chat.tsx` 中，找到 `useChat` hook：

   ```tsx
   const {
     messages,       // 消息数组
     sendMessage,    // 发送消息的函数
     status,         // 当前状态
     stop,           // 停止 AI 回复的函数
   } = useChat({
     // 配置...
   });
   ```

3. 找到 `handleSubmit` 函数，理解当用户点击发送时发生了什么：

   ```tsx
   const handleSubmit = () => {
     if (input.trim()) {
       sendMessage({ text: input });  // 调用 AI SDK 的发送函数
       setInput("");                   // 清空输入框
     }
   };
   ```

**What you'll notice:**

- `useChat` 是 AI SDK 提供的 hook，封装了消息状态管理、API 请求等复杂逻辑
- 前端开发者不需要手动写 fetch 请求，AI SDK 帮我们处理了
- `messages` 数组包含所有聊天记录，每次更新时 React 会自动重新渲染

> **Key insight:** AI SDK 帮我们封装了大量复杂逻辑。我们只需要调用 `sendMessage`，SDK 会自动向 `/api/chat` 发送请求并处理响应。

---

### Exercise 3: 找到后端 API 代码

**Goal:** 理解后端是如何处理聊天请求的。

**What to do:**

1. 打开 `api/index.py`，找到处理聊天请求的函数：

   ```python
   @app.post("/api/chat")
   async def handle_chat_data(request: Request):
       # 解析请求
       request_body_data = await request.json()
       messages = request_body_data.get('messages', [])
       user_message = messages[-1]['parts'][0]['text'] if messages else ""

       # 生成回复（目前是 hardcoded）
       hardcoded_reply = f"你好！我收到了你的消息：「{user_message}」"

       # 返回流式响应
       return StreamingResponse(...)
   ```

2. 注意 `StreamingResponse` 的使用——这就是让 AI 回复可以"一个字一个字"显示的关键。

3. 找到生成 Stream Protocol 格式的代码：

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

- 后端使用 Python 的 generator（`yield`）来逐步发送数据
- 每行数据都以 `data: ` 开头，这是 SSE（Server-Sent Events）的标准格式
- AI SDK 会在前端自动解析这些数据

> **Key insight:** 虽然 Stream Protocol 的格式看起来有点复杂，但你现在只需要知道：后端发送的每一段数据，前端都能实时接收到。具体的格式细节，我们下一个教程会深入学习。

---

### Exercise 4: 修改 Hardcoded 回复

**Goal:** 动手修改代码，验证整个前后端通信流程。

**What to do:**

1. 打开 `api/index.py`，找到 `hardcoded_reply` 这一行

2. 修改回复内容，比如：

   ```python
   hardcoded_reply = f"""你好！我收到了你的消息：「{user_message}」

   我是一个 hardcoded 的 AI 回复。目前我还在开发中，很快就能真正回答你的问题了！

   你可以问我关于：
   - 我的技能和项目经验
   - 我的学习背景
   - 我的联系方式
   """
   ```

3. 保存文件，后端会自动重启

4. 在浏览器中发送一条消息，比如"你好"，观察 AI 的回复

**What you'll notice:**

你修改的内容立刻就生效了！这说明：
- 前端正确地发送了请求到后端
- 后端正确地处理了请求并返回了你的 hardcoded 回复
- 前端正确地显示了后端返回的内容

> **Key insight:** 虽然 AI 是"假的"，但整个数据流动是真实的。当我们将来替换成真正的 AI 调用时，前端代码几乎不需要改动——这就是分离的力量！

---

### Exercise 5: 在浏览器 DevTools 中观察网络请求

**Goal:** 亲眼看到前后端通信的数据。

**What to do:**

1. 打开浏览器的开发者工具（F12）

2. 切换到 "Network"（网络）标签

3. 在聊天界面发送一条消息

4. 在 Network 标签中，找到 `chat` 这个请求，点击它

5. 查看：
   - **Headers**：请求头信息
   - **Payload**：前端发送的数据（你的消息）
   - **Response**：后端返回的流式数据

**What you'll notice:**

在 Response 中，你会看到类似这样的内容：

```
data: {"type":"text-start","id":"..."}
data: {"type":"text-delta","id":"...","delta":"你好！我收到了..."}
data: {"type":"text-end","id":"..."}
data: {"type":"finish-message","finishReason":"stop"}
data: [DONE]
```

这就是 Stream Protocol！每一行以 `data: ` 开头，后面跟一个 JSON 对象。

> **Key insight:** DevTools 是你的"X 光眼"。通过观察网络请求，你可以清楚地看到前端发送了什么、后端返回了什么。这是调试问题的重要技能。

---

### Exercise 6: 根据关键词返回不同回复（扩展练习）

**Goal:** 让 hardcoded AI 更"智能"一点。

**What to do:**

1. 修改 `api/index.py` 中的回复逻辑：

   ```python
   user_message = messages[-1]['parts'][0]['text'] if messages else ""

   if "项目" in user_message:
       reply = """我有三个主要项目：

   1. **AI 个人主页** - 使用 Next.js + AWS Bedrock 构建
   2. **数据分析平台** - 实时处理 TB 级数据
   3. **机器学习模型部署** - MLOps 最佳实践

   你想了解哪个项目的详情？"""

   elif "技能" in user_message:
       reply = """我掌握的技能包括：

   - **编程语言**：Python, JavaScript, TypeScript
   - **框架**：React, Next.js, FastAPI
   - **云服务**：AWS (Bedrock, Lambda, S3)
   - **AI/ML**：TensorFlow, PyTorch, LangChain"""

   elif "联系" in user_message:
       reply = "你可以通过邮件联系我：your@email.com"

   else:
       reply = f"收到你的消息：「{user_message}」\n\n请问关于我的**项目**、**技能**或**联系方式**？"
   ```

2. 保存并测试不同的问题

**What you'll notice:**

现在你的 AI 会根据关键词返回不同的回复！虽然这还不是真正的 AI，但它展示了一个重要的模式：**后端可以根据输入数据执行不同的逻辑**。

> **Key insight:** 这个练习展示了"数据驱动逻辑"的思想。当我们将来接入真正的 AI 时，只需要把 `if-else` 逻辑替换成 AI 调用即可，整体架构不变。

---

## Reflection: What Did We Learn?

完成这些练习后，你学到了：

**前后端分离的本质**
- 数据与逻辑分离是核心思想
- 前端负责界面展示和用户交互
- 后端负责数据处理和业务逻辑
- 它们通过 API 进行通信

**聊天应用的架构**
- `useChat` hook 封装了消息状态管理
- 前端发送 POST 请求到 `/api/chat`
- 后端使用 StreamingResponse 返回流式数据
- AI SDK 自动处理流式响应的解析和显示

**关键文件定位**
- `app/chat/page.tsx` - 聊天页面入口
- `components/chat/chat.tsx` - 核心聊天逻辑
- `components/chat/multimodal-input.tsx` - 输入组件
- `components/chat/message.tsx` - 消息渲染组件
- `api/index.py` - 后端 API 处理

**最重要的是**
- 理解"为什么这样设计"比记住"代码在哪里"更有价值
- Hardcoded 回复虽然是"假的"，但架构是真实的
- 当我们替换成真正的 AI 时，前端几乎不需要改动

---

## Mentor's Note

**Why this exercise matters:**

今天的内容信息量很大，你可能会觉得有点累。但我要恭喜你——因为你已经迈过了一个重要的门槛。

大多数初学者学编程时，只关注"这行代码是什么意思？""怎么改这个功能？"他们是 **Doer**——执行者，按照教程一步步操作。

但今天，你不仅学会了"怎么做"，更重要的是理解了"为什么这样做"。你开始思考：
- 为什么要前后端分离？
- 为什么需要 API？
- 为什么要用流式响应？

你开始成为 **Thinker**——思考者，理解背后的原理和设计思想。

**Key insights:**

- **框架会过时，思维方式不会**。5 年前流行 Angular，现在流行 React，5 年后可能又是新东西。但"数据与逻辑分离"的思想永远不会过时。

- **分离的力量**。当你把系统设计好了，未来的扩展会非常简单。今天我们用 hardcoded 回复，明天换成 AWS Bedrock，前端代码几乎不用改。

- **先跑通，再理解**。你可能还不完全理解 Stream Protocol 的每个细节——这完全没问题。下一个教程我们会深入学习。今天的目标是理解整体架构，看到数据如何流动。

**Next steps:**

1. 下一个教程：深入学习 Stream Protocol 的工作原理
2. 然后：配置 AWS Bedrock，接入真正的 AI
3. 最后：构建个人知识库，让 AI 成为你的专属助手

你已经打好了架构的基础。接下来的学习会越来越有意思！

---

## Quick Reference

**启动开发服务器：**

```bash
mise run dev
```

**切换到本教程的分支：**

```bash
git checkout 08-Add-Hardcoded-AI-Interaction
```

**关键文件：**

- `app/chat/page.tsx` - 聊天页面入口
- `components/chat/chat.tsx` - 核心聊天组件，包含 `useChat` hook
- `components/chat/multimodal-input.tsx` - 输入框和发送按钮
- `components/chat/message.tsx` - 单条消息的渲染逻辑
- `api/index.py` - 后端 API，处理 `/api/chat` 请求

**数据流动路径：**

1. 用户在 `multimodal-input.tsx` 输入消息
2. `chat.tsx` 的 `handleSubmit` 调用 `sendMessage`
3. AI SDK 自动发送 POST 请求到 `/api/chat`
4. `api/index.py` 处理请求，返回 StreamingResponse
5. AI SDK 解析流式响应，更新 `messages` 状态
6. `message.tsx` 渲染每条消息

---

## Reference Implementation

本教程对应的分支是 `08-Add-Hardcoded-AI-Interaction`。

验证你的环境是否正确：

```bash
git checkout 08-Add-Hardcoded-AI-Interaction
mise run inst
mise run dev
```

然后打开 http://localhost:3000/chat，按照上面的练习进行操作。
