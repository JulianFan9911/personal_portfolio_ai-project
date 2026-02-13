# Python 开发环境设置

## 快速开始（2 分钟）

这个项目使用 **mise** 管理工具和 **uv** 管理 Python 依赖。按照以下三个步骤开始：

### 步骤 1：创建虚拟环境
```bash
mise run venv-create
```
这会创建一个 `.venv/` 文件夹，包含隔离的 Python 3.12 环境。

### 步骤 2：安装依赖
```bash
mise run inst
```
这会安装 `pyproject.toml` 中列出的所有 Python 依赖，使用 `uv sync --all-extras`。

### 步骤 3：激活虚拟环境
```bash
source .venv/bin/activate
```
现在你在虚拟环境中，可以开始编码了！

## 项目结构

- **`mise.toml`** - 定义项目任务和工具版本（Python 3.12, uv）
- **`pyproject.toml`** - 指定 Python 依赖和项目元数据
- **`uv.lock`** - 锁文件，包含解析后的依赖版本
- **`learn_personal_portfolio_ai/`** - 你的源代码目录

## 你的第一个任务：运行示例

环境设置完成后，让我们运行你的第一个 Python 代码！

### 任务：执行测试脚本
```bash
python scripts/test_source_code.py
```

**预期输出：**
```
3
```

### 你将学到什么

这个简单的例子教你三个 Python 概念：

1. **类型注解** - `learn_personal_portfolio_ai/source_code.py` 中的 `add_two()` 函数使用了类型注解：
   ```python
   def add_two(a: int, b: int) -> int:
       return a + b
   ```
   类型注解告诉 Python（和其他开发者）输入和输出应该是什么类型。

2. **模块导入** - 测试脚本展示了如何从你的包中导入代码：
   ```python
   from learn_personal_portfolio_ai.source_code import add_two
   ```
   这是在不同文件之间重用代码的方式。

3. **包结构** - 你的代码放在 `learn_personal_portfolio_ai/` 中，测试放在 `scripts/` 中。

### 挑战任务
尝试修改 `source_code.py` 添加一个新函数（例如 `multiply_two`），然后在新脚本中导入并测试它！

## 可用命令

| 命令 | 功能 |
|------|------|
| `mise run venv-create` | 创建 Python 虚拟环境 |
| `mise run venv-remove` | 删除虚拟环境 |
| `mise run inst` | 安装所有依赖 |

## 导师提示

**幕后发生了什么：**

1. **虚拟环境** - `.venv/` 文件夹隔离了这个项目的 Python 和包，防止与系统 Python 冲突。

2. **配置文件**：
   - `mise.toml` 是项目配方——它告诉 mise 使用哪些工具并定义可重用的任务
   - `pyproject.toml` 是标准的 Python 项目清单——它声明依赖和项目信息
   - `uv.lock` 是依赖快照——确保每个人都得到完全相同的包版本

3. **uv 包管理器** - 我们使用 `uv` 而不是 pip，因为它快速、可靠，并且以确定性方式锁定依赖。

**小贴士：** 激活虚拟环境后，你可以直接运行 Python 脚本：
```bash
python learn_personal_portfolio_ai/your_script.py
```

一切准备就绪，开始开发吧！
