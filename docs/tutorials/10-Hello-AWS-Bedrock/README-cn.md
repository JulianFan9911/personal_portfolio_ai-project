# Hello, AI! - 你的第一次 AI API 调用

> 用代码向 AI 说一声 "Who are you?"，迈出 AI 应用开发的第一步。

## 概述

在之前的课程中，你已经学会了如何配置 AWS 凭证和使用 `boto3.Session()`。今天，我们要用这些知识完成一件真正酷的事情：**用代码调用 AI 模型**。

这不是在网页上和 ChatGPT 聊天，而是通过 Python 代码，直接与企业级 AI 模型对话。一旦掌握这个技能，你就掌握了构建任何 AI 应用的基础。

## 学习目标

完成本课后，你将能够：

1. **理解 AI API 的本质** — AI 模型就是一个函数：输入问题，输出回答
2. **调用 AWS Bedrock API** — 使用 boto3 发送消息并接收 AI 的回复
3. **调用备用 AI 服务** — 掌握至少一个 Bedrock 之外的 AI API（Gemini 或 GLM）

## 前置条件

- 已完成 AWS 凭证配置（`~/.aws/credentials` 文件已就绪）
- 已安装项目依赖（运行过 `mise run inst`）
- 熟悉 `boto3.Session()` 的基本用法

---

## 核心概念：AI 就是一个函数

在开始写代码之前，先理解一个重要的概念：

```
你的问题 → [AI 模型] → AI 的回答
```

不管 AI 多复杂，从应用开发者的角度看，它本质上就是一个函数：
- **输入**：你给 AI 的问题或指令
- **输出**：AI 生成的回答

就像你不需要懂汽车引擎原理也能开车一样，你不需要懂神经网络也能调用 AI。

---

## 任务 1：运行 AWS Bedrock 脚本（必做）

### 理解代码

打开 [`scripts/test_ai_aws_bedrock.py`](./scripts/test_ai_aws_bedrock.py)：

```python
import boto3
import json

# 创建 Bedrock 客户端
session = boto3.Session()
bedrock = session.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'
)

# 准备消息
model_id = "us.amazon.nova-micro-v1:0"  # 使用最便宜的模型
system_prompt = "You are a helpful AI assistant."
user_message = "Who are you? Please answer in a short sentence."

# 构造请求
messages = [
    {
        "role": "user",
        "content": [{"text": user_message}]
    }
]

# 调用 API
response = bedrock.converse(
    modelId=model_id,
    messages=messages,
    system=[{"text": system_prompt}],
    inferenceConfig={
        "maxTokens": 200,
        "temperature": 0.7
    }
)

# 提取 AI 的回复
ai_response = response['output']['message']['content'][0]['text']
print("AI response:", ai_response)
```

### 代码解析

| 代码 | 作用 |
|------|------|
| `boto3.Session()` | 创建 AWS 会话，自动读取 `~/.aws/credentials` |
| `session.client('bedrock-runtime')` | 创建 Bedrock 服务客户端 |
| `model_id` | 指定使用哪个 AI 模型（Nova Micro 是最便宜的） |
| `messages` | 对话历史，包含角色（user/assistant）和内容 |
| `bedrock.converse()` | 核心！发送消息给 AI，获取回复 |

### 运行脚本

```bash
python scripts/test_ai_aws_bedrock.py
```

如果一切正常，你会看到类似这样的输出：

```
AI response: I'm an AI assistant created by Amazon to be helpful, harmless, and honest.
```

**恭喜！你完成了第一次真正的 AI API 调用！**

### 常见问题

**Q: 报错 `AccessDeniedException`？**

检查以下几点：
1. `~/.aws/credentials` 文件是否正确配置
2. IAM User 是否有 `AmazonBedrockFullAccess` 权限
3. 在 Bedrock 控制台是否已启用模型访问（Model access）

**Q: 报错 `Could not find credentials`？**

运行以下命令验证 AWS 配置：
```bash
aws sts get-caller-identity
```

---

## 任务 2：调用备用 AI 服务（选做其一）

为什么需要备用服务？因为：
- AWS Bedrock 可能在某些地区不可用
- 不同 AI 服务有不同的优势和定价
- 多掌握一个技能总是好的

**请从以下两个中选择一个完成：**

