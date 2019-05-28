import SplitEase from '../split-ease.js';

/*
  JS Built In GLobals

  TypeError(msg) -- wrong type
  RangeError(msg) -- wrong range
  Error

  Object
  Number
  Boolean

et1, et2
  - must Numbers > 0
  - should be < 1; if not will be clipped
  - exception is et1 and et2 both greater than 1, in which they will be scaled

options
  must be an Object
  pow -> Number; 1 < pow < 6
  sin -> Boolean; overrides pow

https://testingjavascript.com/lessons/egghead-use-jest-watch-mode-to-speed-up-development
https://app.everyday.app/
https://github.com/mattdesl/eases
https://jestjs.io/docs/en/expect#tobeclosetonumber-numdigits

*/

const argPatterns = [
  // mono-arg, -with-sin, -with-pow
  [0.3],
  [0.3, { sin: true }],
  [0.3, { pow: 2.5 }],
  // dual-arg, -with-sin, -with-pow
  [0.3, 0.3],
  [0.3, 0.3, { sin: true }],
  [0.3, 0.3, { pow: 2.5 }],
  // arg wrong type, TypeError
  [{}],
  ['pow'],
  [{}],
  [0.3, 'pow'],
  [0.3, 0.3, 'pow'],
  [0.3, 0.3, 0.3],
  // arg < 0, RangeError
  [-0.1],
  [-0.1, {}],
  [0.3, -0.1],
  [0.3, -0.1, {}],
  // arg > 1, console.warn
  [1.1],
  [1.1, {}],
  [0.3, 1.1],
  [0.3, 1.1, {}],
  // total > 1, console.warn
  [0.3, 0.8],
  [0.3, 0.8, {}],
];

argPatterns.forEach(args => {
  SplitEase.apply(null, args)(0.333);
});

// function shadow(et1 = 0.5, et2 = Math.max(1 - et1, 0), opts = {}) {
//   if (typeof et2 == 'object') { opts = et2; et2 = Math.max(1 - et1, 0); }
//   const { pow = 2, sin } = opts;
//   ow(et1, ow.number.greaterThanOrEqual(0)); //?
// }

// shadow(0.25);
