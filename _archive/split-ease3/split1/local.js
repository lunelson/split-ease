/**
 * EASING WORKSHOP
 *
 */

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = 600,
    height = canvas.height = 600,
    margin = 40;

var axes = {
  origin: [margin, margin],
  width: width - 2*margin,
  height: height - 2*margin,
  scale: 100
};

// quick settings
var panel = QuickSettings.create(600, 0, 'Split Eases');
panel.setDraggable(false);
panel.addRange('Ease In', 0, 100, 25, 1, render);
panel.addRange('Ease Out', 0, 100, 25, 1, render);
panel.addBoolean('Absolute Ease Times?', false, render);
panel.addDropDown('Ease Type', ['Power', 'Sine'], render);
panel.addRange('Power Curvature', 1, 5, 2, 0.1, render);
panel.setGlobalChangeHandler(() => {
  var togg = panel.getDropDownValue('Ease Type').value == 'Power' ? 'show' : 'hide';
  panel[`${togg}Control`]('Power Curvature');
});

// split-ease core function
function splitEase(time, start, delta, duration) {

  var end = start+duration;
  if (time < start) { return 0; }
  if (time >= end) { return 1; }

  var easeDur1 = panel.getRangeValue('Ease In');
  var easeDur2 = panel.getRangeValue('Ease Out');
  var absDurations = panel.getBoolean('Absolute Ease Times?');
  var easeType = panel.getDropDownValue('Ease Type').value;

  var easeSum = easeDur1 + easeDur2;
  if (absDurations) {
    var scale = (easeSum > duration) ? (duration / easeSum) : 1;
    var relEaseDur1 = (easeDur1 *= scale) / duration;
    var relEaseDur2 = (easeDur2 *= scale) / duration;
  } else {
    var scale = (easeSum > 100) ? (100 / easeSum ): 1;
    var relEaseDur1 = easeDur1 * scale / 100;
    var relEaseDur2 = easeDur2 * scale / 100;
    easeDur1 = relEaseDur1 * duration;
    easeDur2 = relEaseDur2 * duration;
  }

  var inf = 0.6;
  var p = easeType === 'Sine' ? Math.PI / 2
    : easeType === 'Power' ? panel.getRangeValue('Power Curvature')
    : (1 - 3 * (1 - 2 * inf)) * Math.pow(1.5, 3) + (3 * (1 - 2 * inf) - 3 * inf) * Math.pow(1.5, 2) + 3 * inf * 1.5; // unused option

  var easeDelta1 = 1 / (p / relEaseDur1 - (2 * p - 2) * (1 + relEaseDur2 / relEaseDur1) / 2);
  var easeDelta2 = 1 / (p / relEaseDur2 - (2 * p - 2) * (1 + relEaseDur1 / relEaseDur2) / 2);

  var line = function(t,b,c,d) {return c*t/d + b;}
  var curve = easeType == 'Sine' ?
    function(t,b,c,d,p) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; } :
    function(t,b,c,d,p) { if ((t/=d/2)<1) return  c/2 * Math.pow(t,p) + b; return -c/2 * (Math.pow((2-t),p) - 2) + b; }

  // Computation of curve sections
  let t, b, c, d, val;
  if (time < (start + easeDur1)) {
    t = time-start;
    b = 0;
    c = easeDelta1*2;
    d = easeDur1*2;
    val = curve(t,b,c,d,p);
  } else if (time >= (end - easeDur2)) {
    t = time-(end-easeDur2*2);
    b = 1-easeDelta2*2;
    c = easeDelta2*2;
    d = easeDur2*2;
    val = curve(t,b,c,d,p);
  }  else {
    t = time-(start+easeDur1);
    b = easeDelta1;
    c = 1-(easeDelta1+easeDelta2);
    d = duration-(easeDur1+easeDur2);
    val = line(t,b,c,d);
  }

  return val;
}

// graph interpolations
function drawInterpGraph(ctx, x, y, width, height, fx) {
  let prevXY, currXY, slope;
  let slopes = [];
  const ACCEL_SCALE = 1;
  ctx.save();
  ctx.translate(x, y + height);
  ctx.scale(width, -height);
  ctx.lineWidth = "2";

  // SPEED GRAPH
  ctx.lineWidth = ctx.lineWidth / width;
  ctx.strokeStyle = "rgb(200, 100, 100)";
  ctx.beginPath();
  for (let pos = 0; pos < width; pos++) {
    currXY = [pos/width, fx(pos/width, 0, 1, 1)];
    if (pos === 0) {
      ctx.moveTo(...currXY);
      prevXY = currXY;
    } else {
      slope = (currXY[1] - prevXY[1])/(currXY[0] - prevXY[0]);
      prevXY = currXY;
      ctx.lineTo(...currXY);
      slopes.push(slope);
    }
  }
  ctx.stroke();

  // ACCEL GRAPH
  ctx.strokeStyle = "rgb(255,200,100)";
  ctx.beginPath();
  var maxSlope = Math.max(...slopes);
  for (let pos = 0; pos < width; pos++) {
    if (pos === 0) {
      ctx.moveTo(pos/width, slopes[pos]/maxSlope * ACCEL_SCALE);
    } else {
      ctx.lineTo(pos/width, slopes[pos]/maxSlope * ACCEL_SCALE);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function render() {
  ctx.clearRect(0,0,width,height);

  /**
   * GRAPH
   */
  // drawInterpGraph(ctx, 40, 40, width - 80, height - 80, Penner[panel.getDropDownValue('Function').value]);
  drawInterpGraph(ctx, 40, 40, width - 80, height - 80, splitEase);

  /**
   * AXES
   */
  ctx.save();
  ctx.translate(0, height);
  ctx.scale(1, -1);
  ctx.lineWidth = "1";
  ctx.strokeStyle = "rgb(200, 200, 200)";
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(axes.origin[0]+axes.width, axes.origin[1]);
  ctx.moveTo(axes.origin[0], margin);
  ctx.lineTo(axes.origin[0], axes.origin[1]+axes.height);
  ctx.stroke();
  ctx.restore();
}

render();
