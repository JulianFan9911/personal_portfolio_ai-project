# Prompt Caching：给 AI 一个"备忘录"

> 当你每次都要重复大量背景信息时，Prompt Caching 能帮你省钱。

## Overview

想象一个场景：你在用 AI 分析一份 500 页的用户手册。你问了 10 个问题，每次提问都要把这 500 页的内容发给 AI。

问题来了——这 500 页的内容每次都一样，但你要付 10 次的钱。更糟的是，AI 每次都要重新"阅读"这 500 页，就像一个失忆的助手，每次见面都要重新介绍自己一样。

这显然不合理。如果 AI 能"记住"那些不变的内容就好了。

这就是 Prompt Caching 要解决的问题。

## Learning Objectives

在实际的 AI 应用中，你经常会遇到这种模式：

```
[大量静态背景信息] + [用户的问题]
```

比如，你可能需要把用户的个人资料发给 AI，然后问各种问题；或者把一份产品文档发给 AI，让用户可以随时提问；又或者把整个代码库的内容发给 AI，帮助开发者解决问题。

在所有这些场景中，背景信息是固定的，变化的只是用户的问题。如果你不了解 Prompt Caching，每次 API 调用都会为那些重复的静态内容付费。在生产环境中，这会造成显著的成本浪费。

完成本课后，你将能够：

1. **理解 Prompt Caching 的价值** — 知道它解决什么问题，以及什么场景适合使用
2. **理解工作原理** — 明白 cache write 和 cache read 的区别
3. **了解成本收益** — 知道 AWS Bedrock 中缓存读取可节省约 75% 的输入 token 费用
4. **实现 Prompt Caching** — 在 AWS Bedrock 中使用 `cachePoint` 标记缓存边界

## Prerequisites

在开始之前，请确保你已经完成了 "Hello, AI!" 课程，能够调用 AWS Bedrock API。你的 AWS credentials 应该已经配置好，项目依赖也已安装（通过 `mise run inst`）。

---

## Key Concepts

### 1. 问题场景：重复发送静态内容

让我们看一个典型的对话流程。假设你正在开发一个"个人助理"应用，需要根据用户资料回答各种问题：

**第一次提问：**
```
[用户资料 1000 tokens] + "推荐什么生日礼物？"
```

**第二次提问：**
```
[用户资料 1000 tokens] + "周末活动推荐？"
```

**第三次提问：**
```
[用户资料 1000 tokens] + "什么音乐适合我？"
```

注意到问题了吗？那 1000 tokens 的用户资料每次都要发送，每次都要付费。如果用户问 10 个问题，你实际发送了 10,000 tokens 的用户资料——但内容完全相同。

这就像每次打电话给客服都要重新报一遍身份证号、地址、历史订单。明明系统里都有，为什么要一遍遍重复？

### 2. Prompt Caching 的工作原理

Prompt Caching 的核心思想其实很简单：**让 AI 记住那些不变的内容**。

具体是怎么工作的呢？

当你第一次调用 API 时（我们称之为 **Cache Write**），你发送静态内容和问题，AI 会把静态内容存入缓存，你付正常价格。这一步是必要的"投资"。

之后的调用（我们称之为 **Cache Read**）就不一样了。你仍然发送相同的静态内容和新问题，但 AI 会发现缓存里已经有这些内容了，于是直接使用缓存，不需要重新处理。这时候，你只需付约 25% 的价格！

这就像浏览器缓存图片一样：第一次访问网站要下载图片，之后浏览器发现本地已经有了，就直接用缓存，不需要再次下载。

### 3. 底层原理：节省的是什么？

你可能会好奇：缓存到底节省了什么？

当你把一段文本发给 AI 时，AI 需要**解析**这段文本。这个过程叫做"tokenization"加上后续的向量化处理——简单来说，就是把人类的文字转换成 AI 能理解的内部表示形式。

这个解析过程需要计算资源，所以要收费。文本越长，计算量越大，费用越高。

