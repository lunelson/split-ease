//  _____       _ _ _   _____
// /  ___|     | (_) | |  ___|
// \ `--. _ __ | |_| |_| |__  __ _ ___  ___
//  `--. \ '_ \| | | __|  __|/ _` / __|/ _ \
// /\__/ / |_) | | | |_| |__| (_| \__ \  __/
// \____/| .__/|_|_|\__\____/\__,_|___/\___|
//       | |
//       |_|

function linear(t, b, c, d) {
  return c * t / d + b;
}

function cosine(t, b, c, d) {
  return c / -2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

function power(t, b, c, d, p) {
  return (t /= d / 2) < 1 ?
    c / 2 * Math.pow(t, p) + b :
    c / -2 * (Math.pow(2 - t, p) - 2) + b;
}

function isPojo(value) {
  if (typeof value !== 'object') { return false; }
  if (Object.prototype.toString.call(value) !== '[object Object]') { return false; }
  switch (Object.getPrototypeOf(value)) {
    case Object.prototype: { return true; }
    case null: { return true; }
    default: { return false; }
  }
}

export default function SplitEase(et1, et2, opts) {

  if (typeof et2 == 'object') { opts = et2; et2 = undefined; }
  if (et1 != undefined && et1 < 0) throw new RangeError(`SplitEase: ease-in ratio must be > 0; received ${et1}`);
  if (et2 != undefined && et2 < 0) throw new RangeError(`SplitEase: ease-out ratio must be > 0; received ${et2}`);
  if (et1 != undefined && typeof et1 != 'number') throw new TypeError(`SplitEase: ease-in ratio must be a number; received ${et1}`);
  if (et2 != undefined && typeof et2 != 'number') throw new TypeError(`SplitEase: ease-out ratio must be a number; received ${et2}`);
  if (opts != undefined && !isPojo(opts)) throw new TypeError(`SplitEase: options must be a plain object; received ${opts}`);

  et1 = (et1 == undefined) ? 0.5 : et1;
  et2 = (et2 == undefined) ? Math.max(1 - et1, 0) : et2;
  opts = (opts == undefined) ? { pow: 2 } : opts;

  const eSum = et1 + et2;

  if (et1 > 1) console.warn(`SplitEase: ease-in ratio > 1 [${et1}]; ease-in/-out ratios will both be scaled down`);
  else if (et2 > 1) console.warn(`SplitEase: ease-out ratio > 1 [${et2}]; ease-in/-out ratios will both be scaled down`);
  else if (eSum > 1) console.warn(`SplitEase: total easing ratio > 1 [${eSum}]; ease-in/-out ratios will both be scaled down`);

  const eScale = eSum > 1 ? 1 / eSum : 1;
  et1 *= eScale;
  et2 *= eScale;

  const { pow, sin } = opts;
  const curve = sin ? cosine : power;
  const p = sin ? Math.PI / 2 : pow;
  const ev1 = et1 > 0 ? 1 / (p / et1 - (p - 1) * (et2 / et1 + 1)) : 0;
  const ev2 = et2 > 0 ? 1 / (p / et2 - (p - 1) * (et1 / et2 + 1)) : 0;

  return function(time) {
    return time <= 0 ? 0 :
      time > 1 ? 1 :
        time <= et1 ?
          curve(time, 0, ev1 * 2, et1 * 2, p) :
          time > (1 - et2) ?
            curve(time - (1 - et2 * 2), 1 - ev2 * 2, ev2 * 2, et2 * 2, p) :
            linear(time - et1, ev1, 1 - (ev1 + ev2), 1 - (et1 + et2)) ;

  };
}
