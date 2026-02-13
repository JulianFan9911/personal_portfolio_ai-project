# Learning Test-Driven Development in Action

**Before you start:** Make sure your environment is ready by running these commands: `mise run venv-create`, `mise run inst`, and `source .venv/bin/activate`. You should see `(.venv)` in your terminal prompt.

---

## What You're About to Learn

Imagine you're building a house. Would you:
- **Option A:** Start building randomly and hope it turns out right, then check if the walls are straight?
- **Option B:** First make a detailed blueprint, then build according to the plan so you know it will be correct?

Option B is much smarter, right? That's what Test-Driven Development (TDD) is—making a "blueprint" (test) before writing the actual code. The blueprint tells you exactly what the code should do, and you keep writing code until it matches the blueprint perfectly.

In this lesson, you'll learn this powerful approach by writing your own code and tests. It might feel weird at first (writing tests before code?), but you'll quickly see why professionals do this everywhere.

---

## Why Should You Care About Tests?

Let me tell you a story. Sarah is a programmer. She writes some code that works perfectly. Two weeks later, she modifies it for a new feature. Suddenly, something breaks. She spends 3 hours debugging to find out that her new change broke an old feature. Frustrating, right?

Now imagine a different scenario: Sarah has tests. After she modifies the code, she runs `mise test` and immediately sees that her change broke something. She can fix it right away. No wasted time hunting for bugs.

Here's the even better part for you as a student: **When you ask AI to help with code, tests let the AI verify its own work.** You can say, "Please improve this function," and the AI can run `mise test` to check if the improvement actually works. Without tests, you'd have to manually check everything the AI does.

That's powerful. That's why we start with tests.

---

## Your Challenge: The TDD Workflow

You're going to implement a function called `multiply_two` that multiplies two numbers. But here's the key: you'll write the test first (describing what the function should do), and then write the code to make that test pass.

This might sound backwards, but trust me—once you understand it, you'll see why this is brilliant.

---

## Step 1: Understanding What We're Building

Before we even touch the computer, let's think about what `multiply_two` should do:
- It takes two numbers as input
- It multiplies them together
- It gives you the result

Examples:
- `multiply_two(3, 4)` should give `12` (because 3 × 4 = 12)
- `multiply_two(5, 0)` should give `0` (because 5 × 0 = 0)
- `multiply_two(-2, 3)` should give `-6` (because -2 × 3 = -6)

Now, the question is: how do we tell the computer exactly what we expect? The answer is: write it down as a test!

---

## Step 2: Write the Test (RED Phase)

This is the "RED" phase of Test-Driven Development. We call it "RED" because when you run the test, it will fail with a red error message. And that's completely okay—that's the whole point!

### Task: Add a Test to `tests/test_source_code.py`

Look at your `tests/test_source_code.py` file. You'll see there's already a test for the `add_two` function. Now, you're going to add a new test for `multiply_two`.

