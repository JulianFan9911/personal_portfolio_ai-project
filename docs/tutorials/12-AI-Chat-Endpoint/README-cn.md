# 把 AI 接入你的应用：从脚本到产品

> 我们学会了调用 API，学会了 Prompt Caching，现在是时候把这些知识用到真正的产品里了。

## 概述

在前面的课程中，我们一直在用脚本做实验——调用 Bedrock API、观察 Prompt Cache 的效果。那些脚本帮助我们理解原理，但它们不是产品代码。

真正的产品是什么样的？用户在前端界面输入问题，后端接收请求、调用 AI、把回答返回给前端。这中间需要很多"翻译"工作：前端发来的数据格式和 Bedrock 要求的格式不一样，多轮对话的历史记录需要管理，AWS 的连接需要配置……

这节课，我们要把之前学的东西"组装"起来，让前端 App 真正用上 AWS Bedrock 的 AI 推理能力。

## 学习目标

完成本课后，你将能够：

1. **理解封装的价值** — 知道为什么要把零散的代码组织成可复用的工具
2. **理解数据转换的必要性** — 明白前端和后端使用不同的数据格式，需要适配器来"翻译"
3. **完成 API 集成** — 把前面学的 Bedrock API 调用、Prompt Caching 整合到 FastAPI 后端
4. **体验"分解问题 → 造工具 → 组装"的工程思维** — 这是解决复杂问题的通用方法

## 前置条件

开始之前，请确保你已经完成了前面的课程：
- "Hello, AI!" 课程：能够调用 AWS Bedrock API
- "Prompt Caching" 课程：理解 cachePoint 的用法

你的 AWS 凭证应该已经配置好，项目依赖也应该安装完毕（通过 `mise run inst`）。

---

## 核心概念

### 1. 从脚本到产品：封装的必要性

还记得我们之前写的那些脚本吗？它们大概是这样的：

```python
# 之前的脚本风格
client = boto3.Session().client("bedrock-runtime")
response = client.converse(
    modelId="...",
    messages=[...],
    system=[...]
)
# 手动解析 response 字典...
```

这样的代码能跑，但有几个问题：

**问题一：重复代码**。每次调用 API 都要写一堆相同的配置代码。

**问题二：难以维护**。API 返回的是嵌套的字典，取数据要写 `response["output"]["message"]["content"][0]["text"]` 这样的代码，既丑陋又容易出错。

**问题三：缺乏复用**。如果想在多个地方调用 AI，就得复制粘贴这些代码。

解决方案是什么？**封装**。把常用的操作包装成函数或类，让业务代码更清晰。

这就是我们这节课要做的事情——我们已经为你准备好了两个"小工具"，你需要学会使用它们，并把它们集成到 API 端点里。

### 2. 工具一：数据格式适配器

我们的前端使用 Vercel AI SDK，它发送的数据格式是这样的：

```json
{
  "messages": [
    {
      "role": "user",
      "parts": [{"type": "text", "text": "你好"}]
    }
  ]
}
```

但 AWS Bedrock 期望的格式是这样的：

```json
{
  "messages": [
    {
      "role": "user",
      "content": [{"text": "你好"}]
    }
  ]
}
```

注意到区别了吗？AI SDK 用 `parts`，Bedrock 用 `content`。字段名不一样，结构也有差异。

我们需要一个"翻译官"来做转换。这就是 `ai_sdk_adapter.py` 的作用：

```
learn_personal_portfolio_ai/ai_sdk_adapter.py
```

这个模块提供了一个核心函数 `request_body_to_bedrock_converse_messages()`，它接收前端发来的请求，输出 Bedrock 能理解的格式。

它基于一个开源库 `vercel-ai-sdk-mate`，这个库把前端发来的 JSON 数据封装成了 Python 类，让我们可以用 `message.role` 而不是 `message["role"]` 来访问数据——更清晰，也更不容易出错。

### 3. 工具二：多轮对话管理器

还记得我们之前学过的多轮对话吗？每次调用 API 都要带上完整的对话历史。

如果手动管理，代码会是这样的：

```python
messages = []

# 第一轮
messages.append({"role": "user", "content": [{"text": "你好"}]})
response = client.converse(messages=messages, ...)
messages.append(response["output"]["message"])

# 第二轮
messages.append({"role": "user", "content": [{"text": "你是谁？"}]})
response = client.converse(messages=messages, ...)
messages.append(response["output"]["message"])

# 每一轮都要手动维护这个 messages 列表...
```

这样的代码很繁琐，也容易出错。所以我们封装了一个 `ChatSession` 类：

```
learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py
```

使用它，代码变得简洁多了：

```python
session = ChatSession(client=client, model_id="...", system=[...])
response = session.send_message([...])  # 自动管理对话历史
```

