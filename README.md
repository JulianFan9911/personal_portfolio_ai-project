# Setting Up Node Development Environment

## Your Project Has Changed!

Remember when you were working on a simple Python project? Well, things are about to get more exciting—**your project now has a multi-language codebase** with both Python and Node.js code.

Here's why this matters: Real-world companies don't stick to one programming language. They might use Python for the backend, Node.js for certain services, and JavaScript for the web frontend. Learning to navigate a multi-language project is a critical professional skill.

This tutorial will guide you through setting up your Node.js development environment and understanding how the project structure has evolved.

---

## What You Should Already Know

You've completed the Python TDD (Test-Driven Development) course, so you understand:
- How to **write tests first** (RED phase) - tests describe what you want
- How to **write code to pass tests** (GREEN phase) - code satisfies the test requirements
- How to **verify nothing broke** (VERIFY phase) - run all tests to ensure everything works

Now the question is: **How does TDD work in Node.js?**

The simple answer: **Exactly the same!** You're just using a different language (JavaScript), but the thinking is identical.

---

## Step 1: Understanding What Changed

### Before: Single Language (Python Only)

```
project/
├── learn_personal_portfolio_ai/     ← Python source code
├── tests/                           ← All tests go here
├── pyproject.toml                   ← Python config
└── mise.toml                        ← Task config
```

Simple—one language, one test folder.

### Now: Multi-Language (Python + Node.js)

```
project/
├── learn_personal_portfolio_ai/     ← Python source code
├── tests_python/                    ← Python tests (renamed!)
│   └── test_source_code.py
│
├── src/                             ← NEW: Node.js source code
│   └── math.js
│
├── tests_node/                      ← NEW: Node.js tests
│   └── math.test.js
│
├── pyproject.toml                   ← Python config (unchanged)
├── package.json                     ← NEW: Node.js config
└── mise.toml                        ← Updated: supports both languages
```

**What's different:**

1. **Test folders are separated** - Previously one `tests/` folder, now split into `tests_python/` and `tests_node/`. Why? Because Python and JavaScript tests are written differently, and separation keeps things clear.

2. **New `src/` folder** - This is the Node.js convention. In Python, we put code in `learn_personal_portfolio_ai/`; in JavaScript, the standard is `src/`. Different languages, different traditions.

3. **New `package.json` file** - Just as Python has `pyproject.toml`, Node.js has `package.json`. It describes your project and its dependencies.

4. **Updated `mise.toml`** - Now it has more commands to run Python tests, Node.js tests, or both.

---

## Step 2: What Are Node.js and pnpm?

You might be thinking: "Do I really need to learn Node.js?" Don't worry—we're keeping it simple: **understand the basics and get it working**.

### Node.js: Running JavaScript on Your Computer

Where does JavaScript normally run? **In web browsers!** When you visit a website, the browser runs JavaScript to make the page interactive (buttons, forms, etc.).

But here's the problem: JavaScript only runs in browsers. You can't directly run JavaScript on your computer like you would Python.

**Enter Node.js!** It lets you run JavaScript on your computer directly, just like Python.

```
Python:   python script.py           (run Python code on your computer)
Node.js:  node script.js             (run JavaScript code on your computer)
```

Simply put: **Node.js = a JavaScript runtime for your computer**. Think of it like a Python interpreter, but designed for JavaScript.

### pnpm: Node.js Package Manager

Remember Python's `uv`? Here's what it does:

- Downloads packages you need (like numpy, pytest)
- Manages package versions
- Creates virtual environments (`.venv/`)

**`pnpm` does the exact same things for Node.js!**

```
Python:    uv is a package manager       → creates .venv/
Node.js:   pnpm is a package manager     → creates node_modules/
```

Think of pnpm as "the uv of Node.js." You won't need to learn all pnpm commands—`mise` handles everything for you.

---

## Step 3: Your New Commands

Because you now have two languages, you have more commands. But don't worry—`mise` coordinates everything.

### Installing Dependencies

```bash
# Install only Python dependencies
mise run inst-python-deps

# Install only Node.js dependencies
mise run inst-node-deps

# Install both (recommended!)
mise run inst
```

