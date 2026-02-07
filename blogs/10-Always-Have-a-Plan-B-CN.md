# Always Have a Plan B

---

## Why Learn Two APIs

今天的教程让我学会了调用 AWS Bedrock。

但教程还要求我再学一个备用服务——Gemini 或者 GLM。

一开始我有点不理解：Bedrock 不是挺稳的吗？为什么要多学一个？这不是浪费时间吗？

做完之后我想了想，好像想明白了。

---

## Redundancy Is Not Waste

在系统设计中，这个原则叫做 **Redundancy**（冗余）。

- 数据库有主从备份——主库挂了，从库顶上
- 服务器部署在多个可用区——一个机房断电，其他机房还在
- 网络有多条线路——一条光纤被挖断，流量自动切换
- 硬盘做 RAID——一块盘坏了，数据不丢

乍一看，这些都是"浪费"——明明一个够用，为什么要两个？

但真正的工程师知道：**冗余不是浪费，是保险。**

你不会因为今天没出车祸就觉得安全带是浪费。你也不应该因为今天 AWS 没挂就觉得备用 API 是多余。

---

## My Plan B for AI

今天的教程让我学会了调用 AWS Bedrock。但教程还要求我掌握一个备用服务——Gemini 或 GLM。

一开始我觉得：这不是多此一举吗？Bedrock 不是挺稳的？

然后我想到了一些场景：

- 如果 AWS 某个 region 出故障呢？（[2017 年 S3 故障](https://aws.amazon.com/message/41926/)让半个互联网瘫痪）
- 如果 Bedrock 的某个模型被下架呢？
- 如果用户在中国，访问 AWS 延迟太高呢？
- 如果某个模型的输出质量突然变差呢？

这些都不是假设。它们都发生过。

所以我不只学了 Bedrock，还学了 Gemini。现在我的 AI 调用逻辑可以是：

```python
try:
    response = call_bedrock(prompt)
except BedrockError:
    response = call_gemini(prompt)  # Plan B
```

主服务挂了？没关系，备用服务顶上。用户甚至不会感知到。

这就是 **Graceful Degradation**（优雅降级）。

---

## The Mental Model

学完这个教程，我获得了一个新的思维模型：

**每当我依赖一个外部服务时，问自己：如果它挂了怎么办？**

- 用了 OpenAI？学一下 Claude 怎么调
- 用了 AWS S3？了解一下 Cloudflare R2
- 用了某个开源库？知道有没有替代方案

这不是让你每个服务都实现两遍。而是让你**知道备用选项在哪里**。

真正出问题的时候，"我知道还有另一条路"和"我完全不知道怎么办"，是天壤之别。

---

## Reflection

以前我觉得 Plan B 是一种悲观——好像在说"我觉得 Plan A 会失败"。

现在我理解了：**Plan B 不是不信任 Plan A，而是让 Plan A 可以更大胆。**

因为我知道有备用 API，所以我敢把 AI 功能上线。
因为我知道出问题有退路，所以我不用等到"万无一失"才行动。

有退路的人，反而走得更远。

---

## What's Next

Bedrock 会了，Gemini 也会了。

下一步，把 AI 接入聊天界面，让真正的用户能和 AI 对话。

如果 Bedrock 挂了？没关系，我有 Plan B。
