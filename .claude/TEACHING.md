# Teaching Guide - Test-Driven Development (TDD) Fundamentals

## Course Overview

This course teaches Test-Driven Development by having students implement a `multiply_two` function following the TDD workflow: write tests first, then implement code to pass those tests. Students learn that tests are not an afterthought but a fundamental design tool.

## Target Audience
- Intermediate beginners who have completed basic Python setup
- Students learning to work effectively with AI (where tests provide verification)
- Anyone wanting to understand professional development practices

## Learning Objectives

By the end of this course, students will:
1. Understand and apply the TDD workflow (Red → Green → Refactor)
2. Write meaningful pytest test cases with multiple assertions
3. Recognize how tests serve as specification before coding
4. Appreciate how tests enable AI assistance and code confidence
5. Apply TDD to create new functions independently

## Concept Sequence

### Phase 1: Understanding the TDD Cycle (5 minutes)
**Goal:** Grasp the conceptual model before practicing

**Key Concepts:**
- TDD phases: RED (test fails) → GREEN (test passes) → REFACTOR (improve)
- Tests define specification before implementation
- Tests are executable documentation of expected behavior

**Activities:**
- Read through the TDD cycle diagram
- Look at the existing `test_add_two()` to understand test structure
- Understand that `assert` statements define "what should be true"

**Success Criteria:**
- Student can explain what "RED" means (test fails because feature missing)
- Student can explain what "GREEN" means (test passes because code works)
- Student can identify assertions in existing tests

### Phase 2: Writing Tests First (10 minutes)
**Goal:** Create test cases before implementing the function

**Key Concepts:**
- Test names follow `test_<function_name>` convention
- Multiple assertions test different scenarios (happy path + edge cases)
- Edge cases: zero, negative numbers, boundary conditions
- Tests are concrete examples of expected behavior

**Activities:**
- Students add `test_multiply_two()` to `tests/test_source_code.py`
- Include three assertions:
  - Normal case: `multiply_two(3, 4) == 12`
  - Edge case zero: `multiply_two(5, 0) == 0`
  - Edge case negative: `multiply_two(-2, 3) == -6`
- Run `mise test` and observe the RED phase (tests fail)

