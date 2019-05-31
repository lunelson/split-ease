// easeGraph
// accepts fn(t) or fn(t, b, c, d), where t ranges from 0 to 1

export function easeGraph(ctx, easeFn, x, y, width, height) {

  let prevPoint, currPoint, slope;
  let slopes = [];
  const ACCEL_SCALE = 1;

  ctx.save();
  ctx.translate(x, y + height);
  ctx.scale(width, -height);
  ctx.lineWidth = 3;

  // SPEED GRAPH
  ctx.lineWidth = ctx.lineWidth / width;
  ctx.strokeStyle = "rgb(200, 100, 100)";
  ctx.beginPath();

  for (let d = 0; d < width; d++) {

    // NB function accepts Adobe-style arguments too
    currPoint = [d / width, easeFn(d / width, 0, 1, 1)];
    if (d === 0) {
      ctx.moveTo(...currPoint);
      prevPoint = currPoint;
    } else {
      slope = (currPoint[1] - prevPoint[1]) / (currPoint[0] - prevPoint[0]);
      prevPoint = currPoint;
      ctx.lineTo(...currPoint);
      slopes.push(slope);
    }
  }
  ctx.stroke();

  // ACCEL GRAPH
  ctx.strokeStyle = "rgb(255,200,100)";
  ctx.beginPath();
  var maxSlope = Math.max(...slopes);
  for (let s = 0; s < width; s++) {
    if (s === 0) {
      ctx.moveTo(s / width, slopes[s] / maxSlope * ACCEL_SCALE);
    } else {
      ctx.lineTo(s / width, slopes[s] / maxSlope * ACCEL_SCALE);
    }
  }
  ctx.stroke();
  ctx.restore();
}
