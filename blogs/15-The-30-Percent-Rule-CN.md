# The 30% Rule

---

## The Portfolio That Looks Like Everyone Else's

功能全都有了。Landing Page 有了，AI Chatbot 能聊天了，部署到 Vercel 上了，链接发出去全世界都能访问。

但我打开浏览器看了一眼，总觉得哪里不对。

这个网站……长得和市面上所有 portfolio template 一模一样。同样的布局，同样的配色，同样的"千篇一律"。

如果我是 HR，每天要看几十份简历，打开这个页面，我会多停留一秒吗？

不会。

---

## The Instinct to "Do It Right from the Start"

我的第一反应是：早知道应该一开始就做好设计。

这是大多数人的直觉——像"风格"、"配色"、"品牌"这种全局性的东西，不是应该在项目开始前就定好吗？先出设计稿，再动手写代码，这才是"专业"的做法吧？

但我回想了一下这个项目的过程，发现这个直觉是错的。

如果我在第一天就开始纠结"用什么配色方案"、"要不要暗色模式"、"按钮圆角多少像素"——我可能到现在还在 Figma 里画线框图，一行代码都没写。

更重要的是，我根本不知道这个网站最终会长什么样。当时我连 Next.js 的 `layout.tsx` 是干嘛的都不清楚，怎么可能做出靠谱的设计决策？

---

## The 30% Rule

我开始琢磨：如果不是一开始，那什么时候做这种"全局性"的决策才对？

想了想这个项目的进度，我自己总结了一个判断标准：**大概在 30% 的时候**。

后来搜了一下，发现这个想法早就有人总结过了，甚至有个名字叫 "30% Rule"。核心意思差不多：

> **看起来应该"一开始就定好"的决策，最佳时机往往不是最开始，而是 30%。**

为什么是 30%？

- **0%** — 你什么都不知道。项目是什么样子、技术栈怎么组合、功能有哪些坑，全是未知数。这时候做的"设计决策"，大概率要返工。
- **30%** — 骨架有了，核心功能跑通了，你能看到全貌了。但项目还在早期，改起来成本不高。这是重新审视的最佳窗口。
- **70%** — 太晚了。代码已经写了一大堆，风格散落在几十个文件里，想统一就得大面积重构。改不动了。

这个项目走到现在，正好就在 30% 的位置：Landing Page 有了，Chat 功能有了，部署也搞定了。但后面还有很多功能要加。

现在做个性化，既能看清要改什么，又还有时间让新风格贯穿后续开发。

不早不晚，刚刚好。

---

## Think, Then Do

确定了"现在是对的时机"，下一个问题是：怎么做？

"让这个网站更好看"——这是一个非常模糊的需求。我可以换暗色主题，可以加动画，可以改成极简风，可以用更大胆的配色……方向太多了。

如果直接让 AI "帮我改好看一点"，结果大概率不是我想要的。AI 不知道我喜欢什么风格，不知道我想表达什么。

所以我换了一个策略：**先让 AI 想，给我选项，我来选。**

我用了 `/ui-ux-pro-max` 这个 Agent Skill，然后明确告诉它：

```
help me redesign my personal portfolio website - suggest 2-3 complete design directions,
brainstorm options first and don't code yet
```

关键词是 **brainstorm** 和 **don't code yet**。

AI 给了我三个方向，每个方向都有完整的布局建议、配色方案、字体搭配。我看了看，选了 Option B。

然后一句话：`I like Option B, please execute it.`

AI 开始动手改代码。十几个文件，几百行改动，两分钟搞定。

---

## Debug with Plain Language

改完之后我刷新页面，整体效果不错，但发现了一个小问题：Chat 页面的快捷按钮（"About Me"、"Work Experience"）hover 的时候整个变蓝，灰色的副标题看不清了。

以前遇到这种问题，我会去翻代码，找到对应的 CSS，研究 Tailwind 的类名，然后小心翼翼地改。

现在？直接用人话说：

```
on the chat page there are some shortcut buttons, when I hover,
the whole button turns blue and the gray subtitle is hard to see,
I think just the border should turn blue
```

AI 理解了我的意图，找到了 `multimodal-input.tsx`，改了几行 Tailwind 类名，问题解决。

我全程没碰代码，只是描述了问题和期望。

这就是 AI 时代的调试方式：**用人话说问题，让 AI 去改代码。**

---

## Let AI Teach You

但我不想只是"用完就走"。如果下次遇到类似问题，我还是得靠 AI，那我学到了什么？

所以改完之后，我多问了一句：

```
I'm satisfied with the result. Now tell me what you changed and why.
Explain each file you modified, so I can learn how to do this myself next time.
```

AI 给我列了改动的文件清单，解释了每个改动的原因：为什么用这个配色、为什么选这个字体组合、为什么 hover 效果要这样写。

这才是 AI 辅助学习的正确姿势：**让 AI 帮你做，然后让 AI 教你怎么做。**

---

## Reflection

回头看这个过程，最让我有感触的不是"网站变好看了"，而是关于时机的思考。

我们总有一种冲动：重要的决策要尽早做，越早越好，这样后面就不用改了。

但现实是，很多决策你根本没法在一开始就做对，因为你还不知道全貌。

**30% 法则给了我一个框架：**

- 一开始，先跑起来，粗糙没关系
- 到 30%，停下来，重新审视那些"全局性"的决策
- 这时候你既看得清全貌，又还有调整空间
- 过了 70%，就别折腾了，改不动

这个框架不只适用于 UI 设计。架构决策、技术选型、产品方向——很多"看起来应该早点定"的事情，其实都适合在 30% 的时候重新审视。

不是因为你一开始做错了，而是因为**你一开始根本没有足够的信息做对**。

---

## What's Next

网站终于有点"我的"样子了。

但 personal branding 不是一次性的事。后面每加一个新功能，都会沿着这个风格走下去。

30% 这个节点，既是回顾，也是起点。
