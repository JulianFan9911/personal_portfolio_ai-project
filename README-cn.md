# 探索代码库：Top-Down 学习法

> 从你能看到的东西（UI）出发，一路追溯到源代码——这才是真正的代码阅读能力。

![Screenshot](./img/04-Setup-NextJs-FastAPI-Local-Dev-Env/01-example-hello-world-web-app.png)

## Overview

你已经把 app 跑起来了。然后呢？

大多数教程到这里就结束了。它们教你怎么运行代码，可能解释一下每个文件是干什么的，然后就没了。但这就像给你一张地图，却不教你怎么看地图。

这个教程不一样。我们不会告诉你东西在哪里，而是教你**怎么自己找到它们**。这个技能可以迁移到任何代码库、任何框架、任何语言。

## Learning Objectives

当你加入一个新团队或开始接触一个陌生项目时，你面对的代码库可能有成百上千个文件。没有人会递给你一张地图，你必须学会自己探索。

成长最快的开发者不是那些记住了文件位置的人——而是那些能高效导航任何代码库的人。这种探索能力，是区分"总是需要人带"的初级开发者和"能自己上手"的高级开发者的关键。

完成这个练习后，你将能够：

1. 理解 Top-Down 学习法的原理和优势
2. 掌握三种从 UI 元素定位代码的实用技巧
3. 练习从 UI 元素追溯到源代码的完整过程
4. 建立自主探索代码库的能力

## Prerequisites

- 你已完成上一个教程，能成功运行 `mise run dev`
- 你有浏览器，能访问 http://localhost:3000
- 你有 AI 助手可用（Claude、ChatGPT 等）

## What You'll Build

什么都不写。这个教程不写任何代码。

但你会收获更有价值的东西：**自信地探索任何代码库的能力**。完成后，你会知道屏幕上每个元素是哪个文件创建的，更重要的是，你会知道怎么在任何项目中自己找到这些信息。

---

## Key Concepts

### 什么是 Top-Down 学习法？

**Top-Down 学习法**是指从你能看到的东西出发，反向追溯它是怎么实现的。

不是这样学：
- 从头到尾读所有文件
- 背下项目结构
- 按部就班跟着教程走

而是这样学：
- 看到屏幕上的东西 → 问"这个从哪来的？"
- 找到答案 → 问"这个是怎么被加载的？"
- 继续追溯 → 直到找到入口点

这个方法有效的原因：
- 你带着上下文学习（能看到你正在研究的东西）
- 只学相关的内容（不在无用代码上浪费时间）
- 自然地建立心智地图（是连接，不是孤立的知识点）

### 另一种方法：Bottom-Up 学习法

**Bottom-Up 学习法**是指从基础开始，一层一层往上建立理解。

比如：
- 先读项目结构文档
- 研究配置文件
- 理解构建过程
- 然后再看组件

两种方法各有用处。Top-Down 适合快速探索，回答"这个东西是干什么的？"Bottom-Up 适合需要深入理解系统架构的时候。

**在这个教程中，我们专注于 Top-Down**，因为这是大多数初学者缺乏的技能，也是在新代码库中快速上手的最快方式。

### 找代码的三种技巧

当你看到屏幕上的某个东西，想找到它的源代码时，有三种主要方法：

**技巧一：文字搜索**

如果 UI 元素包含可见的文字，直接在代码库中搜索这段文字。

例如：你看到屏幕上有 "About Me" → 在代码中搜索 `"About Me"`

当有文字可搜时，这是最简单、最可靠的方法。

**技巧二：浏览器 DevTools**

如果没有可搜的文字（比如图片或图标），用 Chrome DevTools 检查元素，找到可识别的信息。

例如：你看到一张头像图片 → 右键点击，选择"检查" → 找到 class name、ID 或 src 属性 → 搜索这些

**技巧三：截图问 AI**

当其他方法都不管用时，截个图，圈出你好奇的元素，问 AI 助手。

例如："我圈出了这个按钮（红色圆圈）。我代码库里哪个文件创建了它？"

当你不知道该搜什么的时候，这个方法特别有用。

---

## Exercises

### Exercise 1: 启动应用

**目标：** 把 app 跑起来，识别出我们要追踪的所有 UI 元素。

