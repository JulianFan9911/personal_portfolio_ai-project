# Setting Up Node Development Environment

## 你的项目发生了变化！

还记得吗？你之前学的是一个简单的 Python 项目。现在，你的项目变得更加复杂了——**你现在有了一个多语言的代码库**，里面既有 Python 代码，也有 Node.js 代码。

想象一下：公司通常不会只用一种编程语言。他们可能用 Python 做后端，用 Node.js 做某些服务，用 JavaScript 做网页。这就是为什么你需要学会在一个项目中同时处理多种语言。

这个教程会带你一步步设置 Node.js 开发环境，并理解项目结构的变化。

---

## 学习这个之前，你需要知道什么

你已经完成了 Python 版本的 TDD（测试驱动开发）课程，所以你理解：
- 如何**先写测试**（RED 阶段）- 测试描述你想要什么
- 如何**写代码来通过测试**（GREEN 阶段）- 代码满足测试的要求
- 如何**检查没有破坏其他东西**（VERIFY 阶段）- 运行所有测试确保一切正常

现在问题来了：**TDD 在 Node.js 中怎么工作呢？**

答案很简单：**完全一样！** 只是你用不同的语言（JavaScript），但思想是完全相同的。

---

## 第一步：理解项目发生了什么变化

### 之前的样子（只有 Python）

```
project/
├── learn_personal_portfolio_ai/     ← Python 的源代码
├── tests/                           ← 所有测试都放这里
├── pyproject.toml                   ← Python 的配置文件
└── mise.toml                        ← 任务配置文件
```

非常简单——只有一种语言，一个测试文件夹。

### 现在的样子（Python + Node.js）

```
project/
├── learn_personal_portfolio_ai/     ← Python 的源代码
├── tests_python/                    ← Python 的测试（改名了！）
│   └── test_source_code.py
│
├── src/                             ← 新增：Node.js 的源代码
│   └── math.js
│
├── tests_node/                      ← 新增：Node.js 的测试
│   └── math.test.js
│
├── pyproject.toml                   ← Python 的配置（没变）
├── package.json                     ← 新增：Node.js 的配置
└── mise.toml                        ← 更新了：支持两种语言
```

**主要的变化是什么：**

1. **测试文件夹分开了** - 以前是一个 `tests/` 文件夹，现在分成 `tests_python/` 和 `tests_node/`。为什么？因为 Python 的测试和 JavaScript 的测试写法不一样，分开会更清楚。

2. **新增了 `src/` 文件夹** - 这是 Node.js 世界的标准做法。在 Python 里，我们把代码放在 `learn_personal_portfolio_ai/` 里；在 JavaScript 里，约定俗成地放在 `src/` 里。不同的语言，不同的习惯。

3. **新增了 `package.json` 文件** - 就像 Python 有 `pyproject.toml` 一样，Node.js 有 `package.json`。它描述你的项目信息和依赖。

4. **`mise.toml` 更新了** - 现在里面有了更多的命令，可以分别运行 Python 测试或 Node.js 测试，或者一起运行。

---

## 第二步：Node.js 和 pnpm 是什么？

你现在可能在想："等等，我需要学 Node.js 吗？" 不用担心，我们的目标很简单：**了解基本概念，把它跑起来就行**。

### Node.js：让 JavaScript 在电脑上运行

想象一下 JavaScript 通常是什么地方用的？

**网页浏览器！** 你打开网页时，浏览器会运行 JavaScript 代码来让网页有交互性（比如点按钮，表单验证等）。

但有个问题：JavaScript 只能在浏览器里运行。如果你想在电脑上直接运行 JavaScript，就不行。

**这就是 Node.js 的作用！** 它让你可以在电脑上直接运行 JavaScript，就像你用 Python 一样。

```
Python：    在电脑上运行 Python 代码
            python script.py

Node.js：   在电脑上运行 JavaScript 代码
            node script.js
```

