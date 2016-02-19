var Alea = require('alea');
var isIterateeCall = require('lodash._isiterateecall');
var isBoolean = require('lodash.isboolean');
var uuid = require('node-uuid');

/**
 * Produces a random number between `min` and `max` (inclusive). If only one
 * argument is provided a number between `0` and the given number will be
 * returned. If `floating` is truey or either `min` or `max` are floats a
 * floating-point number will be returned instead of an integer.
 *
 * @param {Number} [min=0] The minimum possible value.
 * @param {Number} [max=1] The maximum possible value.
 * @param {Boolean} [floating=false] Specify returning a floating-point number.
 * @returns {Number} Returns a random number.
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
  var gen = new Alea(uuid.v4());

  if (floating && isIterateeCall(min, max, floating)) {
    max = floating = null;
  }

  var noMin = min == null;
  var noMax = max == null;

  if (floating == null) {
    if (noMax && isBoolean(min)) {
      floating = min;
      min = 1;
    }
    else if (isBoolean(max)) {
      floating = max;
      noMax = true;
    }
  }

  if (noMin && noMax) {
    max = 1;
    noMax = false;
  }

  min = +min || 0;

  if (noMax) {
    max = min;
    min = 0;
  }
  else {
    max = +max || 0;
  }

  if (min > max) {
    var temp = min;
    min = max;
    max = temp;
  }

  if (floating || min % 1 || max % 1) {
    var rand = gen();
    return Math.min(min + (rand * (max - min + parseFloat('1e-' + (String(rand).length - 1)))), max);
  }

  return min + Math.floor(gen() * (max - min + 1));
}

module.exports = aleaRandom;