**操作步骤：**

1. 打开终端，运行：
   ```bash
   mise run dev
   ```

2. 在浏览器中打开 http://localhost:3000

3. 看着屏幕，识别这些元素：
   - 导航栏里的 "Home" 链接
   - 头像图片（profile picture）
   - "John Doe" 名字和 "AI Engineer" 头衔
   - "About Me" 标题
   - Lorem Ipsum 那段文字
   - "Test API Hello Endpoint" 按钮
   - API Response 显示区域（点击按钮后出现）

**你会注意到：**

你看到的是一个简单的 portfolio 页面。屏幕上的每一个元素都是项目中某个文件创建的。你的任务就是找到那些代码。

> **关键洞察：** 在开始搜代码之前，先认真看看屏幕上有什么。你看到了哪些文字？哪些可以用来搜索？

---

### Exercise 2: 找到 "Home" 导航链接

**目标：** 练习技巧一（文字搜索），找到 "Home" 链接的定义位置。

**操作步骤：**

1. 看看导航栏。你看到了 "Home" 这个词。

2. **先自己试试：** 在继续往下读之前，试着自己在代码库中找到 "Home" 这个文字是在哪里定义的。用你编辑器的搜索功能或 `grep`。

3. **卡住了？** 这样做：搜索精确字符串 `"Home"`。你要找的是这个 label 在哪里被定义，不是在哪里被渲染。

4. 找到文件后，读一读周围的代码。试着理解：
   - 导航结构是怎么定义的？
   - 这个怎么变成可点击的链接的？
   - 这个组件是怎么被加载到页面上的？

**答案（自己试过之后再看）：**

"Home" 链接定义在 `app/_components/layouts/Navigation.tsx`：

```typescript
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
]
```

**追溯 import 链条：**

1. `Navigation.tsx` 导出一个 `Navigation` 组件
2. `app/(marketing)/layout.tsx` 导入并使用 `<Navigation />`
3. 这个 layout 包裹了 `(marketing)` 路由组里的所有页面
4. 当你访问 `/` 时，Next.js 渲染 `layout.tsx`，其中包含 `Navigation`

> **关键洞察：** 你在屏幕上看到的文字，往往在代码中以字符串字面量的形式出现。搜索精确字符串通常是找 UI 代码最快的方法。

---

### Exercise 3: 找到头像图片（Hero Image）

**目标：** 练习技巧二（DevTools），处理文字搜索不明显的情况。

**操作步骤：**

1. 看页面左边的圆形头像图片。

2. 没有文字可以搜。那我们用 DevTools。

3. 右键点击图片 → 点击"检查"（或按 F12）

4. 在 Elements 面板里，你会看到这个图片的 HTML。找找：
   - `src` 属性（图片从哪来的？）
   - 任何可能可搜的 class name

5. **自己试试：** 你看到了什么文件路径或 class name？搜索它。

**答案（自己试过之后再看）：**

在 DevTools 里，你会看到类似这样的：
```html
<img src="/images/profile.png" alt="John Doe Profile Photo" ...>
```

在代码库中搜索 `profile.png` 或 `John Doe Profile Photo`。

你会在 `app/(marketing)/_components/Hero.tsx` 找到它：

```tsx
<Image
  src="/images/profile.png"
  alt="John Doe Profile Photo"
  width={192}
  height={192}
  className="w-full h-full object-cover"
/>
```

**追溯 import 链条：**

1. `Hero.tsx` 导出一个 `Hero` 组件
2. `app/(marketing)/HomePageContent.tsx` 导入 `<Hero />`
3. `app/(marketing)/page.tsx` 导入 `<HomePageContent />`
4. 当你访问 `/` 时，Next.js 渲染 `page.tsx`

> **关键洞察：** DevTools 是你的 X 光视野。当你没法用文字搜索时，检查 HTML，搜索 attributes、class names 或文件路径。

---

### Exercise 4: 找到 "John Doe" 和 "AI Engineer"

**目标：** 用多个相关元素强化技巧一。

**操作步骤：**

1. 你看到 "John Doe"（大字）和 "AI Engineer"（小一点，高亮的文字）在头像下面。

2. **自己试试：** 在代码库中搜索这些字符串。

