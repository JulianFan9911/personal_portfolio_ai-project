# Teaching Guide - Setting Up Node Development Environment

## Course Overview

This course teaches Test-Driven Development (TDD) in a **multi-language project** by having students implement `multiply_two()` in Python and `multiply()` in Node.js. The key insight: **TDD principles are universal across languages—only syntax differs.**

Students learn that:
- TDD guides development the same way in every language
- Understanding one language's syntax doesn't mean understanding another's, but the testing principle stays identical
- Professional projects often mix languages, and this course prepares them for that reality

## Target Audience

- Students who completed the Python TDD fundamentals course
- Learners ready to expand into multi-language development
- Anyone wanting to understand how professional teams manage multiple codebases
- Developers preparing to work with AI assistance across different languages

## Learning Objectives

By the end of this course, students will:

1. **Understand multi-language project structure** - Know why and how separate language ecosystems coexist
2. **Apply TDD across different languages** - Write tests and code in both Python and JavaScript
3. **Compare language syntax** - Recognize how the same logic looks different across languages
4. **Use task coordination tools** - Understand how `mise` orchestrates multiple language test suites
5. **Work confidently in multi-language environments** - Know how professional teams handle this complexity

## Prerequisite Knowledge

Students should already understand:
- Basic Python syntax and functions
- TDD workflow: RED (test fails) → GREEN (test passes) → VERIFY (nothing broke)
- What pytest is and how to run `mise test`
- Type hints in Python (`: int`, `-> int`)

## Key Concepts to Teach

### 1. Project Evolution: Single Language → Multi-Language

**Why this matters:** Real-world projects aren't monolithic. They combine languages strategically.

**What changed:**
- `tests/` → split into `tests_python/` and `tests_node/`
- New `src/` folder (JavaScript convention)
- New `package.json` (JavaScript configuration)
- Updated `mise.toml` (task coordination)

**Teaching tip:** Show the before/after directory structure side-by-side. Help students see this isn't random—it follows each language's conventions.

### 2. Node.js: JavaScript Runtime

**Analogy:** Python is to Python files as Node.js is to JavaScript files.

**What to emphasize:**
- JavaScript normally runs in browsers
- Node.js lets you run JavaScript anywhere (server-side)
- It's just a different runtime—same language, different environment

**Teaching tip:** Don't overwhelm students with JavaScript. Focus on "Node.js lets you run JavaScript like Python runs Python."

### 3. pnpm: Package Manager for JavaScript

**Parallel to Python's `uv`:**

| Python | Node.js |
|--------|---------|
| `uv` downloads packages | `pnpm` downloads packages |
| Creates `.venv/` | Creates `node_modules/` |
| Manages virtual environments | Manages dependencies |

**Teaching tip:** Use this exact comparison. Students understand `uv` already, so `pnpm` is just the JavaScript equivalent.

### 4. mise.toml: Task Orchestration

This is the "magic" students see when they run `mise run test` and get Python + Node.js results.

**Key section:**
```toml
[tasks.test]
depends = ["test-python", "test-node"]
```

**What to teach:**
- `depends` field runs multiple tasks sequentially
- `mise run test` = "run test-python AND test-node"
- This keeps commands simple while allowing flexibility
- This is how professional teams manage complexity

**Teaching tip:** Show what `mise run test` actually does under the hood. It's not magic—it's configuration.

### 5. TDD is Language-Agnostic

**Core principle:** The testing workflow is the same everywhere.

```
Python: write test → run → FAIL → write code → run → PASS → verify
Node.js: write test → run → FAIL → write code → run → PASS → verify
```

**What to emphasize:**
- RED phase looks the same (error, function missing)
- GREEN phase looks the same (all tests pass)
- VERIFY phase looks the same (run full suite, no regressions)
- Only the syntax of test and code changes

## Teaching Sequence

### Phase 1: Setup & Context (10 minutes)

**Goal:** Help students understand WHY this matters and WHAT changed

**Activities:**
1. Show directory structure: before vs. after
2. Explain why companies have multiple languages
3. Walk through `mise.toml` to show task coordination
4. Show that running `mise run test` executes TWO test suites

**Success indicator:** Student can explain why test folders are separated

### Phase 2: Python - multiply_two() (15 minutes)

**Goal:** Refresh TDD in a language they know

**Activities:**
1. Students write test first: `test_multiply_two()` with 3 assertions
2. Run `mise run test-python` → see RED phase (import error)
3. Explain: "The test is asking for a function that doesn't exist yet"
4. Implement: `multiply_two(a: int, b: int) -> int`
5. Run `mise run test-python` → see GREEN phase (all pass)
6. Verify: `test_add_two` still passes

**Teaching tips:**
- This should feel familiar—they've done this before
- Emphasize: "Same TDD process, just doing it again in Python"
- Point out: both `test_add_two` and `test_multiply_two` pass

**Success indicator:** Both Python tests pass without breaking old code

