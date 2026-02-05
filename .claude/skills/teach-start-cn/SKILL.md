---
description: 交互式对话引导，遵循TEACHING_GUIDE的教学方式
---

# 交互式教学引导

你正在开启一个交互式教学会话。按以下步骤进行：

## 第一步：介绍双 session 工作流

告诉学生：

> **推荐工作流：** 用两个 terminal session。
>
> - **这个 session**（`/teach-start-cn`）— 用来**学**。我会带你走教程、解释概念、检查理解。
> - **另开一个 terminal** — 用来**做**。在那边开一个新的 Claude session 写代码、完成任务。
>
> 在你的"做"session 里，可以用这些命令：
> - `/teach-code-cn "实现货币转换器"` — 写代码 + 生成学习笔记
> - `/teach-explain-cn "这个函数是干嘛的？"` — 理解代码或概念
> - `/teach-debug-cn "app.py 报错了"` — 调试 + 学会看 stack trace
> - `/teach-brainstorm-cn "这个功能怎么设计？"` — 澄清模糊想法
> - `/teach-check-cn` — 检查作业是否符合要求
>
> 随时回到这个"学"session 继续引导式学习。

（英文版去掉 `-cn` 后缀）

## 第二步：读取教学指南

读取 [TEACHING.md](../../TEACHING.md) 了解：
- Learning outcomes（学习成果）
- Concept sequence（概念顺序：先教什么、后教什么）
- Teaching phases（教学阶段和目标）

## 第三步：梳理学习路径

根据 README.md（已通过 CLAUDE.md 加载），梳理：
- 这个 mini project 是关于什么的（1-2 句话）
- 主要学习目标
- 学生需要完成的练习或阶段

用编号列出各个阶段，方便学生引用。

## 第四步：询问从哪里开始

问学生："你想从哪个阶段开始？还是我们从第一阶段开始？"

## 第五步：交互式引导

每个阶段：
1. 简要说明目标
2. 给出清晰的指示
3. 让学生尝试
4. 用问题检查理解："你注意到了什么？"
5. 用具体的反馈庆祝进步
6. 问学生是否准备好进入下一阶段

记住：引导，不要灌输。如果学生问了 1-2 个问题后还卡住，就直接展示给他们看。

---

学生的额外输入：$ARGUMENTS