简单地说：**Node.js = 在电脑上直接跑 JavaScript**。它就像是一个 Python 解释器（把代码翻译成电脑能理解的语言），但是它是为 JavaScript 设计的。

### pnpm：Node.js 世界的包管理器

还记得 Python 的 `uv` 吗？它做什么的？

- 下载你需要的包（像 numpy、pytest 这样的库）
- 管理包的版本
- 为你创建虚拟环境（`.venv/` 文件夹）

**`pnpm` 在 Node.js 中做的事情完全一样！**

```
Python:    uv 是包管理器             → 创建 .venv/ 虚拟环境
Node.js:   pnpm 是包管理器           → 创建 node_modules/ 文件夹

如果你需要一个库，uv 会下载它放在 .venv/ 里
如果你需要一个库，pnpm 会下载它放在 node_modules/ 里
```

**这就是全部了。** `pnpm` 是"Node.js 版本的 uv"。你不需要学会所有 pnpm 的命令——`mise` 会替你处理所有复杂的东西。

---

## 第三步：你的新命令

因为现在有两种语言，所以命令也变多了。但别担心，`mise` 会帮你管理这一切。

### 安装依赖（下载所需的库）

```bash
# 只安装 Python 的依赖
mise run inst-python-deps

# 只安装 Node.js 的依赖
mise run inst-node-deps

# 同时安装两种（推荐！）
mise run inst
```

**解释一下：**
- `inst` 是 `install`（安装）的缩写
- `inst-python-deps` 意思是"安装 Python 的依赖"
- `inst-node-deps` 意思是"安装 Node.js 的依赖"
- 最后一个命令会自动运行前两个（因为 `mise` 聪明地知道如何协调它们）

### 运行测试

```bash
# 只运行 Python 的测试
mise run test-python

# 只运行 Node.js 的测试
mise run test-node

# 同时运行两种测试
mise run test
```

**为什么要分开？** 有时候你想快速测试 Python 代码，不想等 Node.js 的测试也跑完。有时候你想检查某个特定语言是否工作正常。灵活性很重要。

---

## 第四步：一步步设置你的环境

现在让我们把所有东西都启动起来。按照下面的步骤做：

### 1. 创建 Python 虚拟环境

```bash
mise run venv-create
```

**发生了什么？** 这个命令创建了一个 `.venv/` 文件夹。这就像是一个"隔离的房间"，Python 在这个房间里安装它需要的所有东西。这样不会影响你电脑上其他的 Python 项目。

### 2. 安装所有依赖

```bash
mise run inst
```

**发生了什么？** 这个命令会：
- 用 `uv` 安装 Python 需要的所有包（放在 `.venv/` 里）
- 用 `pnpm` 安装 Node.js 需要的所有包（放在 `node_modules/` 里）

这样两种语言的依赖就都装好了。

### 3. 激活 Python 环境

```bash
source .venv/bin/activate
```

**为什么要做这个？** 虽然 `.venv/` 文件夹已经被创建了，但你的终端还不知道要用这个虚拟环境。这个命令告诉你的终端："嘿，从现在开始，用 `.venv/` 里的 Python"。

**怎么知道成功了？** 你的终端提示符会变化。看起来像这样：

```
(.venv) your-computer:project $
```

你会看到前面多了 `(.venv)` 这样的标志。这就表示虚拟环境已经激活了。

### 4. 验证一切都工作了

```bash
mise run test
```

**你会看到什么？** 成功的话，你会看到两部分的测试输出：

```
======================== Python Tests ========================
tests_python/test_source_code.py::test_add_two PASSED          [50%]
======================== 1 passed in 0.02s ========================

======================== Node.js Tests ========================
✔ add(2, 3) should equal 5 (1.234ms)
✔ add(0, 0) should equal 0 (0.567ms)

───────────────────────────────────────
tests 2 passed (1.801ms)
```

