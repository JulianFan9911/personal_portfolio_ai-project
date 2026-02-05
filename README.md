# Python Development Environment Setup

## Quick Start (2 Minutes)

This project uses **mise** to manage tools and **uv** to manage Python dependencies. Follow these three steps to get started:

### Step 1: Create Virtual Environment
```bash
mise run venv-create
```
This creates a `.venv/` folder with Python 3.12 isolated for this project.

### Step 2: Install Dependencies
```bash
mise run inst
```
This installs all Python dependencies listed in `pyproject.toml` using `uv sync --all-extras`.

### Step 3: Activate Virtual Environment
```bash
source .venv/bin/activate
```
Now you're in the virtual environment and ready to code!

## What's Inside

- **`mise.toml`** - Defines project tasks and tool versions (Python 3.12, uv)
- **`pyproject.toml`** - Specifies Python dependencies and project metadata
- **`uv.lock`** - Lock file with resolved dependency versions
- **`learn_personal_portfolio_ai/`** - Your source code directory

## Your First Task: Run the Example

Now that your environment is set up, let's run your first Python code!

### Task: Execute the Test Script
```bash
python scripts/test_source_code.py
```

**Expected output:**
```
3
```

### What You're Learning

This simple example teaches you three Python concepts:

1. **Type Hints** - The `add_two()` function in `learn_personal_portfolio_ai/source_code.py` uses type annotations:
   ```python
   def add_two(a: int, b: int) -> int:
       return a + b
   ```
   Type hints tell Python (and other developers) what types the inputs and output should be.

2. **Module Imports** - The test script shows how to import from your package:
   ```python
   from learn_personal_portfolio_ai.source_code import add_two
   ```
   This is how you reuse code across different files.

3. **Package Structure** - Your code lives in `learn_personal_portfolio_ai/` and tests live in `scripts/`.

### Your Challenge
Try modifying `source_code.py` to add a new function (e.g., `multiply_two`), then import and test it in a new script!

## Available Commands

| Command | What it does |
|---------|-------------|
| `mise run venv-create` | Create Python virtual environment |
| `mise run venv-remove` | Delete the virtual environment |
| `mise run inst` | Install all dependencies |

## Mentor's Note

**What's happening under the hood:**

1. **Virtual Environment**: The `.venv/` folder isolates Python and packages for this project, preventing conflicts with system Python.

2. **Configuration Files**:
   - `mise.toml` acts as a project recipe—it tells mise which tools to use and defines reusable tasks
   - `pyproject.toml` is the standard Python project manifest—it declares dependencies and project info
   - `uv.lock` is the dependency snapshot—it ensures everyone gets the exact same package versions

3. **uv Package Manager**: We use `uv` instead of pip because it's fast, reliable, and locks dependencies deterministically.

**Pro tip:** After activating the virtual environment, you can run Python scripts directly:
```bash
python learn_personal_portfolio_ai/your_script.py
```

Everything is now ready for development!
