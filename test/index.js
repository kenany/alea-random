'use strict';

const test = require('tape');
const isFunction = require('lodash.isfunction');
const map = require('lodash.map');
const uniq = require('lodash.uniq');
const every = require('lodash.every');
const some = require('lodash.some');
const constant = require('lodash.constant');

const aleaRandom = require('../');

const array = Array(1000);

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(aleaRandom));
});

test('returns `0` or `1` when arguments are not provided', function(t) {
  t.plan(1);
  const actual = map(array, function() {
    return aleaRandom();
  });
  t.deepEqual(uniq(actual).sort(), [0, 1]);
});

test('supports a `min` and `max` argument', function(t) {
  t.plan(1);

  const min = 5;
  const max = 10;

  t.ok(some(array, function() {
    const result = aleaRandom(min, max);
    return result >= min && result <= max;
  }));
});

test('supports not providing a `min` argument', function(t) {
  t.plan(1);

  const max = 5;

  t.ok(some(array, function() {
    const result = aleaRandom(max);
    return result >= 0 && result <= max;
  }));
});

test('swaps `min` and `max` if `min > max`', function(t) {
  t.plan(1);

  const min = 4;
  const max = 2;
  const expected = [2, 3, 4];

  const actual = uniq(map(array, function() {
    return aleaRandom(min, max);
  })).sort();

  t.deepEqual(actual, expected);
});

test('supports large integer values', function(t) {
  t.plan(2);

  const min = Math.pow(2, 31);
  const max = Math.pow(2, 62);

  t.ok(every(array, function() {
    const result = aleaRandom(min, max);
    return result >= min && result <= max;
  }));

  t.ok(some(array, function() {
    return aleaRandom(Number.MAX_VALUE) > 0;
  }));
});

test('coerces arguments to numbers', function(t) {
  t.plan(2);
  t.equal(aleaRandom('1', '1'), 1);
  t.equal(aleaRandom(NaN, NaN), 0);
});

test('supports floats', function(t) {
  t.plan(2);
  const min = 1.5;
  const max = 1.6;
  const actual = aleaRandom(min, max);
  t.ok(actual % 1);
  t.ok(actual >= min && actual <= max);
});

test('supports `floating` argument', function(t) {
  t.plan(3);
  let actual = aleaRandom(true);
  t.ok(actual % 1 && actual >= 0 && actual <= 1);

  actual = aleaRandom(2, true);
  t.ok(actual % 1 && actual >= 0 && actual <= 2);

  actual = aleaRandom(2, 4, true);
  t.ok(actual % 1 && actual >= 2 && actual <= 4);
});

test('works when used as a callback for `map`', function(t) {
  t.plan(1);
  const array = [1, 2, 3];
  let actual = map(array, aleaRandom);
  const expected = map(array, constant(true));

  actual = map(actual, function(result, index) {
    return result >= 0 && result <= array[index] && (result % 1) === 0;
  });

  t.deepEqual(actual, expected);
});