这个类基于一个开源库 `boto3-dataclass`，它把 boto3 返回的字典转换成类型化的 dataclass 对象。这意味着你可以用 `response.output.message.content[0].text` 来访问数据，而且 IDE 会提供自动补全和类型检查。

### 4. 基础设施：AWS 连接配置

在调用任何 AWS 服务之前，我们需要一个配置好的客户端。这个配置放在：

```
learn_personal_portfolio_ai/boto_ses.py
```

代码很简单：

```python
import boto3

boto_ses = boto3.Session(region_name="us-east-1")
bedrock_runtime_client = boto_ses.client("bedrock-runtime")
```

为什么要单独放一个文件？因为这样我们可以在多个地方导入同一个客户端实例，避免重复创建连接。

### 5. 依赖管理

我们用到的开源库都声明在 `pyproject.toml` 里：

```toml
dependencies = [
    "boto3>=1.42.0,<2.0.0",         # AWS SDK
    "boto3-dataclass[bedrock-runtime]>=1.40.0,<2.0.0", # 类型化的响应
    "vercel-ai-sdk-mate>=5.0.1,<6.0.0", # AI SDK 适配器
    # ...
]
```

如果你之前运行过 `mise run inst`，这些依赖应该已经安装好了。

### 6. 最终集成：API 端点

所有的工具准备好了，最后一步是把它们组装到 API 端点里。这就是 `api/index.py` 的工作。

目前的代码是"硬编码"的——它不管用户问什么，都返回固定的回答。你的任务是把它改成真正调用 Bedrock 的版本。

代码的结构分成几个逻辑块：

**块 1：导入工具**
```python
from learn_personal_portfolio_ai.boto_ses import bedrock_runtime_client
from learn_personal_portfolio_ai.ai_sdk_adapter import request_body_to_bedrock_converse_messages
from learn_personal_portfolio_ai.multi_round_bedrock_runtime_chat_manager import ChatSession
```

**块 2：读取请求数据**
```python
request_body_data = await request.json()
request_body = RequestBody(**request_body_data)
```

**块 3：初始化 ChatSession 并发送消息**
```python
chat_session = ChatSession(
    client=bedrock_runtime_client,
    model_id="us.amazon.nova-micro-v1:0",
    system=[...],
)
# 设置对话历史...
response = chat_session.send_message([])
```

**块 4：把 AI 的回答返回给前端**
```python
output_text = response.output.message.content[0].text
# 通过 SSE 流式返回...
```

---

## 练习

### 练习 1：阅读现有代码

**目标：** 理解每个工具的作用。

在动手改代码之前，先花 10 分钟阅读这些文件：

1. `learn_personal_portfolio_ai/boto_ses.py` — AWS 客户端在哪里创建的？
2. `learn_personal_portfolio_ai/ai_sdk_adapter.py` — 主要的转换函数是什么？
3. `learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py` — `ChatSession` 类提供了什么方法？

回答这些问题：

- [ ] `bedrock_runtime_client` 是什么类型的对象？
- [ ] `request_body_to_bedrock_converse_messages()` 接收什么、返回什么？
- [ ] `ChatSession.send_message()` 返回的 response 对象，怎么获取 AI 的回答文本？

### 练习 2：理解当前代码的问题

**目标：** 找出 `api/index.py` 中需要修改的地方。

打开 `api/index.py`，找到 `handle_chat_data` 函数。你会发现：

1. 它没有导入我们的工具（没有 `ChatSession`，没有 `bedrock_runtime_client`）
2. 它没有调用 Bedrock API
3. 返回的是硬编码的 `"Hello Alice"`

```python
# 当前代码（硬编码）
yield f'data: {json.dumps({"type": "text-delta", "id": message_id, "delta": "Hello Alice"})}\n\n'
```

你的任务是把这个硬编码替换成真正的 AI 回答。

### 练习 3：完成集成

**目标：** 修改 `api/index.py`，让它真正调用 Bedrock。

我们已经准备了一个参考实现 `api/index_example.py`，你可以查看它的结构。但是——

> **注意：严禁照抄！**
>
> 直接复制粘贴不会帮助你学习。请理解每一块代码的作用，然后自己写出来。

按照这个顺序完成：

**步骤 1：添加导入**

在文件顶部添加必要的导入语句。你需要导入：
- `bedrock_runtime_client`（从 `boto_ses` 模块）
- `request_body_to_bedrock_converse_messages`（从 `ai_sdk_adapter` 模块）
- `ChatSession`（从 `multi_round_bedrock_runtime_chat_manager` 模块）
- `path_enum`（从 `paths` 模块，用于获取 system prompt）

**步骤 2：解析请求数据**

在读取 JSON 之后，用 `RequestBody` 类解析请求：
```python
request_body = RequestBody(**request_body_data)
```

记得先导入 `RequestBody`（从 `vercel_ai_sdk_mate.api`）。