Prompt Caching 节省的就是这个"解析"的成本。第一次调用时，AI 解析静态内容并存入缓存，你付正常价格。后续调用时，AI 直接用缓存里已经解析好的结果，省去了重复解析的计算量，所以只收你约 25% 的价格。

这里要说明一点：这主要是**成本**上的节省，而不是时间上的显著提升。为什么？因为对于现代 AI 模型来说，解析文本的时间相比生成回答的时间并不是主要瓶颈。生成回答才是最耗时的部分。所以你可能不会感觉到明显的速度提升，但账单会实实在在地变少。

### 4. AWS Bedrock 的实现：cachePoint

理论说完了，来看看代码怎么写。

在 AWS Bedrock 中，你用一个叫 `cachePoint` 的标记来告诉 AI："从这里开始，前面的内容请缓存起来。"

```python
messages = [
    {
        "role": "user",
        "content": [
            # 静态内容（会被缓存）
            {"text": static_context},

            # 缓存边界标记——这是关键！
            {"cachePoint": {"type": "default"}},

            # 动态内容（不会被缓存）
            {"text": question},
        ],
    }
]
```

规则很简单：`cachePoint` **之前**的内容会被缓存，**之后**的内容不会被缓存。

所以你需要把不变的内容（比如用户资料、文档内容）放在 `cachePoint` 前面，把每次都会变的内容（比如用户的问题）放在后面。这样，静态内容只需要解析一次，后续调用都能享受缓存带来的价格优惠。

### 5. 重要限制：最低 Token 要求

在你兴奋地准备使用这个功能之前，有一个重要的限制需要了解：**静态内容必须至少达到 1024 tokens**。

为什么有这个限制？因为缓存本身也有成本——存储、管理、查找都需要资源。如果内容太短，缓存带来的收益还不够抵消缓存本身的开销，那就得不偿失了。所以 AWS 设置了一个最低门槛。

更需要注意的是，如果你的静态内容太短，caching 会**静默失效**——不会报错，代码照常运行，只是不会有任何缓存效果。你可能以为在省钱，其实一分没省。这一点很容易踩坑。

不同模型的最低要求略有不同：Nova Micro/Lite/Pro 需要 1024 tokens，Claude 模型需要 1024 到 4096 tokens 不等。具体数字请查阅官方文档。

### 6. 成本收益

来算一笔账，让你对收益有个直观的认识。

以 AWS Bedrock 为例，Cache Write（写入缓存）按正常价格收费，而 Cache Read（读取缓存）只收约 25% 的价格，相当于**节省约 75%**。

假设你的静态内容是 1000 tokens，用户问了 10 个问题。

如果不使用缓存，每次调用都要为这 1000 tokens 付费。10 次调用 × 1000 tokens = 10,000 tokens，全部按正常价格计费。

如果使用缓存呢？第一次调用付 1000 tokens 的正常价格（同时写入缓存），后续 9 次调用每次只付 1000 × 25% = 250 tokens 的等价价格。总计：1000 + 250 × 9 = 3250 tokens 的等价成本。

节省了多少？(10000 - 3250) / 10000 = **67.5%**。

而且，问的问题越多，节省比例越接近 75%。如果用户问 100 个问题，节省比例就是 (100000 - 1000 - 99 × 250) / 100000 ≈ **74.3%**。

当然，不同 AI 服务商的定价策略不同。75% 的节省是 AWS Bedrock 的数据，其他供应商（比如 OpenAI、Anthropic 直接 API）可能有所不同。在实际使用时，请查阅各平台的官方定价文档。

---

## Exercises

理论讲完了，现在让我们动手实践，亲眼看看 Prompt Caching 的效果。

### Exercise 1：运行脚本，观察缓存效果

**Goal：** 亲眼看到 cache write 和 cache read 的区别。

