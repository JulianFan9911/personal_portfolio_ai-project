# 深入理解 AI SDK 与 Stream Protocol

> 不写一行代码，彻底搞懂类 ChatGPT 聊天应用的底层原理。

![Chat Interface](./img/08-Add-Hardcoded-AI-Interaction/01-Hardcoded-Chat-Message.png)

## 概述

上一节课，我们让聊天功能"跑起来"了，但你可能还有很多疑问：

- `useChat` 这个 hook 到底帮我们做了什么？
- 为什么 AI 的回复是一个字一个字"吐"出来的，而不是一次性显示？
- 前端和后端之间到底传了什么数据？

今天这节课，我们不写代码。我们只做一件事：**读懂代码**。

这听起来可能有点奇怪——学编程不是应该多写代码吗？但事实是，在真实的工作中，你 70% 的时间都在读别人的代码，只有 30% 的时间在写。而且，很多初学者写不出好代码，恰恰是因为没有读过好代码。

今天，我们就来"读"一个生产级别的聊天应用。

## 学习目标

完成本课程后，你将能够：

1. **读懂 import 语句** —— 看到 `import { X } from "Y"`，知道去哪里找 X 的定义
2. **理解 AI SDK 的价值** —— 明白 `useChat` 这一个 hook 帮你省了多少工作
3. **掌握 Stream Protocol 的核心** —— 理解 `text-start`、`text-delta`、`text-end` 这套"协议"
4. **学会用 DevTools 观察数据流** —— 亲眼看到前后端之间传递的每一个字节

## 前置条件

- 已完成上一节课，能够运行 `mise run dev` 并访问聊天页面
- 有一个浏览器（推荐 Chrome）
- 准备好你的 AI 助手（Claude、ChatGPT 等）帮你解答疑问

## 你将学到什么

这不是一个动手写代码的教程。你将学会如何**读懂**一个真实的聊天应用：

- 追踪代码：从用户点击发送按钮，到消息出现在屏幕上，中间经历了什么
- 理解协议：前端和后端之间的"通信语言"是怎么设计的
- 建立全局观：不再迷失在 import 的海洋里

---

## 核心概念

### 第一关：读懂 Import 语句

很多初学者看代码时，会被 `import` 语句搞晕。文件 A import 了文件 B，文件 B 又 import 了文件 C，跳来跳去就迷路了。

其实 import 语句只有三种形式，搞懂了就不再迷路：

#### 形式一：npm 包（外部依赖）

```tsx
import { useChat } from "@ai-sdk/react";
```

**特征**：路径不以 `.` 或 `/` 开头，通常是包名。

**去哪里找**：`node_modules/@ai-sdk/react/` 目录。但通常你不需要去看这个目录——这是别人写好的库，你只需要看它的文档就行。

**类比**：这就像你用手机，不需要知道芯片怎么制造的，看说明书就能用。

#### 形式二：相对路径（同项目文件）

```tsx
import { PreviewMessage } from "./message";
```

**特征**：路径以 `.` 开头（`./` 表示当前目录，`../` 表示上级目录）。

**去哪里找**：当前文件所在目录的 `message.tsx`（或 `message.ts`、`message/index.tsx`）。

**类比**：这就像说"我桌上的那本书"，是相对于"我的位置"来描述的。

#### 形式三：别名路径（项目约定）

```tsx
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
```

**特征**：路径以 `@/` 开头（这是 Next.js 项目的约定）。

**去哪里找**：项目根目录下的 `hooks/use-scroll-to-bottom.ts`。`@/` 就是项目根目录的别名。

**类比**：这就像公司的工位编号，"A区3排5号"，只要知道规则，就能找到。

#### 实战练习

打开 [`components/chat/chat.tsx`](./components/chat/chat.tsx)，看看开头的 import 语句：

```tsx
import { PreviewMessage, ThinkingMessage } from "./message";     // 形式二：同目录下的 message.tsx
import { MultimodalInput } from "./multimodal-input";            // 形式二：同目录下的 multimodal-input.tsx
import { Overview } from "./overview";                           // 形式二：同目录下的 overview.tsx
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom"; // 形式三：根目录下的 hooks/
import { useChat } from "@ai-sdk/react";                         // 形式一：npm 包
import { toast } from "sonner";                                  // 形式一：npm 包
import { useState, useEffect, useRef } from "react";             // 形式一：npm 包
import FingerprintJS from '@fingerprintjs/fingerprintjs';        // 形式一：npm 包
```

