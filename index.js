'use strict';

const Alea = require('alea');
const isIterateeCall = require('lodash._isiterateecall');
const toNumber = require('lodash.tonumber');
const { v4: uuid } = require('uuid');

/**
 * Produces a random number between the inclusive `min` and `max` bounds.
 * If only one argument is provided a number between `0` and the given number
 * is returned. If `floating` is `true`, or either `min` or `max` are floats,
 * a floating-point number is returned instead of an integer.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @param {number} [min=0] The lower bound.
 * @param {number} [max=1] The upper bound.
 * @param {boolean} [floating] Specify returning a floating-point number.
 * @returns {number} Returns the random number.
 * @example
 *
 * aleaRandom(0, 5);
 * // => an integer between 0 and 5
 *
 * aleaRandom(5);
 * // => also an integer between 0 and 5
 *
 * aleaRandom(5, true);
 * // => a floating-point number between 0 and 5
 *
 * aleaRandom(1.2, 5.2);
 * // => a floating-point number between 1.2 and 5.2
 */
function aleaRandom(min, max, floating) {
  const gen = new Alea(uuid());

  if (floating && typeof floating !== 'boolean' && isIterateeCall(min, max, floating)) {
    max = floating = undefined;
  }

  if (floating === undefined) {
    if (typeof max === 'boolean') {
      floating = max;
      max = undefined;
    }
    else if (typeof min === 'boolean') {
      floating = min;
      min = undefined;
    }
  }

  if (min === undefined && max === undefined) {
    min = 0;
    max = 1;
  }
  else {
    min = toNumber(min) || 0;
    if (max === undefined) {
      max = min;
      min = 0;
    }
    else {
      max = toNumber(max) || 0;
    }
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  if (floating || min % 1 || max % 1) {
    const rand = gen();
    return Math.min(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
  }

  return min + Math.floor(gen() * (max - min + 1));
}

module.exports = aleaRandom;
