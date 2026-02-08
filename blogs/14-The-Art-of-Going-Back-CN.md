# The Art of Going Back

---

## The Temptation to Keep Moving

功能跑通了。AI chat 在 Vercel 上工作正常，用户发消息能收到回复。

按理说，下一步应该是加新功能：历史记录、多轮对话、更好看的 UI...

但导师说：先停一下，我们回头整理。

说实话，第一反应是有点困惑。代码不是能跑吗？为什么要"整理"？整理什么？

直到我打开 `boto_ses.py`，看到 `region_name="us-east-1"` 写死在里面。然后又在另一个地方看到同样的字符串。再然后又看到一个...

哦。

---

## The Hidden Cost of "It Works"

"能跑"和"好维护"是两回事。

想象一下这个场景：老板说，我们要把服务迁移到东京，region 改成 `ap-northeast-1`。

如果 `us-east-1` 散落在 5 个文件里，你需要：
1. 全局搜索这个字符串
2. 一个一个改
3. 祈祷自己没有漏改任何一个
4. 再祈祷没有改错任何一个

这就是**配置散落**的代价。现在只有 3 个文件，感觉还好。但当项目变成 30 个文件、300 个文件的时候，这种"技术债"会让人崩溃。

**Single Source of Truth** 就是解决这个问题的：一个值只在一个地方定义，其他地方都是引用。改一处，处处生效。

---

## Why This Matters More in the AI Era

这节课让我想到一个更大的问题：在 AI 时代，"回头整理"这件事变得前所未有的重要。

以前写代码，每一行都是自己敲的，自然知道逻辑在哪、为什么这样写。

现在不一样了。

AI 可以在 30 秒内生成 200 行代码。功能是能跑的，测试也能过。但问题是：**你真的理解这 200 行在做什么吗？**

如果不理解，你就成了代码的"搬运工"而不是"主人"。AI 写了什么你就用什么，出了 bug 你不知道从哪下手，加新功能你不知道往哪加。

**回头整理，就是把"AI 写的代码"变成"你的代码"的过程。**

- 读一遍，理解每一行在做什么
- 该抽函数的抽函数，该抽 config 的抽 config
- 确保你能解释给别人听

这不是浪费时间，这是**拿回控制权**。

---

## What We Actually Did

这节课做的事情其实很简单：

**1. Config Management**

把散落在各处的配置值集中到 `config.py`：

```python
@dataclasses.dataclass
class Config:
    aws_region: str | None = dataclasses.field(default=None)
    max_message_length: int = dataclasses.field(default=1000)

config = Config.new()
```

以后要改 region？改 `config.py` 一个文件就够了。

**2. 主函数像读英语**

看看重构后的 `index.py`：

```python
# Step 1: Log incoming request
request_body_data = await debug_ai_sdk_request(request=request)

# Step 2: Parse request
request_body = RequestBody(**request_body_data)

# Step 3: Check message length
# ...

# Step 4: Initialize chat session
# ...

# Step 5: Return streaming response
# ...
```

每一步做什么，一目了然。具体怎么做？点进函数去看。主函数只负责"指挥"，不负责"干活"。

**3. 复用的威力**

`ai_sdk_message_generator()` 这个函数被用了两次：正常返回 AI 回复时用一次，返回 "Message too long" 错误时又用一次。

如果这段逻辑写在 `index.py` 里两次，将来 AI SDK 协议变了，你要改两个地方。抽成函数后，改一处就够了。

---

## The Question That Reveals Code Quality

导师教了我一个判断代码质量的好问题：

> "如果需求变了，我需要改多少个文件？"

如果答案是"一个"，你的设计是好的。

如果答案是"三个以上"，你可能需要停下来整理了。

这个问题简单到有点粗暴，但非常实用。每次写完一个功能，问自己这个问题，就能发现很多隐藏的设计问题。

---

## Reflection

这节课最大的收获，不是学会了 dataclass 或者 factory method。

而是理解了**什么时候该停下来**。

很多人（包括以前的我）写代码的节奏是：冲冲冲，加功能，再冲冲冲，再加功能。直到某一天发现代码乱成一团，改一个地方崩三个地方，才后悔当初为什么不整理。

专业开发者的节奏不一样：冲一段，停下来整理，再冲一段，再整理。

**Milestone 完成后，是最好的整理时机。** 功能刚跑通，脑子里还记得逻辑，这时候整理成本最低。等过了三个月再回来看，你会发现自己像在读别人的代码。

上一篇博客说"第一个里程碑是起跑线"。这篇博客想说的是：**起跑之前，先把鞋带系好。**

---

## What's Next

代码整理好了，架构清晰了，接下来可以放心加新功能了。

但更重要的是，我学会了一个习惯：

**AI 帮我写完代码后，花 10 分钟回头整理，确保我能 handle。**

这 10 分钟，是从"用 AI"到"驾驭 AI"的关键一步。
