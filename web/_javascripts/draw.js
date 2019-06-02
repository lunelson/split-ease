

function easeGraph(ctx, dpr, easeFn, x, y, width, height, speedStyle, accelStyle) {
  ctx.save();

  // INITS; SAVE CTX
  const ACCEL_GRAPH_HEIGHT = 1; // where the accel graph tops out (in AE it's more like 0.6)
  let prevPoint, currPoint, slope;
  let slopes = [];

  // TRANSLATION, SCALE
  ctx.translate(x, y + height); // translate to bottom-left corner
  // ctx.scale(dpr, dpr * -1); // flip Y
  ctx.scale(1, -1); // flip Y
  ctx.lineWidth = 4 * dpr;

  // SPEED GRAPH
  ctx.strokeStyle = speedStyle;
  ctx.beginPath();
  for (let p = 0; p < width; p++) {
    // NB function accepts Adobe-style arguments to0
    currPoint = [p, easeFn(p / width, 0, 1, 1) * height];
    ctx[p == 0 ? 'moveTo' : 'lineTo'](...currPoint);
    if (prevPoint) slopes.push((currPoint[1] - prevPoint[1]) / (currPoint[0] - prevPoint[0]));
    prevPoint = currPoint;
  }
  ctx.stroke();

  // ACCEL GRAPH
  var maxSlope = Math.max(...slopes);
  ctx.strokeStyle = accelStyle;
  ctx.beginPath();
  for (let s = 0; s < width; s++) {
    currPoint = [s, slopes[s] / maxSlope * ACCEL_GRAPH_HEIGHT * height];
    ctx[s == 0 ? 'moveTo' : 'lineTo'](...currPoint);
  }
  ctx.stroke();

  // RESTORE
  ctx.restore();
}

export default function draw() {
  const {
    ctx,
    dpr,
    easeIn,
    easeOut,
    easeFn,
    duration,
    canvas: { width, height },
  } = this;

  const inset = 10 * dpr;
  const labelHeight = 20 * dpr;
  ctx.clearRect(0, 0, width, height);

  easeGraph(
    ctx,
    dpr,
    easeFn,
    inset,
    inset + labelHeight,
    width - inset * 2,
    width / 2.5 - inset * 2, // NB 2.5 is graph aspect ratio
    '#FF0000',
    '#00AAFF',
  );

  // save
  ctx.save();
  // ctx.scale(dpr, dpr);

  // set font, fill, stroke styles; line width
  ctx.font = `normal bold ${14 * dpr}px/1 "IBM Plex Mono"`;
  ctx.fillStyle = '#00AAFF';
  ctx.strokeStyle = '#00AAFF';
  ctx.lineWidth = 2 * dpr;

  // fill acceleration / deceleration labels
  const easeInStr = `Acceleration ${(easeIn * duration).toFixed(0)} ms`;
  const easeOutStr = `Deceleration ${(easeOut * duration).toFixed(0)} ms`;
  const easeInStrWidth = ctx.measureText(easeInStr).width;
  const easeOutStrWidth = ctx.measureText(easeOutStr).width;
  const easeInLabelPosn = Math.max(
    inset,
    Math.min(
      width - easeOutStrWidth - easeInStrWidth - inset * 5,
      easeIn * (width - inset * 2) - easeInStrWidth - inset),
  );
  const easeInLabelStop = Math.max(
    easeInStrWidth + inset * 3,
    Math.min(
      width - easeOutStrWidth - inset * 3,
      easeIn * (width - inset * 2) + inset),
  );
  const easeOutLabelPosn = Math.min(
    width - inset - easeOutStrWidth,
    Math.max(
      easeInStrWidth + inset * 5,
      (1 - easeOut) * (width - inset * 2) + inset * 3),
  );
  const easeOutLabelStop = Math.min(
    width - easeOutStrWidth - inset * 3,
    Math.max(
      easeInStrWidth + inset * 3,
      (1 - easeOut) * (width - inset * 2) + inset),
  );
  ctx.fillText(easeInStr, easeInLabelPosn, labelHeight - 5 * dpr);
  ctx.fillText(easeOutStr, easeOutLabelPosn, labelHeight - 5 * dpr);
  ctx.beginPath();
  ctx.moveTo(easeInLabelStop, 5 * dpr);
  ctx.lineTo(easeInLabelStop, 15 * dpr);
  ctx.moveTo(easeOutLabelStop, 5 * dpr);
  ctx.lineTo(easeOutLabelStop, 15 * dpr);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([10 * dpr, 20 * dpr]);
  // easeIn stroke
  ctx.moveTo(easeIn * (width - inset * 2) + inset, labelHeight + inset);
  ctx.lineTo(easeIn * (width - inset * 2) + inset, labelHeight + width / 2.5 + 60 * dpr);

  // easeOut stroke
  ctx.moveTo((1 - easeOut) * (width - inset * 2) + inset, labelHeight + inset);
  ctx.lineTo((1 - easeOut) * (width - inset * 2) + inset, labelHeight + width / 2.5 + 90 * dpr);

  // stroke
  ctx.stroke();

  // restore
  ctx.restore();
};
