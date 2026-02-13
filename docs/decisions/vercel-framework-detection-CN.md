# Vercel Framework Detection

## How It Works

首次导入项目时，Vercel 会检测 **main branch** 的文件结构来推断 framework：

| 检测到的文件 | 推断的 Framework |
|-------------|-----------------|
| `next.config.js` | Next.js |
| `package.json` + react | Create React App |
| `nuxt.config.js` | Nuxt |
| `api/*.py` (alone) | Python Serverless |
| 无特征文件 | Other |

## The Problem

如果你的 main branch 只有 README，实际代码在 feature branch：

```
main branch:
├── README.md
└── (nothing else)

feature branch:
├── app/
├── next.config.js
├── package.json
└── api/index.py
```

Vercel 会根据 main branch 推断为 "Other"，导致部署 feature branch 时 **404 错误**。

## Solution

去 Vercel Dashboard 手动指定 framework：

```
Settings → General → Framework Preset → Next.js
```

然后重新部署。

## Best Practice

1. 确保 main branch 有基本的项目结构文件（至少 `package.json` 和 `next.config.js`）
2. 或者在首次导入后立即检查 Framework Preset 设置
3. 部署后看到 404？第一时间检查 Framework 设置