### Phase 3: Intro to Node.js (10 minutes)

**Goal:** Ease students into JavaScript without overwhelming them

**Activities:**
1. Show `src/math.js` - point out `export function add()`
2. Compare to Python: same logic, different syntax
3. Show `tests_node/math.test.js` - point out test structure
4. Compare to Python: same concept, different syntax
5. Emphasize: "Same testing principle, different JavaScript syntax"

**Teaching tips:**
- Don't go deep into JavaScript. Keep it surface-level.
- Use side-by-side comparisons to show "same logic"
- Focus on: "The test structure is the same idea, just JavaScript syntax"

**Success indicator:** Student can identify test vs. implementation in Node files

### Phase 4: Node.js - multiply() (15 minutes)

**Goal:** Students write tests and code in JavaScript

**Activities:**
1. Students write tests: 3 multiply test cases in JavaScript
2. Run `mise run test-node` → see RED phase (function missing)
3. Point out: "Same error as Python—function doesn't exist yet"
4. Implement: `export function multiply(a, b) { return a * b; }`
5. Run `mise run test-node` → see GREEN phase (all pass)
6. Verify: old `add` tests still pass

**Teaching tips:**
- This mirrors Phase 2 exactly—show the parallel
- Highlight: "RED phase is the same in both languages"
- Point out: both test sets pass (old + new)

**Success indicator:** All Node.js tests pass without breaking old code

### Phase 5: Multi-Language Verification (5 minutes)

**Goal:** Show the power of coordinated testing

**Activities:**
1. Run `mise run test` (runs EVERYTHING)
2. Show output: Python tests + Node.js tests, all passing
3. Explain: "You changed code in 2 languages and verified both work"
4. Point out: old code in both languages still works (VERIFY phase)

**Teaching tips:**
- This is the "aha!" moment—multiple languages, one verification
- Show how this scales: add more languages, add more functions, `mise run test` still works
- Explain: "This is how professional teams stay confident"

**Success indicator:** Student runs `mise run test` and sees both test suites pass

### Phase 6: Comparison & Insight (10 minutes)

**Goal:** Solidify the "same logic, different syntax" principle

**Activities:**
1. Put Python and JavaScript multiply side-by-side
2. Ask: "What's the same? What's different?"
3. Build comparison table together:
   - Same: 2 parameters, multiply, return result
   - Different: def vs. function, type hints, export, semicolons
4. Key insight: "Learn one language's testing, apply everywhere"

**Teaching tips:**
- This is where students "get it"
- Make it visual—use colors or highlighting
- Emphasize: "The testing principle is what matters, syntax is just details"

**Success indicator:** Student can explain the Python/JavaScript differences without prompting

### Phase 7: Challenge & Consolidation (20 minutes)

**Goal:** Students practice TDD independently in both languages

**Challenge:** Implement `divide_two()` and `divide()` with tests

**Activities:**
1. Students write test first in Python (RED)
2. Students implement in Python (GREEN)
3. Verify Python tests pass
4. Repeat for JavaScript
5. Run `mise run test` to verify everything

**Teaching tips:**
- Students are now doing this independently
- Resist helping with syntax—let them struggle with JavaScript
- That struggle is valuable—it's how they learn JavaScript
- Celebrate when they finish: "You just implemented TDD in 2 languages!"

**Success indicator:** All tests pass (Python + Node.js) after their implementation

## Teaching Strategies

### Strategy 1: Mirror, Mirror, Mirror

Everything students do in Python, they repeat in Node.js:
- Test → Code in Python
- Test → Code in Node.js

This shows that TDD is the same process, just different syntax.

### Strategy 2: Side-by-Side Comparison

Whenever showing JavaScript, put Python right next to it:

```python
def multiply_two(a: int, b: int) -> int:
    return a * b
```

vs.

```javascript
export function multiply(a, b) {
  return a * b;
}
```

This makes differences obvious and similarities clear.

### Strategy 3: Focus on Testing, Not Syntax

When teaching JavaScript:
- Emphasize: "This test structure is the same as Python"
- Don't get into: "Here's everything about JavaScript syntax"
- Keep it practical: "Here's what you need to write tests"

### Strategy 4: Gradual Language Introduction