**What these mean:**
- `inst` is short for "install"
- `inst-python-deps` means "install Python dependencies"
- `inst-node-deps` means "install Node.js dependencies"
- The last command automatically runs both (mise orchestrates them)

### Running Tests

```bash
# Run only Python tests
mise run test-python

# Run only Node.js tests
mise run test-node

# Run both
mise run test
```

**Why separate?** Sometimes you want to quickly test Python code without waiting for Node tests. Sometimes you want to check just one language. Flexibility matters.

---

## Step 4: Setting Up Your Environment

Let's get everything running. Follow these steps in order:

### 1. Create Python Virtual Environment

```bash
mise run venv-create
```

**What happens:** This creates a `.venv/` folder. Think of it as an "isolated room" where Python installs everything it needs. This doesn't affect other Python projects on your computer.

### 2. Install All Dependencies

```bash
mise run inst
```

**What happens:** This installs:
- All Python packages (using `uv`, goes into `.venv/`)
- All Node.js packages (using `pnpm`, goes into `node_modules/`)

Both language ecosystems are now ready.

### 3. Activate Python Environment

```bash
source .venv/bin/activate
```

**Why do this?** Your `.venv/` folder exists, but your terminal doesn't know to use it yet. This command says: "From now on, use the Python from `.venv/`."

**How do you know it worked?** Your terminal prompt changes to show `(.venv)` at the beginning:

```
(.venv) your-computer:project $
```

That `(.venv)` marker means the virtual environment is active.

### 4. Verify Everything Works

```bash
mise run test
```

**You should see output from both Python and Node.js tests:**

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

**What this means:**
- Python's `test_add_two()` passed
- Node.js's `add` tests passed
- Nothing is broken

**Congratulations!** Your Node development environment is now set up.

---

## Step 5: Understanding the Configuration

Ever wonder how running one command (`mise run test`) executes tests in two different languages? The secret is in `mise.toml`.

### Python Tasks

```toml
[tasks.inst-python-deps]
description = "💾 Install Python dependencies via uv"
run = "uv sync --all-extras"

[tasks.test-python]
description = "🧪 Run Python tests with pytest"
run = ".venv/bin/pytest tests_python"
```

These look familiar. Notice that tests now run against `tests_python/` instead of the old `tests/`.

### Node.js Tasks (New)

```toml
[tasks.inst-node-deps]
description = "📦 Install Node.js dependencies via pnpm"
run = "pnpm install"

[tasks.test-node]
description = "🧪 Run Node.js tests"
run = "node --test tests_node/*.test.js"
```

These are new. Notice the pattern mirrors the Python tasks:
- `inst-node-deps` mirrors `inst-python-deps`
- `test-node` mirrors `test-python`

### Orchestration (The Magic)

```toml
[tasks.inst]
description = "💾 Install all dependencies (Python + Node.js)"
depends = ["inst-python-deps", "inst-node-deps"]

[tasks.test]
description = "🧪 Run all tests (Python + Node.js)"
depends = ["test-python", "test-node"]
```

The `depends` field is what makes this work. It says: "When someone runs this task, run these tasks first."

So:
- `mise run inst` automatically runs both `inst-python-deps` and `inst-node-deps`
- `mise run test` automatically runs both `test-python` and `test-node`

---

## Step 6: Meet the New Files

### `package.json` - Node.js Project File

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

This is Node.js's version of `pyproject.toml`. It tells Node.js:

