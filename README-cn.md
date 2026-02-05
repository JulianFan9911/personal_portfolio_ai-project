# 设置 Next.js + Python FastAPI 开发环境教程

## 你好！欢迎来到前后端开发的世界

还记得之前你只是写 Python 代码的时候吗？现在情况有所不同了——**你的项目现在同时有前端和后端代码**。

这是什么意思呢？简单地说：
- **前端**（Frontend）= 用户看到的网页，在浏览器里显示（使用 **Next.js** 和 **JavaScript**）
- **后端**（Backend）= 网页背后的服务器逻辑，处理数据和请求（使用 **Python FastAPI**）

现实中的大公司就是这样做的。一个 App 可能有几十个人，有些人专门写前端，有些人专门写后端，还有人做其他事情。**学会同时处理前后端，这是一个重要的职业技能。**

这个教程会带你一步步搭建这个前后端结合的开发环境，最后你可以看到一个真正的、能在浏览器里运行的网页。

---

## 在开始之前，你需要知道的

你已经学过了 Python 的基础知识，现在准备好学习：
- **什么是 Next.js？** 一个用于构建网页的现代 JavaScript 框架
- **什么是 FastAPI？** 一个用于快速构建后端服务的 Python 框架
- **它们怎么一起工作？** 前端发送请求 → 后端处理 → 后端返回数据 → 前端显示

---

## 第一步：理解项目的新结构

### 之前：只有 Python 后端

```
项目文件夹/
├── learn_personal_portfolio_ai/    ← Python 代码放在这里
├── tests_python/                   ← Python 测试
├── pyproject.toml                  ← Python 配置
└── mise.toml                        ← 任务配置
```

简单清晰——一种语言，所有东西都很容易找。

### 现在：Python 后端 + Next.js 前端

```
项目文件夹/
├── api/                            ← NEW: Python FastAPI 后端代码
│   └── index.py                       （这是后端核心！）
│
├── app/                            ← NEW: Next.js 前端代码
│   ├── (marketing)/                  （页面代码）
│   ├── _components/                  （可复用的组件）
│   ├── layout.tsx                     （网页的总体布局）
│   └── globals.css                    （网页的样式）
│
├── components/                     ← 前端的一些帮助工具
├── lib/                            ← 前端的一些工具函数
├── public/                         ← 网页要用的图片、图标等文件
├── styles/                         ← 更多样式文件
├── types/                          ← TypeScript 类型定义
│
├── package.json                    ← 前端的配置和依赖（重要！）
├── next.config.js                  ← Next.js 的配置
├── tsconfig.json                   ← TypeScript 配置
├── tailwind.config.ts              ← Tailwind CSS 配置
├── postcss.config.mjs              ← CSS 处理配置
│
├── pyproject.toml                  ← Python 的配置（之前就有）
├── mise.toml                       ← 任务配置（之前就有，现在更新了）
│
└── requirements.txt                ← Python 依赖列表（更新了）
```

**这些新目录是什么？你需要全部了解吗？**

不，别紧张！虽然看起来很多，但大部分文件只是"支持"的角色。你只需要关注三个最重要的部分：

### 🎯 你必须掌握的三个部分

#### 1️⃣ **`package.json`** - 前端的"身份证"

这个文件告诉前端需要哪些工具和库。类似于 Python 的 `pyproject.toml`，但这是给 JavaScript/Next.js 用的。

#### 2️⃣ **`api/` 目录** - 后端的核心代码

里面有 `index.py`，这是你的 FastAPI 后端代码。当你的网页需要数据时，就会向这里发送请求。

#### 3️⃣ **`app/` 目录** - 前端的核心代码

里面有 Next.js 的页面和组件。这就是用户在浏览器里看到的网页。

**记住这三个关键点，其他的都是辅助性的。**

---

## 理解其他配置文件（简单介绍）

你可能还看到一些其他文件，它们的作用是什么呢？

| 文件名 | 作用 | 你需要改吗？ |
|-------|------|-----------|
| `next.config.js` | 告诉 Next.js 怎么构建你的网页 | 一般不需要 |
| `tsconfig.json` | TypeScript 的配置（这保证代码没有类型错误） | 一般不需要 |
| `tailwind.config.ts` | Tailwind CSS 的配置（Tailwind 帮助你快速设计漂亮的网页样式） | 一般不需要 |
| `postcss.config.mjs` | CSS 处理配置 | 一般不需要 |
| `pnpm-lock.yaml` | 记录确切的依赖版本（保证别人用同样的版本） | 不要手动改 |