**Success Criteria:**
- Test file created and contains three test assertions
- Student understands why test fails (function doesn't exist yet)
- Student reads error message: "cannot import name 'multiply_two'"

### Phase 3: Implementation (GREEN Phase) (10 minutes)
**Goal:** Write minimal code to pass all tests

**Key Concepts:**
- Type hints clearly document the contract (`a: int, b: int) -> int`)
- Implementation should satisfy all test cases
- Simple, direct implementation is better than complex logic
- The code must make tests pass, not more, not less

**Activities:**
- Students add `multiply_two()` function to `learn_personal_portfolio_ai/source_code.py`
- Implementation: `return a * b`
- Run `mise test` and observe GREEN phase (tests pass)
- Verify that ALL tests pass (both `test_add_two` and `test_multiply_two`)

**Success Criteria:**
- Function exists with proper type hints
- All assertions in test pass
- Output shows: "2 passed"
- Student can explain why the implementation works for all test cases

### Phase 4: Understanding Configuration (5 minutes)
**Goal:** See how tests are executed under the hood

**Key Concepts:**
- `pyproject.toml` declares pytest as a test dependency
- `mise.toml` defines the `test` task as a shortcut
- `mise test` runs pytest on the `tests/` directory
- Configuration enables reproducible test execution

**Activities:**
- Review `pyproject.toml` to find pytest declaration
- Review `mise.toml` to find the test task definition
- Understand the chain: `mise test` → `.venv/bin/pytest tests`

**Success Criteria:**
- Student can locate pytest in pyproject.toml
- Student can locate test task in mise.toml
- Student understands what `mise test` actually runs

## Teaching Strategies

### 1. The Red-Green-Refactor Cycle
Make the TDD phases explicit:
- **RED:** "Tests fail—that's good! The test is telling you what to build"
- **GREEN:** "Write minimal code to pass—don't over-engineer"
- **REFACTOR:** "Once all tests pass, you can safely improve the code"

### 2. Tests as Specification
Emphasize that tests ARE the specification:
- "Before you know HOW to code it, tests tell you WHAT to code"
- "The test `assert multiply_two(3, 4) == 12` means: multiply_two MUST work this way"

### 3. Edge Cases Matter
Explain why multiple assertions in one test are important:
- Normal case: `multiply_two(3, 4) == 12` (basic functionality)
- Edge case zero: `multiply_two(5, 0) == 0` (boundary behavior)
- Edge case negative: `multiply_two(-2, 3) == -6` (sign handling)

### 4. AI Verification Advantage
Connect tests to AI workflows:
- "AI can run tests and know if it broke something"
- "You can ask AI to modify code, it runs `mise test`, and you see if it worked"
- "Tests replace manual verification with automated confidence"

## Common Student Misconceptions

### Misconception 1: "Tests are extra work that slow me down"
**Reality:** Tests are upfront work that save debugging later
- Without tests: AI modifies code, you wonder if it's correct
- With tests: AI runs `mise test`, you know immediately if it broke

**How to address:**
- Show failing test → student manually tests → show passing test
- Point out: "Manual testing takes longer and you forget cases"

### Misconception 2: "I'll test after I code"
**Reality:** TDD tests are written first, as specification
- Test-first: "I know exactly what to build"
- Test-after: "I might code the wrong thing and have to rewrite"

**How to address:**
- Show the RED phase: test fails because function missing
- This is the whole point—tests guide development

### Misconception 3: "One assert per test is better"
**Reality:** Multiple related assertions in one test are good
- Testing `multiply_two(3, 4) == 12` only covers one case
- Testing `[3*4, 5*0, -2*3]` covers happy path + edge cases

**How to address:**
- Discuss edge cases explicitly
- Show what breaks if you only test positive numbers

## Assessment Ideas

### Quick Checks (During Course)
- Can student write the three test assertions correctly?
- Can student explain what RED and GREEN phases mean?
- Can student identify type hints in the function signature?
- Can student run `mise test` and interpret the output?

### Challenge Task (End of Course)
- Create a new function (e.g., `divide_two`, `subtract_two`, `power_two`)
- Write tests first (RED phase)
- Implement the function (GREEN phase)
- Verify all tests pass and nothing else broke

### Stretch Goals (For Advanced Students)
- Test more edge cases (division by zero, very large numbers)
- Create multiple test functions in the same file
- Understand pytest fixtures for more complex testing
- Use type checking tools (mypy) to validate type hints

## Common Student Errors & Solutions

### Error 1: "ModuleNotFoundError: No module named multiply_two"
**Cause:** Student forgot to import or function doesn't exist yet
**Solution:** In RED phase, this is expected! Explains that the function must be created next

### Error 2: "AssertionError: 12 != 11"
**Cause:** Implementation has a bug
**Solution:** Show that the test caught the bug. Fix the implementation and run `mise test` again

### Error 3: "Tests pass but I changed add_two() function"
**Cause:** Student didn't verify all tests still pass
**Solution:** Emphasize running full test suite, not just new tests

## Expected Time Investment
- Understanding TDD cycle: 5 minutes
- Writing tests: 10 minutes
- Implementing function: 10 minutes
- Understanding configuration: 5 minutes
- **Total: 30 minutes for complete course**

- Creating own function with TDD: 15-20 minutes
- **Full mastery: 45-50 minutes**

## Key Takeaway

**"Tests are not validation; they are specification. In TDD, you write the specification (test) first, then code the solution."**

This fundamental shift changes how students think about development and makes AI assistance powerful (AI can write code and verify it works).

## References for Instructors

- [Pytest Documentation](https://docs.pytest.org/)
- [TDD Best Practices](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Red-Green-Refactor Cycle](https://en.wikipedia.org/wiki/Test-driven_development#Red–green–refactor)
- [Type Hints in Python](https://docs.python.org/3/library/typing.html)
- [Edge Case Testing](https://en.wikipedia.org/wiki/Edge_case)