Don't dump JavaScript on them. Introduce it step-by-step:
1. Show existing code (they don't write yet)
2. Explain existing tests (they don't write yet)
3. Have them write tests (still using existing code)
4. Have them write code (to pass tests)

This scaffolds learning.

## Common Student Misconceptions

### Misconception 1: "I need to master JavaScript now"

**Reality:** They need to write enough JavaScript to pass tests. That's different from mastery.

**How to address:**
- "You don't need to understand all of JavaScript"
- "You need to understand: function syntax, export, and how to call functions"
- "That's enough to write tests and code to pass them"

### Misconception 2: "Node.js is complicated"

**Reality:** Node.js is just "JavaScript on your computer." The complexity comes later (packages, servers, etc.)

**How to address:**
- "Node.js = JavaScript runtime, like Python is a runtime"
- "We're just running JavaScript code, same as we run Python"
- "Focus on: writing tests and making them pass"

### Misconception 3: "I have to memorize JavaScript syntax"

**Reality:** They need to recognize patterns, not memorize everything.

**How to address:**
- "You'll see `function`, not `def`. That's the main difference."
- "You'll see `export`, which Python doesn't have. That's how JavaScript shares code."
- "Most of the thinking is the same as Python"

### Misconception 4: "Testing is easier in Python than JavaScript"

**Reality:** Testing is the same in both; only syntax differs.

**How to address:**
- "Python: `assert x == y`, JavaScript: `assert.strictEqual(x, y)`"
- "Same concept, different syntax"
- "The test idea is identical everywhere"

## Assessment Ideas

### Quick Checks (During Course)

**For Python phase:**
- Can student write 3 test assertions correctly?
- Can student implement multiply_two with proper type hints?
- Does old code (add_two) still work after changes?

**For Node.js phase:**
- Can student write JavaScript tests in the correct syntax?
- Can student use `export function` correctly?
- Do old tests still pass after new code?

**For integration:**
- Does `mise run test` show all tests passing?
- Can student explain why tests are in different folders?

### Challenge Tasks

**After Python:**
- Implement `subtract_two()` with tests (verify nothing broke)

**After Node.js:**
- Implement `subtract()` with tests (verify nothing broke)

**After integration:**
- Implement `power_two()` and `power()` with TDD in both languages
- Verify `mise run test` passes all tests

### Stretch Goals

For advanced students:
- Add more edge cases to tests
- Create multiple test functions in the same file
- Add a third language (e.g., simple Go or Rust)
- Understand how to run just Python tests: `mise run test-python`
- Understand configuration in `mise.toml` (modify and test)

## Common Student Errors & Solutions

### Error 1: Tests pass in Python but student forgets Node.js

**Cause:** Student gets focused on one language

**Solution:** Always run `mise run test` (both languages) at the end. Make it a habit.

### Error 2: JavaScript syntax errors (forget `export`, semicolon, etc.)

**Cause:** Unfamiliar syntax

**Solution:** This is okay! Syntax errors teach. Let them debug the error message. Point to similar Python code: "In Python, you'd use `def`. Here use `function`."

### Error 3: "My test passes but I broke something else"

**Cause:** Didn't verify all tests

**Solution:** This is exactly why we verify! Celebrate the catch: "This is why we run all tests before declaring victory."

### Error 4: Trying to memorize JavaScript instead of learning TDD

**Cause:** Student overwhelmed by new syntax

**Solution:** Redirect: "Don't memorize. Recognize patterns. Can you spot `function`? Can you spot `export`? That's enough for now."

### Error 5: Running wrong test command

**Cause:** Confusion about command names

**Solution:** Keep a reference handy:
- `mise run test-python` - just Python
- `mise run test-node` - just Node.js
- `mise run test` - both

## Expected Time Investment

### Total Course Time

- Phase 1 (Setup): 10 minutes
- Phase 2 (Python): 15 minutes
- Phase 3 (Node intro): 10 minutes
- Phase 4 (Node implementation): 15 minutes
- Phase 5 (Verification): 5 minutes
- Phase 6 (Comparison): 10 minutes
- Phase 7 (Challenge): 20 minutes

**Total: ~85 minutes for complete course**

### After First Pass

- Implementing second function independently: 15-20 minutes
- Mastery: 2-3 functions implemented with tests in both languages

## Key Takeaway for Students

**"TDD is the same everywhere. Languages are just different dialects. Master the testing principle in one language, and you can apply it anywhere."**

When students understand this, they've achieved the goal. The specific JavaScript syntax doesn't matter as much as the realization that testing transcends languages.

## References for Instructors

### Node.js / JavaScript
- [Node.js Official Docs](https://nodejs.org/docs/)
- [Node.js Test Module](https://nodejs.org/api/test.html) (built-in testing)
- [pnpm Documentation](https://pnpm.io/)

### Testing & TDD
- [Jest Documentation](https://jestjs.io/) (popular JS testing framework)
- [Pytest vs Mocha](https://github.com/awesome-testing/javascript-testing-frameworks) (comparison)
- [TDD Best Practices](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

### Multi-Language Development
- [Polyglot Programming](https://en.wikipedia.org/wiki/Polyglot_programming)
- [mise Documentation](https://mise.jdx.dev/) (task runner used here)

## Closing Thoughts

This course teaches more than TDD in Node.js. It teaches that:

1. **Principles transcend syntax** - TDD is about thinking, not language
2. **Professional development is messy** - Real projects use multiple languages
3. **Tools help coordination** - `mise` makes managing complexity easier
4. **Confidence comes from testing** - Running `mise run test` and seeing everything pass is powerful

Students who complete this course gain confidence in multi-language environments and understand that TDD is their superpower across all of them.
