
/**
 * easeGraph
 * @param {Context} ctx - CanvasRenderingContext2D
 * @param {Function} fn - Easing Function: function(t){} with 0 <= t <= 1; also b, c, d "adobe" args, if needed
 * @param {float} x - x coordinate graph starting point
 * @param {float} y - y coordinate graph starting point
 * @param {float} width - graph width
 * @param {float} height - graph height
 */
export function easeGraph(ctx, easeFn, x, y, width, height, speedStyle, accelStyle) {

  // INITS; SAVE CTX
  const ACCEL_GRAPH_HEIGHT = 1; // where the accel graph tops out (in AE it's more like 0.6)
  let prevPoint, currPoint, slope;
  let slopes = [];
  ctx.save();

  // TRANSLATION, SCALE
  ctx.translate(x, y + height); // translate to bottom-left corner
  ctx.scale(width, -height); // scale area to 1:1, y-flipped
  ctx.lineWidth = ctx.lineWidth / width; // scale lineWidth back down

  // SPEED GRAPH
  ctx.strokeStyle = speedStyle;
  ctx.beginPath();
  for (let p = 0; p < width; p++) {
    // NB function accepts Adobe-style arguments to0
    currPoint = [p/width, easeFn(p/width, 0, 1, 1)];
    if (p === 0) {
      ctx.moveTo(...currPoint);
      prevPoint = currPoint;
    } else {
      slope = (currPoint[1] - prevPoint[1])/(currPoint[0] - prevPoint[0]);
      prevPoint = currPoint;
      ctx.lineTo(...currPoint);
      slopes.push(slope);
    }
  }
  ctx.stroke();

  // ACCEL GRAPH
  ctx.strokeStyle = accelStyle;
  ctx.beginPath();
  var maxSlope = Math.max(...slopes);
  for (let s = 0; s < width; s++) {
    if (s === 0) {
      ctx.moveTo(s/width, slopes[s]/maxSlope * ACCEL_GRAPH_HEIGHT);
    } else {
      ctx.lineTo(s/width, slopes[s]/maxSlope * ACCEL_GRAPH_HEIGHT);
    }
  }
  ctx.stroke();

  // RESTORE
  ctx.restore();
}

import { cos } from './index';
const ctx = 'dummy';

ctx.lineWidth = 3;
easeGraph(ctx, cos, 0, 0, 200, 200, 'rgb(200, 100, 100)', 'rgb(255,200,100)');
