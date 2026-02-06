# Task Card: Test-Driven Development with multiply_two

## Prerequisites
Ensure your environment is set up: `mise run venv-create`, `mise run inst`, and `source .venv/bin/activate`

---

## Overview

You will learn Test-Driven Development (TDD) by implementing the `multiply_two` function. The key principle: **write tests first, then implement code to pass those tests.**

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/02-Test-Driven-Development-Guide/)

---

## Phase 1: RED - Write Tests First

### Task 1.1: Create test_multiply_two() function

**File:** `tests/test_source_code.py`

Add the following test function to the file (keep the existing `test_add_two()`):

```python
def test_multiply_two():
    assert multiply_two(3, 4) == 12
    assert multiply_two(5, 0) == 0
    assert multiply_two(-2, 3) == -6
```

**What this means:**
- The function must multiply two integers
- Test case 1: Normal multiplication (3 × 4 = 12)
- Test case 2: Edge case with zero (5 × 0 = 0)
- Test case 3: Edge case with negative number (-2 × 3 = -6)

### Task 1.2: Run tests (they should FAIL)

```bash
mise test
```

**Expected output:**
```
ERROR: cannot import name 'multiply_two'
```

**Why it fails:** The function doesn't exist yet. That's the RED phase!

- [ ] Test file created with three assertions
- [ ] `mise test` confirms tests fail with import error

---

## Phase 2: GREEN - Implement the Function

### Task 2.1: Create multiply_two() function

**File:** `learn_personal_portfolio_ai/source_code.py`

Add the following function (keep the existing `add_two()`):

```python
def multiply_two(a: int, b: int) -> int:
    return a * b
```

**Why this implementation:**
- `a: int, b: int` - Both parameters must be integers (type hints)
- `-> int` - Function returns an integer (type hint)
- `return a * b` - Multiply the two numbers

### Task 2.2: Run tests (they should PASS)

```bash
mise test
```

**Expected output:**
```
tests/test_source_code.py::test_add_two PASSED          [50%]
tests/test_source_code.py::test_multiply_two PASSED     [100%]
======================== 2 passed in 0.02s ========================
```

**Why this matters:**
- GREEN phase: tests pass!
- Both `test_add_two` and `test_multiply_two` pass
- Nothing is broken (the `add_two` function still works)

- [ ] Function added to source_code.py
- [ ] `mise test` shows "2 passed"
- [ ] All assertions pass

---

## Phase 3: Verify - Ensure Nothing Broke

### Task 3.1: Check all tests still pass

Run the test suite one more time:

```bash
mise test
```

Verify:
- ✅ `test_add_two PASSED` (old function still works)
- ✅ `test_multiply_two PASSED` (new function works)
- ✅ "2 passed" message

This is the verification that your changes didn't break existing functionality.

- [ ] All tests pass (2 passed)
- [ ] No test failures

---

## Understanding the TDD Cycle

```
RED (Fail)           → GREEN (Pass)         → VERIFY (No Regressions)
─────────────────     ───────────────────    ───────────────────────
1. Write tests       2. Implement code      3. Run full test suite
2. Run (FAIL)        3. Run (PASS)          4. Confirm nothing broke
3. See error         4. See success         5. Ready to add new feature
```

---

## Key Learning Points

### Why Type Hints?
```python
def multiply_two(a: int, b: int) -> int:
    #            ↑         ↑        ↑
    #    Inputs must be   Output must be
    #       integers         integer
```
Type hints document the contract: "This function works with integers only."

### Why Multiple Test Cases?
Each assertion tests a different scenario:
- **Normal case** (3, 4): Tests basic functionality
- **Edge case** (5, 0): Tests boundary behavior with zero
- **Edge case** (-2, 3): Tests behavior with negative numbers

Good tests catch edge cases that simple implementations might miss.

### Why Tests First?
- Tests define what "done" means before you start coding
- Without tests, you wonder: "Is it correct?"
- With tests, you know: "Tests pass = it's correct"

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `cannot import name 'multiply_two'` | This is the RED phase! Function doesn't exist yet. Proceed to Task 2. |
| `AssertionError: 12 != 11` | Bug in implementation. Check the math in `return a * b` |
| `AssertionError: 0 != 5` | Bug in implementation. Test zero case specifically. |
| `SyntaxError in source_code.py` | Check indentation and quotes in function definition |
| `Only 1 test passed` | Check that both `test_add_two` and `test_multiply_two` exist |

---

## Success Criteria

You've completed this exercise when:

- ✅ Test file contains `test_multiply_two()` with three assertions
- ✅ Source file contains `multiply_two()` function with type hints
- ✅ `mise test` shows "2 passed"
- ✅ Both `test_add_two` and `test_multiply_two` pass
- ✅ No test failures

---

## Optional Challenge: Create Another Function with TDD

Once you've mastered `multiply_two`, practice TDD with another function:

### Challenge: Implement `subtract_two()`

1. **Write test first** (RED phase):
   ```python
   def test_subtract_two():
       assert subtract_two(10, 3) == 7
       assert subtract_two(5, 5) == 0
       assert subtract_two(-2, 3) == -5
   ```

2. **Run test** (should fail):
   ```bash
   mise test
   ```

3. **Implement function** (GREEN phase):
   ```python
   def subtract_two(a: int, b: int) -> int:
       return a - b
   ```

4. **Run test** (should pass):
   ```bash
   mise test
   ```

Verify: "3 passed" (all three functions now have tests)

---

## Next Steps After Mastery

### Level 1: More Functions (Practice TDD)
- Implement `divide_two(a, b)` - returns float
- Implement `power_two(a, b)` - returns a^b
- Implement `absolute_difference(a, b)` - returns |a - b|

### Level 2: Complex Testing
- Test what happens with very large numbers
- Test division by zero (how should it behave?)
- Create helper functions that are tested

### Level 3: Real-World Patterns
- Use type hints with different types (str, float, bool)
- Create functions that work with multiple types
- Test error conditions (ValueError, TypeError)

---

## TDD Principles to Remember

1. **Tests are specification** - They define what code must do before you write it
2. **Red-Green-Refactor** - Always follow this cycle for clean code
3. **All tests, all the time** - Run full test suite after every change
4. **Edge cases matter** - Test zero, negative, boundary conditions
5. **Type hints document intent** - They help tests and prevent bugs

---

## Resources

- [Pytest Getting Started](https://docs.pytest.org/en/latest/getting-started.html)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)
- [TDD Principles](https://en.wikipedia.org/wiki/Test-driven_development)

---

**Remember:** Tests aren't overhead—they're your safety net. Write them first, trust them always, code with confidence.