| 选项 | 服务 | 推荐用户 | 官方文档 |
|------|------|---------|---------|
| A | Google Gemini | 美国/海外用户 | [Gemini Quickstart](https://ai.google.dev/gemini-api/docs/quickstart) |
| B | 智谱 GLM | 中国用户 | [GLM API 文档](https://open.bigmodel.cn/dev/api/normal-model/glm-4) |

---

### 选项 A：Google Gemini

Gemini 是 Google 的 AI 服务，有非常便宜的免费额度。

**你的任务：**

1. 访问 [Google AI Studio](https://aistudio.google.com/) 获取 API Key
2. 设置环境变量 `GOOGLE_API_KEY`
3. 安装依赖：`pip install google-genai`
4. 完成 [`scripts/test_ai_google_gemini.py`](./scripts/test_ai_google_gemini.py)
5. 运行脚本，让 AI 回答 "Who are you?"

**提示：**
- 查看官方文档：[Gemini Python Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- 使用最便宜的模型：`gemini-2.0-flash`

> **重要：请先尝试自己完成！** 阅读官方文档，或者问 AI 助手（比如 ChatGPT、Claude）如何调用 Gemini API。自己动手查资料解决问题，是程序员最重要的技能之一。参考答案在文档末尾，但建议你不到万不得已不要看。

---

### 选项 B：智谱 GLM

智谱 AI 是中国领先的 AI 公司，GLM 模型性能优秀，在国内访问稳定。

**你的任务：**

1. 访问 [智谱 AI 开放平台](https://open.bigmodel.cn/) 获取 API Key
2. 设置环境变量 `ZHIPU_API_KEY`
3. 安装依赖：`pip install zhipuai`
4. 完成 [`scripts/test_ai_glm.py`](./scripts/test_ai_glm.py)
5. 运行脚本，让 AI 回答 "Who are you?"

**提示：**
- 查看官方文档：[GLM-4 API 调用示例](https://open.bigmodel.cn/dev/api/normal-model/glm-4)
- 使用最便宜的模型：`glm-4-flash`

> **重要：请先尝试自己完成！** 阅读官方文档，或者问 AI 助手如何调用 GLM API。参考答案在文档末尾，但建议你不到万不得已不要看。

---

## 对比：三种 AI 服务

| 服务 | 优势 | 适合场景 |
|------|------|---------|
| **AWS Bedrock** | 企业级稳定性、统一接口调用多种模型 | 生产环境、企业应用 |
| **Google Gemini** | 免费额度大、价格便宜 | 个人项目、学习测试 |
| **智谱 GLM** | 国内访问稳定、中文能力强 | 中国用户、中文场景 |

---

## 总结

今天你学会了：

1. **AI 模型 = 函数**：输入问题，输出回答
2. **调用 Bedrock API**：使用 `bedrock.converse()` 发送消息
3. **备用 AI 服务**：Gemini 或 GLM 作为 Bedrock 的替代方案

这看起来很简单，但这就是所有 AI 应用的基础。不管是 ChatGPT、GitHub Copilot 还是各种 AI 写作工具，底层都是在做同样的事情：

```
构造输入 → 调用 AI API → 处理输出
```

---

## 下一步

在下一课中，我们将把 AI 接入你的聊天界面，让网页用户也能与 AI 对话！

---

## 快速参考

**运行脚本：**

```bash
# AWS Bedrock
python scripts/test_ai_aws_bedrock.py

# Google Gemini
python scripts/test_ai_google_gemini.py

# 智谱 GLM
python scripts/test_ai_glm.py
```

**相关文档：**

- [AWS Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html)
- [Google Gemini Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [智谱 GLM API 文档](https://open.bigmodel.cn/dev/api/normal-model/glm-4)

---

## 参考答案（建议先自己尝试！）

<details>
<summary>点击展开 Google Gemini 参考答案</summary>

```python
# -*- coding: utf-8 -*-

"""
Use Google Gemini to ask "Who are you?" to AI.

- Gemini Models: https://ai.google.dev/gemini-api/docs/models
- Gemini Python Example: https://ai.google.dev/gemini-api/docs/quickstart
"""

import os
from google import genai

# 创建客户端
client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

# 调用 API
response = client.models.generate_content(
    model="gemini-2.0-flash",  # 使用最便宜的模型
    contents="Who are you? Please answer in a short sentence."
)

# 打印结果
print("AI response:", response.text)
```

</details>

<details>
<summary>点击展开智谱 GLM 参考答案</summary>

```python
# -*- coding: utf-8 -*-

"""
Use GLM to ask "Who are you?" to AI.

- GLM Models: https://open.bigmodel.cn/dev/howuse/model
- GLM Python Example: https://open.bigmodel.cn/dev/api/normal-model/glm-4
"""

import os
from zhipuai import ZhipuAI

# 创建客户端
client = ZhipuAI(api_key=os.environ.get("ZHIPU_API_KEY"))

# 调用 API
response = client.chat.completions.create(
    model="glm-4-flash",  # 使用最便宜的模型
    messages=[
        {"role": "user", "content": "Who are you? Please answer in a short sentence."}
    ]
)

# 打印结果
print("AI response:", response.choices[0].message.content)
```

</details>
