var result = new Object();

easeSum = easeDur1 + easeDur2;

// if not percentage based
if (timeBase != 'relative') {

	// check easeSum does not exceed totalDur
	if (easeSum > totalDur) { easeDur1 *= totalDur / easeSum; easeDur2 *= totalDur / easeSum; }
}

// if percentage based
else {

	// check that easeSum does not exceed 100
	if (easeSum > 100) { easeDur1 *= 100 / easeSum; easeDur2 *= 100 / easeSum; }

	// convert easeTimes to seconds
	easeDur1 *= totalDur / 100;
	easeDur2 *= totalDur / 100;
}

// get relative ease portions
relEaseDur1 = totalDur / easeDur1;
relEaseDur2 = totalDur / easeDur2;

var p = (easeType === 'sin');


// if sin() based
if (SinPowBez==0) {
	var pi = Math.PI;
	EaseVal1 = 1 / (pi / 2 * relEaseDur1 - (pi - 2) * (1 + relEaseDur1 / relEaseDur2) / 2);
	EaseVal2 = 1 / (pi / 2 * relEaseDur2 - (pi - 2) * (1 + relEaseDur2 / relEaseDur1) / 2);
}

// if pow() based
else if (SinPowBez==1) {
	var p = Power;
	EaseVal1 = 1 / (p * relEaseDur1 - (2 * p - 2) * (1 + relEaseDur1 / relEaseDur2) / 2);
	EaseVal2 = 1 / (p * relEaseDur2 - (2 * p - 2) * (1 + relEaseDur2 / relEaseDur1) / 2);
}

// if bezier based
else {
	inf = Influence;
	p = (1-3*(1-2*inf))*Math.pow(1.5,3)+(3*(1-2*inf)-3*inf)*Math.pow(1.5,2)+3*inf*1.5;
	EaseVal1 = 1/(p*relEaseDur1-(2*p-2)*(1+relEaseDur1/relEaseDur2)/2);
	EaseVal2 = 1/(p*relEaseDur2-(2*p-2)*(1+relEaseDur2/relEaseDur1)/2);
}

if (CurrTime < (StartHold + easeDur1)) {
	result.t = CurrTime-StartHold;
	result.b = 0;
	result.c = EaseVal1*2;
	result.d = easeDur1*2;}

else if (CurrTime >= (EndTime - easeDur2)) {
	result.t = CurrTime-(EndTime-easeDur2*2);
	result.b = 1-EaseVal2*2;
	result.c = EaseVal2*2;
	result.d = easeDur2*2;}

else {
	result.t = CurrTime-(StartHold+easeDur1);
	result.b = EaseVal1;
	result.c = 1-(EaseVal1+EaseVal2);
	result.d = totalDur-(easeDur1+easeDur2);}

result.et1 = easeDur1;
result.et2 = easeDur2;