**步骤 3：创建 ChatSession**

创建一个 `ChatSession` 实例，配置：
- `client`: 使用导入的 `bedrock_runtime_client`
- `model_id`: 使用 `"us.amazon.nova-micro-v1:0"`
- `system`: 包含 system prompt 和 cachePoint

**步骤 4：设置对话上下文**

设置初始对话历史，包括知识库内容和 cachePoint。这部分可以参考 `index_example.py` 的结构。

**步骤 5：转换并追加前端消息**

使用 `request_body_to_bedrock_converse_messages()` 把前端的消息转换成 Bedrock 格式，然后追加到对话历史。

**步骤 6：发送消息并获取回答**

调用 `chat_session.send_message([])` 获取 AI 的回答，提取文本内容。

**步骤 7：返回真实回答**

把硬编码的 `"Hello Alice"` 替换成 AI 的真实回答 `output_text`。

### 练习 4：验证结果

**目标：** 确认集成成功。

1. 启动开发服务器：
   ```bash
   mise run dev
   ```

2. 打开浏览器访问前端界面

3. 发送一条消息，观察：
   - 终端是否显示了 Bedrock API 的调用日志？
   - 前端是否收到了 AI 的真实回答（而不是 "Hello Alice"）？

4. 发送第二条消息，验证多轮对话是否正常工作

---

## 反思

让我们回顾一下这节课学到的内容。

我们做的事情其实很简单：把前端发来的数据转换成 Bedrock 能理解的格式，调用 API，再把结果返回给前端。

但为了让这个过程变得清晰、可维护，我们做了两件重要的事情：

**第一，我们造了工具。** `ai_sdk_adapter.py` 负责数据格式转换，`multi_round_bedrock_runtime_chat_manager.py` 负责管理对话状态。这两个"小工具"把复杂的逻辑封装起来，让 API 端点的代码变得简洁。

**第二，我们用了开源库。** `vercel-ai-sdk-mate` 和 `boto3-dataclass` 帮我们处理了很多底层细节。站在巨人的肩膀上，我们可以专注于业务逻辑。

这两点其实是软件工程的核心思维：**分解问题，然后为每个子问题找到或创造合适的工具**。

---

## 导师笔记

**这个练习的意义：**

如果你仔细回想，会发现我们前面几节课一直在为今天做准备。

- 第一课，我们学会了调用 Bedrock API——这是"原子操作"
- 第二课，我们学会了 Prompt Caching——这是"优化手段"
- 这一课，我们把它们组装成了真正可用的产品

这就是工程师解决复杂问题的方式：**先分解成小问题，逐个攻破，然后组装**。

很多初学者会犯一个错误：面对复杂任务时，试图一口气写出所有代码。结果是代码又长又乱，出了问题不知道从哪里找起。

正确的做法是：

1. **分析问题** — 这个任务涉及哪些子问题？
2. **逐个解决** — 每个子问题能不能用现有工具解决？需不需要自己造工具？
3. **验证每一步** — 在组装之前，确保每个工具单独都能正常工作
4. **组装集成** — 把工具组合起来，实现完整功能

这节课的两个"小工具"——适配器和会话管理器——就是这种思维的产物。它们不是什么高深的技术，但它们体现了工程思维：**把复杂的事情变简单，把重复的事情变成一次性**。

**给学生的建议：**

当你面对一个复杂任务时，不要急着写代码。先问自己：

- 这个任务可以分成哪几个步骤？
- 每个步骤需要什么输入，产生什么输出？
- 有没有现成的工具可以用？
- 哪些逻辑会被重复使用，值得封装成工具？

学会这种思维方式，比学会任何一个具体的 API 都重要。因为 API 会变，但分解问题的能力是永恒的。

---

## 快速参考

**启动开发服务器：**
```bash
mise run dev
```

**关键文件：**
- `api/index.py` — 需要修改的 API 端点
- `api/index_example.py` — 参考实现（不要照抄！）
- `learn_personal_portfolio_ai/ai_sdk_adapter.py` — 数据格式适配器
- `learn_personal_portfolio_ai/multi_round_bedrock_runtime_chat_manager.py` — 对话管理器
- `learn_personal_portfolio_ai/boto_ses.py` — AWS 客户端配置

**核心导入：**
```python
from vercel_ai_sdk_mate.api import RequestBody
from learn_personal_portfolio_ai.paths import path_enum
from learn_personal_portfolio_ai.boto_ses import bedrock_runtime_client
from learn_personal_portfolio_ai.ai_sdk_adapter import request_body_to_bedrock_converse_messages
from learn_personal_portfolio_ai.multi_round_bedrock_runtime_chat_manager import ChatSession
```

**获取 AI 回答文本：**
```python
response = chat_session.send_message([])
output_text = response.output.message.content[0].text
```