Add this code to the file (keep everything that's already there):

```python
def test_multiply_two():
    assert multiply_two(3, 4) == 12
    assert multiply_two(5, 0) == 0
    assert multiply_two(-2, 3) == -6
```

**What does this mean?**

Let's break it down line by line:
- `def test_multiply_two():` - We're creating a test function. All test functions start with `test_`.
- `assert multiply_two(3, 4) == 12` - This is a test case. It says: "When I call `multiply_two(3, 4)`, I expect it to equal 12. If it doesn't, the test fails and tells me something is wrong."
- `assert multiply_two(5, 0) == 0` - Another test case. When you multiply by zero, you should get zero.
- `assert multiply_two(-2, 3) == -6` - Another test case. Even with negative numbers, multiplication should work correctly.

Think of `assert` as saying: "This thing should be true. If it's not true, stop and tell me something is wrong."

### Run the Test (Expect It to Fail)

Now let's run this test to see it fail:

```bash
mise test
```

**What you'll see:**

```
ERROR: cannot import name 'multiply_two'
```

Perfect! This is exactly what should happen. The test is telling you: "I tried to use the `multiply_two` function, but it doesn't exist yet." This is the RED phase—the test is failing, and that's good. It means the test is working correctly and it's telling you what needs to be built.

**Checkpoint:**
- [ ] You've added the test to `tests/test_source_code.py`
- [ ] You've run `mise test` and seen it fail with the error about `multiply_two` not existing

---

## Step 3: Understand Type Hints (A Quick Detour)

Before we write the function, let me explain something important: type hints. Look at this:

```python
def multiply_two(a: int, b: int) -> int:
```

This looks complicated, but it's actually a written promise:
- `a: int` means "the first input (a) must be an integer"
- `b: int` means "the second input (b) must be an integer"
- `-> int` means "I promise to give you back an integer"

Why is this useful? Because it's like writing a contract. When someone uses your function, they immediately know: "This function only works with whole numbers. If I give it decimal numbers, something might go wrong." It also helps AI and other tools catch mistakes before they happen.

In Python, you don't *have* to write type hints (the code will work without them), but professional programmers always do because it makes code clearer and prevents bugs.

---

## Step 4: Implement the Function (GREEN Phase)

Now we move to the "GREEN" phase. In this phase, we write the actual code to make the test pass.

### Task: Add the Function to `learn_personal_portfolio_ai/source_code.py`

Look at your `learn_personal_portfolio_ai/source_code.py` file. You'll see the `add_two` function already there. Now add this new function:

```python
def multiply_two(a: int, b: int) -> int:
    return a * b
```

**What does this do?**

- `def multiply_two(a: int, b: int) -> int:` - We're defining a function. It takes two integer inputs (a and b) and returns an integer.
- `return a * b` - This is the actual work. It multiplies a and b together and gives back the result.

That's it! It's a simple function. The point here is not to be clever—the point is to write code that makes the test pass. Simple, clear code that does exactly what the test expects.

### Run the Test (Expect It to Pass)

Now let's run the test again:

```bash
mise test
```

**What you should see:**

```
tests/test_source_code.py::test_add_two PASSED          [50%]
tests/test_source_code.py::test_multiply_two PASSED     [100%]
======================== 2 passed in 0.02s ========================
```

**Yes!** Your test passes! This is the GREEN phase. Both tests pass:
- The old `test_add_two` still passes (you didn't break anything)
- The new `test_multiply_two` passes (your code works correctly)

Notice it says "2 passed"—that's really important. It means you didn't accidentally break the `add_two` function while adding `multiply_two`. This is one of the superpowers of testing: you get immediate feedback if you break something.

**Checkpoint:**
- [ ] You've added the `multiply_two` function to `source_code.py`
- [ ] You've run `mise test` and seen "2 passed"
- [ ] Both tests pass

---

## Step 5: Understand How It All Works Together

Let me explain what's happening under the hood so you understand the bigger picture.

### The Test File

When you write this test:
```python
def test_multiply_two():
    assert multiply_two(3, 4) == 12
```

You're writing a specification in code. You're saying: "I'm defining what `multiply_two` should do. It should multiply 3 and 4 and return 12. This is not optional—this is the requirement."

Notice the important pattern: the function name starts with `test_`, and it uses `assert` statements to check if things are true. This is the basic recipe for all pytest tests, no matter how complex.

### The Source Code File

When you write this function:
```python
def multiply_two(a: int, b: int) -> int:
    return a * b
```

You're writing the implementation that satisfies the specification. You're saying: "Here's how I'll multiply two numbers—I'll use Python's `*` operator."

### How They Connect: The Pytest Framework

Here's the key insight: **pytest is a library that does one simple thing**—it looks for test files, runs functions that start with `test_`, and checks if their `assert` statements are true. That's it. That's the whole concept.

The basic recipe for any test is:
1. **Import** what you want to test: `from learn_personal_portfolio_ai.source_code import multiply_two`
2. **Define a test function** starting with `test_`: `def test_multiply_two():`
3. **Use assert statements** to say what should be true: `assert multiply_two(3, 4) == 12`

This simple pattern is the foundation of all testing, whether it's simple tests like yours or complex tests in huge projects. Everything builds on this basic idea.

When you run `mise test`, here's what actually happens:

1. pytest (a testing library) starts and looks in the `tests/` folder
2. It finds all files named `test_*.py`
3. It finds all functions starting with `test_`
4. It runs each test function
5. Inside each test, it checks all the `assert` statements
6. If all assertions are true, the test passes ✅
7. If any assertion is false, the test fails ❌ and shows what went wrong

In your case:
- pytest finds `test_multiply_two()`
- It runs `assert multiply_two(3, 4) == 12`
- The function returns `3 * 4 = 12`
- The assertion checks: is 12 == 12? Yes!
- Test passes ✅

### Why Pytest?

**pytest is the de facto standard for testing in Python.** When professional Python developers write tests, they use pytest. It's simple (as you've seen), powerful, and widely used. Once you learn pytest, you can test anything in Python.

---

## Why Tests Matter: The Real-World Benefit

Let me give you a concrete example of why this matters. Imagine you later realize: "Oh wait, `multiply_two` should work with decimals too, not just whole numbers." You change the function:

```python
def multiply_two(a: int, b: int) -> float:  # Changed return type
    return a * b
```

You run `mise test` and everything still passes. Good—your change is compatible with existing tests. Your code didn't break anything.

Now imagine a different change. You accidentally type:

```python
def multiply_two(a: int, b: int) -> int:
    return a + b  # Oops! Added instead of multiplied!
```

You run `mise test`:

```
AssertionError: assert 7 == 12
    assert multiply_two(3, 4) == 12
```

The test immediately catches your mistake! You can fix it right away instead of spending hours debugging later.

**This is why AI developers love tests.** When AI writes code (or modifies code), tests provide immediate feedback: "Did you break anything? Did your code actually work?" No manual checking needed.

---

## The Three Phases of TDD

Now you understand the complete workflow. Let me summarize it:

### Phase 1: RED (Test Fails)
You write a test that describes what should happen. You run it, and it fails because the code doesn't exist yet. This tells you exactly what to build.

### Phase 2: GREEN (Test Passes)
You write the simplest code that makes the test pass. Not fancy, not complex—just enough to satisfy the test.

### Phase 3: VERIFY (Nothing Broke)
You run the entire test suite to make sure you didn't accidentally break anything else. In your case, both `test_add_two` and `test_multiply_two` pass, so you know everything is working.

---

## What We've Learned

Let's recap what you've learned:

1. **Tests as Specification** - Tests define what code should do before you write it
2. **The `assert` Keyword** - It's how you say "this should be true"
3. **Type Hints** - They document what types a function expects and returns
4. **The RED-GREEN Cycle** - Write test (fails), write code (passes)
5. **The Safety Net** - Run all tests to catch regressions

---

## Try It Yourself: Optional Challenge

Feel confident? Try this on your own:

1. Write a test for a `subtract_two` function that subtracts two numbers
2. Run the test (watch it fail with RED)
3. Write the `subtract_two` function
4. Run all tests (watch them go GREEN)

This will reinforce everything you've learned. The test might look like:

```python
def test_subtract_two():
    assert subtract_two(10, 3) == 7
    assert subtract_two(5, 5) == 0
    assert subtract_two(-2, 3) == -5
```

Can you figure out the implementation? (Hint: it's just like `multiply_two` but using `-` instead of `*`)

---

## Behind the Scenes: How Configuration Makes It Work

You might be wondering: "How does `mise test` know to run tests?" The answer is in two configuration files. But first, let me demystify what's actually happening.

### The Actual Command

When you type `mise test`, here's what really happens under the hood. The actual command that runs is:

```bash
.venv/bin/pytest tests
```

This means: "Use pytest (which is in your virtual environment's bin folder) to run all tests in the `tests/` folder."

You could type this command directly if you wanted:
```bash
.venv/bin/pytest tests  # This is the same as mise test!
```

But that's long and annoying to type. So we have configuration files to make it shorter.

### The Configuration Files

**`pyproject.toml`** declares that pytest is a test dependency:
```toml
[project.optional-dependencies]
test = [
    "pytest>=8.2.2,<9.0.0",
]
```

This says: "This project needs pytest for testing. When someone runs `mise run inst`, install pytest too."

**`mise.toml`** defines a shortcut command:
```toml
[tasks.test]
description = "🧪 Run tests with pytest"
run = ".venv/bin/pytest tests"
```

This says: "When I run `mise test`, actually run the command `.venv/bin/pytest tests`."

So `mise test` is just a **wrapper** (a shortcut) for the longer command `.venv/bin/pytest tests`. It makes testing easier and gives everyone on your team a consistent way to run tests.

### The Big Picture

```
mise test  →  (looks up command in mise.toml)  →  .venv/bin/pytest tests  →  (runs pytest on tests/ folder)
```

Think of `mise` as a task runner that remembers commands for you. Instead of remembering complicated commands, you just type short names like `mise test`, `mise venv-create`, etc.

---

## Key Takeaways

Remember these important points:

- ✅ **Tests come first** - In TDD, you write tests before code
- ✅ **Tests are specification** - They define exactly what code should do
- ✅ **Assert is a promise** - Each `assert` is a requirement your code must satisfy
- ✅ **Type hints document intent** - They tell readers what types your function uses
- ✅ **Run all tests always** - Catch regressions before they become problems

---

## Ready to Become a TDD Developer?

You now understand the fundamental pattern that professional developers use every day. Congratulations! Keep practicing this on every function you write, and you'll develop the habit of thinking in tests first, code second.

Your next challenge: try the optional `subtract_two` challenge above. Then, keep going. Create more functions with tests. Soon, this will become second nature.

Remember: **tests are not extra work—they're your superpower.** They tell you when something breaks. They let AI help you with confidence. They turn debugging from a 3-hour nightmare into a 30-second fix.

Welcome to Test-Driven Development. 🎯
