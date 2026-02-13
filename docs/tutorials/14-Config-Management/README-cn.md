# Config Management: 让代码为扩展做好准备

> 功能已经跑通了，但在加新功能之前，我们先"回头整理"一下。

## 概述

上节课我们完成了部署，AI chat 在 Vercel 上跑得很好。功能完成了，任务结束了吗？

对于业余开发者来说，是的。但对于专业开发者来说，这只是开始。

这节课我们做两件"看起来多余但很重要"的事：

1. **Config Management** — 把配置值集中管理，为未来 scale 做准备
2. **代码重构** — 让主函数逻辑清晰，把可复用的代码抽离到独立模块

## 学习目标

这节课的重点不是"怎么写代码"，而是**为什么要这样组织代码**。这是设计哲学的传授。

完成本课后，你将能够：

1. **理解 Single Source of Truth 原则** — 明白为什么"一个值只在一个地方定义"是好的设计
2. **理解代码复用思想** — 把通用逻辑抽离到独立模块，供多处调用
3. **阅读清晰的主函数** — 读 `index.py` 应该像读英语，一步步做什么一目了然

## 前提条件

- 完成了上节课（部署成功，AI chat 在 Vercel 上工作）
- 理解 runtime detection 的概念

---

## 核心概念

### 1. 为什么要做 Config Management？

假设你的代码里有这样的情况：

```python
# boto_ses.py
boto_ses = boto3.Session(region_name="us-east-1", ...)

# some_other_file.py
client = boto3.client("s3", region_name="us-east-1")

# yet_another_file.py
REGION = "us-east-1"
```

现在老板说："我们要把服务迁移到东京，改成 `ap-northeast-1`。"

你需要：
1. 找到所有出现 `us-east-1` 的地方
2. 一个一个改
3. 祈祷你没有漏改任何一个

这就是 **配置散落** 带来的痛苦。

**核心原则：Single Source of Truth**

> **如果一个值可能被改动，它应该只在一个地方被定义。其他所有地方都是对它的引用。**

判断标准很简单：**如果你改一个字符串/数值，需要去多个文件改——那这个值就应该被抽象到 config。**

### 2. Config Pattern：dataclass + factory method

看看我们的解决方案 [config.py](./learn_personal_portfolio_ai/config.py)：

```python
@dataclasses.dataclass
class Config:
    aws_region: str | None = dataclasses.field(default=None)
    aws_access_key_id: str | None = dataclasses.field(default=None)
    aws_secret_access_key: str | None = dataclasses.field(default=None)
    max_message_length: int = dataclasses.field(default=1000)

    @classmethod
    def new(cls):
        if runtime.is_local():
            return cls.new_in_local_runtime()
        elif runtime.is_vercel():
            return cls.new_in_vercel_runtime()

config = Config.new()
```

**使用时只需要一行：**

```python
from learn_personal_portfolio_ai.config import config

region = config.aws_region
max_len = config.max_message_length
```

### 3. 代码重构：让主函数像读英语

看看重构后的 [api/index.py](./api/index.py)：

```python
@app.post("/api/chat")
async def handle_chat_data(request: Request):
    # Step 1: Log incoming request
    request_body_data = await debug_ai_sdk_request(request=request)

    # Step 2: Parse request
    request_body = RequestBody(**request_body_data)

    # Step 3: Check message length (commented out, you'll enable it!)
    # last_user_message = get_last_user_message_text(request_body)
    # if last_user_message and len(last_user_message) > config.max_message_length:
    #     ...

    # Step 4: Initialize chat session
    chat_session = ChatSession(...)

    # Step 5: Call Bedrock
    response = chat_session.send_message([])

    # Step 6: Return streaming response
    return StreamingResponse(ai_sdk_message_generator(output_text=output_text), ...)
```

**这就是好代码的样子：** 读主函数就像读英语，Step 1、Step 2、Step 3... 每一步做什么一目了然。

**核心思想：**

- **主函数只有流程控制** — 每一步都是一个 function call
- **具体逻辑放到独立模块** — 供复用，供测试

### 4. 复用的威力

看看 [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py) 里的函数：

```python
# 这个函数被复用了两次！
def ai_sdk_message_generator(output_text: str):
    """生成 AI SDK v5 格式的 SSE 流"""
    message_id = str(uuid.uuid4())
    yield f'data: {json.dumps({"type": "text-start", "id": message_id})}\n\n'
    yield f'data: {json.dumps({"type": "text-delta", "id": message_id, "delta": output_text})}\n\n'
    yield f'data: {json.dumps({"type": "text-end", "id": message_id})}\n\n'
    yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
    yield "data: [DONE]\n\n"
```

