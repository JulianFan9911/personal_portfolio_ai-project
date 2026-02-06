# 把 Next.js + FastAPI 应用部署到 Vercel

> 建立部署流水线，让你能即时验证代码改动是否能成功构建和部署。

## Overview

你已经在本地成功运行了 Next.js + FastAPI 的 full-stack application。现在，是时候把它部署到云端了。

**Vercel** 是一个专门为 Next.js 优化的云平台。它的特点是：
- 部署极其简单（连接 GitHub，自动部署）
- 免费额度足够个人项目使用
- 每次 push 代码自动重新部署

这个教程会带你走完整个部署流程。你不需要改任何代码，只需要在 Vercel 的界面上点点鼠标。

---

## Learning Objectives

部署是软件开发中的关键一环。写代码只是开始，**让用户能够访问你的应用**才是真正的价值所在。

很多初学者会把"部署"想象得很复杂：需要买服务器、配置域名、设置 SSL 证书、管理数据库... 但现代 SaaS 平台（比如 Vercel）把这些全部自动化了。你只需要把 GitHub repo 连接上去，剩下的它帮你搞定。

学会使用这类平台，意味着你可以快速把想法变成现实——写完代码，几分钟后全世界就能访问。

By the end of this exercise, you will:

1. 理解 Vercel 如何与 GitHub 集成
2. 完成 Vercel 账号与 GitHub 账号的授权绑定
3. 成功把 Next.js 应用部署到云端
4. 学会查看 deployment 状态和访问部署好的网站
5. 知道部署失败时如何 debug

## Prerequisites