3. 注意到两个都在同一个文件里。这告诉你关于组件结构的什么信息？

**答案（自己试过之后再看）：**

两个都在 `app/(marketing)/_components/Hero.tsx`：

```tsx
<h1 className="...">
  John Doe
</h1>
<p className="...">
  <span className="text-highlight">AI Engineer</span>
</p>
```

**这揭示了什么：**

`Hero` 组件负责整个左侧的 profile 区域：图片、名字、头衔。这是一个常见的模式——把相关的 UI 元素组织到一个组件里。

> **关键洞察：** 当你找到一个元素，看看同一个文件里的其他代码。相关的元素通常在附近。

---

### Exercise 5: 找到 "About Me" 区块

**目标：** 练习找标题及其关联内容。

**操作步骤：**

1. 你看到右边有个青色的 "About Me" 标题。

2. **自己试试：** 搜索这个文字，找到它的定义位置。

3. 也找找 Lorem Ipsum 那段文字在哪里定义的。

**答案（自己试过之后再看）：**

两个都在 `app/(marketing)/_components/Hero.tsx`：

```tsx
<h2 className="...">
  About Me
</h2>

<p className="text-lg text-text-secondary mb-8 leading-relaxed">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry...
</p>
```

**注意这个结构：**

`Hero` 组件同时包含左列（profile）和右列（about 文字）。它是一个两列布局，但在同一个组件里。

> **关键洞察：** 组件边界不一定和视觉边界一致。一个组件可以管理多个视觉区块。

---

### Exercise 6: 找到 "Test API Hello Endpoint" 按钮

**目标：** 找到交互元素并理解它的行为。

**操作步骤：**

1. 看那个写着 "Test API Hello Endpoint" 的可点击按钮。

2. **自己试试：** 在代码库中搜索这个文字。

3. 找到按钮后，看看：
   - 点击时会发生什么？（找 `onClick`）
   - 它调用了什么函数？
   - 它请求了哪个 API endpoint？

**答案（自己试过之后再看）：**

在 `app/(marketing)/_components/Hero.tsx`：

```tsx
<button
  onClick={handleApiCall}
  disabled={isLoading}
  className="..."
>
  ...
  {isLoading ? "Loading..." : "Test API Hello Endpoint"}
  ...
</button>
```

`handleApiCall` 函数：

```tsx
const handleApiCall = async () => {
  setIsLoading(true)
  try {
    const response = await fetch("/api/hello")
    const data = await response.json()
    setApiResponse(JSON.stringify(data, null, 2))
  } catch (error) {
    setApiResponse("Error fetching API response")
  } finally {
    setIsLoading(false)
  }
}
```

> **关键洞察：** 对于交互元素，找到元素只是第一步。真正的理解来自追踪当你交互时会发生什么。

---

### Exercise 7: 找到 API Endpoint

**目标：** 从前端追踪到后端代码。

**操作步骤：**

1. 从 Exercise 6 你知道按钮调用了 `/api/hello`。

2. **自己试试：** 这个 API endpoint 在哪里定义的？搜索 `"/api/hello"` 或 `@app.get` 或类似的 API 装饰器。

3. **提示：** 这个项目用 FastAPI 做后端。API 代码不在 `app/` 文件夹里——看看别的地方。

**答案（自己试过之后再看）：**

API 定义在 `api/index.py`：

```python
@app.get("/api/hello")
async def hello_world():
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )
```

**等等——Next.js 怎么知道把 `/api/hello` 转发给 FastAPI？**

看看 `next.config.js`：

```javascript
rewrites: async () => {
  return [
    {
      source: "/api/:path*",
      destination:
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8000/api/:path*"
          : "/api/",
    },
    ...
  ];
},
```

这告诉 Next.js："当有人请求 `/api/任何东西` 时，转发给运行在 8000 端口的 FastAPI。"

> **关键洞察：** 现代应用经常有多个服务在通信。追踪一个请求可能会让你跨越服务边界。

---

### Exercise 8: 用 AI 找东西（技巧三）

**目标：** 练习用 AI 作为探索工具。

**操作步骤：**

1. 给运行中的应用截个图。

2. 用红圈圈出任何你好奇的元素。

3. **先自己试着提问：** 用你自己的话问 AI，看看能不能得到答案。

