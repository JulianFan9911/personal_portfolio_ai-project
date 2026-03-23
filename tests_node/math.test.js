import { test } from 'node:test';
import assert from 'node:assert';
import { add, divide } from '../src/math.js';


test('add(2, 3) should equal 5', () => {
  assert.strictEqual(add(2, 3), 5);
});

test('add(0, 0) should equal 0', () => {
  assert.strictEqual(add(0, 0), 0);
});

test('divide(10, 2) should equal 5', () => {
  assert.strictEqual(divide(10, 2), 5);
});

test('divide(9, 3) should equal 3', () => {
  assert.strictEqual(divide(9, 3), 3);
});

test('divide(-6, 2) should equal -3', () => {
  assert.strictEqual(divide(-6, 2), -3);
});