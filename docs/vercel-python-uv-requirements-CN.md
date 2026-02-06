# Vercel Python with uv and requirements.txt

## Current Situation

Vercel 的 Python runtime **已经支持 uv** 作为安装工具：

```
Using uv at "/usr/local/bin/uv"
Installing required dependencies from requirements.txt with uv...
```

但 Vercel **不支持**直接从 `pyproject.toml` 读取依赖。

## Why Not pyproject.toml Directly

Vercel 的 Python 检测逻辑只认以下文件：
- `requirements.txt`
- `Pipfile` / `Pipfile.lock`

如果只有 `pyproject.toml`，Vercel 不知道如何安装依赖。

## Our Workflow

```
本地开发：pyproject.toml + uv.lock（uv 管理）
     ↓
部署前：mise run export（生成 requirements.txt）
     ↓
Vercel：用 uv 安装 requirements.txt
```

`mise.toml` 中的 export 任务：

```toml
[tasks.export]
description = "Export Python dependencies to requirements.txt"
run = "uv export --format requirements-txt --no-dev --no-emit-project > requirements.txt"
```

## .vercelignore

为了避免 Vercel 错误读取 `pyproject.toml`，可以在 `.vercelignore` 中忽略它：

```
pyproject.toml
```

## Summary

```
pyproject.toml  →  uv export  →  requirements.txt  →  Vercel (uv install)
    (源)              (转换)          (桥梁)              (部署)
```

虽然多了一步，但保持了本地开发用现代工具（uv + pyproject.toml），部署时兼容 Vercel 的要求。
