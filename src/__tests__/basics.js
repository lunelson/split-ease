/*
  TODO: ERRORs

  // required args in ES6
  https://egghead.io/lessons/javascript-required-function-arguments-in-javascript

  // RangeErrors
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError

  // ReferenceErrors
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError

*/

import SplitEase from '../../dist/split-ease.common.min';

SplitEase(0.1, { pow: 3 }); //?
SplitEase(0.1, { powIn: 3 }); //?
SplitEase(0.1, { sinIn: true, pow: 4 }); //?
SplitEase(0.1, 0.3); //?
SplitEase(2, 1); //?
SplitEase(2, {powIn: 1.5}); //?
SplitEase(-2); //?
SplitEase(-1); //?
SplitEase(0.1, -2); //?
SplitEase(.3, .4, { sin: true }); //?
