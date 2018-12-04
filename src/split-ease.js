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

// NOTE: possibly no need to use Math.max when parsing args, it's done on the next line anyway
export default function SplitEase(et1 = 0.5, et2 = Math.max(1 - et1, 0), opts = {}) {

  // NOTE: possibly no need to use Math.max when parsing args, it's done on the next line anyway
  if (typeof et2 == 'object') { opts = et2; et2 = Math.max(1 - et1, 0); }

  et1 = Math.max(et1, 0);
  et2 = Math.max(et2, 0);
  const eSum = et1 + et2;
  const eScale = eSum > 1 ? 1 / eSum : 1;
  et1 *= eScale;
  et2 *= eScale;

  const { pow = 2, sin } = opts;
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