- **name** - Your project name
- **version** - Current version
- **private** - This project is private (won't be published online)
- **dependencies** - Packages your project needs to run
- **devDependencies** - Packages needed only for development/testing

Currently it's minimal because our project is simple. But as it grows, this file becomes important.

### `src/math.js` - Node.js Code

```javascript
export function add(a, b) {
  return a + b;
}
```

This is a JavaScript function. Let me break it down:

- `export` - This makes the function available for import (like Python's `from xxx import add`)
- `function add(a, b)` - Define a function named `add` that takes two parameters
- `return a + b` - Return the sum
- `;` - JavaScript convention to end the statement

**Compare to Python:**

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

The logic is identical (both add two numbers). Only the syntax differs.

### `tests_node/math.test.js` - Node.js Tests

```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { add } from '../src/math.js';

test('add(2, 3) should equal 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

This is a Node.js test. Let me explain each line:

- `import { test } from 'node:test';` - Import Node's test tool
- `import assert from 'node:assert';` - Import Node's assertion tool (checks equality)
- `import { add } from '../src/math.js';` - Import the function to test

Then:
- `test('add(2, 3) should equal 5', () => { ... })` - Define a test. First parameter describes what you're testing, second parameter is the test code
- `assert.strictEqual(add(2, 3), 5);` - Check if `add(2, 3)` equals `5`. If yes, test passes; if no, test fails

**Compare to Python:**

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

Concept is the same (both test a function). Only syntax differs.

---

## Step 7: Your First Node.js Function

Now that you understand the setup, let's use the TDD workflow you already know to write a Node.js function.

### RED Phase: Write the Test First

**File:** `tests_node/math.test.js`

Add this test after the existing `add` tests:

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

**What you're doing:** Writing a test that says "I want a `multiply` function that:
- Multiplies 3 and 4 to get 12
- Multiplies 5 and 0 to get 0
- Multiplies -2 and 3 to get -6"

### Run the Test (Watch It Fail)

```bash
mise run test-node
```

**You'll see an error:**

```
TypeError: multiply is not a function
```

or

```
Cannot find property 'multiply'
```

**This is perfect!** This is exactly what RED phase looks like. The test is telling you: "This function doesn't exist yet—go build it."

### GREEN Phase: Write Code to Pass

**File:** `src/math.js`

Add this function (keep the `add` function):

```javascript
export function multiply(a, b) {
  return a * b;
}
```

**What you're doing:** Implementing what the test requires. The function takes two numbers, multiplies them, and returns the result.

### Run the Test (Watch It Pass)

```bash
mise run test-node
```

**You should see:**

```
✔ add(2, 3) should equal 5
✔ add(0, 0) should equal 0
✔ multiply(3, 4) should equal 12 (0.456ms)
✔ multiply(5, 0) should equal 0 (0.389ms)
✔ multiply(-2, 3) should equal -6 (0.512ms)

───────────────────────────────────────
tests 5 passed (1.801ms)
```

**Excellent!** All tests pass. The new code works, and the old `add` tests still pass—nothing broke.

### VERIFY Phase: Check Everything

Now run all tests (Python + Node.js):

```bash
mise run test
```

**You should see:**

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

**Checklist:**
- ✅ Python tests still pass (nothing broke)
- ✅ Node.js `add` tests still pass
- ✅ Node.js `multiply` tests all pass

Perfect! You just completed the entire TDD cycle in two different languages.

---

## Step 8: Comparing Python and JavaScript

Now that you've written the same logic in both languages, let's see how similar they really are.

### Same Logic, Two Languages

**Python:**
```python
def multiply_two(a: int, b: int) -> int:
    return a * b
```

**JavaScript:**
```javascript
export function multiply(a, b) {
  return a * b;
}
```

### What's the Same

- Both take two parameters (a and b)
- Both multiply them together (a * b)
- Both return the result
- **The logic is identical**

### What's Different

| Python | JavaScript |
|--------|-----------|
| Uses `def` to define functions | Uses `function` to define functions |
| Has type hints: `: int`, `-> int` | No type hints (though JSDoc can add them) |
| Uses indentation for code blocks | Uses curly braces `{}` for code blocks |
| Doesn't require semicolons at line end | Usually has semicolons `;` at line end |
| Uses `from ... import` for imports | Uses `export` to export, `import` to import |

**Key insight:** The syntax is different, but **the thinking is the same**. Once you understand one, the other is just syntax.

---

## Step 9: Your Challenge

Now you've seen the full workflow. Time to practice on your own. Follow these steps, but this time YOU do the work (not just following along):

### Challenge 1: Python - Add `divide_two()` Function

**Step 1: Write the test (RED phase)**

Add this to `tests_python/test_source_code.py`:

```python
def test_divide_two():
    assert divide_two(10, 2) == 5
    assert divide_two(9, 3) == 3
    assert divide_two(-6, 2) == -3
```

**Step 2: Run the test and watch it fail**

```bash
mise run test-python
```

You'll see `cannot import name 'divide_two'`. Good—that's RED phase.

**Step 3: Implement the function (GREEN phase)**

Add this to `learn_personal_portfolio_ai/source_code.py`:

```python
def divide_two(a: int, b: int) -> float:
    return a / b
```

Why `float` instead of `int`? Because division produces decimals. (E.g., `5 / 2 = 2.5`)

**Step 4: Run the test and watch it pass**

```bash
mise run test-python
```

You should see "3 passed" (or more if you had `test_multiply_two` too).

### Challenge 2: Node.js - Add `divide()` Function

**Step 1: Write the test (RED phase)**

Add this to `tests_node/math.test.js`:

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

**Step 2: Run the test and watch it fail**

```bash
mise run test-node
```

Error message: `divide is not a function`. Perfect—RED phase.

**Step 3: Implement the function (GREEN phase)**

Add this to `src/math.js`:

```javascript
export function divide(a, b) {
  return a / b;
}
```

**Step 4: Run the test and watch it pass**

```bash
mise run test-node
```

### Challenge 3: Verify the Whole Project

Finally, run all tests:

```bash
mise run test
```

**Success looks like:**
- All Python tests pass (including your new `test_divide_two`)
- All Node.js tests pass (including your new `divide` tests)
- No failures or errors

---

## Key Takeaways

✅ **Node.js runs JavaScript on your computer** - Like Python, but for JavaScript

✅ **pnpm manages Node.js packages** - Same role as uv, but for Node.js

✅ **Project structure separates concerns** - Python code in `learn_personal_portfolio_ai/`, Node.js in `src/`. Tests separated too. Why? Clarity and maintainability.

✅ **Test folders are separated** - `tests_python/` for Python, `tests_node/` for Node.js. You can quickly test just one language.

✅ **`mise` coordinates everything** - One command runs your entire multi-language project. `mise run test` runs Python and Node.js tests.

✅ **TDD is universal** - RED → GREEN → VERIFY works in Python, JavaScript, and beyond

✅ **Syntax changes, thinking stays the same** - `multiply` does the same thing in Python and JavaScript, just written differently

---

## What's Next?

Now that your Node development environment is set up:

1. **Practice TDD** - Complete all challenges above
2. **Add more functions** - Implement `power()`, `absolute()`, etc. in both languages
3. **Explore Node.js** - See what packages are available (though you won't need many for this course)
4. **Get comfortable with JavaScript syntax** - It's different from Python, but you'll pick it up quickly

---

## Summary

You've now:

- ✅ Understood why the project structure changed
- ✅ Learned what Node.js and pnpm are
- ✅ Successfully set up your Node development environment
- ✅ Learned the new command structure (separated and coordinated tasks)
- ✅ Implemented functions in both Python and JavaScript
- ✅ Proven that TDD works the same way in both languages

You now have a **real-world multi-language development environment**, just like professional software companies use. You're ready to build more complex applications across different platforms.

Welcome to multi-language software development! 🚀

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `command not found: mise` | `mise` isn't installed. Run `curl https://mise.jdx.dev \| sh` |
| `Cannot find module '~/src/math.js'` or `divide is not a function` | Make sure you used `export function` in `src/math.js` |
| `.venv not found` | Run `mise run venv-create` to create the Python virtual environment |
| `node_modules not found` | Run `mise run inst` to install dependencies |
| Test fails with wrong number (like `12 != 11`) | Check your logic. `multiply` should use `*`, not `+` |
| Only Python tests run, not Node.js | Make sure you ran `mise run inst-node-deps` |
| Code changed but tests still fail | Read the error message carefully. Usually it tells you what's wrong. If confused, print the result and compare to expected |

---

Ready to master multi-language development? Let's go! 💪
