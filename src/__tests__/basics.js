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

test('it is working', () => {});

// test('throws on octopus', () => {

//   function drinkOctopus() { drinkFlavor('octopus'); }

//   // Test that the error message says "yuck" somewhere: these are equivalent
//   expect(drinkOctopus).toThrowError(/yuck/);
//   expect(drinkOctopus).toThrowError('yuck');

//   // Test the exact error message
//   expect(drinkOctopus).toThrowError(/^yuck, octopus flavor$/);

//   // Test that we get a DisgustingFlavorError
//   expect(drinkOctopus).toThrowError(DisgustingFlavorError);

// });
