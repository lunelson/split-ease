// @ts-nocheck
import { SyncEmitter } from './emit.js';

export const cssMedia = {
  xs: { breakpoint: '20em' },
  s: { breakpoint: '32em' },
  m: { breakpoint: '40em' },
  l: { breakpoint: '64em' },
};

const mediaKeys = Object.keys(cssMedia);

const Media = new SyncEmitter();

const matchers = {},
  listeners = {};

mediaKeys.forEach((key, i, keys) => {
  const matcher = window.matchMedia(`(min-width: ${cssMedia[key]['breakpoint']})`);
  function listener(matcher) {
    const match = matcher.matches;
    Media.emit('break', key, i, keys, match);
    Media.emit(`break-${key}`, i, keys, match);
    Media.emit(`${match ? 'match' : 'unmatch'}-${key}`, i, keys);
    Media.emit(`${match ? 'above' : 'below'}-${key}`, i, keys);
  }
  matchers[key] = matcher;
  listeners[key] = listener;
  matcher.addListener(listener);
  Media.on('init', () => listener(matcher));
});

Object.assign(Media, { matchers, listeners });

Media.on('break', () => {
  Media.currMin = mediaKeys.filter(key => matchers[key].matches).reverse()[0];
  Media.currMax = mediaKeys.filter(key => !matchers[key].matches)[0];
  console.log(`
    current gt: ${Media.currMin}
    current lt: ${Media.currMax}
  `);
});

Object.assign(Media, {
  keys: mediaKeys,
  data: cssMedia,
  currMin: null,
  currMax: null,
  isBelow(key) {
    return !matchers[key].matches;
  },
  isAbove(key) {
    return matchers[key].matches;
  },
});

window.setTimeout(function() {
  Media.emit('init');
}, 0);

export default Media;
