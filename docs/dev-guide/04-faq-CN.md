# 常见问题与操作手册

本文档包含常见的代码修改需求示例、Debug 技巧和部署流程。

---

## 前端代码修改示例

### 1. 修改网站标题和元数据

**需求：** 把网站标题从 "John Doe" 改成你自己的名字

**修改位置：** `lib/constants.ts`

```ts
export const METADATA = {
  TITLE: "Your Name - Software Engineer",  // 改这里
  DESCRIPTION: "Personal website of Your Name",
  AI_ASSISTANT_NAME: "AI Assistant",
};
```

**影响范围：** 浏览器标签页标题、SEO meta 标签

---

### 2. 修改 Landing Page 统计数据

**需求：** 更新首页显示的工作年限、项目数量等

**修改位置：** `data/achievement-stats.ts`

```ts
export const stats = [
  { value: "10+", label: "Years Experience" },  // 改这里
  { value: "50+", label: "Projects" },
  // ...
];
```

**影响范围：** Landing Page 的 `StatsSection` 组件

---

### 3. 修改 Chat 页面的快捷按钮

**需求：** 添加或修改聊天页面的预设问题按钮

**修改位置：** `data/suggested-actions.json`

```json
[
  {
    "title": "About Me",
    "label": "Tell me about yourself",
    "action": "Tell me about yourself"
  },
  {
    "title": "New Button",           // 添加新按钮
    "label": "Your custom question",
    "action": "Your custom question"
  }
]
```

**影响范围：** `components/chat/multimodal-input.tsx` 读取此文件

---

### 4. 修改 UI 样式（颜色、字体等）

**需求：** 更改主题颜色或字体

**修改位置：**
- 颜色变量：`app/globals.css` 的 CSS 变量
- 字体：`app/layout.tsx` 的 Google Fonts 导入
- Tailwind 配置：`tailwind.config.ts`

```css
/* app/globals.css */
:root {
  --accent: 210 100% 50%;  /* 修改强调色 */
}
```

---

## 后端代码修改示例

### 1. 修改 AI 的 System Prompt

**需求：** 调整 AI 的行为、语气或角色定义

**修改位置：** `learn_personal_portfolio_ai/prompts/instruction.md`

```markdown
You are a helpful AI assistant for [Your Name]'s portfolio website.
Your role is to answer questions about [Your Name]'s experience...
```

**注意：** 这个文件在 Bedrock 调用时作为 `system` 参数传入

---

### 2. 更新知识库内容

**需求：** 更新 AI 参考的背景信息（简历、项目经验等）

**修改位置：** `learn_personal_portfolio_ai/prompts/knowledge-base.md`

```markdown
# About Me
- Name: Your Name
- Role: Software Engineer
- Experience: ...

# Projects
- Project A: ...
- Project B: ...
```

**工作原理：** 这个文件在每次对话开始时注入到 Bedrock 会话，AI 会参考这些信息回答问题

---

### 3. 切换 AI 模型

**需求：** 从 Nova Micro 切换到其他模型（如 Claude）

**修改位置：** `learn_personal_portfolio_ai/config.py`

```python
@dataclasses.dataclass
class Config:
    model_id: str | None = dataclasses.field(
        default="us.anthropic.claude-3-haiku-20240307-v1:0"  # 改这里
    )
```

**可用模型：** 查看 AWS Bedrock Console 获取支持的 Model ID

---

### 4. 添加新的 API 端点

**需求：** 添加一个获取用户信息的 API

**修改位置：** `api/index.py`

```python
@app.get("/api/user-info")
async def get_user_info():
    return JSONResponse(content={
        "name": "Your Name",
        "role": "Software Engineer",
    })
```

**注意：** Vercel 会自动将 `api/index.py` 部署为 Serverless Function

---

## Debug 技巧

### 1. 查看前端 AI SDK 请求

打开浏览器开发者工具 → Network → 过滤 `chat` → 查看 Request Payload

```json
{
  "messages": [...],
  "id": "session-id"
}
```

### 2. 查看后端日志

本地开发时，FastAPI 日志会打印在终端。关键日志位置：

- `api/index.py` 中的 `debug_ai_sdk_request()` 会打印请求内容
- `ChatSession.debug_response()` 会打印 Bedrock 响应

### 3. 常见错误

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `403 Forbidden` from Bedrock | AWS credentials 无效或无权限 | 检查 `~/.aws/credentials` 或环境变量 |
| `useChat` 不更新 | API 返回格式不对 | 确保返回 AI SDK Data Stream 格式 |
| CORS 错误 | 跨域请求被拒绝 | Next.js rewrites 应该处理，检查 `next.config.js` |
| 消息不显示 | SSE 响应格式错误 | 检查 `ai_sdk_message_generator()` 输出 |

### 4. 本地测试 API

```bash
# 测试 hello 端点
curl http://localhost:8000/api/hello

# 测试 chat 端点
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "parts": [{"type": "text", "text": "Hello"}]}], "id": "test"}'
```

---

## 开发环境设置

### 首次设置

```bash
# 1. 安装 mise
curl https://mise.jdx.dev/install.sh | sh

# 2. 让 mise 安装工具链
mise install

# 3. 创建虚拟环境 + 安装依赖
mise run venv-create
mise run inst

# 4. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local
```

### 日常开发

```bash
# 启动开发服务器
mise run dev

# 停止服务器
mise run kill

# 运行测试
mise run test
```

### 常用端口

| 服务 | 端口 | URL |
|------|------|-----|
| Next.js | 3000 | http://localhost:3000 |
| FastAPI | 8000 | http://localhost:8000 |

---

## Vercel 部署流程

### 首次部署

1. 在 GitHub 上 fork 或 push 代码
2. 登录 [Vercel Dashboard](https://vercel.com)
3. Import 项目
4. 配置环境变量：
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
5. 点击 Deploy

### 更新部署

```bash
# 推送到 main 分支会自动触发部署
git push origin main
```

### 环境变量管理

| 变量 | 用途 | 在哪配置 |
|------|------|----------|
| `AWS_ACCESS_KEY_ID` | AWS 访问密钥 | Vercel Dashboard → Settings → Environment Variables |
| `AWS_SECRET_ACCESS_KEY` | AWS 密钥 | 同上 |
| `VERCEL` | Vercel 自动设置 | 自动 |

### 查看部署日志

Vercel Dashboard → Deployments → 选择部署 → View Build Logs / Function Logs

---

## 代码结构速查

| 要改什么 | 去哪里改 |
|----------|----------|
| 网站标题/描述 | `lib/constants.ts` |
| Landing Page 内容 | `app/(marketing)/_components/` |
| Chat UI | `components/chat/` |
| AI 行为 | `learn_personal_portfolio_ai/prompts/instruction.md` |
| AI 知识库 | `learn_personal_portfolio_ai/prompts/knowledge-base.md` |
| AI 模型 | `learn_personal_portfolio_ai/config.py` |
| API 端点 | `api/index.py` |
| 全局样式 | `app/globals.css` |
| Tailwind 配置 | `tailwind.config.ts` |
