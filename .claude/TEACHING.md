# Teaching Guide - Python Development Environment & Basics

## Course Overview

This is an introductory course on setting up a professional Python development environment and understanding core Python concepts. Students will progress from environment setup to writing and testing their own Python functions.

## Learning Objectives

By the end of this course, students will:
1. Understand and use virtual environments for Python projects
2. Manage dependencies using modern tools (uv and mise)
3. Recognize and write type hints in Python
4. Organize code into packages and modules
5. Import and reuse code across files

## Concept Sequence

### Phase 1: Environment Setup (2 minutes)
**Goal:** Get Python running in an isolated, reproducible environment

**Key Concepts:**
- Virtual environments isolate project dependencies
- Configuration files (`mise.toml`, `pyproject.toml`) define project requirements
- `uv` provides fast, deterministic dependency resolution

**Activities:**
- Run `mise run venv-create` to create virtual environment
- Run `mise run inst` to install dependencies
- Activate the environment with `source .venv/bin/activate`

**Success Criteria:**
- Virtual environment created and activated
- Student can run `python --version` within the environment

### Phase 2: Running Existing Code (3-5 minutes)
**Goal:** Execute working code to understand the project structure

**Key Concepts:**
- Package structure: `learn_personal_portfolio_ai/` contains source code
- Module imports: How to bring code from one file into another
- Function calls: Using functions written elsewhere

**Activities:**
- Run `python scripts/test_source_code.py`
- Observe the output (`3`)
- Examine how `add_two()` is imported and called

**Success Criteria:**
- Script executes without errors
- Student understands the import statement

### Phase 3: Understanding Type Hints (5-10 minutes)
**Goal:** Learn why and how to use type annotations

**Key Concepts:**
- Type hints document what types functions expect and return
- `def add_two(a: int, b: int) -> int:` clearly shows intent
- Type hints help catch errors and improve IDE support

**Activities:**
- Read the `add_two()` function signature
- Try calling it with wrong types (e.g., `add_two("a", "b")`) to see runtime behavior
- Discuss how type hints improve code clarity

**Success Criteria:**
- Student can identify type hints in code
- Student understands the pattern `parameter: type -> return_type`

### Phase 4: Writing and Testing Code (10-15 minutes)
**Goal:** Create new functions and verify they work

**Key Concepts:**
- Creating functions with proper signatures
- Testing code in isolation
- Reusing functions from other modules

**Activities:**
- Create a new function in `source_code.py` (e.g., `multiply_two`)
- Write a test script to verify the function works
- Import and execute the test

**Success Criteria:**
- New function created with type hints
- Test script runs without errors
- Output matches expectations

## Teaching Strategies

### Hands-On Learning
- Every concept is paired with an executable example
- Students immediately see results of their actions
- Error messages guide learning when things go wrong

### Scaffolded Difficulty
- Start with one-command environment setup
- Progress to reading and understanding existing code
- Finally, create and test own code

### Clear Connection to Real-World
- `mise.toml` and `pyproject.toml` are real configuration files used in production projects
- `uv` is a modern, industry-standard tool
- Type hints are a best practice in professional Python development

## Common Student Challenges

### Challenge 1: "mise not found"
**Likely Cause:** `mise` not installed or not in PATH
**Solution:** Direct student to install mise via their package manager (brew, apt, etc.)

### Challenge 2: Import errors when running scripts
**Likely Cause:** Virtual environment not activated or script run from wrong directory
**Solution:** Verify `source .venv/bin/activate` was run, and script is in correct location

### Challenge 3: Understanding why type hints matter
**Likely Cause:** They seem optional in Python (they are!) so students might skip them
**Solution:** Show how type hints help IDEs provide better autocomplete and catch bugs early

## Assessment Ideas

### Quick Checks (During Course)
- Can student successfully activate the virtual environment?
- Can student run the test script and interpret the output?
- Can student identify type hints in the `add_two()` function?

### Challenge Task (End of Course)
- Create a new function with type hints (e.g., `subtract_two`, `divide_two`)
- Write a test script that imports and calls the new function
- Verify the test produces expected output

### Stretch Goals (For Advanced Students)
- Add multiple test cases to the test script
- Create a new module in the package alongside `source_code.py`
- Use a linter (ruff) to check code quality (available via `mise`)

## Expected Time Investment
- Complete setup to testing: ~15-20 minutes for first-time students
- Writing own functions: ~10-15 minutes
- Total: ~30 minutes for full course completion

## References for Instructors

- **Virtual Environments:** https://docs.python.org/3/tutorial/venv.html
- **Type Hints:** https://docs.python.org/3/library/typing.html
- **uv Package Manager:** https://docs.astral.sh/uv/
- **Packaging Best Practices:** https://packaging.python.org/