现在你知道了：如果想看 `PreviewMessage` 是怎么实现的，就去 [`components/chat/message.tsx`](./components/chat/message.tsx)；如果想了解 `useChat` 怎么用，就去看 [AI SDK 的官方文档](https://ai-sdk.dev/docs/ai-sdk-ui/overview)。

---

### 第二关：AI SDK —— 帮你造好的轮子

在讲 AI SDK 之前，我们先想象一下：如果没有 AI SDK，你需要自己实现什么？

#### 没有 AI SDK 时，你需要做什么

1. **管理消息状态**
   ```tsx
   const [messages, setMessages] = useState([]);

   function addMessage(role, content) {
     setMessages(prev => [...prev, { role, content, id: Date.now() }]);
   }
   ```

2. **发送请求到后端**
   ```tsx
   async function sendMessage(text) {
     const response = await fetch('/api/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }] })
     });
     // 然后呢？怎么处理流式响应？
   }
   ```

3. **解析流式响应（SSE）**
   ```tsx
   const reader = response.body.getReader();
   const decoder = new TextDecoder();

   while (true) {
     const { done, value } = await reader.read();
     if (done) break;

     const chunk = decoder.decode(value);
     // 解析 "data: {...}\n\n" 格式
     // 处理 text-start, text-delta, text-end...
     // 更新 UI...
   }
   ```

4. **处理各种边界情况**
   - 用户在 AI 回复时又发了新消息怎么办？
   - 网络断了怎么办？
   - 用户点了"停止生成"怎么办？

光是想想就头大。而这一切，AI SDK 的 `useChat` hook 都帮你做好了。

#### 使用 AI SDK 后，你只需要

打开 [`components/chat/chat.tsx`](./components/chat/chat.tsx)，找到第 128-156 行：

```tsx
const {
  messages,      // 所有消息的数组，自动更新
  setMessages,   // 手动修改消息（很少用）
  sendMessage,   // 发送消息的函数，一行搞定
  status,        // 当前状态："idle" | "submitted" | "streaming"
  stop,          // 停止 AI 生成的函数
} = useChat({
  onError: (error) => {
    // 错误处理
  },
});
```

就这么简单。一个 `useChat`，返回 5 个东西，覆盖了你需要的所有功能：

| 返回值 | 作用 | 你原本需要多少代码 |
|-------|------|------------------|
| `messages` | 所有消息，自动更新 | ~30 行状态管理 |
| `sendMessage` | 发送消息 | ~50 行 fetch + 解析逻辑 |
| `status` | 当前状态 | ~20 行状态追踪 |
| `stop` | 停止生成 | ~15 行中断逻辑 |

AI SDK 帮你省了 100+ 行代码，而且这 100 行还是经过大量测试、处理了各种边界情况的代码。

#### AI SDK 是怎么知道发送到哪里的？

你可能注意到，`useChat()` 里没有指定 API 地址。那它怎么知道把请求发到 `/api/chat`？

答案是：**约定优于配置**。AI SDK 默认就是发送到 `/api/chat`。如果你想改，可以传入 `api` 参数：

```tsx
useChat({ api: '/api/my-custom-chat' })
```

这种"约定优于配置"的设计理念在现代开发中非常常见。它的好处是：大部分情况下你不需要配置任何东西，直接就能用。

---

### 第三关：追踪数据流 —— 从按钮到后端

现在，让我们追踪一个完整的数据流：用户输入 "hello" 并点击发送，到 AI 回复出现在屏幕上。

#### Step 1：用户点击发送

打开 [`components/chat/multimodal-input.tsx`](./components/chat/multimodal-input.tsx)，找到发送按钮的点击事件。当用户点击按钮或按下 Enter 键，会调用 `submitForm()` 函数，它最终调用 `handleSubmit()`。

#### Step 2：handleSubmit 处理

回到 [`components/chat/chat.tsx`](./components/chat/chat.tsx)，找到第 162-168 行：

```tsx
const handleSubmit = (e?: { preventDefault?: () => void }, options?: any) => {
  e?.preventDefault?.();
  if (input.trim()) {
    sendMessage({ text: input });  // 关键！调用 AI SDK 的 sendMessage
    setInput("");                   // 清空输入框
  }
};
```

`sendMessage({ text: input })` 这一行，就是把消息发送出去的关键。

#### Step 3：AI SDK 发送请求

`sendMessage` 被调用后，AI SDK 会：

1. 把用户消息添加到 `messages` 数组
2. 构造一个 POST 请求，发送到 `/api/chat`
3. 请求体大概长这样：

```json
{
  "messages": [
    {
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "hello"
        }
      ]
    }
  ]
}
```

#### Step 4：后端接收请求

打开 [`api/index.py`](./api/index.py)，找到第 30-47 行：

```python
@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    # 解析请求体
    request_body_data = await request.json()
    messages = request_body_data.get('messages', [])

    # 获取用户最后一条消息
    user_message = messages[-1]['parts'][0]['text']  # "hello"
```

后端通过 `@app.post("/api/chat")` 这个装饰器，接收发送到 `/api/chat` 的 POST 请求。

#### Step 5：后端返回流式响应

继续看 [`api/index.py`](./api/index.py) 第 53-76 行：

```python
def ai_sdk_v5_message_generator():
    id = str(uuid.uuid4())
    yield f'data: {json.dumps({"type": "text-start", "id": id})}\n\n'
    yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": "Hello Alice"})}\n\n'
    yield f'data: {json.dumps({"type": "text-end", "id": id})}\n\n'
    yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
    yield "data: [DONE]\n\n"

response = StreamingResponse(
    ai_sdk_v5_message_generator(),
    media_type="text/event-stream",
)
```

这里用了 Python 的 `yield` 关键字，它让函数变成一个"生成器"，可以一块一块地吐出数据，而不是一次性返回所有内容。

#### Step 6：前端解析并显示

AI SDK 自动监听这个流式响应，解析 `data: {...}` 格式的消息，把 `text-delta` 中的内容提取出来，更新到 `messages` 数组。React 检测到 `messages` 变化，重新渲染页面，用户就看到了 AI 的回复。

---

### 第四关：Stream Protocol —— 核心中的核心

现在我们来到最重要的部分：**Stream Protocol**。

你可能会想：这不就是个数据格式吗？有什么特别的？

让我用一个类比来解释为什么协议如此重要：

#### 协议 vs 库

**库**是一个具体的实现。比如 AI SDK 是一个 JavaScript 库，你只能在 JavaScript/TypeScript 项目中使用它。

**协议**是一个约定。只要你遵守这个约定，用什么语言实现都可以。

想想 HTTP 协议：
- Chrome 浏览器（C++ 写的）可以访问网页
- Safari 浏览器（Swift 写的）可以访问网页
- curl 命令行工具（C 写的）可以访问网页
- Python 的 requests 库也可以访问网页

它们之所以都能工作，是因为它们都遵守 HTTP 协议这个"约定"。

Stream Protocol 也是这样。AI SDK 的前端可以和任何遵守 Stream Protocol 的后端通信：
- Python（FastAPI）写的后端 ✓
- Go 写的后端 ✓
- Rust 写的后端 ✓
- Node.js 写的后端 ✓

只要后端返回的数据格式符合 Stream Protocol，前端就能正确解析。

#### Stream Protocol 的三个核心消息类型

打开 [`api/index.py`](./api/index.py)，看看后端返回的数据：

```python
yield f'data: {json.dumps({"type": "text-start", "id": id})}\n\n'
yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": "Hello Alice"})}\n\n'
yield f'data: {json.dumps({"type": "text-end", "id": id})}\n\n'
```

这里有三种消息类型，我们一个个拆解：

#### 1. `text-start`：文本开始

```json
{"type": "text-start", "id": "550e8400-e29b-41d4-a716-446655440000"}
```

| 字段 | 含义 |
|-----|------|
| `type` | 消息类型，这里是 "text-start" |
| `id` | 这段文本的唯一标识符（UUID） |

**作用**：告诉前端"我要开始发送一段文本了，这段文本的 ID 是 xxx"。

**为什么需要 ID？** 因为 AI 可能同时生成多段内容（比如思考过程和最终答案），需要用 ID 区分哪些 delta 属于哪段文本。

#### 2. `text-delta`：文本内容（增量）

```json
{"type": "text-delta", "id": "550e8400-e29b-41d4-a716-446655440000", "delta": "Hello Alice"}
```

| 字段 | 含义 |
|-----|------|
| `type` | 消息类型，这里是 "text-delta" |
| `id` | 这段文本的 ID，和 text-start 中的一致 |
| `delta` | 增量内容，这次新增的文字 |

**作用**：发送实际的文本内容。

**为什么叫 delta 而不是 content？** 因为这是"增量"——每次只发送新增的部分，不是完整内容。比如 AI 回复 "Hello World"，可能会分成两次发送：

```
{"type": "text-delta", "id": "...", "delta": "Hello "}
{"type": "text-delta", "id": "...", "delta": "World"}
```

前端收到后，把这些 delta 拼接起来，就得到完整的 "Hello World"。

#### 3. `text-end`：文本结束

```json
{"type": "text-end", "id": "550e8400-e29b-41d4-a716-446655440000"}
```

| 字段 | 含义 |
|-----|------|
| `type` | 消息类型，这里是 "text-end" |
| `id` | 这段文本的 ID |

**作用**：告诉前端"这段文本发送完了"。

#### 完整的流程

把三个消息类型连起来看：

```
text-start  → "我要开始说话了，我的 ID 是 abc123"
text-delta  → "Hello "（ID: abc123）
text-delta  → "World"（ID: abc123）
text-end    → "ID 为 abc123 的话说完了"
```

前端收到 `text-start` 后，创建一个空的消息框；收到 `text-delta` 后，把 delta 内容追加到消息框；收到 `text-end` 后，知道这条消息完成了。

#### SSE 格式的细节

你可能注意到每一行都有一些固定的格式：

```
data: {"type":"text-start","id":"..."}\n\n
```

这是 **SSE（Server-Sent Events）** 格式的要求：

| 部分 | 含义 |
|-----|------|
| `data: ` | 前缀，表示这是数据行（不是注释或其他类型） |
| `{...}` | JSON 格式的实际内容 |
| `\n\n` | 双换行，表示一个事件结束 |

为什么用 SSE 而不是普通的 HTTP 响应？因为 SSE 是专门为"服务器向客户端推送"设计的协议，浏览器原生支持，不需要 WebSocket 那么复杂。

#### 其他消息类型（了解即可）

除了 `text-start`、`text-delta`、`text-end`，Stream Protocol 还支持很多其他类型：

```python
yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
yield "data: [DONE]\n\n"
```

| 类型 | 含义 |
|-----|------|
| `finish-message` | 整条消息完成，`finishReason` 说明原因（stop=正常结束） |
| `[DONE]` | 整个流结束 |

更复杂的类型（如 `tool-input-*`、`reasoning-*`）用于 AI 调用工具或展示思考过程，我们这里不深入讲解。有兴趣的同学可以阅读 [AI SDK Stream Protocol 官方文档](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol)。

---

## 练习

### 练习 1：用 DevTools 观察 Stream Protocol

**目标**：亲眼看到前后端之间传递的数据。

**步骤**：

1. 打开浏览器，访问 http://localhost:3000/chat

2. 按 F12 打开开发者工具，切换到 **Network**（网络）标签

3. 在聊天框输入任意内容，点击发送

4. 在 Network 列表中找到 `chat` 请求，点击它

5. 查看 **Response**（响应）标签，你应该能看到类似这样的内容：

```
data: {"type":"text-start","id":"..."}
data: {"type":"text-delta","id":"...","delta":"Hello Alice"}
data: {"type":"text-end","id":"..."}
data: {"type":"finish-message","finishReason":"stop"}
data: [DONE]
```

**你观察到了什么？**

这就是 Stream Protocol！后端就是用这种格式把数据"流"给前端的。

---

### 练习 2：追踪 Import 链

**目标**：练习根据 import 语句找到源文件。

**任务**：

1. 打开 [`components/chat/chat.tsx`](./components/chat/chat.tsx)

2. 找到这行 import：
   ```tsx
   import { PreviewMessage, ThinkingMessage } from "./message";
   ```

3. 根据这个 import，找到 `PreviewMessage` 的定义文件

4. 在那个文件中，找到 `PreviewMessage` 组件是怎么渲染 AI 消息的

**提示**：`./message` 表示当前目录下的 `message.tsx`（或 `message/index.tsx`）。

---

### 练习 3：理解 yield 的作用

**目标**：理解为什么后端用 `yield` 而不是 `return`。

**思考题**：

打开 [`api/index.py`](./api/index.py)，看这段代码：

```python
def ai_sdk_v5_message_generator():
    yield f'data: ...\n\n'  # 第一行
    yield f'data: ...\n\n'  # 第二行
    yield f'data: ...\n\n'  # 第三行
```

如果把 `yield` 换成 `return`，会发生什么？

**答案**：

`return` 会立即结束函数，只返回第一行。

`yield` 让函数变成"生成器"，每次调用返回一行，函数不会结束，下次调用继续从上次的位置执行。

这就是为什么 AI 的回复可以"一行一行"发送，而不是等全部生成完才发送。

---

### 练习 4：修改 delta 内容

**目标**：验证你对 Stream Protocol 的理解。

**任务**：

1. 打开 [`api/index.py`](./api/index.py)

2. 找到 `text-delta` 那一行：
   ```python
   yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": "Hello Alice"})}\n\n'
   ```

3. 把它改成发送两次 delta：
   ```python
   yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": "Hello "})}\n\n'
   yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": "World"})}\n\n'
   ```

4. 保存文件，刷新页面，发送消息

5. 观察：前端显示的是 "Hello World"，说明两个 delta 被正确拼接了

6. 用 DevTools 的 Network 标签查看响应，你会看到两个 `text-delta` 事件

---

## 总结：你学到了什么

经过这节课的学习，你应该能够：

**读懂 import 语句**
- `"@ai-sdk/react"` → npm 包，看文档
- `"./message"` → 相对路径，看同目录下的文件
- `"@/hooks/..."` → 别名路径，看项目根目录

**理解 AI SDK 的价值**
- `useChat` 封装了消息管理、请求发送、流式解析
- 你只需要调用 `sendMessage`，剩下的都不用管
- "约定优于配置"：默认发送到 `/api/chat`

**掌握 Stream Protocol**
- `text-start`：开始一段文本，带 ID
- `text-delta`：增量内容，追加到文本
- `text-end`：文本结束
- SSE 格式：`data: {...}\n\n`

**追踪数据流**
- 用户输入 → `handleSubmit` → `sendMessage` → `/api/chat`
- 后端 `yield` → `StreamingResponse` → 前端解析 → 更新 UI

---

## Mentor's Note

**为什么这节课不写代码？**

我见过太多初学者，拿到一个项目就开始改代码，改着改着就把项目改坏了，然后不知道怎么恢复。

其实，**读代码的能力比写代码的能力更基础**。你得先看懂别人的代码，才能在正确的地方做修改。

今天我们练习的"追踪数据流"——从按钮到后端再到页面——这是一个非常重要的技能。在真实的工作中，你经常需要回答这样的问题：

- "这个数据是从哪里来的？"
- "这个按钮点击后发生了什么？"
- "为什么这个功能不工作？"

这些问题的答案，都藏在代码的调用链中。

**协议的重要性**

今天我们花了很多时间讲 Stream Protocol。你可能会想：我只是想做个聊天应用，为什么要了解这么底层的东西？

原因是：**理解协议，你才能理解系统的边界**。

比如，如果你以后想换一个 AI 模型（从 OpenAI 换到 Claude），你只需要问自己一个问题：新的 API 返回的格式符合 Stream Protocol 吗？如果符合，前端代码一行都不用改。如果不符合，你只需要在后端做一层转换。

这就是"协议思维"的力量。它让你在面对变化时，知道哪些是不变的（协议），哪些是可变的（具体实现）。

**一个库不牛逼，一个协议可以影响一个行业**

HTTP 协议让全世界的网站可以互联。HTML 协议让任何浏览器都能渲染网页。Stream Protocol 虽然还很年轻，但它正在成为 AI 应用前后端通信的事实标准。

当你理解了协议，你就不再是一个只会用某个库的开发者，而是一个理解整个生态系统的工程师。

**下一步**

现在你已经理解了整个聊天应用的架构和数据流。下一节课，我们将接入真正的 AI 模型（AWS Bedrock），让你的聊天应用真正"活"起来。

由于你已经理解了 Stream Protocol，接入真正 AI 的改动量会非常小——只需要在后端把 hardcoded 的回复换成真正的 AI 调用即可。前端代码？一行都不用改。

---

## 快速参考

**启动开发服务器：**

```bash
mise run dev
```

**关键文件：**

| 文件 | 作用 |
|-----|------|
| [`components/chat/chat.tsx`](./components/chat/chat.tsx) | 核心逻辑，`useChat` hook |
| [`components/chat/multimodal-input.tsx`](./components/chat/multimodal-input.tsx) | 输入框和发送按钮 |
| [`components/chat/message.tsx`](./components/chat/message.tsx) | 消息渲染 |
| [`api/index.py`](./api/index.py) | 后端 API |

**Stream Protocol 消息类型：**

| 类型 | 格式 | 作用 |
|-----|------|------|
| `text-start` | `{"type":"text-start","id":"..."}` | 开始一段文本 |
| `text-delta` | `{"type":"text-delta","id":"...","delta":"..."}` | 发送增量内容 |
| `text-end` | `{"type":"text-end","id":"..."}` | 结束一段文本 |

**参考文档：**

- [AI SDK UI Overview](https://ai-sdk.dev/docs/ai-sdk-ui/overview)
- [AI SDK Stream Protocol](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol)

---

## 参考实现

本教程对应分支 `09-AI-SDK-And-Stream-Protocol`。

验证你的环境正确：

```bash
git checkout 09-AI-SDK-And-Stream-Protocol
mise run inst
mise run dev
```

然后打开 http://localhost:3000/chat，按照上面的练习进行操作。
