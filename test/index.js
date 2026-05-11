const test = require('tape');
const isFunction = require('lodash.isfunction');
const map = require('lodash.map');
const uniq = require('lodash.uniq');
const every = require('lodash.every');
const some = require('lodash.some');
const constant = require('lodash.constant');

const aleaRandom = require('../');

const array = new Array(1000);

test('exports a function', (t) => {
  t.plan(1);
  t.ok(isFunction(aleaRandom));
});

test('returns `0` or `1` when arguments are not provided', (t) => {
  t.plan(1);
  const actual = map(array, () => aleaRandom());
  t.deepEqual(uniq(actual).sort(), [0, 1]);
});

test('supports a `min` and `max` argument', (t) => {
  t.plan(1);

  const min = 5;
  const max = 10;

  t.ok(
    some(array, () => {
      const result = aleaRandom(min, max);
      return result >= min && result <= max;
    })
  );
});

test('supports not providing a `min` argument', (t) => {
  t.plan(1);

  const max = 5;

  t.ok(
    some(array, () => {
      const result = aleaRandom(max);
      return result >= 0 && result <= max;
    })
  );
});

test('swaps `min` and `max` if `min > max`', (t) => {
  t.plan(1);

  const min = 4;
  const max = 2;
  const expected = [2, 3, 4];

  const actual = uniq(map(array, () => aleaRandom(min, max))).sort();

  t.deepEqual(actual, expected);
});

test('supports large integer values', (t) => {
  t.plan(2);

  const min = 2 ** 31;
  const max = 2 ** 62;

  t.ok(
    every(array, () => {
      const result = aleaRandom(min, max);
      return result >= min && result <= max;
    })
  );

  t.ok(some(array, () => aleaRandom(Number.MAX_VALUE) > 0));
});

test('coerces arguments to numbers', (t) => {
  t.plan(2);
  t.equal(aleaRandom('1', '1'), 1);
  t.equal(aleaRandom(Number.NaN, Number.NaN), 0);
});

test('supports floats', (t) => {
  t.plan(2);
  const min = 1.5;
  const max = 1.6;
  const actual = aleaRandom(min, max);
  t.ok(actual % 1);
  t.ok(actual >= min && actual <= max);
});

test('supports `floating` argument', (t) => {
  t.plan(3);
  let actual = aleaRandom(true);
  t.ok(actual % 1 && actual >= 0 && actual <= 1);

  actual = aleaRandom(2, true);
  t.ok(actual % 1 && actual >= 0 && actual <= 2);

  actual = aleaRandom(2, 4, true);
  t.ok(actual % 1 && actual >= 2 && actual <= 4);
});

test('works when used as a callback for `map`', (t) => {
  t.plan(1);
  const array = [1, 2, 3];
  let actual = map(array, aleaRandom);
  const expected = map(array, constant(true));

  actual = map(
    actual,
    (result, index) => result >= 0 && result <= array[index] && result % 1 === 0
  );

  t.deepEqual(actual, expected);
});