**简单来说：这些文件已经为你配置好了，你不需要深入了解它们。**

---

## 第二步：什么是 Next.js？什么是 FastAPI？

### Next.js：制作网页的框架

你可能听说过 React，Next.js 是基于 React 的。如果 React 是"制作网页的工具箱"，那 Next.js 就是"装备完整的工具车"。

**Next.js 帮你做什么？**
- 快速创建网页（不需要从零开始）
- 自动处理路由（URL 怎么对应哪个页面）
- 管理样式（怎么让网页好看）
- 连接前端和后端（让网页能和服务器通信）

### FastAPI：Python 的后端框架

FastAPI 让你用 Python 快速构建一个"服务器"，接收来自网页的请求，然后处理和返回数据。

**FastAPI 的特点：**
- 快速（名字里就有 "Fast"！）
- 简单（代码少，容易理解）
- 自动生成 API 文档（方便调试）

### 它们怎样一起工作？

```
用户在浏览器访问网页 (localhost:3000)
          ↓
    Next.js 前端代码运行
          ↓
用户点击按钮或提交表单
          ↓
前端发送请求给后端 (http://localhost:8000/api/hello)
          ↓
FastAPI 后端接收请求并处理
          ↓
后端返回数据（比如 {"message": "Hello!"}）
          ↓
前端接收数据并在网页上显示
```

这就是前后端通信的基本流程。

---

## 第三步：了解新的命令

以前你只需要运行 Python 代码，现在你需要同时运行 Next.js 前端和 FastAPI 后端。好消息是，`mise` 帮你协调一切。

### 查看 `mise.toml` 里的命令

打开 `mise.toml` 文件，你会看到里面有很多任务。我们重点关注这两个新命令：

#### 👉 `mise run dev` - 一键启动前后端

```toml
[tasks.dev]
description = "🚀 Start all development servers (Next.js + FastAPI)"
depends = ["kill"]
run = "pnpm exec concurrently 'mise run next-dev' 'mise run fastapi-dev'"
```

这个命令做了什么？
1. 先执行 `kill` 命令（关掉任何旧的服务）
2. 然后同时启动两个服务器：
   - Next.js（前端）在 `localhost:3000`
   - FastAPI（后端）在 `localhost:8000`

"同时启动"意味着两个服务器并排运行，互不干扰。

#### 👉 `mise run kill` - 关闭所有服务

```toml
[tasks.kill]
description = "🛑 Kill all development servers (Next.js + FastAPI)"
run = "uv run -- python kill-dev-servers.py"
```

这个命令做了什么？
- 关闭所有运行中的 Next.js 和 FastAPI 服务器

**为什么需要？** 有时一个服务器"卡"在后台，你需要干净地关闭它，然后重新启动。

---

## 第四步：理解 `package.json` 的依赖

打开 `package.json`，你会看到一堆名字奇怪的依赖。这些是什么？

```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "^18",
    "react-dom": "^18",
    "@radix-ui/react-dialog": "^1.1.4",
    "tailwindcss": "^3.4.17",
    ...更多...
  }
}
```

**简单解释：**
- `next` - Next.js 框架本身
- `react` 和 `react-dom` - React 库（Next.js 基于它）
- `@radix-ui/*` - 一堆漂亮的 UI 组件（按钮、对话框、菜单等）
- `tailwindcss` - 快速设计样式的工具
- 还有很多别的...

**你需要一个一个学这些吗？** 不需要！现在只需要知道它们存在就行。随着学习深入，你会逐步了解它们的用途。

---

## 第五步：设置环境（一步一步来）

现在开始真正的设置。按顺序执行以下命令：

### 1️⃣ 创建 Python 虚拟环境

```bash
mise run venv-create
```

**发生了什么？**
- 创建了一个叫 `.venv/` 的文件夹
- 这是一个"独立的房间"，Python 在里面安装它需要的所有包
- 这样做的好处：不会影响你电脑上其他 Python 项目

**怎么知道成功了？**
- 你应该看到一个 `.venv/` 文件夹被创建

### 2️⃣ 激活 Python 虚拟环境