在开始之前，建议你先花两分钟浏览一下脚本文件 `scripts/test_ai_aws_bedrock_with_cached_prompt.py`，大致了解代码结构。不需要理解每一行，只要知道它做了什么就行：发送一个用户 profile（静态内容），然后问三个不同的问题。

准备好了吗？运行脚本：

```bash
python scripts/test_ai_aws_bedrock_with_cached_prompt.py
```

运行完成后，仔细观察输出。你会看到类似这样的结果：

```
TURN 1
Q: Based on my profile, what birthday gift would you recommend?
A: [AI 的回答]
Tokens: input=XX, output=XX, total=XX
Cache:  write=XXX, read=0  <-- Writing to cache

TURN 2
Q: What weekend activity would suit me?
A: [AI 的回答]
Tokens: input=XX, output=XX, total=XX
Cache:  write=0, read=XXX  <-- Cache hit (75% cheaper!)

TURN 3
Q: What music playlist matches my personality?
A: [AI 的回答]
Tokens: input=XX, output=XX, total=XX
Cache:  write=0, read=XXX  <-- Cache hit (75% cheaper!)
```

重点看 `Cache:` 那一行。在 Turn 1 中，`write` 的值大于 0 而 `read` 是 0，这说明静态内容正在被写入缓存。到了 Turn 2 和 Turn 3，情况反过来了——`write` 变成 0，`read` 变得大于 0。这就是缓存命中！AI 直接从缓存读取了之前存储的内容，你只需要付 25% 的价格。

> **Key insight：** 第一次调用是"投资"，后续调用是"回报"。问的问题越多，投资回报率越高。这就是为什么 Prompt Caching 特别适合"一次设置，多次提问"的场景。

---

### Exercise 2：计算你的节省

**Goal：** 用实际数字理解成本节省。

光看输出还不够直观，让我们动手算一算。根据你在 Exercise 1 中看到的输出，填写以下内容：

1. Turn 1 写入缓存的 tokens 数（`write` 的值）：______
2. Turn 2 从缓存读取的 tokens 数（`read` 的值）：______
3. Turn 3 从缓存读取的 tokens 数（`read` 的值）：______

现在来计算实际节省：

4. 总共从缓存读取的 tokens = Turn 2 + Turn 3 = ______
5. 这些 tokens 如果不用缓存，要付全价；用了缓存只付 25%，所以节省了 75%
6. 节省的等价 tokens = 第 4 步的结果 × 75% = ______

如果脚本的 profile 约 900 tokens，3 次调用中有 2 次使用缓存，你大约节省了 900 × 2 × 75% = 1350 tokens 的等价成本。这只是 3 次调用的结果。想象一下在生产环境中，如果用户每天问 100 个问题，一个月下来能省多少？

> **Key insight：** Prompt Caching 是典型的"前期投资，后期回报"模式。单看第一次调用，没有任何节省；但随着调用次数增加，累积的节省会越来越可观。这就是为什么它在高频调用的生产环境中特别有价值。

---

### Exercise 3：理解 cachePoint 的位置

**Goal：** 理解代码中 `cachePoint` 的作用，以及为什么要放在那个位置。

现在打开 `scripts/test_ai_aws_bedrock_with_cached_prompt.py`，找到 `send_message_with_cache` 函数。在大约第 95-122 行，你会看到 `messages` 的构建代码。

仔细观察这段代码的结构，然后回答以下问题：

1. `cachePoint` 之前放的是什么内容？
2. `cachePoint` 之后放的是什么内容？
3. 为什么要这样安排顺序？如果把顺序反过来会怎样？

想好了吗？这是参考答案：

`cachePoint` 之前放的是 `static_context`，也就是用户的 profile——这是不变的内容。`cachePoint` 之后放的是 `question`，也就是每次都不同的问题。

为什么这样安排？因为缓存的价值在于避免重复处理相同的内容。用户 profile 每次都一样，所以值得缓存；而问题每次都不同，缓存它没有意义。如果把顺序反过来——先放问题，再放 profile——那问题会被缓存，profile 反而不会。下次换个问题，缓存就失效了，完全起不到省钱的效果。