**意思是？**
- Python 的 `test_add_two()` 通过了
- Node.js 的两个 `add` 测试也通过了
- 没有任何东西坏掉

**恭喜！** 你的 Node 开发环境现在已经设置好了。

---

## 第五步：理解 `mise.toml` 的变化

想知道为什么只用一个 `mise run test` 命令，就能同时运行两种语言的测试？秘密在 `mise.toml` 文件里。

### Python 的任务（之前就有的）

```toml
[tasks.venv-create]
description = "✨ Create Python virtual environment (.venv)"
run = "uv venv"

[tasks.inst-python-deps]
description = "💾 Install Python dependencies via uv"
run = "uv sync --all-extras"

[tasks.test-python]
description = "🧪 Run Python tests with pytest"
run = ".venv/bin/pytest tests_python"
```

**解释：**
- `venv-create` - 创建虚拟环境
- `inst-python-deps` - 用 uv 安装 Python 包
- `test-python` - 运行 Python 测试（现在指向 `tests_python/` 而不是之前的 `tests/`）

### Node.js 的任务（全新的）

```toml
[tasks.inst-node-deps]
description = "📦 Install Node.js dependencies via pnpm"
run = "pnpm install"

[tasks.test-node]
description = "🧪 Run Node.js tests"
run = "node --test tests_node/*.test.js"
```

**解释：**
- `inst-node-deps` - 用 pnpm 安装 Node.js 包。这和 `inst-python-deps` 的概念一样，只是用了 Node.js 的工具
- `test-node` - 运行 Node.js 测试。用 Node.js 的内置测试工具来运行 `tests_node/` 里的所有 `.test.js` 文件

### 协调任务（中枢）

```toml
[tasks.inst]
description = "💾 Install all dependencies (Python + Node.js)"
depends = ["inst-python-deps", "inst-node-deps"]

[tasks.test]
description = "🧪 Run all tests (Python + Node.js)"
depends = ["test-python", "test-node"]
```

**这是最聪明的部分！** `depends` 字段是什么意思呢？

它说："当有人运行这个任务时，先运行这些任务。"

所以：
- `mise run inst` 会自动运行 `inst-python-deps` 和 `inst-node-deps`
- `mise run test` 会自动运行 `test-python` 和 `test-node`

**为什么这样设计？** 这样你有选择：
- 如果你只想改 Python 代码，可以用 `mise run test-python` 快速测试
- 如果你想检查整个项目，可以用 `mise run test` 测试所有东西
- 但对大多数人来说，`mise run test` 就够了

---

## 第六步：认识这些新文件

现在让我们看看这些新文件是什么，以及它们做什么。

### `package.json` - Node.js 的信息文件

```json
{
  "name": "learn-personal-portfolio-ai",
  "version": "0.1.1",
  "private": true,
  "scripts": {},
  "dependencies": {},
  "devDependencies": {}
}
```

**这是什么？** 它是 Node.js 世界的"身份证"。就像 Python 的 `pyproject.toml` 一样，它告诉 Node.js：

- **name** - 这个项目叫什么
- **version** - 项目现在是什么版本
- **private** - 这个项目是私有的（不打算发布到网上的包管理器）
- **dependencies** - 这个项目需要哪些包来正常工作
- **devDependencies** - 这个项目在开发/测试时需要哪些包

目前它很空，因为我们的项目还很简单，不需要外部包。但随着项目增长，这个文件会越来越重要。

### `src/math.js` - Node.js 的代码

```javascript
export function add(a, b) {
  return a + b;
}
```

**这是什么？** 这是一个 JavaScript 函数。让我分解一下：

- `export` - 这很重要！它的意思是"让其他文件可以使用这个函数"。就像 Python 中你可以在另一个文件里 `from xxx import add` 一样。
- `function add(a, b)` - 定义一个叫 `add` 的函数，它接收两个参数 `a` 和 `b`
- `return a + b` - 返回两个数字的和
- 分号 `;` - JavaScript 的习惯（虽然有些开发者不写，但通常都会写）

