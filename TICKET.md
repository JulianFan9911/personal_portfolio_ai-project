# Task Card: Python Environment Setup & First Program

## Overview
Learn to set up a professional Python development environment and write your first functions with type hints.

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/01-Setup-Python-Development-Environment/)

## Learning Path

### ✓ Task 1: Set Up Python Environment (2 minutes)
Complete these steps in order:

- [ ] Run `mise run venv-create` to create virtual environment
- [ ] Run `mise run inst` to install dependencies
- [ ] Run `source .venv/bin/activate` to activate the environment
- [ ] Verify by running `python --version` (should show 3.12.x)

**Check:** Virtual environment is active and Python 3.12 is running

---

### ✓ Task 2: Run Your First Program (3-5 minutes)

- [ ] Read `learn_personal_portfolio_ai/source_code.py` to see the `add_two()` function
- [ ] Read `scripts/test_source_code.py` to understand how the function is imported and called
- [ ] Run: `python scripts/test_source_code.py`
- [ ] Verify the output is `3`

**What You're Learning:**
1. **Type Hints:** The function signature `def add_two(a: int, b: int) -> int:` uses type annotations
2. **Module Imports:** `from learn_personal_portfolio_ai.source_code import add_two` shows how to reuse code
3. **Package Structure:** Source code in `learn_personal_portfolio_ai/`, tests in `scripts/`

**Check:** Program runs and outputs `3`

---

### ✓ Task 3: Understand Type Hints (5 minutes)

- [ ] Open `learn_personal_portfolio_ai/source_code.py`
- [ ] Identify the type hints in the `add_two()` function
- [ ] Understand what each part means:
  - `a: int` → parameter `a` must be an integer
  - `b: int` → parameter `b` must be an integer
  - `-> int` → the function returns an integer

**Experiment:**
- Try calling the function with wrong types in Python REPL or a test script
  - `add_two("hello", "world")` (what happens?)
  - `add_two(1.5, 2.5)` (what happens?)

**Check:** You can explain what each type hint means

---

### ✓ Task 4: Write Your Own Function (10-15 minutes)

Create a new function and test it:

- [ ] Open `learn_personal_portfolio_ai/source_code.py`
- [ ] Add a new function below `add_two()` (examples):
  - `multiply_two(a: int, b: int) -> int` - returns a * b
  - `subtract_two(a: int, b: int) -> int` - returns a - b
  - `divide_two(a: int, b: int) -> float` - returns a / b

- [ ] Create a new test file: `scripts/test_my_function.py`
- [ ] Import your new function and test it:
  ```python
  from learn_personal_portfolio_ai.source_code import multiply_two

  print(multiply_two(3, 4))  # Should output 12
  ```

- [ ] Run your test: `python scripts/test_my_function.py`
- [ ] Verify the output is correct

**Check:**
- New function has proper type hints
- Test script imports and calls the function successfully
- Output matches your expectations

---

## Success Criteria

You've completed this task when:

✅ Virtual environment created and activated
✅ `python scripts/test_source_code.py` runs and outputs `3`
✅ You can identify and explain type hints in Python code
✅ You've written a new function with type hints and tested it

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `mise: command not found` | Install mise: https://mise.jdx.dev/getting-started.html |
| `ModuleNotFoundError: No module named 'learn_personal_portfolio_ai'` | Make sure virtual environment is activated (`source .venv/bin/activate`) |
| `command not found: python` | Activate virtual environment: `source .venv/bin/activate` |
| Function call doesn't work | Check that import path is correct and file is saved |

---

## Next Steps (After Completion)

Once you've mastered these basics:

- 📚 **Explore:** Add more functions to `source_code.py` with different types (strings, lists, dicts)
- 🧪 **Test:** Create multiple test cases for each function
- 📦 **Build:** Create a new module alongside `source_code.py` for different functionality
- 🔍 **Check:** Use `mise run test` to run automated tests (if available)

---

## Resources

- [Python Type Hints Documentation](https://docs.python.org/3/library/typing.html)
- [Virtual Environments Guide](https://docs.python.org/3/tutorial/venv.html)
- [uv Package Manager](https://docs.astral.sh/uv/)
- [mise Task Runner](https://mise.jdx.dev/)
