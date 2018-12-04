import SplitEase from '../split-ease.js';

test('throw range errors, if any ease time < 0', () => {
	[
		[-0.1],
		[-0.1, {}],
		[0.3, -0.1],
		[0.3, -0.1, {}],
	].forEach(args => {
		expect(() => {
			SplitEase.apply(null, args);
		}).toThrowError(RangeError);
	});
});

test('throw type errors, when arg types are wrong', () => {
	[
		[{}],
		['pow'],
		[{}],
		[0.3, 'pow'],
		[0.3, 0.3, 'pow'],
		[0.3, 0.3, 0.3],
	].forEach(args => {
		expect(() => {
			SplitEase.apply(null, args);
		}).toThrowError(TypeError);
	});
});

test('console.warn about scaling, when ratios exceed 1', () => {

	// mocking console:
	// https://stackoverflow.com/a/41224462/1204994 (see comments)
	const consoleWarn = jest
		.spyOn(global.console, 'warn')
		.mockImplementation(() => {});

		[
		// et1, et2
		[1.1],
		[1.1, {}],
		[0.3, 1.1],
		[0.3, 1.1, {}],
		// eSum
		[0.3, 0.8],
		[0.3, 0.8, {}],
	].forEach((args, i) => {

		SplitEase.apply(null, args);
		expect(consoleWarn).toHaveBeenCalledTimes(i+1);
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
