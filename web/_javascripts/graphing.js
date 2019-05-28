
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
  ctx.scale(1, -1); // flip Y

  // SPEED GRAPH
  ctx.strokeStyle = speedStyle;
  ctx.beginPath();
  for (let p = 0; p < width; p++) {
    // NB function accepts Adobe-style arguments to0
    currPoint = [p, easeFn(p/width, 0, 1, 1) * height];
    ctx[p == 0 ? 'moveTo' : 'lineTo'](...currPoint);
    if (prevPoint) slopes.push((currPoint[1] - prevPoint[1])/(currPoint[0] - prevPoint[0]));
    // if (p === 0) {
    //   ctx.moveTo(...currPoint);
    //   // prevPoint = currPoint;
    // } else {
    //   slope = (currPoint[1] - prevPoint[1])/(currPoint[0] - prevPoint[0]);
    //   ctx.lineTo(...currPoint);
    //   slopes.push(slope);
    // }
    prevPoint = currPoint;
  }
  ctx.stroke();

  // ACCEL GRAPH
  var maxSlope = Math.max(...slopes);
  ctx.strokeStyle = accelStyle;
  ctx.beginPath();
  for (let s = 0; s < width; s++) {
    currPoint = [s, slopes[s]/maxSlope * ACCEL_GRAPH_HEIGHT * height];
    ctx[s == 0 ? 'moveTo' : 'lineTo'](...currPoint);
    // if (s === 0) {
    //   ctx.moveTo(...currPoint);
    // } else {
    //   ctx.lineTo(...currPoint);
    // }
  }
  ctx.stroke();

  // RESTORE
  ctx.restore();
}
