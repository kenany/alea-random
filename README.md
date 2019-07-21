# alea-random

[![Build Status](https://img.shields.io/travis/KenanY/alea-random.svg)](https://travis-ci.org/KenanY/alea-random)

`lodash.random` but using [Alea](https://github.com/coverslide/node-alea)
instead of `Math.random`.

## Example

``` javascript
var aleaRandom = require('alea-random');

aleaRandom(0, 5);
// => an integer between 0 and 5

aleaRandom(5);
// => also an integer between 0 and 5

aleaRandom(5, true);
// => a floating-point number between 0 and 5

aleaRandom(1.2, 5.2);
// => a floating-point number between 1.2 and 5.2
```

## Installation

``` bash
$ npm install alea-random
```

## API

``` javascript
var aleaRandom = require('alea-random');
```

### `aleaRandom([min=0], [max=1], [floating=false])`

Produces a random number between `min` and `max` (inclusive). If only one
argument is provided a number between `0` and the given number will be returned.
If `floating` is truey or either `min` or `max` are floats a floating-point
number will be returned instead of an integer.
