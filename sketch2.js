import SplitEase from './';

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