这个函数在 `index.py` 里被用了两次：
1. 正常返回 AI 回复时
2. 返回 "Message too long" 错误时

如果这段逻辑写在 `index.py` 里两次，将来 AI SDK 协议变了，你要改两个地方。抽成函数后，只改一个地方。

**这就是复用的威力：改一处，处处生效。**

### 5. 模块职责划分

| 模块 | 职责 |
|------|------|
| [api/index.py](./api/index.py) | 主函数，只有流程控制 |
| [config.py](./learn_personal_portfolio_ai/config.py) | 配置管理 |
| [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py) | AI SDK 格式转换、调试、SSE 生成 |
| [boto_ses.py](./learn_personal_portfolio_ai/boto_ses.py) | AWS 客户端初始化 |
| [utils.py](./learn_personal_portfolio_ai/utils.py) | 通用工具函数 |

每个模块做一件事，做好一件事。

---

## 练习

### 练习 1：阅读重构后的代码

**目标：** 理解代码组织方式。

1. 打开 [api/index.py](./api/index.py)，通读 `handle_chat_data` 函数
   - 注意它读起来是不是像英语？每一步在做什么？
   - 找到被注释掉的 "Check message length" 部分

2. 打开 [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py)，找到这两个函数：
   - `get_last_user_message_text()` — 提取最后一条用户消息
   - `ai_sdk_message_generator()` — 生成 SSE 流

3. 思考：为什么这两个函数放在 `ai_sdk_adapter.py` 而不是 `index.py`？

### 练习 2：启用消息长度限制

**目标：** 动手启用一个 config 功能，体验复用的威力。

我们在 config 里添加了 `max_message_length = 1000`，用于限制用户消息长度。检查逻辑已经写好，但被注释掉了。

**你的任务：**

1. 打开 [config.py](./learn_personal_portfolio_ai/config.py)，找到 `max_message_length` 字段

2. 打开 [api/index.py](./api/index.py)，找到这段被注释的代码：
   ```python
   # --- Check message length ---
   # Uncomment below to enable max message length check
   # last_user_message = get_last_user_message_text(request_body)
   # if last_user_message and len(last_user_message) > config.max_message_length:
   #     error_msg = f"Message too long..."
   #     response = StreamingResponse(
   #         ai_sdk_message_generator(output_text=error_msg),  # 复用！
   #         ...
   #     )
   #     return response
   ```

3. 取消注释（uncomment）那段代码

4. 启动开发服务器测试：
   ```bash
   mise run dev
   ```
   - 发送正常消息 → 应该正常工作
   - 发送超过 1000 字符的消息 → 应该返回 "Message too long" 错误

**注意观察：** 错误响应用的是 `ai_sdk_message_generator()`——和正常响应用的是同一个函数！这就是复用。

### 练习 3：运行测试

```bash
mise run test-python
```

测试代码在 [tests_python/test_config.py](./tests_python/test_config.py)，它验证 `Config.new()` 能成功创建实例。

---

## 反思

这节课我们做了两件事：

1. **Config Management** — 把配置值集中到一个地方
2. **代码重构** — 把可复用的逻辑抽离到独立模块

这些改动看起来很小，但它们让代码 **ready to scale**：

- 新加一个配置？改 `config.py` 一个文件
- AI SDK 协议变了？改 `ai_sdk_adapter.py` 一个文件
- 新同事要理解代码？读 `index.py` 主函数就够了

当你的项目从 3 个文件变成 30 个文件，从 1 个开发者变成 10 个开发者，你会感谢今天做的这些"看起来多余"的事。

---

## 导师寄语

**为什么这个练习重要：**

今天的改动看起来很小，但我想让你理解两个设计哲学：

**1. Single Source of Truth**

一个值只在一个地方定义。其他地方都是引用。

**2. 主函数像读英语**

好的代码，主函数应该能让人一眼看懂流程：
- Step 1: 解析请求
- Step 2: 检查长度
- Step 3: 调用 AI
- Step 4: 返回响应

具体怎么"解析请求"？怎么"调用 AI"？这些细节放到独立模块里。主函数只负责"指挥"，不负责"干活"。

**判断代码质量的标准：**

> "如果需求变了，我需要改多少个文件？"

如果答案是"一个"，你的设计是好的。

---

## 快速参考

**核心文件：**
- [config.py](./learn_personal_portfolio_ai/config.py) — 配置管理
- [ai_sdk_adapter.py](./learn_personal_portfolio_ai/ai_sdk_adapter.py) — AI SDK 适配器
- [api/index.py](./api/index.py) — 主函数入口

**使用 Config：**
```python
from learn_personal_portfolio_ai.config import config

region = config.aws_region
max_len = config.max_message_length
```

**运行测试：**
```bash
mise run test-python
```
