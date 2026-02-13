# Vercel Active CPU Billing

## Background

Vercel 在 2025 年 9 月的 **Vercel Ship 2025** 大会上推出了 Active CPU Billing 模式，2025年9月9日之后创建的团队默认启用。

## Old Model: Memory-based Billing

旧模式下，你需要在 `vercel.json` 中配置函数内存：

```json
{
  "functions": {
    "api/**": {
      "memory": 1024
    }
  }
}
```

计费方式：**内存大小 × 执行时间**

问题：
- 需要手动调整内存配置
- 内存越大单价越贵
- 函数等待 I/O 时也在计费

## New Model: Active CPU Billing

新模式下，`memory` 配置被忽略。

计费方式：
- **Active CPU**：代码实际执行的时间（$0.128/小时）
- **Provisioned Memory**：函数等待时的时间（$0.0106/GB-小时，约为 Active CPU 的 1/11）

好处：
- 不用纠结配多少内存
- 函数自动获得足够资源
- 等待 I/O（如 LLM 调用、数据库查询）时几乎不花钱
- 对 AI 应用友好，成本最高可降低 90%

## Action

如果你的 `vercel.json` 里有 `"memory": 1024`，可以删掉，因为它在新模式下无效。

## References

- [Introducing Active CPU pricing for Fluid compute](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute)
- [Vercel Ship 2025 recap](https://vercel.com/blog/vercel-ship-2025-recap)