> **Key insight：** `cachePoint` 的位置决定了什么被缓存。记住这个原则：把不变的内容放在 `cachePoint` 前面，把变化的内容放在后面。这个顺序不能搞反。

---

## Reflection

让我们回顾一下这节课学到的内容。

Prompt Caching 解决的是一个很实际的问题：当你需要反复发送相同的背景信息时，如何避免为这些重复内容多次付费？它的工作原理也很直观——第一次调用把静态内容写入缓存，付正常价格；后续调用从缓存读取，只付约 25% 的价格。底层节省的是 AI 解析文本的计算成本。

在 AWS Bedrock 中，使用方法很简单：用 `cachePoint` 标记缓存边界，把静态内容放前面，动态问题放后面。但要注意最低 1024 tokens 的限制，否则缓存会静默失效。

什么场景适合使用 Prompt Caching？任何"大量背景信息 + 多次提问"的模式都适合。比如分析长文档并问多个问题、基于用户资料的个性化对话、需要反复参考同一份背景资料的任务等。

---

## Mentor's Note

**为什么这个练习重要：**

在我看来，Prompt Caching 这个知识点的价值，远不止于"学会一个 API 功能"。它体现了一个更重要的工程原则：**理解你的工具的成本模型**。

我见过很多人用 AI API 就像用自来水——打开水龙头就行，不关心计量。这在学习阶段没问题，但在生产环境中，这种态度会让你的账单失控。我曾经见过一个团队，因为不了解 token 计费机制，每个月多花了几千美元。

当你理解了 token 是怎么计费的、缓存是怎么工作的，你就能做出更聪明的架构决策。你会开始问自己：这段内容是否该缓存？静态信息应该放在 prompt 的哪个位置？预期的调用模式是什么？这些问题，都需要你理解底层的成本模型才能回答。

**Key insights：**

省钱是工程师的基本功。好的工程师不是只追求"能用就行"，而是要"用得省、用得好"。在资源有限的现实世界里，能用更少的成本达到相同效果，就是一种竞争力。

同时也要记住，场景决定技术。Prompt Caching 不是银弹，它只有在"重复静态内容 + 多次调用"的场景才有价值。如果你的应用每次调用的内容都完全不同，或者调用频率很低，那缓存带来的收益可能不值得额外的复杂度。技术选型永远要基于具体场景。

另外，我建议你养成一个习惯：阅读 API 文档时，不要跳过定价部分。那里藏着很多优化机会。很多开发者只看功能文档，不看定价文档，结果错过了很多省钱的技巧。

**Next steps：**

当你下次开发 AI 应用时，问自己这三个问题：

1. 我的 prompt 中有多少内容是每次都一样的？
2. 用户会问多少次问题？调用频率如何？
3. 开启缓存的 ROI 是否值得？需要多少次调用才能回本？

这种成本意识，会让你在团队中脱颖而出。毕竟，在 AI 应用越来越普及的今天，能控制成本的工程师，比只会调用 API 的工程师更有价值。

---

## Quick Reference

**运行脚本：**

```bash
python scripts/test_ai_aws_bedrock_with_cached_prompt.py
```

**cachePoint 用法：**

```python
messages = [
    {
        "role": "user",
        "content": [
            {"text": static_context},           # 会被缓存
            {"cachePoint": {"type": "default"}}, # 缓存边界
            {"text": question},                  # 不会被缓存
        ],
    }
]
```

**响应中的缓存指标：**

```python
usage = response.get("usage", {})
cache_write = usage.get("cacheWriteInputTokens", 0)  # 写入缓存的 tokens
cache_read = usage.get("cacheReadInputTokens", 0)    # 从缓存读取的 tokens
```

**Key files：**
- `scripts/test_ai_aws_bedrock_with_cached_prompt.py` — 完整的 Prompt Caching 示例

**Documentation：**
- [AWS Bedrock Prompt Caching](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html)
