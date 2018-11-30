window.onload = function(){
  'use strict';


  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      width = canvas.width = 500,
      height = canvas.height = 500,
      margin = 40;

  var axes = {
    origin: [margin, margin],
    width: width - 2*margin,
    height: height - 2*margin,
    scale: 100
  };


  // penner equations
  var Penner = require('ln-js/math/penner');

  // quick settings
  var panel = QuickSettings.create(600, 0, 'Penner Interpolations');
  panel.setDraggable(false);
  panel.addDropDown('Function', Object.keys(Penner), render);

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
    ctx.strokeStyle = "rgb(100, 200, 100)";
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
    drawInterpGraph(ctx, 40, 40, width - 80, height - 80, Penner[panel.getDropDownValue('Function').value]);

    /**
     * AXES
     */
    ctx.save();
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.lineWidth = "1";
    ctx.strokeStyle = "rgb(128, 128, 0)";
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(axes.origin[0]+axes.width, axes.origin[1]);
    ctx.moveTo(axes.origin[0], margin);
    ctx.lineTo(axes.origin[0], axes.origin[1]+axes.height);
    ctx.stroke();
    ctx.restore();
  }

  render();
};