```bash
source .venv/bin/activate
```

**发生了什么？**
- 告诉你的终端："从现在开始，使用 `.venv/` 里的 Python"
- 你的终端提示符会改变，开头会显示 `(.venv)`

**例子：**
```
你的电脑名:项目名 $ source .venv/bin/activate
(.venv) 你的电脑名:项目名 $
```

看到 `(.venv)` 就说明成功了！

### 3️⃣ 安装所有依赖

```bash
mise run inst
```

**发生了什么？**
这个命令会：
- 安装所有 Python 依赖（FastAPI、uvicorn 等）到 `.venv/`
- 安装所有 Node.js/JavaScript 依赖（Next.js、React 等）到 `node_modules/`

这可能需要一两分钟，因为要下载很多包。耐心等待！

**怎么知道成功了？**
- 命令完成后，没有红色错误信息
- 出现了一个 `node_modules/` 文件夹

### 4️⃣ 启动开发服务器

现在是激动的时刻！运行：

```bash
mise run dev
```

**发生了什么？**
- 同时启动了两个服务器：
  - Next.js 前端服务器（在 `localhost:3000`）
  - FastAPI 后端服务器（在 `localhost:8000`）

**你会看到很多输出信息，别紧张！** 这些都是正常的。你应该看到类似这样的：

```
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

**这意味着两个服务器都已启动！🎉**

### 5️⃣ 打开浏览器查看网页

打开你最喜欢的浏览器（Chrome、Firefox、Safari 等），输入：

```
http://localhost:3000
```

然后按回车。

**你应该看到什么？**

一个漂亮的网页应该加载并显示出来。这个网页是用 Next.js 写的，正在你的电脑上运行！

参考一下这个截图看看应该是什么样的：

![示例网页](img/01-example-hello-world-web-app.png)

---

## 第六步：前后端是怎么通信的？

现在你有了一个运行的网页。但它怎么和后端通信的呢？让我们看一下代码。

### 后端：FastAPI 提供的 API

打开 `api/index.py`：

```python
@app.get("/api/hello")
async def hello_world():
    """
    Hello World API endpoint - 用于测试 FastAPI 集成
    """
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )
```

这段代码做什么？
- 创建了一个 API 端点：`/api/hello`
- 当前端访问 `http://localhost:8000/api/hello` 时，它返回一个 JSON 响应
- JSON 是一种数据格式，包含 `message` 和 `status`

### 前端：调用后端的 API

现在看看前端怎么使用这个后端 API。你可以看 `app/test-api/page.tsx`（如果存在的话），或者在其他页面中，你会看到类似的代码：

```javascript
// 这是一个简化的例子，展示前端怎么调用后端 API
const response = await fetch('http://localhost:8000/api/hello')
const data = await response.json()
console.log(data.message)  // 打印："Hello from FastAPI!"
```

**流程是这样的：**

1. 前端代码运行，想获取一些数据
2. 发送一个请求到后端：`http://localhost:8000/api/hello`
3. 后端接收请求，执行 `hello_world()` 函数
4. 后端返回 JSON 数据：`{"message": "Hello from FastAPI!", "status": "success"}`
5. 前端接收数据，可以用它来更新网页的显示

**这就是前后端通信！**

---

## 第七步：理解项目的主要目录

现在你知道怎么跑起项目了，让我们快速了解一下里面的主要目录是做什么的。

### `app/` 目录 - 网页的内容

```
app/
├── (marketing)/
│   ├── page.tsx          ← 首页的代码
│   └── layout.tsx        ← 首页的整体布局
├── _components/          ← 可复用的组件（比如"导航栏"、"联系表单"）
├── layout.tsx            ← 整个网站的总体布局
└── globals.css           ← 整个网站的全局样式
```

**简单来说：** `app/` 里的代码就是用户在浏览器里看到的所有东西。

### `api/` 目录 - 后端的服务

```
api/
└── index.py              ← FastAPI 应用的主文件，所有 API 端点都在这里
```

**简单来说：** `api/index.py` 就是整个后端服务。当前端发送请求时，这里的函数会处理。

### `components/` 目录 - 通用的 UI 组件库

这里面有一堆已经写好的 UI 组件（按钮、卡片、模态框等）。你可以在 `app/` 里直接使用它们，无需重新写。

