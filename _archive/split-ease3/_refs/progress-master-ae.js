// PROGRESS MASTER

splitEase = function(easeType, inTime, outTime, duration, options){

};

// prog = easeSplit({type: sine, timing: abs, in: 200, out: 200, duration: 1000})

StartHold = effect("Simple Rostrum 3")("Start Time (Secs)");
Duration = effect("Simple Rostrum 3")("Duration (Secs)");
EaseTime1 = effect("Simple Rostrum 3")("Ease In (Secs|%)");
EaseTime2 = effect("Simple Rostrum 3")("Ease Out (Secs|%)");
SpeedMod = effect("Simple Rostrum 3")("Speed/Travel Modifier (%)")/100;
TimePerc= effect("Simple Rostrum 3")("Relative(%) Ease-Limit?")
SinePow=effect("Simple Rostrum 3")("Power Ease-Curve?");
EndFix = effect("Simple Rostrum 3")("EndPoint Fix?");
EndTime = StartHold+Duration;
p = effect("Simple Rostrum 3")("Power Curvature");

//Calculate values for inside of time range
if ((EndTime>time) && (time>=StartHold)) {

	// Timing Values for Time- vs Percentage-delimiting
	EaseSum = EaseTime1+EaseTime2;
	if (TimePerc==0) {
		if (EaseSum > Duration) {
			EaseTime1 *= Duration/EaseSum;
			EaseTime2 *= Duration/EaseSum;}}
	else {
		if (EaseSum > 100) {
			EaseTime1 *= 100/EaseSum;
			EaseTime2 *= 100/EaseSum;}
		EaseTime1 *= Duration/100;
		EaseTime2 *= Duration/100;}

	// Line function and Time Divisions
	TimeDiv1 = Duration/EaseTime1;
	TimeDiv2 = Duration/EaseTime2;
	function line (t,b,c,d) {return c*t/d + b;}

	// Curve functions and Easing Values for Sine- vs Power-curvature
	if (SinePow==0) {
		function curve (t,b,c,d,p) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;}
		EaseVal1 = 1/(Math.PI/2*TimeDiv1-(Math.PI-2)*(1+TimeDiv1/TimeDiv2)/2); EaseVal2 = 1/(Math.PI/2*TimeDiv2-(Math.PI-2)*(1+TimeDiv2/TimeDiv1)/2);}
	else {
		function curve (t,b,c,d,p) {if ((t/=d/2)<1) return  c/2 * Math.pow(t,p) + b; return -c/2 * (Math.pow((2-t),p) - 2) + b;}
		//p = 2;
		EaseVal1 = 1/(p*TimeDiv1-(2*p-2)*(1+TimeDiv1/TimeDiv2)/2); EaseVal2 = 1/(p*TimeDiv2-(2*p-2)*(1+TimeDiv2/TimeDiv1)/2);}

	// Computation of curve sections
	if (time < (StartHold + EaseTime1)) {
		t1 = time-StartHold;
		b1 = 0;
		c1 = EaseVal1*2;
		d1 = EaseTime1*2;
		val = curve (t1,b1,c1,d1,p);
		}
	else if (time >= (EndTime - EaseTime2)) {
		t2 = time-(EndTime-EaseTime2*2);
		b2 = 1-EaseVal2*2;
		c2 = EaseVal2*2;
		d2 = EaseTime2*2;
		val = curve (t2,b2,c2,d2,p);}
	else {
		t3 = time-(StartHold+EaseTime1);
		b3 = EaseVal1;
		c3 = 1-(EaseVal1+EaseVal2);
		d3 = Duration-(EaseTime1+EaseTime2);
		val = line (t3,b3,c3,d3);}
	}

// Calculate values for outside of time range
else if (time>=EndTime) {val = 1;}
else {val = 0;}

// Return final values
if (EndFix==1) {val*SpeedMod+(1-SpeedMod);}
else {val*SpeedMod;}