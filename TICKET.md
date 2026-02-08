# Learn Personal Portfolio AI 03 - Task Card: Setting Up Node Development Environment with multiply_two

## Prerequisites
Ensure your environment is set up: `mise run venv-create`, `mise run inst`, and `source .venv/bin/activate`

---

## Overview

You will learn Test-Driven Development (TDD) in a **multi-language project** by implementing `multiply_two()` in Python and `multiply()` in Node.js. The key principle: **write tests first in both languages, then implement code to pass those tests.**

This task card guides you through practicing TDD across Python and Node.js using the same logic but different syntax.

Read the [TUTORIAL](https://github.com/easyscale-academy/learn_personal_portfolio_ai-project/tree/03-Setup-Node-Development-Environment/)

---

## Part 1: Python - multiply_two()

### Task 1.1: Create test_multiply_two() function (RED Phase)

**File:** `tests_python/test_source_code.py`

Add the following test function (keep the existing `test_add_two()`):

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
mise run test-python
```

**Expected output:**
```
ERROR: cannot import name 'multiply_two'
```

**Why it fails:** The function doesn't exist yet. That's the RED phase! ✅

**Checklist:**
- [ ] Test file updated with three assertions
- [ ] `mise run test-python` confirms tests fail with import error

### Task 1.3: Create multiply_two() function (GREEN Phase)

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

### Task 1.4: Run tests (they should PASS)

```bash
mise run test-python
```

**Expected output:**
```
tests_python/test_source_code.py::test_add_two PASSED          [50%]
tests_python/test_source_code.py::test_multiply_two PASSED     [100%]
======================== 2 passed in 0.02s ========================
```

**Why this matters:**
- GREEN phase: tests pass!
- Both `test_add_two` and `test_multiply_two` pass
- Nothing is broken (the `add_two` function still works)

**Checklist:**
- [ ] Function added to source_code.py
- [ ] `mise run test-python` shows "2 passed"
- [ ] All assertions pass

---

## Part 2: Node.js - multiply()

### Task 2.1: Create multiply tests (RED Phase)

**File:** `tests_node/math.test.js`

Add the following tests after the existing `add` tests:

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

**Key differences from Python:**
- `test()` instead of `def test_` (Node's test naming convention)
- `assert.strictEqual(a, b)` instead of `assert a == b`
- `require()` to import functions instead of `from...import`

### Task 2.2: Run tests (they should FAIL)

```bash
mise run test-node
```

**Expected error:**
```
TypeError: multiply is not a function
```

**RED phase achieved!** The test is failing because the function doesn't exist yet. ✅

**Checklist:**
- [ ] Test file updated with three test cases
- [ ] `mise run test-node` confirms tests fail with "multiply is not a function"

### Task 2.3: Create multiply() function (GREEN Phase)

**File:** `src/math.js`

Add this function (keep the `add` function):

```javascript
export function multiply(a, b) {
  return a * b;
}
```

**JavaScript function breakdown:**
- `export function` - Makes the function available for import
- `multiply(a, b)` - Function name and parameters (no type hints in JavaScript by default)
- `return a * b` - Multiply them together
- `;` - End statement (JavaScript convention)

### Task 2.4: Run tests (they should PASS)

```bash
mise run test-node
```

**Expected output:**
```
✔ add(2, 3) should equal 5
✔ add(0, 0) should equal 0
✔ multiply(3, 4) should equal 12 (0.456ms)
✔ multiply(5, 0) should equal 0 (0.389ms)
✔ multiply(-2, 3) should equal -6 (0.512ms)

───────────────────────────────────────
tests 5 passed (1.801ms)
```

**GREEN phase complete!** All tests pass:
- Old `add` tests still work
- New `multiply` tests all pass

**Checklist:**
- [ ] Function added to src/math.js
- [ ] `mise run test-node` shows "5 passed"
- [ ] All multiply tests pass

---

## Part 3: VERIFY - Run All Tests

### Task 3.1: Check all tests still pass

Run the complete test suite (Python + Node.js):

```bash
mise run test
```

**Expected output:**
```
======================== Python Tests ========================
tests_python/test_source_code.py::test_add_two PASSED          [50%]
tests_python/test_source_code.py::test_multiply_two PASSED     [100%]
======================== 2 passed in 0.02s ========================

======================== Node.js Tests ========================
✔ add(2, 3) should equal 5
✔ add(0, 0) should equal 0
✔ multiply(3, 4) should equal 12
✔ multiply(5, 0) should equal 0
✔ multiply(-2, 3) should equal -6

───────────────────────────────────────
tests 5 passed (1.801ms)
```

**Verification that your changes didn't break anything:**

- ✅ `test_add_two` still passes (old Python function works)
- ✅ `test_multiply_two` passes (new Python function works)
- ✅ Node `add` tests still pass (old Node function works)
- ✅ Node `multiply` tests pass (new Node function works)

This is the VERIFY phase—you've implemented code in two languages without breaking anything.

**Checklist:**
- [ ] All tests pass (both Python and Node.js)
- [ ] No test failures
- [ ] Output shows "2 passed" for Python and "5 passed" for Node.js

---

## Understanding the TDD Cycle

```
RED (Fail)           → GREEN (Pass)         → VERIFY (No Regressions)
─────────────────     ───────────────────    ───────────────────────
1. Write tests       2. Implement code      3. Run full test suite
2. Run (FAIL)        3. Run (PASS)          4. Confirm nothing broke
3. See error         4. See success         5. Ready to continue
```

---

## Key Learning Points

### Why Type Hints in Python?

```python
def multiply_two(a: int, b: int) -> int:
    #            ↑         ↑        ↑
    #    Inputs must be   Output must be
    #       integers         integer
```

Type hints document the contract: "This function works with integers and returns an integer."

### Why Multiple Test Cases?

Each assertion tests a different scenario:
- **Normal case** (3, 4): Tests basic multiplication
- **Edge case with zero** (5, 0): Tests boundary behavior
- **Edge case with negative** (-2, 3): Tests sign handling

Good tests catch edge cases that simple implementations might miss.

### Why Tests First (TDD)?

- Tests define what "done" means BEFORE you start coding
- Without tests: you wonder "Is it correct?"
- With tests: you know "Tests pass = it's correct"

---

## Python vs Node.js Comparison

### Same Logic, Different Syntax

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

### Similarities

- Both take two parameters
- Both multiply them
- Both return the result
- **The logic is identical**

### Differences

- Python: `def` vs JavaScript: `function`
- Python: has type hints, JavaScript: doesn't
- Python: `from ... import`, JavaScript: `export`/`import`
- Python: no semicolons, JavaScript: has semicolons

**Key takeaway:** Learn one, the other is just syntax.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `cannot import name 'multiply_two'` (Python) | Function doesn't exist yet. This is RED phase—add the function. |
| `TypeError: multiply is not a function` (Node) | Function doesn't exist or isn't exported. Add `export function multiply()`. |
| `AssertionError: 12 != 11` | Bug in implementation. Check the math. Multiply should use `*`, not `+`. |
| `only test_add_two passes, not multiply_two` | Make sure you added the test AND the function correctly. |
| Only Python tests run, not Node.js | Make sure you ran `mise run inst-node-deps` to install Node dependencies. |

---

## Success Criteria

You've completed this exercise when:

- ✅ `test_multiply_two()` with three assertions exists in `tests_python/test_source_code.py`
- ✅ `multiply_two()` function with type hints exists in `learn_personal_portfolio_ai/source_code.py`
- ✅ `mise run test-python` shows "2 passed"
- ✅ Three `multiply` tests exist in `tests_node/math.test.js`
- ✅ `multiply()` function exists in `src/math.js`
- ✅ `mise run test-node` shows "5 passed"
- ✅ `mise run test` shows all tests passing (no failures)

---

## Optional Challenge: Create Another Function with TDD

Once you've mastered `multiply`, practice TDD with another function in both languages:

### Challenge: Implement `divide_two()` (Python) and `divide()` (Node.js)

**Python:**
1. Write test first (RED): `test_divide_two()` with 3 assertions
2. Run test (watch it fail)
3. Implement function (GREEN): `divide_two(a: int, b: int) -> float`
4. Run test (watch it pass)
5. Verify all tests: `mise run test-python`

**Node.js:**
1. Write test first (RED): 3 divide test cases
2. Run test (watch it fail)
3. Implement function (GREEN): `export function divide(a, b)`
4. Run test (watch it pass)
5. Verify all tests: `mise run test-node`

**Final verification:**
```bash
mise run test
```

All tests should pass (both Python and Node.js).

---

## Next Steps After Mastery

### Level 1: More Functions (Practice TDD)
- Implement `power_two()` / `power()` - exponentiation
- Implement `absolute_difference()` / `absoluteDifference()` - absolute difference
- Implement `is_even()` / `isEven()` - boolean return value

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
2. **RED-GREEN-VERIFY** - Always follow this cycle for clean code
3. **All tests, all the time** - Run full test suite after every change
4. **Edge cases matter** - Test zero, negative, boundary conditions
5. **Type hints document intent** - They help tests and prevent bugs

---

## Key Takeaway

**"Tests define success. TDD writes the definition before the solution. In multi-language projects, TDD ensures the same behavior across languages."**

When you run `mise run test`, you're verifying that all your code—Python and JavaScript—works correctly. That's the power of TDD.
