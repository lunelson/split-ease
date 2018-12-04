import SplitEase from '../split-ease.js';

const PennerEases = require('eases');

const PennerSplitEases = {
	'linear': SplitEase(0.5, { pow: 1 }),
	'quadInOut': SplitEase(0.5, { pow: 2 }),
	'quadIn': SplitEase(1, { pow: 2 }),
	'quadOut': SplitEase(0, { pow: 2 }),
	'cubicInOut': SplitEase(0.5, { pow: 3 }),
	'cubicIn': SplitEase(1, { pow: 3 }),
	'cubicOut': SplitEase(0, { pow: 3 }),
	'quartInOut': SplitEase(0.5, { pow: 4 }),
	'quartIn': SplitEase(1, { pow: 4 }),
	'quartOut': SplitEase(0, { pow: 4 }),
	'quintInOut': SplitEase(0.5, { pow: 5 }),
	'quintIn': SplitEase(1, { pow: 5 }),
	'quintOut': SplitEase(0, { pow: 5 }),
	'sineInOut': SplitEase(0.5, { sin: true }),
	'sineIn': SplitEase(1, { sin: true }),
	'sineOut': SplitEase(0, { sin: true }),
};

describe('match penner equivalent to tenth decimal', () => {
  Object.keys(PennerSplitEases).forEach(key => {
		test(key, () => {
			const t = Math.random();
			expect(PennerSplitEases[key](t) - PennerEases[key](t)).toBeCloseTo(0, 10);
		});
  });
});
