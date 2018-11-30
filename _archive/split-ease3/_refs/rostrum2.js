var totalDur = 10,
    timeBase = 'abs',
    easeDur1 = 2,
    easeDur2 = 2,
    power = 2.5,
    inf = 0.6,
    easeType = 'sin',
    p = easeType === 'sin' ? Math.PI / 2 : easeType === 'pow' ? power : (1 - 3 * (1 - 2 * inf)) * Math.pow(1.5, 3) + (3 * (1 - 2 * inf) - 3 * inf) * Math.pow(1.5, 2) + 3 * inf * 1.5;

easeSum = easeDur1 + easeDur2;

if (timeBase == 'abs') {
	if (easeSum > totalDur) {
		var downscale = totalDur / easeSum;
		easeDur1 *= downscale;
		easeDur2 *= downscale;
	}
	var relEaseDur1 = easeDur1 / totalDur;
	var relEaseDur2 = easeDur2 / totalDur;
}

else {
	if (easeSum > 100) {
		var downscale = 100 / easeSum;
		easeDur1 *= downscale;
		easeDur2 *= downscale;
	}
	var relEaseDur1 = easeDur1 / 100;
	var relEaseDur2 = easeDur2 / 100;
	easeDur1 = relEaseDur1 * totalDur;
	easeDur2 = relEaseDur2 * totalDur;
}

var EaseVal1 = 1 / (p / relEaseDur1 - (2 * p - 2) * (1 + relEaseDur2 / relEaseDur1) / 2);
var EaseVal2 = 1 / (p / relEaseDur2 - (2 * p - 2) * (1 + relEaseDur1 / relEaseDur2) / 2);

console.log('Timebase is ' + (timeBase ==='abs' ? 'absolute' : 'relative'));
console.log('Ease type is ' + (easeType ==='sin' ? 'sine-curve' : 'power-curve'));
console.log('P Factor: ' + p);
console.log('Ease Duration 1: ' + easeDur1);
console.log('Ease Duration 2: ' + easeDur2);
console.log('Ease Change 1: ' + EaseVal1);
console.log('Ease Change 2: ' + EaseVal2);