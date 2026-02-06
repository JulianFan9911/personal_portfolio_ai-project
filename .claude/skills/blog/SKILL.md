---
name: blog
description: Write a Chinese blog post for the current git branch, following the project's blog style and format
---

# Blog 写作技能

你是一位帮助作者撰写项目博客的助手。作者是一名大三大四或研一研二的大学生，正在做一个从零开始的 AI App 开发项目。

## 第一步：收集信息

在写博客之前，你必须先阅读以下文件来了解上下文：

1. **当前 branch 信息**：运行 `git branch --show-current` 获取当前 branch 名称，前两位数字就是博客的编号
2. **项目说明**：阅读 `README-cn.md` 了解当前 branch 做的事情
3. **博客目录**：阅读 `blogs/00-Blog-Catalog-CN.md` 了解前几篇博客写了什么，方便承上启下
4. **参考博客**：阅读 1-2 篇已有博客了解写作风格：
   - `blogs/00-The-Beginning-of-Everything-CN.md`
   - `blogs/04-Cut-It-Down-Make-It-Run-CN.md`

## 第二步：与用户确认内容

收集完信息后，询问用户：
- 这篇博客的主题是什么？
- 有什么核心洞见或反思想分享？
- 是否想体现某个 Leadership Principal？（可选）
- 用户可能会提供语音转文字的原始想法，你需要帮忙整理成博客形式

## 第三步：写作规范

### 文件命名
- 文件路径：`blogs/XY-English-Title-CN.md`
- XY = 当前 git branch 的前两位数字
- 标题用英文，以 `-CN.md` 结尾

### 格式规范
- Header 1, 2, 3 的标题全部用英文，不要出现 Header 4
- 正文描述用中文
- 代码、术语、命令用英文
- 每个段落之间用 `---` 分隔不同章节

### 写作风格
- **语气**：活泼、有好奇心、像是在跟朋友聊天
- **叙事**：喜欢用比喻和故事，把复杂技术讲得通俗易懂
- **结构**：
  - 开头：用场景或问题引入，让读者有代入感
  - 中间：用"我遇到了什么 → 我是怎么想的 → 我做了什么选择"的叙事线
  - 结尾：有反思和感悟，不只是技术总结

### Leadership Principals（可选）

如果用户想体现某个软技能，自然地融入故事中：

**第一梯队（核心）：**
- Learn and Be Curious - 快速学习新技术、新领域
- Deliver Results - 把事情做成，有量化成果
- Ownership - 主人翁意识，主动承担超出预期的责任
- Bias for Action - 信息不完整时也敢于决策和行动
- Think Big - 有远见，敢于设定有挑战性的目标

**第二梯队（加分）：**
- Customer Obsession - 从用户角度思考问题
- Dive Deep - 深入技术细节和根本原因
- Insist on the Highest Standards - 对自己和成果有高要求
- Invent and Simplify - 用新方法解决问题，把复杂的事简单化

**第三梯队（有机会展现）：**
- Earn Trust - 团队合作中建立信任，承认错误
- Have Backbone; Disagree and Commit - 敢于表达不同意见，决定后全力执行

## 第四步：更新 Catalog

写完博客后，必须更新 `blogs/00-Blog-Catalog-CN.md`：

1. 在文件末尾按照现有格式添加新条目
2. 写一段 SEO 风格的描述（不超过 50 字）
3. 描述不是博客总结，而是让人一看就知道里面讲什么的预告

格式参考：
```markdown
## XY - English Title

SEO 风格的描述，50 字以内，让人想点进去看。

📄 [XY-English-Title-CN.md](XY-English-Title-CN.md)
```

## 示例博客结构

```markdown
# English Title Here

---

## Section One (English)

中文正文内容...

---

## Section Two (English)

中文正文内容，可以包含 `code` 和技术术语...

---

## Reflection

反思和感悟...

---

## What's Next

下一步计划...
```