**和 Python 的区别：**

Python:
```python
def add_two(a: int, b: int) -> int:
    return a + b
```

JavaScript:
```javascript
export function add(a, b) {
  return a + b;
}
```

核心逻辑是一样的（都是相加），只是写法不同。

### `tests_node/math.test.js` - Node.js 的测试

```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { add } from '../src/math.js';

test('add(2, 3) should equal 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

**这是什么？** 这是一个 Node.js 测试。让我解释每一行：

- `import { test } from 'node:test';` - 导入 Node.js 的测试工具
- `import assert from 'node:assert';` - 导入 Node.js 的断言工具（用来检查是否相等）
- `import { add } from '../src/math.js';` - 导入我们想要测试的函数

然后：
- `test('add(2, 3) should equal 5', () => { ... })` - 定义一个测试。第一个参数是测试的描述（"add(2, 3) 应该等于 5"），第二个参数是测试的代码
- `assert.strictEqual(add(2, 3), 5);` - 检查 `add(2, 3)` 的结果是否等于 `5`。如果是，测试通过；如果不是，测试失败

**和 Python 的区别：**

Python:
```python
def test_add_two():
    assert add_two(3, 4) == 12
```

JavaScript:
```javascript
test('add(2, 3) should equal 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

概念是一样的（都是测试函数），只是写法不同。

---

## 第七步：你的第一个 Node.js 函数

现在你理解了所有的东西，让我们用你已经知道的 TDD 工作流来写一个 Node.js 函数。

### RED 阶段：先写失败的测试

**文件：** `tests_node/math.test.js`

在现有的 `add` 测试后面添加这个：

```javascript
test('multiply(3, 4) should equal 12', () => {
  const multiply = require('../src/math.js').multiply;
  assert.strictEqual(multiply(3, 4), 12);
});

test('multiply(5, 0) should equal 0', () => {
  const multiply = require('../src/math.js').multiply;
  assert.strictEqual(multiply(5, 0), 0);
});

test('multiply(-2, 3) should equal -6', () => {
  const multiply = require('../src/math.js').multiply;
  assert.strictEqual(multiply(-2, 3), -6);
});
```

**你在做什么？** 你在写测试，说"我想要一个 `multiply` 函数，它应该能：
- 将 3 和 4 相乘得到 12
- 将 5 和 0 相乘得到 0
- 将 -2 和 3 相乘得到 -6"

### 运行测试（看它失败）

```bash
mise run test-node
```

**你会看到什么？**

```
TypeError: multiply is not a function
```

或者

```
Cannot find module property 'multiply'
```

**这很好！** 这正是 RED 阶段应该的样子。测试在对你说："嘿，这个函数还不存在，你需要写它。"

### GREEN 阶段：写代码通过测试

**文件：** `src/math.js`

添加这个函数（保留 `add` 函数）：

```javascript
export function multiply(a, b) {
  return a * b;
}
```

**你在做什么？** 你实现了测试要求的函数。它接收两个数字，相乘，然后返回结果。

### 运行测试（看它通过）

```bash
mise run test-node
```

**你会看到什么？**

```
✔ add(2, 3) should equal 5
✔ add(0, 0) should equal 0
✔ multiply(3, 4) should equal 12 (0.456ms)
✔ multiply(5, 0) should equal 0 (0.389ms)
✔ multiply(-2, 3) should equal -6 (0.512ms)

───────────────────────────────────────
tests 5 passed (1.801ms)
```

**太棒了！** 所有的测试都通过了。你写的新代码工作正常，旧的 `add` 测试也没有坏掉。

### VERIFY 阶段：检查整个项目

现在运行所有测试（Python + Node.js）：

```bash
mise run test
```

**你会看到什么？**

```
======================== Python Tests ========================
tests_python/test_source_code.py::test_add_two PASSED          [50%]
======================== 1 passed in 0.02s ========================

======================== Node.js Tests ========================
✔ add(2, 3) should equal 5
✔ add(0, 0) should equal 0
✔ multiply(3, 4) should equal 12
✔ multiply(5, 0) should equal 0
✔ multiply(-2, 3) should equal -6

───────────────────────────────────────
tests 5 passed (1.801ms)
```

**检查清单：**
- ✅ Python 测试仍然通过（你没有破坏任何东西）
- ✅ Node.js 的 `add` 测试仍然通过
- ✅ Node.js 的新 `multiply` 测试都通过

完美！你刚才完成了整个 TDD 循环，而且是用两种不同的语言。

---

## 第八步：对比 Python 和 Node.js

现在你已经用两种语言写了相同的逻辑。让我们看看它们有多相似。

### 同样的逻辑，两种语言

**Python 版本：**
```python
def multiply_two(a: int, b: int) -> int:
    return a * b
```

**JavaScript 版本：**
```javascript
export function multiply(a, b) {
  return a * b;
}
```

### 相同的地方

- 两个都接收两个参数（`a` 和 `b`）
- 两个都相乘（`a * b`）
- 两个都返回结果
- **逻辑完全相同**

### 不同的地方

| Python | JavaScript |
|--------|-----------|
| 用 `def` 关键字定义函数 | 用 `function` 关键字定义函数 |
| 有类型提示：`: int`, `-> int` | 没有类型提示（虽然可以用 JSDoc 添加） |
| 使用缩进来表示代码块 | 使用花括号 `{}` 来表示代码块 |
| 行尾不需要分号 | 行尾通常有分号 `;` |
| 需要 `from ... import` 来导入 | 需要 `export` 来导出，`import` 来导入 |

**最重要的一点：** 语法不同，但**思想是一样的**。你理解了一个，另一个就很容易了。

---

## 第九步：你的挑战

现在你已经看到了完整的流程。是时候自己练习了。按照下面的步骤做，但这次是你自己来做，不是跟着教程。

### 挑战 1：Python - 添加 `divide_two()` 函数

**步骤 1：写测试（RED 阶段）**

在 `tests_python/test_source_code.py` 里添加：

```python
def test_divide_two():
    assert divide_two(10, 2) == 5
    assert divide_two(9, 3) == 3
    assert divide_two(-6, 2) == -3
```

**步骤 2：运行测试，看它失败**

```bash
mise run test-python
```

你会看到 `cannot import name 'divide_two'` 这样的错误。很好，这就是 RED 阶段。

**步骤 3：实现函数（GREEN 阶段）**

在 `learn_personal_portfolio_ai/source_code.py` 里添加：

```python
def divide_two(a: int, b: int) -> float:
    return a / b
```

为什么返回类型是 `float` 而不是 `int`？因为除法可能产生小数。比如 `5 / 2 = 2.5`。

**步骤 4：运行测试，看它通过**

```bash
mise run test-python
```

你应该看到 "3 passed" 或类似的成功消息（`test_add_two` + `test_multiply_two` + `test_divide_two`）。

### 挑战 2：Node.js - 添加 `divide()` 函数

**步骤 1：写测试（RED 阶段）**

在 `tests_node/math.test.js` 里添加：

```javascript
test('divide(10, 2) should equal 5', () => {
  const divide = require('../src/math.js').divide;
  assert.strictEqual(divide(10, 2), 5);
});

test('divide(9, 3) should equal 3', () => {
  const divide = require('../src/math.js').divide;
  assert.strictEqual(divide(9, 3), 3);
});

test('divide(-6, 2) should equal -3', () => {
  const divide = require('../src/math.js').divide;
  assert.strictEqual(divide(-6, 2), -3);
});
```

**步骤 2：运行测试，看它失败**

```bash
mise run test-node
```

你会看到错误信息说 `divide` 不存在或不是一个函数。

**步骤 3：实现函数（GREEN 阶段）**

在 `src/math.js` 里添加：

```javascript
export function divide(a, b) {
  return a / b;
}
```

**步骤 4：运行测试，看它通过**

```bash
mise run test-node
```

### 挑战 3：验证整个项目

最后，运行所有测试来确保没有破坏任何东西：

```bash
mise run test
```

**成功的标志是什么？** 你应该看到类似这样的：

```
======================== Python Tests ========================
... [至少 3 个测试通过]

======================== Node.js Tests ========================
... [至少 8 个测试通过，包括 add, multiply, divide]
```

所有东西都绿色（✔ 或 PASSED），没有红色的失败消息。

---

## 关键要点总结

✅ **Node.js 让你在电脑上运行 JavaScript** - 就像 Python 解释器一样，但是是为 JavaScript 设计的

✅ **pnpm 管理 Node.js 的包** - 和 Python 的 uv 一样的角色，只是为 Node.js

✅ **项目结构分离了关注点** - Python 代码在 `learn_personal_portfolio_ai/`，Node.js 代码在 `src/`。测试也分别放在 `tests_python/` 和 `tests_node/`。为什么？这样更清晰，更容易维护。

✅ **测试文件夹被分开了** - `tests_python/` 给 Python，`tests_node/` 给 Node.js。这样你可以快速地只测试你在做的语言。

✅ **`mise` 协调一切** - 一个命令可以运行整个多语言项目的测试。`mise run test` 自动会跑 Python 和 Node.js 的测试。

✅ **TDD 在两种语言中完全相同** - RED → GREEN → VERIFY，不管你用 Python 还是 JavaScript

✅ **语法改变，但思想不变** - `multiply` 在 Python 和 JavaScript 里都做同样的事情，只是写法不同

---

## 还有什么？

现在你已经设置好了 Node 开发环境：

1. **练习 TDD 工作流** - 完成上面的所有挑战
2. **添加更多函数** - 尝试自己实现 `power()`（幂次方）、`absolute()`（绝对值）等
3. **探索 Node.js 生态** - 想知道有什么包可用吗？查看 npm（Node.js 包管理器的网站）
4. **习惯 JavaScript 语法** - 和 Python 不同，但你会很快学会

---

## 总结

你现在已经：

- ✅ 理解了项目为什么改变了
- ✅ 学会了 Node.js 和 pnpm 的基本概念
- ✅ 成功设置了 Node.js 开发环境
- ✅ 理解了新的命令结构（分离和协调的任务）
- ✅ 在两种语言中都实现了函数
- ✅ 证明了 TDD 在两种语言中的工作方式是相同的

你现在有了一个**真实世界的多语言开发环境**，就像专业的软件公司一样。你已经准备好在多个平台上构建更复杂的应用了。

欢迎来到多语言软件开发的世界！🚀

---

## 常见问题和解决方案

| 问题 | 解决方案 |
|------|--------|
| `command not found: mise` | `mise` 没有安装。运行 `curl https://mise.jdx.dev \| sh` 来安装 |
| `Cannot find module '~/src/math.js'` 或 `divide is not a function` | 确保你在 `src/math.js` 里用 `export function` 定义了函数 |
| `.venv not found` | 运行 `mise run venv-create` 创建 Python 虚拟环境 |
| `node_modules not found` | 运行 `mise run inst` 安装依赖 |
| 测试失败（比如说 12 != 11） | 检查你的逻辑。`multiply` 应该用 `*`，不是 `+` |
| 只有 Python 测试运行，没有 Node.js 测试 | 确保你运行了 `mise run inst-node-deps` 来安装 Node.js 依赖 |
| 我改了代码，但测试仍然失败 | 仔细读错误信息。通常会告诉你是什么错了。如果不清楚，打印出函数返回的值，看看是否符合预期 |

---

欢迎开始你的多语言开发之旅！有任何问题，别害羞，多问。这就是学习的过程。💪