### `lib/` 目录 - 工具函数

这里有一些辅助函数，比如：
- 格式化日期的函数
- 生成 SEO 元数据的函数
- 其他通用工具

### `public/` 目录 - 静态文件

这里放网页需要的静态文件：
- 图片（`.png`、`.jpg` 等）
- 图标（`.ico` 等）
- 字体文件

### `styles/` 目录 - 样式文件

这里放全局的样式定义。

### `types/` 目录 - TypeScript 类型定义

TypeScript 让 JavaScript 代码更安全。这里定义了各种数据类型。

---

## 第八步：排查常见问题

如果你遇到问题，看看这个表格：

| 问题 | 解决方案 |
|------|--------|
| `command not found: mise` | 安装 mise：`curl https://mise.jdx.dev \| sh` |
| `.venv 文件夹不存在` | 运行 `mise run venv-create` 创建 |
| `node_modules 不存在` | 运行 `mise run inst` 安装依赖 |
| 浏览器访问 `localhost:3000` 显示"连接被拒绝"或"无法连接" | 确保 `mise run dev` 还在运行，检查是否有错误信息 |
| 后端服务报错"端口已被使用" | 运行 `mise run kill` 关闭旧服务，然后重新运行 `mise run dev` |
| 修改了代码但网页没有更新 | 刷新浏览器（按 Ctrl+R 或 Cmd+R），或检查控制台的错误信息 |
| "Cannot find module..."错误 | 检查文件路径是否正确，或重新运行 `mise run inst` 安装依赖 |

---

## 第九步：接下来做什么？

现在你有了一个运行的前后端项目！接下来可以：

1. **探索现有代码**
   - 打开 `app/` 看看前端页面是怎么写的
   - 打开 `api/index.py` 看看后端 API 是怎么写的
   - 尝试修改一些文字或颜色，看看网页怎么变化

2. **添加新的 API 端点**
   - 在 `api/index.py` 中添加新的 `@app.get()` 或 `@app.post()` 函数
   - 创建新的后端功能

3. **创建新的前端页面**
   - 在 `app/` 里创建新的页面
   - 调用后端的 API 获取数据
   - 展示数据在网页上

4. **深入学习**
   - 学习 React 和 Next.js 的更多特性
   - 学习 FastAPI 的更高级用法
   - 学习如何部署到真实服务器

---

## 快速参考：常用命令

```bash
# 安装依赖（第一次需要）
mise run inst

# 启动开发服务器（前后端一起运行）
mise run dev

# 关闭所有服务器
mise run kill

# 如果只想运行前端
mise run next-dev

# 如果只想运行后端
mise run fastapi-dev

# 只运行 Python 测试
mise run test-python

# 只运行 Node.js 测试
mise run test-node

# 运行所有测试
mise run test

# 导出 Python 依赖列表
mise run export
```

---

## 关键概念总结

✅ **前端（Frontend）** = 网页界面，用户看得到（Next.js + React）

✅ **后端（Backend）** = 服务器逻辑，处理数据（FastAPI + Python）

✅ **API** = 前后端通信的接口，定义了"前端可以向后端要什么数据"

✅ **`localhost:3000`** = 你的前端服务器地址

✅ **`localhost:8000`** = 你的后端服务器地址

✅ **`mise`** = 你的任务管理工具，帮你协调前后端

✅ **`package.json`** = 前端的配置和依赖清单

✅ **`api/index.py`** = 后端的核心代码

✅ **`app/`** = 前端的核心代码

---

## 祝贺！ 🎉

你现在已经：

- ✅ 理解了前后端分离的架构
- ✅ 成功搭建了 Next.js + FastAPI 开发环境
- ✅ 启动了一个真实运行的网页应用
- ✅ 了解了前后端如何通信
- ✅ 掌握了基本的命令和文件结构

你现在已经是一个**全栈开发者**！（Full-stack 意思是"既懂前端也懂后端"）

接下来的学习会更有趣。加油！💪

---

## 需要帮助？

如果遇到问题或有疑问：
- 检查上面的"排查常见问题"部分
- 查看终端的错误信息（通常能告诉你哪里出错了）
- 根据错误信息搜索解决方案

记住：**所有的开发者都会遇到错误，重要的是怎么读懂错误信息和解决它。**

祝你学习愉快！ 🚀