- 你已经有一个包含 Next.js 代码的 GitHub repository
- 你已经注册了 Vercel 账号（如果没有，去 [vercel.com](https://vercel.com) 注册）
- 你的代码在本地已经能正常运行（`mise run dev` 能启动）

## What You'll Build

完成这个教程后，你会拥有一个可用的部署流水线：
- 每次你 push 代码到你的 branch，Vercel 自动构建和部署
- 你可以点击 "Visit" 查看 preview deployment，验证它是否正常工作
- 这**不是** production（我们没有 promote 到 main）——这是你个人验证代码能否正确部署的工具

把它想成 **部署的 TDD**：push → 看能不能 build → 有问题就修 → 重复。这种快速反馈循环是现代开发的核心。

---

## Key Concepts

### Vercel 是什么？

Vercel 是一个 **cloud platform**，专门用来部署 web applications。它的创始人就是 Next.js 的作者，所以 Vercel 对 Next.js 的支持特别好。

**工作原理：**
1. 你把代码 push 到 GitHub
2. Vercel 检测到代码更新
3. Vercel 自动 build 你的项目
4. Build 成功后，自动部署到它的服务器
5. 你的网站就上线了

这个流程叫做 **CI/CD（Continuous Integration / Continuous Deployment）**——代码一提交，自动构建部署。

### GitHub App 授权

为了让 Vercel 能读取你的 GitHub repo，你需要授权。这是通过安装一个 **GitHub App** 实现的。

这个授权过程会让你选择：
- **All repositories** - Vercel 可以访问你账号下所有的 repo
- **Only select repositories** - 只允许访问你选择的特定 repo

出于安全考虑，建议选择 **Only select repositories**，只授权需要部署的项目。

### Branch 和 Deployment 的关系

Vercel 会监听你 GitHub repo 的所有 branch：
- **main branch** - 通常作为 Production 环境
- **其他 branch** - 作为 Preview 环境

每当你 push 代码到任何 branch，Vercel 都会自动创建一个新的 deployment。这意味着你可以在 push 之前先在 Preview 环境测试，确认没问题再 merge 到 main。

### Framework Detection

第一次导入项目时，Vercel 会尝试自动检测你使用的 framework（Next.js、React、Vue 等）。如果检测成功，它会自动配置正确的 build 命令和输出目录。

如果检测失败（比如你的 main branch 代码不完整），你需要手动在 Settings 里设置 Framework Preset。

---

## Exercises

### Exercise 1: 创建新项目并导入 Repository

**Goal:** 在 Vercel 上创建一个新项目，并连接到你的 GitHub repo。

**What to do:**

1. 登录你的 Vercel Dashboard（[vercel.com/dashboard](https://vercel.com/dashboard)）

2. 在页面右上角，找到 **"Add New..."** 按钮，点击它，然后选择 **"Project"**

   ![Step 1: Add New Project](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/01-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   如图所示，点击 "Add New..." 下拉菜单后，选择 "Project"。

3. 你会看到 **"Let's build something new"** 页面。这里有两种方式导入 repo：

   ![Step 2: Import Git Repository](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/02-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   **方式一：从已绑定的 GitHub 账号导入**

   如果你之前已经绑定过 GitHub 账号，你会在 "Import Git Repository" 区域看到一个下拉菜单，列出你的 GitHub 账号。展开下拉菜单，找到你要部署的 repo，点击旁边的 **"Import"** 按钮。

   **方式二：如果没有看到你的账号**

   点击下拉菜单中的 **"+ Add GitHub Account"** 来添加你的 GitHub 账号。

   **方式三：直接输入 URL**

   如果你的 repo 是 public 的，也可以在上方的输入框 "Enter a Git repository URL to deploy..." 直接粘贴你的 GitHub repo URL，然后点击 "Continue"。

**What you'll notice:**

- Vercel 界面设计得很简洁，核心操作都很明显
- 右侧的 "Clone Template" 区域是给想用模板快速开始的人用的，我们不需要用它

> **Key insight:** Vercel 的设计理念是"把 GitHub repo 变成一个活着的网站"。你把代码放在 GitHub，Vercel 帮你把它变成可访问的服务。

---

### Exercise 2: 授权 Vercel 访问你的 GitHub（首次绑定）

**Goal:** 如果是第一次使用，需要授权 Vercel 访问你的 GitHub 账号。

**What to do:**

1. 当你点击 "Add GitHub Account" 后，会跳转到 GitHub 的授权页面。页面标题是 **"Install Vercel"**。

   ![Step 3: Install Vercel on GitHub](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/03-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   这个页面问的是：**"你想把 Vercel 安装到哪个 GitHub 账号/组织？"**

   如图所示，你可能会看到多个选项——你自己的个人账号，以及你加入的 GitHub Organizations。

   **重要：选对账号！** 如果你要部署的 repo 在你个人账号下，就选你的个人账号。如果在某个 Organization 下，就选那个 Organization。图中红色标注提醒你 "pick the right github account"。

2. 点击你要授权的账号右边的 **"Configure >"** 按钮。

3. 接下来，GitHub 会问你要授权哪些 repositories：

   ![Step 4: Select Repositories](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/04-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   你会看到两个选项：
   - **All repositories** - 授权所有 repo（方便但安全性较低）
   - **Only select repositories** - 只授权特定的 repo（推荐）

   如图所示，建议选择 **"Only select repositories"**，然后点击 "Select repositories" 下拉菜单，找到你要部署的 repo，点击选中它。

   **为什么选 "Only select repositories"？**

   出于安全考虑，最小权限原则。大公司的项目通常不会授权第三方服务访问所有代码。虽然对个人项目来说选 "All repositories" 也没什么问题，但养成好习惯是值得的。

4. 选好 repo 后，向下滚动，你会看到 Vercel 请求的权限说明：

   ![Step 5: Review Permissions and Request](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/05-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   权限包括：
   - **Read** access to members and metadata
   - **Read and write** access to administration, checks, code, commit statuses, deployments, issues, pull requests, and repository hooks

   这些权限让 Vercel 可以：
   - 读取你的代码来 build
   - 在你的 repo 上报告 deployment 状态
   - 自动在 PR 上添加 preview 链接

   确认无误后，点击绿色的 **"Request"** 按钮。

5. **等待审批（如果是 Organization）**

   如果你授权的是个人账号，授权会立即生效。

   但如果你授权的是 Organization（比如公司或学校的账号），Organization 的管理员可能需要审批。这种情况下：
   - 你会收到一封邮件通知
   - 管理员会收到审批请求
   - 管理员同意后，授权才会生效

   如果你自己就是管理员，去你的 GitHub Settings > Applications > Authorized OAuth Apps 或者 GitHub Apps 里同意就行。

**What you'll notice:**

- GitHub 的授权页面解释得很清楚，每个权限是什么用途
- 授权是可以随时撤销的（在 GitHub Settings 里）

> **Key insight:** 这个授权过程其实是在安装一个 "GitHub App"。Vercel 通过这个 App 来监听你的代码变化并触发自动部署。

---

### Exercise 3: 回到 Vercel 完成导入

**Goal:** 授权完成后，回到 Vercel 正式导入你的 repo。

**What to do:**

1. 授权完成后，回到 Vercel 的 "Let's build something new" 页面。

   ![Step 6: Import the Repository](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/06-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   现在你应该能在 "Import Git Repository" 区域看到你刚才授权的 repo 了。

   **注意：** 授权只是让 Vercel "能看到" 你的 repo，但还没有真正导入。你需要点击 repo 旁边的 **"Import"** 按钮才会开始导入流程。

2. 点击 **"Import"** 按钮。

**What you'll notice:**

- 如果你刚完成授权但看不到 repo，刷新一下页面
- 如果还是看不到，可能授权还没生效，稍等片刻或检查 GitHub 邮箱是否有审批请求

> **Key insight:** "看到 repo" 和 "导入 repo" 是两步。很多人授权完就以为搞定了，其实还要回来点 Import。

---

### Exercise 4: 配置项目并部署

**Goal:** 设置项目配置，然后触发第一次部署。

**What to do:**

1. 点击 Import 后，你会看到 **"New Project"** 配置页面：

   ![Step 7: Configure and Deploy](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/07-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   这个页面让你配置几个关键选项：

   **Importing from GitHub**
   - 显示你正在导入的 repo 名称
   - 注意右边显示的 branch（比如 `main`）。首次导入默认从 main branch 部署。

   **Vercel Team**
   - 选择项目要部署到哪个 team。如果你只有一个个人账号，这里只会显示一个选项。如果你加入了多个 team（比如个人账号 + 公司账号），选择正确的那个。

   **Project Name**
   - 你的项目在 Vercel 上的名称。这会影响你的默认 URL（`https://[project-name].vercel.app`）。

   **Application Preset** / **Framework Preset**
   - Vercel 会尝试自动检测你使用的 framework。如果检测到是 Next.js，这里会显示 "Next.js"。

   **其他选项**（通常不需要改）
   - Root Directory - 默认是 `./`
   - Build and Output Settings - Vercel 会根据 framework 自动配置
   - Environment Variables - 如果你的项目需要环境变量，在这里添加

2. 确认配置无误后，点击底部的 **"Deploy"** 按钮。

3. Vercel 会开始 build 你的项目。这个过程通常需要 1-3 分钟。你可以在页面上看到实时的 build log。

**What you'll notice:**

- Deploy 按钮点了之后会变成 "Deploying..."
- 你会看到 build 的进度和日志
- 如果一切顺利，最后会显示 "Congratulations!" 和你的网站 URL

> **Key insight:** 第一次部署会从 main branch 开始。如果你的 main branch 代码还不完整，部署可能会失败。别担心，我们接下来会处理这种情况。

---

### Exercise 5: 查看 Deployment 状态并访问网站

**Goal:** 学会查看 deployment 列表，以及如何访问部署好的网站。

**What to do:**

1. 部署完成后，进入你的项目 Dashboard。点击顶部导航栏的 **"Deployments"** tab。

   ![Step 8: View Deployments](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/08-Deploy-Hello-World-NextJs-App-to-Vercel.png)

   这里列出了所有的 deployments。每行代表一次部署，包含以下信息：

   - **Preview ID**（比如 "6XqAxLBoQ"）- 这次部署的唯一标识
   - **Status**（比如绿色的 "Ready"）- 部署状态。绿色 Ready 表示成功，红色 Error 表示失败
   - **Branch name**（比如 "05-Deploy-Hello-World-NextJs-App-to-Vercel"）- 这次部署来自哪个 branch
   - **Commit message**（比如 "Update chore.txt"）- 触发这次部署的 commit

2. **访问部署好的网站：**

   在任意一行的右边，点击 **三个点（"..."）** 按钮，会弹出一个菜单。选择 **"Visit"** 就可以在新窗口打开你部署好的网站。

   你也可以点击 "Copy URL" 把链接复制下来分享给别人。

3. **理解不同的 branch 部署：**

   注意看图中高亮的部分：
   - branch 是 `05-Deploy-Hello-World-NextJs-App-to-Vercel`
   - 类型是 "Preview"

   这意味着这不是 main branch（Production），而是一个 preview deployment。每个非 main 的 branch 都会生成自己的 preview URL。

**What you'll notice:**

- 每次你 push 代码到 GitHub，Vercel 都会自动创建新的 deployment
- Status 会从 "Building..." 变成 "Ready" 或 "Error"
- 一个项目可以有很多 deployments，它们都会保留在历史记录里

> **Key insight:** Vercel 的自动部署机制让你可以快速迭代。改代码 → push → 等几分钟 → 新版本上线。这就是现代开发的节奏。

---

### Exercise 6: 触发新的部署

**Goal:** 学会如何手动触发一次新的部署。

**What to do:**

我们现在要验证 Vercel 的自动部署机制。方法很简单：修改一个文件，push 到 GitHub，然后看 Vercel 是否自动部署。

1. **确保你在正确的 branch 上：**

   ```bash
   git checkout 05-Deploy-Hello-World-NextJs-App-to-Vercel
   ```

   （或者你当前正在开发的 branch）

2. **修改 `chore.txt` 文件：**

   这个项目里有一个 `chore.txt` 文件，它的内容不重要，专门用来触发部署。打开它，随便改点内容（比如加一行时间戳），然后保存。

   ```bash
   echo "Trigger deployment: $(date)" >> chore.txt
   ```

3. **Commit 并 push：**

   ```bash
   git add chore.txt
   git commit -m "Trigger deployment"
   git push
   ```

4. **回到 Vercel Dashboard 的 Deployments tab，**等几秒钟，你会看到一个新的 deployment 出现，状态是 "Building..."。

5. **等待 build 完成：**
   - 如果成功，状态会变成绿色的 "Ready"
   - 如果失败，状态会变成红色的 "Error"

6. **成功后，点击 "Visit" 访问你的网站。**

**What you'll notice:**

- 从 push 到部署完成通常只需要 1 分钟
- 不需要任何手动操作，Vercel 自动检测到 GitHub 的变化
- 每个 branch 的每次 push 都会触发一个独立的 deployment

> **Key insight:** `chore.txt` 这个文件的意义在于：当你只是想测试部署流程，但不想改动正经代码时，可以改它来触发部署。这是一个常见的技巧。

---

### 概念补充：什么是 CI/CD？

你刚才体验的"push 代码 → Vercel 自动部署"，在行业里有个专业名词：**CI/CD**。

- **CI（Continuous Integration，持续集成）**：每次你 push 代码，系统自动运行测试、检查错误、尝试构建。有问题立刻告诉你，不用等到部署时才发现。

- **CD（Continuous Deployment，持续部署）**：代码通过检查后，自动部署到服务器，网站立刻更新。

传统流程需要手动测试、手动构建、手动上传服务器，可能花几个小时还容易出错。现在有了 CI/CD，整个过程不到 2 分钟，全自动。

**这就是为什么 GitHub 一有改动，Vercel 就有反应**——它在帮你自动完成以前需要手动做的所有事情。

---

### Exercise 7: 处理 Framework Detection 失败（可选）

**Goal:** 学会在 Vercel 没有自动检测到 framework 时，如何手动配置。

**背景说明：**

首次导入项目时，Vercel 会从 main branch 读取代码来检测 framework。但如果你的 main branch：
- 代码还不完整
- 没有 Next.js 的标准结构
- 或者根本是空的

Vercel 就可能检测不出来这是一个 Next.js 项目。这时候，build 会失败。

**What to do:**

1. 进入你的项目 Dashboard，点击顶部导航栏的 **"Settings"** tab。

   ![Step 9: Framework Settings](./img/05-Deploy-Hello-World-NextJs-App-to-Vercel/09-Deploy-Hello-World-NextJs-App-to-Vercel.png)

2. 在左侧菜单中，找到并点击 **"Build and Deployment"**。

3. 在右侧找到 **"Framework Settings"** 区域。

4. 点击 **"Framework Preset"** 下拉菜单，从列表中选择 **"Next.js"**。

5. 点击底部的 **"Save"** 按钮保存配置。

6. 回到 Deployments tab，找到之前失败的 deployment，点击三个点菜单，选择 **"Redeploy"**。或者用 Exercise 6 的方法，修改 `chore.txt` push 一次来触发新部署。

7. 这次应该能成功了。

**What you'll notice:**

- Settings 页面有很多选项，大部分情况下不需要改
- Framework Preset 决定了 Vercel 用什么方式来 build 你的项目
- 一旦设置了正确的 framework，后续的部署都会使用这个配置

> **Key insight:** 这种问题通常只在首次导入时出现。一旦配置好了，后续就不用管了。关键是要会看 build log，它会告诉你哪里出错了。

---

## Reflection: What Did We Learn?

完成这个教程后，你学会了：

**Vercel 的核心工作流程：**
- GitHub repo → Vercel import → 自动 build → 网站上线
- 每次 push 代码 → 自动触发新的 deployment
- main branch → Production，其他 branch → Preview

**关键操作：**
- 如何在 Vercel 上创建新项目
- 如何授权 Vercel 访问你的 GitHub
- 如何查看 deployment 状态和 build log
- 如何访问部署好的网站
- 如何手动设置 Framework Preset

**Debug 思路：**
- 部署失败时，首先看 build log
- 检查 Framework Preset 是否正确
- 可以把错误信息截图或复制给 AI 帮你分析

---

## Mentor's Note

**Why this exercise matters:**

部署是把想法变成现实的最后一步。很多优秀的项目因为没有部署而永远只存在于开发者的电脑上。

我见过太多学生花了几周甚至几个月写代码，但从来没有让任何人真正用过。代码只有跑起来、被人使用，才有价值。部署就是连接"写代码"和"产生价值"的桥梁。

Vercel 这类平台把部署简化到了极致。以前需要运维工程师花几天配置的事情，现在几分钟就能搞定。这意味着作为开发者，你可以把更多时间放在写代码和创造价值上，而不是折腾服务器。

**Key insights:**

- **部署不是终点，是起点** - 部署上线只是开始。用户反馈、bug 修复、新功能迭代，这些才是真正的工作
- **Preview deployments 是神器** - 每个 branch 都有自己的 preview URL，这让你可以在 merge 之前先让别人看看效果
- **自动化是生产力倍增器** - CI/CD 看起来是"自动部署"，实际上它解放了你的精力，让你专注于创造

**Next steps:**

1. 尝试修改一些页面内容，push 上去，看看 Vercel 是否正确更新
2. 学习如何添加 Environment Variables（环境变量），这是部署真实应用必须的
3. 探索 Vercel 的 Analytics 和 Logs 功能，了解你的网站的访问情况
4. 考虑绑定自己的域名（Custom Domain）

---

## Quick Reference

**Vercel Dashboard URL:**
```
https://vercel.com/dashboard
```

**触发新部署（不改代码）：**
```bash
echo "$(date)" >> chore.txt
git add chore.txt && git commit -m "Trigger deployment" && git push
```

**查看当前 branch：**
```bash
git branch --show-current
```

**Key files:**
- `chore.txt` - 用于触发部署的占位文件，内容不重要

---

## Troubleshooting

**问题：授权完成后看不到 repo**
- 刷新 Vercel 页面
- 检查是否授权给了正确的 GitHub 账号/Organization
- 如果是 Organization，检查管理员是否已经审批

**问题：Build 失败**
- 点击失败的 deployment，查看 Build Log
- 检查 Settings > Build and Deployment > Framework Preset 是否设置为 Next.js
- 把 error log 截图或复制，让 AI 帮你分析

**问题：部署成功但页面显示不对**
- 确认你 push 的是正确的 branch
- 检查 preview URL 是否对应正确的 deployment
- 查看 Browser Console（F12）是否有错误

**问题：不知道怎么回到 Vercel 页面**
- 直接访问 https://vercel.com/dashboard
- 你的所有项目都在这里

---

## Reference Implementation

这个教程对应的完整代码在 `05-Deploy-Hello-World-NextJs-App-to-Vercel` branch。

要在本地测试：

```bash
git checkout 05-Deploy-Hello-World-NextJs-App-to-Vercel
mise run inst
mise run dev
```

然后打开 http://localhost:3000 确认本地能正常运行，再按照本教程部署到 Vercel。
