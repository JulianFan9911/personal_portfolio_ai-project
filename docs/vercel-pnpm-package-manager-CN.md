# Vercel pnpm Package Manager Configuration

## Problem

当你的项目使用 pnpm（有 `pnpm-lock.yaml`）但没有在 `package.json` 中声明 `packageManager` 时，Vercel 会显示警告：

```
WARN! Warning: Could not enable corepack because package.json is missing "packageManager" property
```

Vercel 会根据 lock 文件自动推断使用 pnpm，但版本可能不是你想要的。

## Why pnpm

pnpm 相比 npm 的优势：
- **更快**：利用硬链接和内容寻址存储
- **更省空间**：全局缓存，不重复下载
- **更严格**：防止幽灵依赖（phantom dependencies）

## Solution

在 `package.json` 中显式声明 `packageManager`：

```json
{
  "name": "your-project",
  "version": "0.1.0",
  "packageManager": "pnpm@10.28.0",
  ...
}
```

这样 Vercel 就能通过 corepack 使用精确版本的 pnpm。

## How to Find Version

查看 Vercel build log 中实际使用的版本：
```
Done in 4.3s using pnpm v10.28.0
```

或者本地运行：
```bash
pnpm --version
```

建议使用 Vercel 默认的版本以保持一致性。
