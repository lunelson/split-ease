// function metaEase({et1 = 0.5, et2 = 0.5, c = 2}={}) {
//   const eSum = et1 + et2;
//   const eScale = eSum > 1 ? (1 / eSum) : 1;
//   et1 *= eScale;
//   et2 *= eScale;

//   let p, curve;
//   if (typeof c === 'number') { p = c; curve = powerx; }
//   else { p = Math.PI / 2; curve = cosine; }
//   const ev1 = 1 / (p / et1 - (2 * p - 2) * (1 + et2 / et1) / 2);
//   const ev2 = 1 / (p / et2 - (2 * p - 2) * (1 + et1 / et2) / 2);

//   return function(time) {
//     if (time <= 0) { return 0; }
//     else if (time >= 1) { return 1; }
//     else if (time <= et1) { return curve(time, 0, ev1*2, et1*2); }
//     else if (time >= (1-et2)) { return curve(time-(1-et2*2), 1-ev2*2, ev2*2, et2*2); }
//     else { return linear(time - et1, ev1, 1-(ev1+ev2), 1-(et1+et2)); }
//   }
// }

function metaEase2(time, et1 = 0.5, et2 = 0.5, c = 2) {
  const eSum = et1 + et2;
  const eScale = eSum > 1 ? (1 / eSum) : 1;
  et1 *= eScale;
  et2 *= eScale;
  let p, curve;
  if (typeof c === 'number') { p = c; curve = powerx; }
  else { p = Math.PI / 2; curve = cosine; }
  const ev1 = 1 / (p / et1 - (2 * p - 2) * (1 + et2 / et1) / 2);
  const ev2 = 1 / (p / et2 - (2 * p - 2) * (1 + et1 / et2) / 2);
  if (time <= 0) { return 0; }
  else if (time >= 1) { return 1; }
  else if (time <= et1) { return curve(time, 0, ev1*2, et1*2, p); }
  else if (time >= (1-et2)) { return curve(time-(1-et2*2), 1-ev2*2, ev2*2, et2*2, p); }
  else { return linear(time - et1, ev1, 1-(ev1+ev2), 1-(et1+et2)); }
}