4. **如果效果不好，试试这些 prompt 模板：**

   - "我圈出了顶部的导航栏。哪个文件创建了它？"
   - "我圈出了头像后面的发光效果。这个从哪来的？"
   - "我圈出了 API response 框。哪个组件负责显示它？"

**你会注意到：**

AI 通常能仅通过视觉描述就识别出组件。这在以下情况特别有用：
- 你不知道该用什么术语搜索
- 元素是动态创建的
- 你想理解多个部分是怎么配合的

> **关键洞察：** AI 是探索的力量倍增器。不要犹豫去问"傻"问题——目标是学习，不是装聪明。

---

## Reflection: What Did We Learn?

完成这些练习后，你学会了：

**Top-Down 方法：**
- 从你能看到的东西（UI）出发
- 问"这个从哪来的？"
- 反向追溯到源代码
- 一直跟着 import 直到理解完整链条

**三种实用技巧：**
- 文字搜索：搜索可见的字符串
- DevTools：检查元素找到可搜的属性
- AI 助手：截图提问，其他方法不管用时的后备

**这个项目的结构：**
- `app/layout.tsx` 是根 layout（应用于所有页面）
- `app/(marketing)/layout.tsx` 给 marketing 页面加上导航
- `app/(marketing)/page.tsx` 是首页入口
- `app/(marketing)/HomePageContent.tsx` 是主要内容
- `app/(marketing)/_components/Hero.tsx` 包含大部分 UI 元素
- `app/_components/layouts/Navigation.tsx` 创建导航栏
- `api/index.py` 处理 API endpoints
- `next.config.js` 配置 Next.js 和 FastAPI 之间的路由

**最重要的是：**
- 知道"怎么找"比知道"在哪里"更有价值
- 这个技能可以迁移到任何代码库、任何框架
- 你练习探索越多，你就越快

---

## Mentor's Note

**为什么这个练习重要：**

我见过很多开发者在加入新项目时挣扎。他们等着别人来解释代码库，或者读着经常过时的文档。真正能茁壮成长的开发者是那些能独立探索和学习的人。

这个 Top-Down 技能不仅仅用于代码。它是一种基本的学习方法，适用于：
- 学习新产品（先用起来，再研究它怎么工作）
- 理解新业务（先看客户体验，再追踪流程）
- 调试问题（先看症状，再追踪原因）

**关键洞察：**

- **最好的地图是你自己画的。** 当你亲手追踪代码时，你建立的心智模型是任何文档都无法提供的。

- **不要害怕问"傻"问题。** AI 助手不会评判你。大胆使用它们来探索。目标是学习，不是装聪明。

- **Top-Down 和 Bottom-Up 相辅相成。** 用 Top-Down 快速理解相关的东西。用 Bottom-Up 当你需要深入、系统地理解时。两种都要掌握。

**下一步：**

1. 在另一个项目上试试同样的探索技巧
2. 当你遇到 bug 时，用 Top-Down 从症状追踪到原因
3. 练习给别人解释代码路径——教别人能强化学习

---

## Quick Reference

**启动开发服务器：**
```bash
mise run dev
```

**在代码库中搜索文字：**
```bash
# 用 grep
grep -r "搜索文字" --include="*.tsx" --include="*.ts"

# 用编辑器的搜索（VS Code 里是 Cmd+Shift+F）
```

**这个项目的关键文件：**

- `app/layout.tsx` - 根 layout，应用于所有页面
- `app/(marketing)/layout.tsx` - Marketing 页面的 layout，带导航
- `app/(marketing)/page.tsx` - 首页入口
- `app/(marketing)/HomePageContent.tsx` - 主要内容组件
- `app/(marketing)/_components/Hero.tsx` - Profile 和 about 区块
- `app/_components/layouts/Navigation.tsx` - 导航栏
- `api/index.py` - FastAPI 后端 endpoints
- `next.config.js` - Next.js 配置，包括 API rewrites

---

## Reference Implementation

这个教程是为 `06-Explore-Codebase-Top-Down` branch 设计的。

验证你的环境是否正确设置：

```bash
git checkout 06-Explore-Codebase-Top-Down
mise run inst
mise run dev
```

然后打开 http://localhost:3000，按照上面的练习操作。
