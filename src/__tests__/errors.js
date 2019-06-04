/*
  TODO: ERRORs

  // required args in ES6
  https://egghead.io/lessons/javascript-required-function-arguments-in-javascript

  // RangeErrors
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError

  // ReferenceErrors
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError

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

*/

import SplitEase from '../split-ease.js';

test('throw range errors, if any ease time < 0', () => {
  [
    // et1 < 1
    [-0.1],
    [-0.1, {}],
    //  et2 < 1
    [0.3, -0.1],
    [0.3, -0.1, {}],
    // pow < 1
    [0.3, 0.3, { pow: 0.5 }],
  ].forEach(args => {
    expect(() => {
      SplitEase.apply(null, args);
    }).toThrow(RangeError);
  });
});

test('throw type errors, when arg types are wrong', () => {
  [
    // et1 invalid
    [{}],
    ['pow'],
    [{}],
    // et2 invalid
    [0.3, 'pow'],
    [0.3, 0.3, 'pow'],
    // opts invalid
    [0.3, 0.3, 0.3],
  ].forEach(args => {
    expect(() => {
      SplitEase.apply(null, args);
    }).toThrow(TypeError);
  });
});

test('console.warn about scaling, when ratios exceed 1', () => {
  // mocking console:
  // https://stackoverflow.com/a/41224462/1204994 (see comments)
  const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

  [
    // et1, et2 > 1
    [1.1],
    [1.1, {}],
    [0.3, 1.1],
    [0.3, 1.1, {}],
    // eSum > 1
    [0.3, 0.8],
    [0.3, 0.8, {}],
    // pow > 5
    [0.3, 0.3, { pow: 5.5 }],
  ].forEach((args, i) => {
    SplitEase.apply(null, args);
    expect(consoleWarn).toHaveBeenCalledTimes(i + 1);
  });
  consoleWarn.mockRestore();
});

// test('catch dummy errors', () => {

// 	function doRangeError() { throw new RangeError('out of range!') }
// 	expect(doRangeError).toThrowError(RangeError);
// 	expect(doRangeError).toThrowError('out of range!');

// 	function doTypeError() { throw new TypeError('wrong type!') }
// 	expect(doTypeError).toThrowError(TypeError);
// 	expect(doTypeError).toThrowError('wrong type!');

// 	function doConsoleWarn() { console.warn('you have been warned') }
// 	const consoleWarn = jest.spyOn(console, 'warn');
// 	doConsoleWarn();
// 	expect(consoleWarn).toHaveBeenCalled();
// 	consoleWarn.mockRestore();
// });
